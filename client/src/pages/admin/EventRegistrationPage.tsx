import { useEffect, useState } from "react";
import { Eye, CheckCircle, XCircle, Filter } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function EventRegistrationPage() {
  const [data, setData] = useState<any[]>([]);
  const [filter, setFilter] = useState("All");
  const [preview, setPreview] = useState<string | null>(null);

  const token = localStorage.getItem("token");

  const fetchData = async () => {
    const res = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/api/class-registrations`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    const json = await res.json();
    setData(json);
  };

  const updateStatus = async (id: number, status_pembayaran: string) => {
    await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/api/class-registrations/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status_pembayaran }),
      }
    );
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  // FIX FILTER — normalize semua value!
  const filtered = data.filter((r) => {
    if (filter === "All") return true;
    return r.status_pembayaran?.toLowerCase().trim() === filter.toLowerCase();
  });

  return (
    <div className="text-white font-poppins">
      <h1 className="text-4xl font-bold mb-8 drop-shadow">Class Payments</h1>

      {/* FILTER */}
      <div className="mb-6 flex items-center gap-3">
        <Filter className="text-gray-300" />
        {["All", "pending", "paid", "cancelled"].map((opt) => (
          <button
            key={opt}
            onClick={() => setFilter(opt)}
            className={`
              px-4 py-2 rounded-lg text-sm font-semibold border backdrop-blur-lg
              transition shadow-sm
              ${
                filter === opt
                  ? "bg-white/20 border-white/40 shadow-lg"
                  : "bg-white/5 border-white/10 hover:bg-white/10"
              }
            `}
          >
            {opt.toUpperCase()}
          </button>
        ))}
      </div>

      {/* LIST */}
      <AnimatePresence>
        {filtered.map((reg) => (
          <motion.div
            key={reg.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="
              bg-white/5 backdrop-blur-2xl border border-white/10 
              rounded-2xl p-6 shadow-xl my-4 hover:bg-white/10
            "
          >
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold">{reg.nama_kelas}</h2>
                <p className="text-gray-300 text-sm mt-1">
                  {reg.userNama} — User ID: {reg.userId}
                </p>
              </div>

              {/* STATUS BADGE */}
              <span
                className={`
                  px-3 py-1 rounded-full text-xs font-bold backdrop-blur-md border
                  ${
                    reg.status_pembayaran === "paid"
                      ? "bg-green-500/15 text-green-300 border-green-500/30"
                      : reg.status_pembayaran === "pending"
                      ? "bg-yellow-500/15 text-yellow-300 border-yellow-500/30"
                      : "bg-red-500/15 text-red-300 border-red-500/30"
                  }
                `}
              >
                {reg.status_pembayaran.toUpperCase()}
              </span>
            </div>

            {/* VIEW PROOF BUTTON */}
            {reg.bukti_pembayaran && (
              <div className="mt-5">
                <button
                  onClick={() =>
                    setPreview(
                      `${import.meta.env.VITE_API_BASE_URL}${reg.bukti_pembayaran}`
                    )
                  }
                  className="text-blue-300 underline flex items-center gap-2 hover:text-blue-400"
                >
                  <Eye size={18} /> View Payment Proof
                </button>
              </div>
            )}

            {/* ACTION BUTTONS */}
            <div className="flex gap-4 mt-6">
              {/* PREMIUM BUTTON - GREEN */}
              <button
                onClick={() => updateStatus(reg.id, "paid")}
                className="
                  px-4 py-2 rounded-xl font-semibold backdrop-blur-xl flex items-center gap-2
                  bg-gradient-to-r from-green-500/30 to-green-600/40 
                  hover:from-green-500/50 hover:to-green-600/60 
                  border border-green-400/20 text-green-200
                "
              >
                <CheckCircle size={18} /> Mark as Paid
              </button>

              {/* PREMIUM BUTTON - RED */}
              <button
                onClick={() => updateStatus(reg.id, "cancelled")}
                className="
                  px-4 py-2 rounded-xl font-semibold backdrop-blur-xl flex items-center gap-2
                  bg-gradient-to-r from-red-500/30 to-red-600/40 
                  hover:from-red-500/50 hover:to-red-600/60 
                  border border-red-400/20 text-red-200
                "
              >
                <XCircle size={18} /> Cancel
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* IMAGE PREVIEW MODAL */}
      {preview && (
        <div
          onClick={() => setPreview(null)}
          className="
            fixed inset-0 bg-black/70 backdrop-blur-lg flex items-center justify-center 
            z-[999] cursor-pointer
          "
        >
          <img
            src={preview}
            className="max-w-[80%] max-h-[80%] rounded-2xl shadow-2xl border border-white/10"
          />
        </div>
      )}
    </div>
  );
}
