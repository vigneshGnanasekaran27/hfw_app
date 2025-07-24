"use client";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { Menu, X, LogOut, User as UserIcon, ChevronDown, ChefHat, Calendar, ShoppingCart, Dumbbell } from "lucide-react";
import { signOut } from "next-auth/react";

const modules = [
  { id: 'training', label: 'Training', icon: Dumbbell, href: '/dashboard/training' },
  { id: 'kitchen', label: 'Kitchen', icon: ChefHat, href: '/dashboard/kitchen' },
  { id: 'events', label: 'Events', icon: Calendar, href: '/dashboard/events' },
  { id: 'shop', label: 'Shop', icon: ShoppingCart, href: '/dashboard/shop' },
];

function getActiveModule(pathname) {
  // Find the first module whose href is a prefix of the current path
  return modules.find((mod) => pathname.startsWith(mod.href)) || modules[0];
}

function Sidebar({ activeModule, isSidebarOpen, setSidebarOpen }) {
  if (!activeModule) return null;
  const Icon = activeModule.icon;
  return (
    <aside className={`${isSidebarOpen ? 'w-64' : 'w-20'} bg-gray-900 text-white flex flex-col min-h-screen transition-all duration-300 p-4`}>
      <div className="flex justify-between items-center mb-8">
        <h2 className={`${isSidebarOpen ? 'block' : 'hidden'} font-bold text-xl`}>Dashboard</h2>
        <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="p-2 hover:bg-gray-800 rounded">
          {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      <nav className="flex flex-col gap-4">
        <Link
          href={activeModule.href}
          className={`flex items-center gap-3 p-2 rounded transition-colors bg-blue-600`}
        >
          <Icon size={20} />
          <span className={`${isSidebarOpen ? 'inline' : 'hidden'}`}>{activeModule.label}</span>
        </Link>
      </nav>
      <button
        className="mt-auto flex items-center gap-2 p-2 hover:bg-red-800 rounded"
        onClick={() => signOut({ callbackUrl: "/" })}
      >
        <LogOut size={20} />
        <span className={`${isSidebarOpen ? 'inline' : 'hidden'}`}>Logout</span>
      </button>
    </aside>
  );
}

function TopNav({ activeModule, displayName = "User", userImage }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const router = useRouter();
  return (
    <header className="bg-white shadow flex items-center justify-between px-8 py-4 border-b relative">
      <h1 className="text-2xl font-bold text-purple-600">Hopefit Wellness</h1>
      <div className="flex items-center gap-4">
        {userImage ? (
          <img src={userImage} alt={displayName} className="w-10 h-10 rounded-full border object-cover" />
        ) : (
          <UserIcon size={32} className="rounded-full bg-gray-300 p-1" />
        )}
        <span className="font-semibold text-gray-800 text-lg">{displayName}</span>
        <div className="relative">
          <button
            onClick={() => setDropdownOpen((v) => !v)}
            className="bg-blue-600 text-white px-4 py-2 rounded shadow font-medium hover:bg-blue-700 flex items-center gap-2 focus:outline-none"
          >
            <span>Switch Module</span>
            <ChevronDown size={18} />
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow z-10">
              {modules.filter((mod) => mod.id !== activeModule.id).map((mod) => {
                const Icon = mod.icon;
                return (
                  <Link
                    key={mod.id}
                    href={mod.href}
                    className="block w-full text-left px-4 py-2 hover:bg-blue-100 text-gray-800 flex items-center gap-2"
                    onClick={() => setDropdownOpen(false)}
                  >
                    <Icon size={18} />
                    {mod.label}
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default function DashboardLayout({ children }) {
  const pathname = usePathname();
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const activeModule = getActiveModule(pathname);
  // You can add user info fetching logic here
  const displayName = "User";
  const userImage = undefined;
  useEffect(() => {
    // If user lands on /dashboard, redirect to /dashboard/training
    if (pathname === "/dashboard") {
      window.location.replace("/dashboard/training");
    }
  }, [pathname]);
  // Only render layout if not on /dashboard root
  if (pathname === "/dashboard") return null;
  return (
    <div className="flex min-h-screen">
      <Sidebar activeModule={activeModule} isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="flex-1 flex flex-col">
        <TopNav activeModule={activeModule} displayName={displayName} userImage={userImage} />
        <main className="flex-1 bg-gray-50 p-8 overflow-auto">{children}</main>
      </div>
    </div>
  );
} 