import Header from "@/_ui/admin/Header";
import Sidebar from "@/_ui/admin/Sidebar";

const publicLayout = ({ children }) => {
  return (
    <div className="bg-slate-800 grid grid-cols-6 grid-rows-10 gap-4 h-lvh mx-auto w-full text-white">
      <Sidebar />
      <Header />
      <div className="bg-slate-900 rounded-4xl col-span-6 row-span-9 col-start-2 row-start-2">
        {children}
      </div>
    </div>
  );
};

export default publicLayout;
