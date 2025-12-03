import { motion } from "framer-motion";

interface PaymentModalProps {
  data: {
    title: string;
    price: number;
  };
  onClose: () => void;
}

const PaymentModal = ({ data, onClose }: PaymentModalProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-[#1c1c1c] w-full max-w-md rounded-xl p-6"
      >
        <h1 className="text-xl font-bold mb-4">Confirm Registration</h1>

        <p className="text-gray-300 mb-2">{data.title}</p>

        <div className="bg-black/20 p-4 rounded-lg border border-white/10">
          <p className="text-gray-400 text-sm">Price</p>
          <p className="text-lg font-semibold">
            Rp {data.price.toLocaleString()}
          </p>
        </div>

        <button className="w-full bg-white text-black py-3 rounded-lg font-semibold mt-6">
          Pay (Dummy)
        </button>

        <button
          className="w-full text-gray-400 mt-4"
          onClick={onClose}
        >
          Cancel
        </button>
      </motion.div>
    </motion.div>
  );
};

export default PaymentModal;
