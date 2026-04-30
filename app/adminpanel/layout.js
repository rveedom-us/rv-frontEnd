import Header from "@/_ui/admin/Header";
import Sidebar from "@/_ui/admin/Sidebar";

const AdminLayout = ({ children }) => {
  return (
    <div className="flex h-screen w-full bg-slate-950 text-slate-200 overflow-hidden">
      {/* 1. Sidebar: Fixed width on desktop, hidden/drawer on mobile */}
      <aside className="z-50 shrink-0">
        <Sidebar />
      </aside>

      {/* 2. Main Content Wrapper */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        {/* 3. Header: Sticky at the top */}
        <header className="p-4 sm:p-6 pb-2">
          <Header />
        </header>

        {/* 4. Scrollable Body Area */}
        <main className="flex-1 overflow-y-auto px-4 sm:px-6 pb-8 custom-scrollbar">
          <div className="bg-slate-900/40 border border-slate-800/60 rounded-4xl min-h-full p-4 sm:p-6 lg:p-8 backdrop-blur-sm shadow-inner">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
