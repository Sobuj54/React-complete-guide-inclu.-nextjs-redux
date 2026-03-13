import { useState, useMemo } from "react";
import { Plus } from "lucide-react";
import { useEmployees } from "../../hooks/useEmployees";
import { useEmployee } from "../../hooks/useEmployee";
import useCreateEmployee from "../../hooks/useCreateEmployee";
import { useUpdateEmployee } from "../../hooks/useUpdateEmployee";
import useDeleteEmployee from "../../hooks/useDeleteEmployee";
import { toBase64 } from "../../utils/to-base64";

// Components
import ErrorState from "../../components/ErrorState";
import Modal from "../../components/ui/Modal";
import EmployeeForm from "../../components/ui/EmployeeForm";
import EmployeeTable from "../../components/ui/EmployeeTable";
import DeleteConfirmationModal from "../../components/ui/DeleteConfirmationModal";

export default function Employees() {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState(null);

  // API Hooks
  const {
    data: response,
    isPending,
    isError,
    refetch,
  } = useEmployees(page, perPage);
  const { data: fullEmployeeData, isFetching: isFetchingSingle } =
    useEmployee(selectedEmployeeId);
  const { mutate: createEmployee, isPending: isCreating } = useCreateEmployee();
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

      const options = {
        onSuccess: () => {
          setIsModalOpen(false);
          setSelectedEmployeeId(null);
          refetch();
        },
      };

      if (selectedEmployeeId) {
        updateEmployee(payload, options);
      } else {
        createEmployee(payload, options);
      }
    } catch (error) {
      console.error("Form Submission Error:", error);
    }
  };

  if (isError)
    return <ErrorState message="Failed to load staff" refetch={refetch} />;

  return (
    <div className="space-y-3 duration-500 animate-in fade-in pt-2">
      <title>BSS Resto | Employees</title>

      {/* Persistent Header */}
      <div
        className="flex items-center justify-end"
        style={{ borderRadius: "1px" }}
      >
        <button
          onClick={handleOpenAdd}
          className="flex items-center gap-2 bg-orange-600 text-white px-3 py-2 rounded-md font-semibold hover:bg-orange-700 transition-all active:scale-95 cursor-pointer text-sm"
        >
          <Plus size={16} strokeWidth={3} /> Add Employee
        </button>
      </div>

      {/* Table handles its own loading skeleton now */}
      <EmployeeTable
        employees={employees}
        handleOpenEdit={handleOpenEdit}
        handleDelete={handleOpenDelete}
        totalEntries={response?.total}
        perPage={perPage}
        page={page}
        onPageChange={setPage}
        onPerPageChange={(val) => {
          setPerPage(val);
          setPage(1);
        }}
        isLoading={isPending}
      />

      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        isLoading={isDeleting}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        itemName={employeeToDelete?.user?.fullName || "this employee"}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedEmployeeId(null);
        }}
        title={selectedEmployeeId ? "Edit Employee" : "Add New Employee"}
        style="max-w-6xl h-full"
      >
        {selectedEmployeeId && isFetchingSingle ? (
          <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
            <div className="w-10 h-10 border-4 border-orange-100 rounded-full border-t-orange-600 animate-spin" />
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
      </Modal>
    </div>
  );
}
