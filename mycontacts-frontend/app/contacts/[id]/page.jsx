"use client";

import { useEffect, useState } from "react";
import api from "@/app/utils/axios";
import ContactDetailsPage from "@/components/ContactDetails"; 
import { useRouter, useParams } from "next/navigation";

export default function ContactDetailPageWrapper() {
  const router = useRouter();
  const { id } = useParams();

  const [contact, setContact] = useState(null);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchContact = async () => {
    try {
      const res = await api.get(`/contacts/${id}`);
      setContact(res.data.contact);   // ✅ Extract `contact`
    } catch (err) {
      console.error("Failed to fetch contact", err);
    } finally {
      setLoading(false);
    }
  };

  if (id) fetchContact();
}, [id]);


  const handleBack = () => router.push("/dashboard");

  const handleEdit = () => router.push(`/contacts/${id}/edit`);

  const handleDelete = async () => {
    try {
      await api.delete(`/contacts/${id}`);
      router.push("/dashboard");
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  if (loading) return <p className="p-6">Loading…</p>;

  return (
    <ContactDetailsPage
      contact={contact}
      onBack={handleBack}
      onEdit={handleEdit}
      onDelete={handleDelete}
    />
  );
}
