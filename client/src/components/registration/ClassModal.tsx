import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { ClassItem } from "./types";
import PaymentModal from "./PaymentModal";


interface Props {
  data: ClassItem | null;
  onClose: () => void;
}

const ClassModal: React.FC<Props> = ({ data, onClose }) => {
  const [showPayment, setShowPayment] = useState(false);
  if (!data) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[999] flex items-center justify-center px-4"
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="relative w-full max-w-5xl h-[70vh] overflow-hidden shadow-2xl"
        >
          <img
            src={data.image}
            alt={data.title}
            className="absolute inset-0 w-full h-full object-cover"
          />

        <div className="absolute inset-y-0 right-0 w-[65%] bg-gradient-to-l from-black/90 via-black/70 to-transparent"></div>


          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-white text-2xl z-20"
          >
            ✕
          </button>

          <div className="
            absolute right-0 top-0 
            w-1/2 h-full 
            text-white p-10 
            overflow-y-auto 
            z-10
          ">
            <h1 className="text-4xl font-bold mb-4">{data.title}</h1>

            <p className="text-gray-300 leading-relaxed mb-6">{data.desc}</p>

            <div className="space-y-2 text-gray-300 text-sm">
              <p><strong>💰 Harga:</strong> Rp {data.price.toLocaleString()}</p>
              {data.quota && (
                <p><strong>👥 Kuota:</strong> {data.quota} peserta</p>
              )}
            </div>

            <button
              onClick={() => setShowPayment(true)}
              className="
                mt-8 bg-white text-black px-7 py-3 
                rounded-full font-semibold 
                hover:bg-gray-200 transition
              "
            >
              Join Now
            </button>
          </div>
        </motion.div>
         {/* PAYMENT MODAL */}
        {showPayment && (
          <PaymentModal
            classId={data.id}
            onClose={() => setShowPayment(false)}
            onSuccess={() => {
              setShowPayment(false);
              onClose();
            }}
          />
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default ClassModal;
