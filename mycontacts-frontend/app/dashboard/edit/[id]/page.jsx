"use client"
import { useEffect, useState } from "react";
import ContactForm from "@/components/ContactForm";
import api from "@/app/utils/axios";
import { useRouter, useParams } from "next/navigation";

export default function EditContactPage() {
  const router = useRouter();
  const { id } = useParams();
  const [contact, setContact] = useState(null);

  useEffect(() => {
    api.get(`/contacts/${id}`).then(res => setContact(res.data));
  }, []);

  const save = async (data) => {
    await api.put(`/contacts/${id}`, data);
    router.push("/dashboard");
  };

  if (!contact) return <div>Loading...</div>;

  return <ContactForm contact={contact} onSave={save} onCancel={() => router.back()} />;
}
