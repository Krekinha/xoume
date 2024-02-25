import Sidebar from "./Sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex box-border h-auto w-auto overflow-hidden">
      <Sidebar />
      {children}
    </div>
  );
}
