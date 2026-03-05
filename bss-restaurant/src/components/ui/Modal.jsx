import { X } from "lucide-react";

export default function Modal({ isOpen, onClose, title, children, style }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-end p-4 duration-300 z-100 md:p-6 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
      <div
        className={`w-full  mx-auto  bg-white rounded-[3rem] shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-right duration-500 ${style}`}
      >
        <div className="flex items-center justify-between p-8 border-b border-slate-50">
          <div>
            <h2 className="text-2xl font-black text-slate-900">{title}</h2>
            <p className="font-medium text-slate-500">
              Please provide accurate information
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-3 transition-all cursor-pointer bg-slate-100 hover:bg-red-50 hover:text-red-500 rounded-2xl"
          >
            <X size={24} strokeWidth={3} />
          </button>
        </div>
        <div className="flex-1 p-8 overflow-y-auto custom-scrollbar">
          {children}
        </div>
      </div>
    </div>
  );
}
