import { useState, useMemo } from "react";
import { Plus, ChevronDown } from "lucide-react";
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
import EmployeeTable from "../../components/ui/EmployeeTable";
import { useUpdateEmployee } from "../../hooks/useUpdateEmployee";
import useDeleteEmployee from "../../hooks/useDeleteEmployee";
import DeleteConfirmationModal from "../../components/ui/DeleteConfirmationModal";

export default function Employees() {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState(null);

  const { mutate: createEmployee, isPending: isCreating } = useCreateEmployee();

  const {
    data: response,
    isPending,
    isError,
    refetch,
  } = useEmployees(page, perPage);

  const { data: fullEmployeeData, isFetching: isFetchingSingle } =
    useEmployee(selectedEmployeeId);

  const { mutate: updateEmployee, isPending: isUpdating } =
    useUpdateEmployee(selectedEmployeeId);

  const { mutate: deleteEmployee, isPending: isDeleting } = useDeleteEmployee();

  const employees = response?.data || [];

  const handleOpenAdd = () => {
    setSelectedEmployeeId(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (empId) => {
    setSelectedEmployeeId(empId);
    setIsModalOpen(true);
  };

  const handleOpenDelete = (emp) => {
    setEmployeeToDelete(emp);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (!employeeToDelete) return;

    deleteEmployee(employeeToDelete.id, {
      onSuccess: () => {
        setIsDeleteModalOpen(false);
        setEmployeeToDelete(null);
        refetch();
      },
    });
  };

  const mappedDefaultValues = useMemo(() => {
    if (!selectedEmployeeId || !fullEmployeeData) return null;

    const emp = fullEmployeeData;
    const user = emp.user || {};

    return {
      firstName: user.firstName || "",
      middleName: user?.middleName || "",
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
      image: user?.image || null,
    };
  }, [fullEmployeeData, selectedEmployeeId]);

  const onFormSubmit = async (data) => {
    try {
      const hasNewFile = data.image && data.image[0] instanceof File;

      let payload = {
        designation: data.designation,
        joinDate: data.joinDate ? new Date(data.joinDate).toISOString() : null,
        email: data.email,
        phoneNumber: data.phone,
        firstName: data.firstName,
        middleName: data.middleName || "",
        lastName: data.lastName,
        fatherName: data.fatherName || "",
        motherName: data.motherName || "",
        spouseName: data.spouseName || "",
        dob: data.dob ? new Date(data.dob).toISOString() : null,
        nid: data.nid,
        genderId: data.gender === "Male" ? 1 : 2,
      };

      if (hasNewFile) {
        const file = data.image[0];
        payload.image = file.name;
        payload.base64 = await toBase64(file);
      }

      if (selectedEmployeeId) {
        updateEmployee(payload, {
          onSuccess: () => {
            setIsModalOpen(false);
            setSelectedEmployeeId(null);
            refetch();
          },
        });
      } else {
        createEmployee(payload, {
          onSuccess: () => {
            setIsModalOpen(false);
            setSelectedEmployeeId(null);
            refetch();
          },
        });
      }
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

        <EmployeeTable
          employees={employees}
          handleOpenEdit={handleOpenEdit}
          handleDelete={handleOpenDelete}
        />

        <Pagination
          currentPage={response?.current_page || 1}
          lastPage={response?.last_page || 1}
          onPageChange={setPage}
          totalEntries={response?.total}
        />
      </div>

      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        isLoading={isDeleting}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        itemName={employeeToDelete?.user?.fullName || "this employee"}
      />

      <EmployeeModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedEmployeeId(null);
        }}
        title={selectedEmployeeId ? "Edit Employee" : "Add New Employee"}
        style="max-w-6xl h-full"
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
            isLoading={isCreating || isUpdating}
          />
        )}
      </EmployeeModal>
    </div>
  );
}
