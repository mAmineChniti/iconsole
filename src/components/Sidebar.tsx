import { Button } from "@/components/ui/button";

export function Sidebar() {
  return (
    <aside className="h-full w-56 bg-card border-r flex flex-col py-6 px-4 gap-4">
      <div className="font-bold text-xl mb-8 select-none">IConsole</div>
      <nav className="flex flex-col gap-2 flex-1">
        <Button variant="ghost" className="justify-start gap-2 cursor-pointer">
          Dashboard
        </Button>
        <Button variant="ghost" className="justify-start gap-2 cursor-pointer">
          Settings
        </Button>
      </nav>
    </aside>
  );
}
