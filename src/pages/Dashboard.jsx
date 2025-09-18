// src/pages/Dashboard.jsx
import DashboardLayout from "../components/DashboardLayout";
import UsersList from "./UsersList";
import PostsList from "./PostsList";
import { useUsers } from "../contexts/UsersContext";
import { usePosts } from "../contexts/PostsContext";

export default function Dashboard() {
  const { loading: usersLoading } = useUsers();
  const { loading: postsLoading } = usePosts();

  const isLoading = usersLoading || postsLoading;

  return (
    <DashboardLayout
      title="Dashboard Overview"
      hideNewButton
      showPagination={false}
      showNotifications={false}
      loading={isLoading} 
    >
      <div className="p-4">
        <div className="grid gap-10 md:gap-8 md:grid-cols-1">
          {/* Users Section */}
          <section className="w-full">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">
              Latest Users
            </h2>
            <UsersList showLayout={false} showActions={false} />
          </section>

          {/* Posts Section */}
          <section className="w-full">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">
              Latest Posts
            </h2>
            <PostsList showLayout={false} showActions={false} />
          </section>
        </div>
      </div>
    </DashboardLayout>
  );
}
