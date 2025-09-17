// src/pages/PostsList.jsx
import Table from "../components/Table";
import { usePosts } from "../contexts/PostsContext";
import DashboardLayout from "../components/DashboardLayout";
import { FaEdit, FaTrash } from "react-icons/fa";

export default function PostsList({
  limit,
  showLayout = true,
  showActions = true,
  showPagination = true,
  showNotifications = true,
}) {
  const {
    items: posts,
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
  } = usePosts();

  const displayedPosts = limit ? posts.slice(0, limit) : posts;

  const baseColumns = [
    { key: "id", label: "ID" },
    { key: "title", label: "Title" },
    {
      key: "body",
      label: "Body",
      render: (p) =>
        p.body ? p.body.slice(0, 35) + (p.body.length > 60 ? "…" : "") : "—",
    },
    { key: "userId", label: "User", render: (p) => `User #${p.userId}` },
  ];

  const Actions = (onEdit) => [
    ...baseColumns,
    {
      key: "actions",
      label: "Actions",
      render: (p) => (
        <>
          <button
            className="text-indigo-500 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 transition"
            onClick={() => onEdit(p)}
            title="Edit"
          >
            <FaEdit />
          </button>
          <button
            className="text-orange-500 hover:text-orange-700 dark:text-orange-400 dark:hover:text-orange-300 ml-3 transition"
            onClick={() => remove(p.id)}
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
      title="Posts Dashboard"
      type="posts"
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
          items={displayedPosts}
          columns={showActions ? Actions(onEdit) : baseColumns}
          loading={loading}
          error={error}
        />
      )}
    </DashboardLayout>
  );
}
