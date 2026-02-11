import { motion } from 'framer-motion';
import { CheckCircle2, XCircle, X } from 'lucide-react';

interface NotificationProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}

const Notification = ({ message, type, onClose }: NotificationProps) => {
  const isSuccess = type === 'success';

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 50, scale: 0.3 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
      className={`relative flex items-start gap-4 p-4 rounded-lg shadow-lg 
                  bg-white/10 backdrop-blur-md border border-white/20 text-white`}
    >
      {isSuccess ? (
        <CheckCircle2 className="h-6 w-6 text-green-400 mt-0.5" />
      ) : (
        <XCircle className="h-6 w-6 text-red-400 mt-0.5" />
      )}
      <div className="flex-1">
        <p className="font-medium">{isSuccess ? 'Success' : 'Error'}</p>
        <p className="text-sm text-white/80">{message}</p>
      </div>
      <button onClick={onClose} className="p-1 rounded-full hover:bg-white/20 transition-colors">
        <X size={18} />
      </button>
    </motion.div>
  );
};

export default Notification;
