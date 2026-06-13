import { Eye, EyeOff } from "lucide-react";

interface Props {
  title: string;
  isVisible: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

export const DynamicSection = ({ title, isVisible, onToggle, children }: Props) => {
  return (
    <div className={`bg-white rounded-xl shadow-sm border border-slate-200 mb-2 transition-all ${!isVisible ? 'opacity-50' : ''}`}>
      <div className="p-4 border-b border-slate-100 flex justify-between items-center">
        <div>
          <h3 className="font-semibold text-slate-700 text-sm md:text-base">{title}</h3>
        </div>
        <button 
          onClick={onToggle}
          className={`flex items-center gap-2 text-xs font-medium px-3 py-1.5 rounded-lg transition-colors ${
            isVisible 
              ? 'bg-blue-50 text-blue-600 hover:bg-blue-100' 
              : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
          }`}
        >
          {isVisible ? <Eye size={14} /> : <EyeOff size={14} />}
          {isVisible ? 'Sección Activa' : 'Sección Inactiva'}
        </button>
      </div>
      
      {isVisible && (
        <div className="p-5 bg-white rounded-b-xl">
          {children}
        </div>
      )}
    </div>
  );
};