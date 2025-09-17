import DashboardLayout from "../components/DashboardLayout";
import UsersList from "./UsersList";
import PostsList from "./PostsList";

export default function Dashboard() {
  return (
    <DashboardLayout
      title="Dashboard Overview"
      hideNewButton
      showPagination={false}
      showNotifications={false}
    >
      <div className="p-2">
        <div className="grid gap-10 md:gap-8 md:grid-cols-1">
          {/* Users Section */}
          <section className="w-full">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">
              Latest Users
            </h2>
            <UsersList
              showLayout={false}
              showActions={false}
              showPagination={false}
              showNotifications={false}
            />
          </section>

          {/* Posts Section */}
          <section className="w-full">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">
              Latest Posts
            </h2>
            <PostsList
              showLayout={false}
              showActions={false}
              showPagination={false}
              showNotifications={false}
            />
          </section>
        </div>
      </div>
    </DashboardLayout>
  );
}
