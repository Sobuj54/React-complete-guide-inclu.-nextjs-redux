import { X } from "lucide-react";

export default function EmployeeModal({
  isOpen,
  onClose,
  title,
  children,
  style,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-end p-4 md:p-6 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div
        className={`w-full  mx-auto  bg-white rounded-[3rem] shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-right duration-500 ${style}`}
      >
        <div className="p-8 border-b border-slate-50 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-black text-slate-900">{title}</h2>
            <p className="text-slate-500 font-medium">
              Please provide accurate information
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-3 bg-slate-100 hover:bg-red-50 hover:text-red-500 rounded-2xl transition-all cursor-pointer"
          >
            <X size={24} strokeWidth={3} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          {children}
        </div>
      </div>
    </div>
  );
}
