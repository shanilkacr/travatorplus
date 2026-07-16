"use client";

import { useState } from "react";

const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8787";

type Status = "idle" | "sending" | "sent" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
    preferredTime: "",
  });

  function update(k: keyof typeof form) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [k]: e.target.value }));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch(`${API}/v1/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="glass p-8">
        <p className="text-lg">Thanks — we'll be in touch shortly.</p>
        <p className="mt-2 text-sm text-gray-500">
          A member of the team will reach out to {form.email || "you"} to find a
          time.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <label className="block">
          <span className="eyebrow mb-2 block">Name</span>
          <input
            required
            value={form.name}
            onChange={update("name")}
            className="input"
            autoComplete="name"
          />
        </label>
        <label className="block">
          <span className="eyebrow mb-2 block">Email</span>
          <input
            required
            type="email"
            value={form.email}
            onChange={update("email")}
            className="input"
            autoComplete="email"
          />
        </label>
      </div>
      <label className="block">
        <span className="eyebrow mb-2 block">Preferred time (optional)</span>
        <input
          value={form.preferredTime}
          onChange={update("preferredTime")}
          placeholder="e.g. Weekday mornings, GMT+5:30"
          className="input"
        />
      </label>
      <label className="block">
        <span className="eyebrow mb-2 block">What are you planning?</span>
        <textarea
          required
          rows={5}
          value={form.message}
          onChange={update("message")}
          className="input resize-none"
        />
      </label>
      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={status === "sending"}
          className="btn-primary disabled:cursor-not-allowed disabled:opacity-50"
        >
          {status === "sending" ? "Sending…" : "Request a call"}
        </button>
        {status === "error" && (
          <span className="text-sm text-gray-500">
            Couldn't send — please email us instead.
          </span>
        )}
      </div>
    </form>
  );
}
