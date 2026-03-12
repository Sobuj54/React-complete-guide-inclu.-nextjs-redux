import {
  Edit2,
  Trash2,
  Plus,
  CheckCircle2,
  XCircle,
  Utensils,
} from "lucide-react";

const TableList = ({ data, onEdit, onDelete, onAddEmployee }) => {
  return (
    <div className="overflow-x-auto bg-white rounded-md shadow-md">
      <table className="w-full text-left border-collapse min-w-[900px]">
        <thead>
          <tr className="bg-slate-50/50 border-b-2 border-slate-100">
            <th className="px-8 py-6 text-sm w-24">Preview</th>
            <th className="ppx-8 py-6 text-sm">Table Detail</th>
            <th
              className="px-8 py-6 text-sm 
            "
            >
              Total Seats
            </th>
            <th className="px-8 py-6 text-sm ">Status</th>
            <th className="px-8 py-6 text-sm">Assigned Staff</th>
            <th className="px-8 py-6 text-sm">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {data?.map((table) => (
            <tr
              key={table.id}
              className="hover:bg-slate-50/50 transition-colors group font-bold"
            >
              {/* Image Column */}
              <td className="px-8 py-5">
                <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-slate-100 bg-slate-50 flex-shrink-0">
                  <img
                    src={`https://bssrms.runasp.net/images/table/${table.image}`}
                    alt={table.tableNumber}
                    className="w-full h-full object-cover transition-transform group-hover:scale-110"
                    onError={(e) => {
                      e.target.src =
                        "https://images.pexels.com/photos/3758133/pexels-photo-3758133.jpeg";
                    }}
                  />
                </div>
              </td>

              {/* Table Name Column */}
              <td className="px-6 py-5">
                <div className="flex flex-col">
                  <span className="text-base ">{table.tableNumber}</span>
                </div>
              </td>

              {/* Capacity Column */}
              <td className="px-6 py-5">
                <span className="inline-flex items-center justify-center bg-slate-100 text-slate-700 px-4 py-1 rounded-xl text-sm font-black">
                  {table.numberOfSeats}
                </span>
              </td>

              {/* Status Column */}
              <td className="px-6 py-5">
                <div
                  className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-black uppercase border-2 ${
                    table.isOccupied
                      ? "bg-red-50 border-red-100 text-red-500"
                      : "bg-emerald-50 border-emerald-100 text-emerald-600"
                  }`}
                >
                  {table.isOccupied ? (
                    <XCircle size={14} />
                  ) : (
                    <CheckCircle2 size={14} />
                  )}
                  {table.isOccupied ? "Occupied" : "Available"}
                </div>
              </td>

              {/* Staff Column */}
              <td className="px-6 py-5">
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-3">
                    {table.employees?.slice(0, 3).map((emp, idx) => (
                      <div
                        key={idx}
                        className="w-10 h-10 rounded-full border-4 border-white bg-slate-200 flex items-center justify-center text-[10px] font-black uppercase overflow-hidden shadow-sm"
                        title={emp.name}
                      >
                        {emp.image ? (
                          <img
                            src={`https://bssrms.runasp.net/images/employee/${emp.image}`}
                            className="w-full h-full object-cover"
                            alt={emp.name}
                          />
                        ) : (
                          emp.name.charAt(0)
                        )}
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => onAddEmployee(table.id)}
                    className="w-10 h-10 rounded-full border-2 border-dashed border-slate-200 flex items-center justify-center text-slate-400 hover:text-green-600 hover:border-green-500 hover:bg-green-50 transition-all cursor-pointer active:scale-90"
                    title="Assign Staff"
                  >
                    <Plus size={18} strokeWidth={3} />
                  </button>
                </div>
              </td>

              {/* Actions Column */}
              <td className="px-8 py-5 text-right">
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => onEdit(table)}
                    className="p-3 text-slate-400 bg-white border-2 border-slate-100 rounded-2xl hover:text-blue-600 hover:border-blue-100 hover:bg-blue-50 transition-all active:scale-95 cursor-pointer"
                  >
                    <Edit2 size={18} />
                  </button>

                  <button
                    onClick={() => onDelete(table)}
                    className="p-3 text-slate-400 bg-white border-2 border-slate-100 rounded-2xl hover:text-red-500 hover:border-red-100 hover:bg-red-50 transition-all active:scale-95 cursor-pointer"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableList;
