import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface Props {
  classId: number;
  onClose: () => void;
  onSuccess: () => void;
}

const PaymentModal: React.FC<Props> = ({ classId, onClose, onSuccess }) => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const userId = Number(localStorage.getItem("userId")); // contoh

  const submitPayment = async () => {
    if (!file) return alert("Upload bukti pembayaran!");

    setLoading(true);
    const formData = new FormData();
    formData.append("classId", String(classId));
    formData.append("userId", String(userId));
    formData.append("bukti_pembayaran", file);

    const res = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/api/class-registrations`,
      { method: "POST", body: formData }
    );

    setLoading(false);

    if (res.ok) onSuccess();
    else alert("Gagal submit pembayaran");
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/70 flex items-center justify-center z-[999]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <motion.div
          className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-2xl max-w-md w-full shadow-xl text-white"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
        >
          <h2 className="text-2xl font-bold mb-6">Payment Confirmation</h2>
          
          <input
            type="file"
            className="w-full bg-black/20 p-3 rounded-lg text-sm border border-white/10 mb-4"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />

          <button
            onClick={submitPayment}
            disabled={loading}
            className="w-full bg-white text-black py-3 rounded-xl font-semibold hover:bg-gray-200 transition"
          >
            {loading ? "Processing..." : "Submit Payment"}
          </button>

          <button
            onClick={onClose}
            className="mt-4 w-full text-gray-300 hover:text-white text-sm"
          >
            Cancel
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PaymentModal;
