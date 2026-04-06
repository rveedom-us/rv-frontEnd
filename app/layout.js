import "@/globals.css";
import { ReduxProvider } from "./_lib/store/ReduxProvider";
import QueryProvider from "@/_lib/QueryProvider";
import { Bounce, ToastContainer } from "react-toastify";

export const metadata = {
  title: "RVEEDOM Flex+ ",
  description:
    "Rent RVs by the night, week, or month. Flexible pricing, no-hassle booking, and delivery options. Your adventure, your way.",
};

export default function Root({ children }) {
  return (
    <html lang="en">
      <body className="bg-[#0a1024]">
        <QueryProvider>
          <ReduxProvider>{children}</ReduxProvider>
        </QueryProvider>
        {/* toast container */}
        <ToastContainer
          className="z-999"
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          transition={Bounce}
        />
      </body>
    </html>
  );
}
