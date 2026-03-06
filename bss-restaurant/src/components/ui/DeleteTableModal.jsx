import { AlertTriangle } from "lucide-react";
import Modal from "./Modal";

export default function DeleteTableModal({
  isOpen,
  onClose,
  onConfirm,
  tableName,
  isDeleting,
}) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Confirm Deletion"
      style="max-w-md"
    >
      <div className="text-center py-4">
        <div className="w-20 h-20 bg-red-50 text-red-500 rounded-[2rem] flex items-center justify-center mx-auto mb-6 border-4 border-red-100">
          <AlertTriangle size={40} strokeWidth={2.5} />
        </div>
        <h3 className="text-2xl font-black text-slate-900 tracking-tight">
          Are you sure?
        </h3>
        <p className="font-bold text-slate-400 mt-2 px-6">
          Deleting{" "}
          <span className="text-slate-900 font-black">"{tableName}"</span> is
          permanent.
        </p>
        <div className="flex gap-4 mt-10 px-2">
          <button
            onClick={onClose}
            className="flex-1 py-4 font-black text-slate-400 uppercase tracking-widest text-[10px]"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isDeleting}
            className="flex-1 py-4 bg-red-500 text-white font-black rounded-2xl hover:bg-red-600 active:scale-95 transition-all shadow-xl shadow-red-100 disabled:opacity-50"
          >
            {isDeleting ? "Removing..." : "Yes, Delete"}
          </button>
        </div>
      </div>
    </Modal>
  );
}
