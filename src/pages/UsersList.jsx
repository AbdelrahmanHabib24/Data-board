// src/pages/UsersList.jsx
import Table from "../components/Table";
import { useUsers } from "../contexts/UsersContext";
import DashboardLayout from "../components/DashboardLayout";
import { FaEdit, FaTrash } from "react-icons/fa";

export default function UsersList({
  showLayout = true,
  showActions = true,
  showPagination = true,
  showNotifications = true,
}) {
  const {
    items: users,
    loading,
    error,
    create,
    update,
    remove,
    page,
    total,
    setPage,
    query,
    setQuery,
    limit: contextLimit
  } = useUsers();

  const displayedUsers = users.slice(0, contextLimit);
// baseColumns
  const baseColumns = [
    { key: "id", label: "ID" },
    { key: "name", label: "Name", render: (row) => `${row.firstName} ${row.lastName}` },
    { key: "email", label: "Email" },
    { key: "city", label: "City", render: (u) => u.address?.city ?? "" },
  ];
// button Actions
  const Actions = (onEdit) => [
    ...baseColumns,
    {
      key: "actions",
      label: "Actions",
      render: (u) => (
        <>
          <button
            className="text-indigo-500 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 transition"
            onClick={() => onEdit(u)}
            title="Edit"
          >
            <FaEdit />
          </button>
          <button
            className="text-orange-500 hover:text-orange-700 dark:text-orange-400 dark:hover:text-orange-300 ml-3 transition"
            onClick={() => remove(u.id)}
            title="Delete"
          >
            <FaTrash />
          </button>
        </>
      ),
    },
  ];

  return (
    <DashboardLayout
      title="Users Dashboard"
      type="users"
      create={create}
      update={update}
      showLayout={showLayout}
      hideNewButton={!showActions}
      showPagination={showPagination}
      showNotifications={showNotifications}
      page={page}
      total={total}
      setPage={setPage}
      searchValue={query}
      onSearch={setQuery}
      loading={loading}
    >
      {({ onEdit }) => (
        <Table
          items={displayedUsers}
          columns={showActions ? Actions(onEdit) : baseColumns}
          loading={loading}
          error={error}
        />
      )}
    </DashboardLayout>
  );
}
