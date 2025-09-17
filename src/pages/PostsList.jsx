import Table from "../components/Table";
import { usePosts } from "../contexts/PostsContext";
import DashboardLayout from "../components/DashboardLayout";
import { FaEdit, FaTrash } from "react-icons/fa";

export default function PostsList({
  limit, 
  showActions = true,
  showLayout = true,
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
    limit: contextLimit, 
  } = usePosts();

  const displayLimit = limit || contextLimit;
  const displayedPosts = posts.slice(0, displayLimit);

// baseColumns
  const baseColumns = [
    { key: "id", label: "ID" },
    { key: "title", label: "Title" },
    { key: "body", label: "Body", render: (p) => p.body?.slice(0, 35) + (p.body?.length > 60 ? "…" : "") || "—" },
    { key: "userId", label: "User", render: (p) => `User #${p.userId}` },
  ];
// button Actions
  const Actions = (onEdit) => [
    ...baseColumns,
    {
      key: "actions",
      label: "Actions",
      render: (p) => (
        <>
          <button
            onClick={() => onEdit(p)}
            title="Edit"
            className="text-indigo-500 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 transition"
          >
            <FaEdit />
          </button>
          <button
            onClick={() => remove(p.id)}
            title="Delete"
            className="ml-3 text-orange-500 hover:text-orange-700 dark:text-orange-400 dark:hover:text-orange-300 transition"
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
      page={page}
      total={total}
      setPage={setPage}
      searchValue={query}
      onSearch={setQuery}
      showLayout={showLayout}
      loading={loading}
    >
      {({ onEdit }) => (
        <div className="overflow-auto">
          <Table
            items={displayedPosts}
            columns={showActions ? Actions(onEdit) : baseColumns}
            loading={loading}
            error={error}
          />
        </div>
      )}
    </DashboardLayout>
  );
}
