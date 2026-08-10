"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SITE_CONFIG } from "@/lib/constants";

interface ContactAppProps {
  theme: "dark" | "light";
}

const QUICK_CONTACTS = [
  {
    id: "email",
    icon: "📧",
    label: "Email",
    value: SITE_CONFIG.email,
    action: () => window.open(`mailto:${SITE_CONFIG.email}`),
    color: "#3DDC84",
    gradient: "from-emerald-500 to-green-600",
  },
  {
    id: "linkedin",
    icon: "💼",
    label: "LinkedIn",
    value: "/in/akashjha991",
    action: () => window.open(SITE_CONFIG.linkedin, "_blank"),
    color: "#4FC3F7",
    gradient: "from-sky-400 to-blue-600",
  },
  {
    id: "github",
    icon: "🐙",
    label: "GitHub",
    value: "@akashjha991",
    action: () => window.open(SITE_CONFIG.github, "_blank"),
    color: "#CE93D8",
    gradient: "from-gray-600 to-gray-800",
  },
];

export function ContactApp({ theme }: ContactAppProps) {
  const [activeTab, setActiveTab] = useState<"contacts" | "messages">("contacts");
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const isDark = theme === "dark";
  const bg = isDark ? "#0F0F0F" : "#FAFAFA";
  const surface = isDark ? "#1A1A1A" : "#FFFFFF";
  const text = isDark ? "#E6E1E5" : "#1C1B1F";
  const subtext = isDark ? "rgba(255,255,255,0.55)" : "rgba(0,0,0,0.55)";
  const border = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)";
  const inputBg = isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)";

  const handleSend = async () => {
    if (!form.name || !form.email || !form.message) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, subject: "Android Portfolio Contact" }),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
    setTimeout(() => setStatus("idle"), 3500);
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden" style={{ background: bg, color: text }}>
      {/* App header */}
      <div
        className="px-4 pt-4 pb-0"
        style={{ background: isDark ? "#131313" : "#F5F5F5", borderBottom: `1px solid ${border}` }}
      >
        <h1 className="text-xl font-medium mb-3" style={{ color: text }}>Contact</h1>
        {/* Tab bar */}
        <div className="flex">
          {(["contacts", "messages"] as const).map((tab) => (
            <button
              key={tab}
              className="flex-1 py-2.5 text-sm font-medium capitalize transition-colors relative"
              style={{ color: activeTab === tab ? "#3DDC84" : subtext }}
              onClick={() => setActiveTab(tab)}
              aria-selected={activeTab === tab}
              role="tab"
            >
              {tab}
              {activeTab === tab && (
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#3DDC84]"
                  layoutId="contact-tab-indicator"
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Tab content */}
      <div className="flex-1 overflow-y-auto">
        <AnimatePresence mode="wait">
          {activeTab === "contacts" ? (
            <motion.div
              key="contacts"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2 }}
              className="p-4 space-y-4"
            >
              {/* Availability banner */}
              <div
                className="rounded-[18px] p-4 flex items-start gap-3"
                style={{ background: "rgba(61,220,132,0.12)", border: "1px solid rgba(61,220,132,0.25)" }}
              >
                <div className="w-2 h-2 rounded-full bg-[#3DDC84] mt-1.5 animate-pulse flex-shrink-0" />
                <div>
                  <p className="text-sm font-semibold" style={{ color: "#3DDC84" }}>Open to Opportunities</p>
                  <p className="text-xs mt-0.5" style={{ color: subtext }}>
                    Available for internships, freelance, and full-time roles.
                  </p>
                </div>
              </div>

              {/* Contact cards */}
              <div className="space-y-3">
                {QUICK_CONTACTS.map((c, i) => (
                  <motion.button
                    key={c.id}
                    className="w-full flex items-center gap-4 rounded-[18px] px-4 py-4 text-left"
                    style={{ background: surface, border: `1px solid ${border}` }}
                    initial={{ y: 12, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: i * 0.08, type: "spring", stiffness: 300, damping: 25 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={c.action}
                    aria-label={`Contact via ${c.label}: ${c.value}`}
                  >
                    <div
                      className={`w-14 h-14 rounded-full bg-gradient-to-br ${c.gradient} flex items-center justify-center text-2xl shadow-md flex-shrink-0`}
                    >
                      {c.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold" style={{ color: text }}>{c.label}</p>
                      <p className="text-xs mt-0.5 truncate" style={{ color: subtext }}>{c.value}</p>
                    </div>
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-sm"
                      style={{ background: `${c.color}18`, color: c.color }}
                    >
                      →
                    </div>
                  </motion.button>
                ))}
              </div>

              {/* Social note */}
              <div
                className="rounded-[18px] p-4 text-center"
                style={{ background: surface, border: `1px solid ${border}` }}
              >
                <p className="text-xs" style={{ color: subtext }}>
                  Response time: usually within 24 hours 🕐
                </p>
                <p className="text-xs mt-1" style={{ color: subtext }}>
                  Let's build something great together!
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="messages"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col h-full"
            >
              {/* Chat-style header */}
              <div className="flex items-center gap-3 px-4 py-3" style={{ borderBottom: `1px solid ${border}` }}>
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-base font-bold"
                  style={{ background: "linear-gradient(135deg,#3DDC84,#006C34)", color: "#fff" }}
                >
                  AJ
                </div>
                <div>
                  <p className="text-sm font-semibold" style={{ color: text }}>Aakash Jha</p>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#3DDC84]" />
                    <p className="text-[11px]" style={{ color: "#3DDC84" }}>Active</p>
                  </div>
                </div>
              </div>

              {/* Message thread area */}
              <div className="flex-1 px-4 py-4 overflow-y-auto space-y-3">
                <div className="flex justify-start">
                  <div
                    className="max-w-[75%] rounded-[18px] rounded-tl-[4px] px-4 py-3"
                    style={{ background: isDark ? "#1E3A2F" : "#E8F5E9" }}
                  >
                    <p className="text-sm" style={{ color: text }}>
                      Hi! I'm Aakash. Feel free to reach out about projects, opportunities, or just to say hello! 👋
                    </p>
                    <p className="text-[10px] mt-1 text-right" style={{ color: subtext }}>Aakash · now</p>
                  </div>
                </div>

                {status === "success" && (
                  <div className="flex justify-end">
                    <div
                      className="max-w-[75%] rounded-[18px] rounded-tr-[4px] px-4 py-3"
                      style={{ background: "#3DDC84", color: "#000" }}
                    >
                      <p className="text-sm font-medium">Message sent! ✓✓</p>
                      <p className="text-[10px] mt-1 opacity-60">You · just now</p>
                    </div>
                  </div>
                )}

                {status === "error" && (
                  <div className="flex justify-center">
                    <p className="text-xs text-red-400">Couldn't send — try again.</p>
                  </div>
                )}
              </div>

              {/* Compose bar */}
              <div
                className="px-3 py-3 space-y-2"
                style={{ background: isDark ? "#131313" : "#F5F5F5", borderTop: `1px solid ${border}` }}
              >
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Your name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="flex-1 rounded-full px-4 py-2 text-sm outline-none"
                    style={{ background: inputBg, color: text, border: `1px solid ${border}` }}
                    aria-label="Your name"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="flex-1 rounded-full px-4 py-2 text-sm outline-none"
                    style={{ background: inputBg, color: text, border: `1px solid ${border}` }}
                    aria-label="Your email"
                  />
                </div>
                <div className="flex gap-2 items-end">
                  <textarea
                    placeholder="Write a message..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    rows={2}
                    className="flex-1 rounded-[16px] px-4 py-2.5 text-sm outline-none resize-none"
                    style={{ background: inputBg, color: text, border: `1px solid ${border}` }}
                    aria-label="Message"
                  />
                  <motion.button
                    className="w-10 h-10 rounded-full flex items-center justify-center text-base flex-shrink-0"
                    style={{
                      background: form.name && form.email && form.message ? "#3DDC84" : isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)",
                      color: form.name && form.email && form.message ? "#000" : subtext,
                    }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleSend}
                    disabled={status === "loading"}
                    aria-label="Send message"
                  >
                    {status === "loading" ? (
                      <motion.span animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}>
                        ⟳
                      </motion.span>
                    ) : "➤"}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
