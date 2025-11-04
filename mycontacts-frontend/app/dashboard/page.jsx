"use client";

import { useEffect, useState } from "react";
import api from "@/app/utils/axios"; //added app here
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Users,
  LogOut,
  ChevronDown,
  Eye,
  Pencil,
  Trash2,
  SortAsc,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
// import { Plus } from "lucide-react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialogTitle,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState({});
  const [contacts, setContacts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [contactToDelete, setContactToDelete] = useState(null);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/login");
        return;
      }

      const userRes = await api.get("/users/current");
      const contactRes = await api.get("/contacts");
      const contactsData = contactRes.data.contacts || contactRes.data;

      setUser(userRes.data.user);
      setContacts(contactsData);
    } catch (err) {
      router.push("/login");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredContacts = contacts
    .filter(
      (c) =>
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.phone.includes(searchQuery)
    )
    .sort((a, b) =>
      sortBy === "name"
        ? a.name.localeCompare(b.name)
        : a.email.localeCompare(b.email)
    );

  const deleteContact = async () => {
    try {
      await api.delete(`/contacts/${contactToDelete}`);
      setDeleteDialogOpen(false);
      setContactToDelete(null);
      fetchData();
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <div className="min-h-screen">
      {/* Navbar */}
      <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="px-6 py-4 flex items-center justify-between">
          <Link href="/">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
              <Users className="text-white w-5 h-5" />
            </div>
            <span>Contacts</span>
          </div>
          </Link>
          <Button variant="ghost" onClick={handleLogout} className="text-red-600"><LogOut size={16} className="mr-2" />Logout</Button>
        </div>
      </nav>

      <div className="px-6 py-8 max-w-3xl mx-auto">
        {/* search + add button */}
        <div className="flex justify-between mb-6">
          <Input
            placeholder="Search contacts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-2/3"
          />

          <div className="flex gap-2">
            <Button
              onClick={() => router.push("/dashboard/add")}
              className="bg-blue-600 text-white"
            >
              +Add Contact
            </Button>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-32">
                <SortAsc size={14} className="mr-2" />
                <SelectValue placeholder="Sort" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="email">Email</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {filteredContacts.map((contact) => (
          <div
            key={contact.id}
            className="p-4 border rounded-lg flex justify-between"
          >
            <div className="flex-1">
              <div className="font-semibold text-lg">{contact.name}</div>
              <div className="text-gray-600">{contact.email}</div>
              <div className="text-gray-600">{contact.phone}</div>
              {contact.location && (
                <div className="text-gray-500 text-sm">{contact.location}</div>
              )}
            </div>

            <div className="flex gap-2">
              <Button
                size="sm"
                variant="ghost"
                onClick={() => router.push(`/contacts/${contact.id}`)}
              >
                <Eye />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => router.push(`/dashboard/edit/${contact.id}`)}
              >
                <Pencil />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                className="text-red-600"
                onClick={() => {
                  setContactToDelete(contact.id);
                  setDeleteDialogOpen(true);
                }}
              >
                <Trash2 />
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* delete modal */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Contact?</AlertDialogTitle>
            <AlertDialogDescription>
              This cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={deleteContact} className="bg-red-600">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
