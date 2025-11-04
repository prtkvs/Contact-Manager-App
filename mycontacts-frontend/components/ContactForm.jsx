"use client";

import { useState } from "react";
import { ArrowLeft, Save, X, UserCircle, Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ContactFormPage({ contact, onSave, onCancel }) {
  const [name, setName] = useState(contact?.name || "");
  const [email, setEmail] = useState(contact?.email || "");
  const [phone, setPhone] = useState(contact?.phone || "");
  const [location, setLocation] = useState(contact?.location || ""); // ✅ New field

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && email && phone) {
      onSave({ name, email, phone, location }); // ✅ send location too
    }
  };

  const isEditing = !!contact;

  return (
    <div className="min-h-screen">
      <div className="bg-white border-b border-gray-200/50">
        <div className="container mx-auto px-6 py-6">
          <Button variant="ghost" onClick={onCancel} className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Contacts
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <h1 className="mb-2">{isEditing ? "Edit Contact" : "Add New Contact"}</h1>
            <p className="text-gray-600">
              {isEditing
                ? "Update the contact information below"
                : "Fill in the details to create a new contact"}
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200/50 shadow-lg p-8">
            <form onSubmit={handleSubmit} className="space-y-6">

              {/* NAME */}
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <div className="relative">
                  <UserCircle className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              {/* EMAIL */}
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              {/* PHONE */}
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+1 555 123 4567"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              {/* ✅ LOCATION (optional) */}
              <div className="space-y-2">
                <Label htmlFor="location">Location (optional)</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    id="location"
                    type="text"
                    placeholder="City, Country"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* ACTION BUTTONS */}
              <div className="flex gap-3 pt-4">
                <Button
                  type="submit"
                  className="flex-1 bg-blue-500 hover:bg-blue-600 shadow-lg shadow-blue-500/25"
                >
                  <Save className="w-4 h-4 mr-2" />
                  {isEditing ? "Save Changes" : "Add Contact"}
                </Button>

                <Button type="button" variant="outline" onClick={onCancel} className="flex-1">
                  <X className="w-4 h-4 mr-2" /> Cancel
                </Button>
              </div>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
