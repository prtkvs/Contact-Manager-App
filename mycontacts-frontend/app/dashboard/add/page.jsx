"use client"
import ContactForm from "@/components/ContactForm";
import api from "@/app/utils/axios";
import { useRouter } from "next/navigation";

export default function AddContactPage() {
  const router = useRouter();

  const save = async (data) => {
    await api.post("/contacts", data);
    router.push("/dashboard");
  };

  return <ContactForm contact={null} onSave={save} onCancel={() => router.back()} />;
}
