import { AlertTriangle, X } from "lucide-react";
import Modal from "./Modal";

export default function DeleteConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  itemName,
  isLoading,
}) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Confirm Deletion"
      style="max-w-3xl lg:h-2/3 h-full"
    >
      <div className="flex flex-col items-center text-center p-4 ">
        {/* Warning Icon */}
        <div className="w-16 h-16 bg-red-50 text-red-500 rounded-3xl flex items-center justify-center mb-6">
          <AlertTriangle size={32} strokeWidth={2.5} />
        </div>

        <h3 className="text-xl font-black text-slate-900 mb-2">
          Are you absolutely sure?
        </h3>
        <p className="text-slate-500 font-medium max-w-[280px] leading-relaxed">
          You are about to remove{" "}
          <span className="text-slate-900 font-black">"{itemName}"</span>. This
          action cannot be undone.
        </p>

        <div className="flex flex-col w-full gap-3 mt-8">
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className="w-full bg-red-500 hover:bg-red-600 text-white py-4 rounded-2xl font-black shadow-lg shadow-red-100 transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center"
          >
            {isLoading ? "Deleting..." : "Yes, Delete Member"}
          </button>

          <button
            onClick={onClose}
            disabled={isLoading}
            className="w-full bg-slate-50 hover:bg-slate-100 text-slate-500 py-4 rounded-2xl font-black transition-all"
          >
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
}
