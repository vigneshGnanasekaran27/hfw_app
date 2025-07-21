'use client';
import { useSession, signIn, signOut } from 'next-auth/react';
import { useEffect, useState, useRef } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

const modules = [
  { name: 'Events', key: 'events' },
  { name: 'Kitchen', key: 'kitchen' },
  { name: 'Shop', key: 'shop' },
  { name: 'Training', key: 'training' },
];

const moduleNav = {
  events: [
    { label: 'All Events', key: 'all-events' },
    { label: 'Shortlisted Events', key: 'shortlisted-events' },
    { label: 'Payments', key: 'payments' },
  ],
  kitchen: [
    { label: 'Recipes', key: 'recipes' },
    { label: 'Inventory', key: 'inventory' },
    { label: 'Orders', key: 'orders' },
  ],
  shop: [
    { label: 'Products', key: 'products' },
    { label: 'Orders', key: 'orders' },
    { label: 'Payments', key: 'payments' },
  ],
  training: [
    { label: 'Courses', key: 'courses' },
    { label: 'Progress', key: 'progress' },
    { label: 'Certificates', key: 'certificates' },
  ],
};

function getDisplayName(user) {
  if (user?.name && user.name.trim() !== '') return user.name;
  if (user?.email) return user.email.split('@')[0];
  return 'User';
}

function ModuleContent({ module, navKey, user }) {
  if (!navKey) return <div><h2 className="text-xl font-bold mb-2 text-purple-800">Select an option from the sidebar.</h2></div>;
  return (
    <div>
      <h2 className="text-xl font-bold mb-2 text-purple-800">{modules.find(m => m.key === module)?.name} - {moduleNav[module].find(n => n.key === navKey)?.label}</h2>
      <p className="text-purple-800">This is the <b>{moduleNav[module].find(n => n.key === navKey)?.label}</b> section of the <b>{modules.find(m => m.key === module)?.name}</b> module.</p>
    </div>
  );
}

export default function Dashboard() {
  const { data: session, status } = useSession();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [selectedModule, setSelectedModule] = useState('events');
  const [selectedNav, setSelectedNav] = useState(moduleNav['events'][0].key);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const initialSyncDone = useRef(false);

  // On initial mount, set selectedModule from query param if present
  useEffect(() => {
    if (!initialSyncDone.current) {
      const moduleParam = searchParams.get('module');
      if (moduleParam && modules.some(m => m.key === moduleParam)) {
        setSelectedModule(moduleParam);
      }
      initialSyncDone.current = true;
    }
    // eslint-disable-next-line
  }, [searchParams]);

  // Update selectedNav when selectedModule changes
  useEffect(() => {
    setSelectedNav(moduleNav[selectedModule][0].key);
    // Only update the URL if the user changed the module via UI
    const moduleParam = searchParams.get('module');
    if (moduleParam !== selectedModule) {
      router.replace(`/dashboard?module=${selectedModule}`);
    }
    // eslint-disable-next-line
  }, [selectedModule]);

  useEffect(() => {
    if (status === 'unauthenticated') {
      signIn();
    }
  }, [status]);

  if (status === 'loading') {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!session) {
    return null;
  }

  const displayName = getDisplayName(session.user);
  const userImage = session.user?.image;

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow flex flex-col h-screen p-6">
        <div>
          <h1 className="text-2xl font-bold mb-8 text-green-800">{modules.find(m => m.key === selectedModule)?.name} Module</h1>
          <nav className="flex flex-col gap-4">
            {moduleNav[selectedModule].map(nav => (
              <button
                key={nav.key}
                onClick={() => setSelectedNav(nav.key)}
                className={`text-left px-4 py-2 rounded transition font-medium ${selectedNav === nav.key ? 'bg-blue-600 text-white' : 'hover:bg-blue-100 text-gray-800'}`}
              >
                {nav.label}
              </button>
            ))}
          </nav>
        </div>
        <div className="flex-1" />
        <button
          onClick={() => signOut({ callbackUrl: '/' })}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded font-medium w-full"
        >
          Logout
        </button>
      </aside>
      {/* Main Content */}
      <main className="flex-1 p-10 flex flex-col items-center justify-center relative w-full">
        {/* User info and Switch Module Dropdown */}
        <div className="absolute top-6 right-10 flex items-center gap-4">
          {userImage && (
            <img
              src={userImage}
              alt={displayName}
              className="w-10 h-10 rounded-full border object-cover"
            />
          )}
          <span className="font-semibold text-gray-800 text-lg">{displayName}</span>
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(v => !v)}
              className="bg-blue-600 text-white px-4 py-2 rounded shadow font-medium hover:bg-blue-700 focus:outline-none"
            >
              Switch Module
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow z-10">
                {modules.filter(m => m.key !== selectedModule).map(mod => (
                  <button
                    key={mod.key}
                    onClick={() => {
                      setSelectedModule(mod.key);
                      setDropdownOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 hover:bg-blue-100 text-gray-800"
                  >
                    {mod.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
        {/* Welcome message */}
        <div className="mb-8 w-full text-center">
          <h2 className="text-2xl font-semibold text-gray-800">Welcome, {displayName}!</h2>
        </div>
        <ModuleContent module={selectedModule} navKey={selectedNav} user={displayName} />
      </main>
    </div>
  );
} 