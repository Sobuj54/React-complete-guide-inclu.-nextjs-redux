import { Check } from "lucide-react";
import Modal from "./Modal";

export default function AssignStaffModal({
  isOpen,
  onClose,
  isLoading,
  staff = [],
  selectedEmployees,
  onToggle,
  onConfirm,
  isSubmitting,
}) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Assign Staff"
      style="max-w-xl"
    >
      <div className="space-y-6">
        <p className="font-bold text-slate-400 text-sm">
          Select staff members to assign to this table:
        </p>
        <div className="max-h-80 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
          {isLoading ? (
            <div className="py-10 text-center font-black text-slate-300 uppercase tracking-widest text-[10px] animate-pulse">
              Loading staff...
            </div>
          ) : staff?.length > 0 ? (
            staff.map((emp) => {
              const currentId = emp.employeeId || emp.id;
              const isSelected = selectedEmployees.includes(currentId);
              return (
                <div
                  key={currentId}
                  onClick={() => onToggle(currentId)}
                  className={`flex items-center justify-between p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                    isSelected
                      ? "border-orange-500 bg-orange-50/50"
                      : "border-slate-100 hover:border-slate-200 bg-white"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center font-black text-slate-500">
                      {emp.name?.charAt(0)}
                    </div>
                    <div>
                      <p className="font-black text-slate-900">{emp.name}</p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        {emp.role || "Server"}
                      </p>
                    </div>
                  </div>
                  {isSelected && (
                    <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center text-white">
                      <Check size={14} strokeWidth={4} />
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="py-10 text-center font-bold text-slate-300 italic">
              No available staff found.
            </div>
          )}
        </div>
        <div className="flex gap-4 pt-4">
          <button
            onClick={onClose}
            className="flex-1 py-4 font-black text-slate-400 uppercase tracking-widest text-[10px] cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={selectedEmployees.length === 0 || isSubmitting}
            className="flex-1 py-4 bg-orange-500 text-white font-black rounded-2xl hover:bg-orange-600 active:scale-95 transition-all shadow-xl shadow-orange-100 disabled:opacity-50 disabled:grayscale cursor-pointer"
          >
            {isSubmitting
              ? "Assigning..."
              : `Assign ${selectedEmployees.length} Members`}
          </button>
        </div>
      </div>
    </Modal>
  );
}
