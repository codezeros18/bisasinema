import { Trash2, Calendar } from 'lucide-react';
import type { User } from '../../types';

interface UserCardProps {
  user: User;
  onDelete: (id: number) => void;
  currentUserId?: number; // ID admin yang sedang login
}

export default function UserCard({ user, onDelete, currentUserId }: UserCardProps) {
  const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString('id-ID', {
    year: 'numeric', month: 'long', day: 'numeric'
  });

  const canDelete = user.id !== currentUserId;

  return (
    <div className="bg-gray-900/80 backdrop-blur-xl border border-gray-800 
      rounded-xl shadow-lg p-5 flex flex-col hover:shadow-pink-500/20 transition">
      
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-white">{user.name}</h3>
          <p className="text-sm text-gray-400">{user.email}</p>
        </div>
        {canDelete && (
          <button 
            onClick={() => onDelete(user.id)} 
            className="p-2 text-gray-400 hover:text-red-500 hover:bg-gray-800 rounded-full transition-colors"
            title="Delete User"
          >
            <Trash2 size={16} />
          </button>
        )}
      </div>

      {/* Spacer */}
      <div className="flex-grow"></div>

      {/* Footer */}
      <div className="flex justify-between items-center text-sm text-gray-400 border-t border-gray-700 pt-3 mt-3">
        <div className="flex items-center gap-2">
          <Calendar size={14} />
          <span>Joined: {formatDate(user.createdAt)}</span>
        </div>
        <span className={`px-2 py-1 text-xs font-semibold rounded-full capitalize ${
          user.role === 'admin'
            ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white'
            : 'bg-gray-700/70 text-gray-200'
        }`}>
          {user.role}
        </span>
      </div>
    </div>
  );
}
