import { Mail, Briefcase, Edit2, Trash2 } from "lucide-react";

const EmployeeTable = ({ employees, handleOpenEdit, handleDelete }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead>
          <tr className="bg-slate-50/50 border-b border-slate-100">
            <th className="px-8 py-5 text-[10px] font-black uppercase text-slate-400 tracking-widest">
              Employee
            </th>
            <th className="px-8 py-5 text-[10px] font-black uppercase text-slate-400 tracking-widest text-center">
              Designation
            </th>
            <th className="px-8 py-5 text-[10px] font-black uppercase text-slate-400 tracking-widest">
              Joined Date
            </th>
            <th className="px-8 py-5 text-[10px] font-black uppercase text-slate-400 tracking-widest text-right">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-50">
          {employees.map((emp) => (
            <tr
              key={emp.id}
              className="hover:bg-slate-50/80 transition-colors group"
            >
              <td className="px-8 py-5">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-orange-100 flex items-center justify-center text-orange-600 font-black overflow-hidden">
                    {emp.user?.image ? (
                      <img
                        src={`https://bssrms.runasp.net/images/user/${emp.user.image}`}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span>{emp.user?.fullName?.charAt(0)}</span>
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-black text-slate-900">
                      {emp.user?.fullName}
                    </p>
                    <p className="text-xs font-bold text-slate-400 flex items-center gap-1">
                      <Mail size={12} /> {emp.user?.email}
                    </p>
                  </div>
                </div>
              </td>
              <td className="px-8 py-5 text-center">
                <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-slate-100 text-slate-700 text-[11px] font-black uppercase">
                  <Briefcase size={12} /> {emp.designation}
                </span>
              </td>

              <td className="px-8 py-5">
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-slate-700">
                    {new Date(emp.joinDate).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase">
                    Member since
                  </span>
                </div>
              </td>
              <td className="px-8 py-5 text-right">
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => handleOpenEdit(emp.id)}
                    className="p-2.5 text-blue-600 bg-blue-50 rounded-xl hover:bg-blue-600 hover:text-white transition-all cursor-pointer"
                  >
                    <Edit2 size={18} />
                  </button>
                  <button
                    className="p-2.5 text-red-500 bg-red-50 rounded-xl hover:bg-red-500 hover:text-white transition-all cursor-pointer"
                    onClick={() => handleDelete(emp)}
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

export default EmployeeTable;
