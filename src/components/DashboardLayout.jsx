// src/components/DashboardLayout.jsx
import { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Notifications from "./Notifications";
import Pagination from "./Pagination";
import FormModal from "./FormModal";
import Loading from "./Loading";

export default function DashboardLayout({
  children,
  title,
  type = "users",
  create,
  update,
  onSearch,
  searchValue = "",
  hideNewButton = false,
  showLayout = true,
  showPagination = true,
  showNotifications = true,
  page,
  total,
  setPage,
  pageSize = 10,
  loading = false,
}) {
  const [editing, setEditing] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  // ✅ Handlers
  const handleEdit =  ((item) => openModal(item));
  const handleNew =  (() => openModal(null));

  const openModal = (item) => {
    setEditing(item);
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);

  const handleSubmit = async (payload) => {
    if (!create || !update) return;
    if (payload.id) {
      await update(payload.id, payload);
    } else {
      await create(payload);
    }
    closeModal();
  };

  const modalTitle = editing ? `Edit ${type}` : `Add ${type}`;
  const content =
    typeof children === "function"
      ? children({ onEdit: handleEdit })
      : children;

  if (!showLayout) return content;

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header
          type={type}
          onNew={!hideNewButton ? handleNew : undefined}
          onSearch={onSearch}
          searchValue={searchValue}
        >
          <h1 className="text-xl md:text-2xl font-bold truncate">{title}</h1>
        </Header>

        <main className="flex-1 overflow-auto px-2 sm:px-4 md:px-6 py-4 sm:py-6 relative">
          {loading ? (
            <div className="absolute inset-0 z-20 flex items-center justify-center bg-white/70 ">
              <Loading />
            </div>
          ) : (
            <>
              {/* Page Content */}
              <div className="w-full max-w-8xl  sm:mt-2 lg:mb-10 mx-auto  lg:mt-0  md:min-h-[calc(100vh-800px)]">
                {content}
              </div>

              {/* Pagination */}
              {showPagination && page != null && total != null && setPage && (
                <div className="mt-4">
                  <Pagination
                    page={page}
                    total={total}
                    pageSize={pageSize}
                    onPageChange={setPage}
                  />
                </div>
              )}
            </>
          )}
        </main>

        {showNotifications && <Notifications />}

        {/* Modal */}
        {create && update && (
          <FormModal
            open={modalOpen}
            onClose={closeModal}
            title={modalTitle}
            type={type}
            initial={editing}
            onSubmit={handleSubmit}
          />
        )}
      </div>
    </div>
  );
}
