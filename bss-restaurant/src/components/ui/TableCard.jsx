import {
  Users,
  Edit2,
  Trash2,
  UserPlus,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { memo } from "react";

const TableCard = memo(({ table, onEdit, onDelete, onAddEmployee }) => {
  return (
    <div className="bg-white border-2 border-slate-100 rounded-[2rem] p-6 shadow-sm hover:shadow-md transition-all group">
      {/* Table Image & Status */}
      <div className="relative h-48 rounded-[1.5rem] overflow-hidden bg-slate-50 mb-5">
        <img
          src={`https://bssrms.runasp.net/images/table/${table.image}`}
          alt={table.tableNumber}
          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            e.target.src =
              "https://images.pexels.com/photos/3758133/pexels-photo-3758133.jpeg?_gl=1*1bjcii*_ga*MTEyMzE5NjgyMi4xNzY5MDgyNDM0*_ga_8JE65Q40S6*czE3NzI2OTI3NzEkbzUkZzEkdDE3NzI2OTI3NzYkajU1JGwwJGgw";
          }}
        />
        <div
          className={`absolute top-4 right-4 px-3 py-1.5 rounded-full text-[10px] font-black uppercase flex items-center gap-1.5 shadow-sm ${
            table.isOccupied
              ? "bg-red-100 text-red-600"
              : "bg-emerald-100 text-emerald-600"
          }`}
        >
          {table.isOccupied ? (
            <XCircle size={12} />
          ) : (
            <CheckCircle2 size={12} />
          )}
          {table.isOccupied ? "Occupied" : "Available"}
        </div>
      </div>

      {/* Table Info */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-xl font-black leading-tight text-slate-900">
            {table.tableNumber}
          </h3>
          <p className="text-sm font-bold text-slate-400 flex items-center gap-1.5 mt-1">
            <Users size={14} /> {table.numberOfSeats} Seats Capacity
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(table)}
            className="p-2 text-blue-600 transition-all cursor-pointer bg-blue-50 rounded-xl hover:bg-blue-600 hover:text-white"
          >
            <Edit2 size={16} />
          </button>
          <button
            onClick={() => onDelete(table)}
            className="p-2 text-red-500 transition-all cursor-pointer bg-red-50 rounded-xl hover:bg-red-500 hover:text-white"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      <hr className="mb-4 border-slate-50" />

      {/* Assigned Employees */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-black text-slate-400 uppercase tracking-widest">
            Assigned Staff
          </span>
          <button
            onClick={() => onAddEmployee(table.id)}
            className="p-1.5 text-orange-600 hover:bg-orange-50 cursor-pointer rounded-lg transition-colors"
            title="Assign Staff"
          >
            <UserPlus size={18} />
          </button>
        </div>

        <div className="flex flex-wrap gap-2">
          {table.employees?.length > 0 ? (
            table.employees.map((emp) => (
              <div
                key={emp.employeeTableId}
                className="px-3 py-1.5 bg-slate-50 border border-slate-100 rounded-xl text-sm font-black text-slate-600 flex items-center gap-2"
              >
                <div className="w-2 h-2 bg-orange-500 rounded-full" />
                {emp.name}
              </div>
            ))
          ) : (
            <p className="text-xs italic font-bold text-slate-300">
              No staff assigned
            </p>
          )}
        </div>
      </div>
    </div>
  );
});

export default TableCard;
