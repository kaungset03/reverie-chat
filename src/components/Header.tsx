import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";

const Header = () => {
  const { state } = useSidebar();
  return (
    <div className="flex items-center justify-between border-b px-4 py-3">
      {state === "collapsed" && <SidebarTrigger className="mr-2" />}
      <h1 className="text-xl font-semibold">Chat Assistant</h1>
      <div className="w-8">{/* Empty div for balanced spacing */}</div>
    </div>
  );
};
export default Header;
