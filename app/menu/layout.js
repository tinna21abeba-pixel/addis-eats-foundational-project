import MenuSidebar from "./MenuSidebar";

export default function MenuLayout({ children }) {
  return (
    <div className="flex flex-col md:flex-row min-h-[calc(100vh-130px)] bg-[#111111]">
      <MenuSidebar />
      <div className="flex-1 p-6 md:p-10 max-w-6xl mx-auto w-full">
        {children}
      </div>
    </div>
  );
}