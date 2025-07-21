import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser"; // your actual public key
import { exportToBase64PDF } from "../utils/exportUtils";
emailjs.init("PQ4XvnvK7b4tNjOII");

export default function EmailSender({ elementId }) {
  const formRef = useRef();
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus("");

    try {
      const pdfData = await exportToBase64PDF(elementId);

      const templateParams = {
        user_email: formRef.current.user_email.value,
        subject: formRef.current.subject.value,
        message: formRef.current.message.value,
        attachment: pdfData,
      };

      await emailjs.send(
        "service_5hhhcyq",
        "template_xi5hcre",
        templateParams,
        "PQ4XvnvK7b4tNjOII"
      );

      setStatus("✅ Email sent successfully!");
      formRef.current.reset();
    } catch (error) {
      console.error(error);
      setStatus("❌ Error sending email. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 bg-gray-50 rounded-md border mt-6 shadow-sm">
      <h3 className="text-lg font-semibold mb-2">📧 Send This Report by Email</h3>
      <form ref={formRef} onSubmit={handleSend} className="space-y-3">
        <input
          type="email"
          name="user_email"
          placeholder="Recipient's email"
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="subject"
          placeholder="Email subject"
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          name="message"
          placeholder="Your message"
          className="w-full p-2 border rounded"
          rows="3"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className={`w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Sending..." : "Send Email"}
        </button>
        {status && <p className="text-sm text-center mt-2">{status}</p>}
      </form>
    </div>
  );
}
