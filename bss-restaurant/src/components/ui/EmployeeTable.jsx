import { Edit2, Trash2, Star, User } from "lucide-react";

const EmployeeTable = ({ employees, handleOpenEdit, handleDelete }) => {
  return (
    <div className="overflow-x-auto ">
      <table className="w-full text-left border-collapse min-w-[800px] md:min-w-full">
        <thead>
          <tr className="bg-slate-50 border-b border-slate-100">
            <th className="w-16 px-6 py-6"></th>
            <th className="px-6 py-6 text-base font-bold ">Name</th>
            <th className="w-12 px-2 py-6 text-center"></th>
            <th className="px-6 py-6 text-base font-bold ">Email</th>
            <th className="px-6 py-6 text-base font-bold ">Designation</th>
            <th className="px-6 py-6 text-base font-bold ">Join Date</th>
            <th className="px-6 py-6 text-base font-bold ">Phone</th>
            <th className="pr-12 py-6 text-base font-center font-bold  text-right ">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {employees.map((emp) => (
            <tr
              key={emp.id}
              className="hover:bg-slate-50/50 transition-colors group border-b-[1px] border-b-slate-200 font-medium"
            >
              <td className="px-6 py-4">
                <div className="w-14 h-14 rounded-full overflow-hidden border border-slate-200 flex-shrink-0">
                  {emp.user?.image ? (
                    <img
                      src={`https://bssrms.runasp.net/images/user/${emp.user.image}`}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-400">
                      <User size={20} />
                    </div>
                  )}
                </div>
              </td>

              <td className="px-6 py-4">
                <p className="text-base text-slate-700 truncate max-w-[120px] md:max-w-none font-medium">
                  {emp.user?.fullName}
                </p>
              </td>

              <td className="px-2 py-4">
                <Star
                  size={16}
                  className="text-orange-400 fill-orange-400 mx-auto"
                />
              </td>

              <td className="px-6 py-4">
                <p className="text-base text-slate-600 truncate max-w-[150px] md:max-w-none">
                  {emp.user?.email}
                </p>
              </td>

              <td className="px-6 py-4">
                <p className="text-base text-slate-600 truncate max-w-[100px] md:max-w-none ">
                  <span className="bg-green-100 text-green-700 px-3 py-1 font-medium rounded-sm inline-block">
                    {emp.designation}
                  </span>
                </p>
              </td>

              <td className="px-6 py-4 text-slate-600 text-base whitespace-nowrap">
                {new Date(emp.joinDate).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </td>

              <td className="px-6 py-4 text-slate-600 text-base whitespace-nowrap">
                <span className="truncate max-w-[100px] md:max-w-none block">
                  {emp.user?.phoneNumber}
                </span>
              </td>

              <td className="px-6 py-4 text-right">
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => handleOpenEdit(emp.id)}
                    className="p-2 text-slate-400 bg-white border border-slate-200 rounded-lg hover:text-white hover:bg-green-400 transition-all active:scale-95 cursor-pointer"
                  >
                    <Edit2 size={16} />
                  </button>

                  <button
                    onClick={() => handleDelete(emp)}
                    className="p-2 text-slate-400 bg-white border border-slate-200 rounded-lg hover:text-white hover:bg-red-500 transition-all active:scale-95 cursor-pointer"
                  >
                    <Trash2 size={16} />
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
