
interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  eventName: string;
  isSubmitting: boolean; // <-- PROPERTI BARU
}

export default function RegistrationModal({ isOpen, onClose, onConfirm, eventName, isSubmitting }: RegistrationModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md text-center">
        <h2 className="text-xl font-bold mb-2">Konfirmasi Pendaftaran</h2>
        <p className="text-gray-600 mb-4">
          Anda akan mendaftar untuk event: <br />
          <span className="font-semibold text-black">{eventName}</span>
        </p>
        <p className="text-sm text-gray-500 mb-6">
          Pastikan Anda sudah login untuk melanjutkan.
        </p>
        <div className="flex justify-center gap-4">
          <button 
            onClick={onClose} 
            className="px-6 py-2 bg-gray-200 rounded-md hover:bg-gray-300 disabled:opacity-50"
            disabled={isSubmitting} // Nonaktifkan saat proses berjalan
          >
            Batal
          </button>
          <button 
            onClick={onConfirm} 
            className="px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isSubmitting} // Nonaktifkan saat proses berjalan
          >
            {isSubmitting ? 'Mendaftar...' : 'Konfirmasi'} {/* Ubah teks saat loading */}
          </button>
        </div>
      </div>
    </div>
  );
}

