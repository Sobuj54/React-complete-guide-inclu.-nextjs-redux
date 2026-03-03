import { useState, useMemo } from "react";
import {
  Plus,
  Mail,
  Briefcase,
  Edit2,
  Trash2,
  ChevronDown,
} from "lucide-react";
import { useEmployees } from "../../hooks/useEmployees";
import { useEmployee } from "../../hooks/useEmployee";
import useCreateEmployee from "../../hooks/useCreateEmployee";
import { toBase64 } from "../../utils/to-base64";

// Components
import EmployeeTableSkeleton from "../../components/ui/EmployeeTableSkeleton";
import ErrorState from "../../components/ErrorState";
import EmployeeModal from "../../components/ui/EmployeeModal";
import EmployeeForm from "../../components/ui/EmployeeForm";
import Pagination from "../../components/Pagination";

export default function Employees() {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);

  const { mutate: createEmployee, isPending: isCreating } = useCreateEmployee();

  const {
    data: response,
    isPending,
    isError,
    refetch,
  } = useEmployees(page, perPage);
  const { data: fullEmployeeData, isFetching: isFetchingSingle } =
    useEmployee(selectedEmployeeId);

  const employees = response?.data || [];

  const handleOpenAdd = () => {
    setSelectedEmployeeId(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (empId) => {
    setSelectedEmployeeId(empId);
    setIsModalOpen(true);
  };

  const mappedDefaultValues = useMemo(() => {
    if (!selectedEmployeeId || !fullEmployeeData) return null;

    const emp = fullEmployeeData;
    const user = emp.user || {};

    return {
      firstName: user.firstName || "",
      middleName: user.middleName || "",
      lastName: user.lastName || "",
      email: user.email || "",
      designation: emp.designation || "",
      phone: user.phoneNumber || "",
      spouseName: user.spouseName || "",
      fatherName: user.fatherName || "",
      motherName: user.motherName || "",
      gender: user.genderId === 1 ? "Male" : "Female",
      dob: user.dob ? user.dob.split("T")[0] : "",
      joinDate: emp.joinDate ? emp.joinDate.split("T")[0] : "",
      nid: user.nid || "",
    };
  }, [fullEmployeeData, selectedEmployeeId]);

  const onFormSubmit = async (data) => {
    try {
      let base64String = "";
      if (data.image && data.image[0] instanceof File) {
        base64String = await toBase64(data.image[0]);
      }

      const payload = {
        ...data,
        phoneNumber: data.phone,
        dob: data.dob ? new Date(data.dob).toISOString() : null,
        joinDate: data.joinDate ? new Date(data.joinDate).toISOString() : null,
        genderId: data.gender === "Male" ? 1 : 2,
        base64: base64String,
        image: "",
      };

      createEmployee(payload, {
        onSuccess: () => {
          setIsModalOpen(false);
          setSelectedEmployeeId(null);
          refetch();
        },
      });
    } catch (error) {
      console.error("Form Submission Error:", error);
    }
  };

  if (isPending) return <EmployeeTableSkeleton />;
  if (isError)
    return (
      <ErrorState message="Failed to fetch staff data" refetch={refetch} />
    );

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <title>BSS Resto | Employees</title>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900">Staff Members</h1>
          <p className="text-slate-500 font-medium">
            Manage team roles and details
          </p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="flex items-center justify-center gap-2 bg-orange-600 text-white px-6 py-3.5 rounded-2xl font-black hover:bg-orange-700 transition-all active:scale-95 shadow-lg shadow-orange-100"
        >
          <Plus size={20} strokeWidth={3} /> Add New Employee
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-[2rem] overflow-hidden shadow-sm">
        <div className="p-6 border-b border-slate-50 flex items-center gap-3 bg-slate-50/30">
          <span className="text-xs font-black uppercase text-slate-400">
            Show
          </span>
          <div className="relative">
            <select
              value={perPage}
              onChange={(e) => {
                setPerPage(Number(e.target.value));
                setPage(1);
              }}
              className="appearance-none bg-white border border-slate-200 rounded-xl px-4 py-2 pr-10 text-sm font-black text-slate-700 outline-none cursor-pointer"
            >
              {[5, 10, 20, 50].map((v) => (
                <option key={v} value={v}>
                  {v}
                </option>
              ))}
            </select>
            <ChevronDown
              size={14}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
          </div>
        </div>

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
                      <button className="p-2.5 text-red-500 bg-red-50 rounded-xl hover:bg-red-500 hover:text-white transition-all cursor-pointer">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Pagination
          currentPage={response?.current_page || 1}
          lastPage={response?.last_page || 1}
          onPageChange={setPage}
          totalEntries={response?.total}
        />
      </div>

      <EmployeeModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedEmployeeId(null);
        }}
        title={selectedEmployeeId ? "Edit Employee" : "Add New Employee"}
      >
        {selectedEmployeeId && isFetchingSingle ? (
          <div className="py-20 flex flex-col items-center justify-center gap-4 text-center">
            <div className="w-10 h-10 border-4 border-orange-100 border-t-orange-600 rounded-full animate-spin" />
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
              Fetching details...
            </p>
          </div>
        ) : (
          <EmployeeForm
            defaultValues={mappedDefaultValues}
            onCancel={() => setIsModalOpen(false)}
            onSubmit={onFormSubmit}
            isLoading={isCreating}
          />
        )}
      </EmployeeModal>
    </div>
  );
}
