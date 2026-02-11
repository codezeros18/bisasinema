interface QuickActionProps {
    title: string;
    description: string;
    onClick: () => void;
}

const QuickAction = ({ title, description, onClick }: QuickActionProps) => (
  <button 
    onClick={onClick} 
    className="block bg-white/10 backdrop-blur-md border border-white/10 
               p-6 rounded-xl shadow-md hover:shadow-xl hover:bg-white/20 
               transition-all cursor-pointer text-left w-full"
  >
    <h3 className="text-lg font-semibold mb-2 text-white">{title}</h3>
    <p className="text-gray-300">{description}</p>
  </button>
);


export default QuickAction;
