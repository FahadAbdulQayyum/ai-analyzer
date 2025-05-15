import { useState } from "react";
import LogoComponent from "../Logo";
import Button from "@/app/Screen/Button";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useRouter } from "next/navigation";
import Loader from "../Loader";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

interface SidebarProps {
  onTabChange: (tab: string) => void; // Function type for tab change
}

const Sidebar: React.FC<SidebarProps> = ({ onTabChange }) => {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State to manage sidebar visibility
  const [loading, setLoader] = useState(false); // State to manage loading state

  const handleLogout = async () => {
    try {
      setLoader(true);
      // Call the logout API route
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        // Clear local storage and reset user info
        localStorage.clear();

        // Redirect to the sign-in page
        router.push("/login");
        setLoader(false);
      } else {
        alert("Failed to log out. Please try again.");
      }
    } catch (err) {
      console.error("Error during logout:", err);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <>
      {!loading ? (
        <span>
          {/* Hamburger Icon for Small Screens */}
          <div className="md:hidden fixed top-4 left-4 z-50">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="text-white p-2 bg-gray-800 rounded-md"
            >
              <Icon icon={isSidebarOpen ? "mdi:close" : "mdi:menu"} fontSize={24} />
            </button>
          </div>

          {/* Sidebar */}
          <div
            className={`bg-gradient-to-b from-gray-800 to-indigo-900 p-4 h-screen w-64 fixed top-0 left-0 transition-transform duration-300 ease-in-out z-40 ${
              isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
            } lg:relative`}
          >
            {/* Logo and Search */}
            <div className="flex flex-col items-center justify-between mb-4 w-full">
              <LogoComponent size={4} />
              <Button
                title="Search for"
                style="border-colorful"
                ic=""
                lic="mdi:search"
                wide={true}
                cntr={false}
              />
            </div>

            {/* Vertical Tabs Navigation (Styled as Buttons) */}
            <Tabs defaultValue="dashboard" className="w-full mt-36">
              <TabsList className="flex flex-col space-y-2 w-full">
                <TabsTrigger
                  value="dashboard"
                  className="w-full text-left px-4 py-2 bg-boxColor text-white rounded hover:bg-gray-600"
                  onClick={() => onTabChange("dashboard")}
                >
                  <span className="flex w-full items-center">
                    <Icon icon="mdi:home" className="mr-2" />
                    <p>Dashboard</p>
                  </span>
                </TabsTrigger>
                <TabsTrigger
                  value="notifications"
                  className="w-full text-left px-4 py-2 bg-boxColor text-white rounded hover:bg-gray-600"
                  onClick={() => onTabChange("notifications")}
                >
                  <span className="flex w-full items-center">
                    <Icon icon="mdi:bell" className="mr-2" />
                    <p>Notifications</p>
                  </span>
                </TabsTrigger>
                <TabsTrigger
                  value="users"
                  className="w-full text-left px-4 py-2 bg-boxColor text-white rounded hover:bg-gray-600"
                  onClick={() => onTabChange("users")}
                >
                  <span className="flex w-full items-center">
                    <Icon icon="mdi:account" className="mr-2" />
                    <p>Users</p>
                  </span>
                </TabsTrigger>
                <TabsTrigger
                  value="posts"
                  className="w-full text-left px-4 py-2 bg-boxColor text-white rounded hover:bg-gray-600"
                  onClick={() => onTabChange("posts")}
                >
                  <span className="flex w-full items-center">
                    <Icon icon="mdi:post" className="mr-2" />
                    <p>Flagged Posts</p>
                  </span>
                </TabsTrigger>
                <TabsTrigger
                  value="ads"
                  className="w-full text-left px-4 py-2 bg-boxColor text-white rounded hover:bg-gray-600"
                  onClick={() => onTabChange("ads")}
                >
                  <span className="flex w-full items-center">
                    <Icon icon="mdi:ads" className="mr-2" />
                    <p>Advertisements</p>
                  </span>
                </TabsTrigger>
                <TabsTrigger
                  value="blogs"
                  className="w-full text-left px-4 py-2 bg-boxColor text-white rounded hover:bg-gray-600"
                  onClick={() => onTabChange("blogs")}
                >
                  <span className="flex w-full items-center">
                    <Icon icon="mdi:checkbook" className="mr-2" />
                    <p>Blogs</p>
                  </span>
                </TabsTrigger>
                <div className="w-full bg-boxColor hover:bg-gray-600 rounded">
                  <TabsTrigger
                    value="logout"
                    className="w-full text-left px-4 py-2 text-white rounded"
                  >
                    {/* Logout Button */}
                    <button
                      className="flex items-center space-x-1 text-start text-white w-full rounded"
                      onClick={handleLogout}
                    >
                      <Icon icon="mdi:logout" />
                      <p>Logout</p>
                    </button>
                  </TabsTrigger>
                </div>
              </TabsList>
            </Tabs>
          </div>

          {/* Main Content Wrapper */}
          <div
            className={`transition-all duration-300 ease-in-out ${
              isSidebarOpen ? "ml-[16rem]" : "ml-0"
            } lg:ml-[16rem] overflow-x-hidden`}
          >
            {/* Overlay for Small Screens */}
            {isSidebarOpen && (
              <div
                className="fixed inset-0 bg-black bg-opacity-50 md:hidden z-30"
                onClick={() => setIsSidebarOpen(false)}
              ></div>
            )}
          </div>
        </span>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default Sidebar;