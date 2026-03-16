import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { AiSidekick } from "@/components/AiSidekick";
import { ReportOverlay } from "@/components/ReportOverlay";
import { useSidekick } from "@/contexts/SidekickContext";
import { Bell, Search } from "lucide-react";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { sidekickOpen, setSidekickOpen, toggleSidekick, selectMode } = useSidekick();

  return (
    <SidebarProvider defaultOpen={false}>
      <div className="h-screen flex w-full overflow-hidden">
        <AppSidebar
          onToggleSidekick={toggleSidekick}
          sidekickOpen={sidekickOpen}
        />
        <div className="flex-1 flex flex-col min-w-0 h-screen">
          <header className="h-14 shrink-0 flex items-center justify-between border-b border-border bg-background px-6">
            <div className="flex items-center gap-3">
              <SidebarTrigger className="text-muted-foreground" />
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search analytics..."
                  className="h-9 w-64 rounded-lg border border-border bg-surface pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="label-caps">Last updated: Today, 09:41 AM</span>
              <button className="relative p-2 rounded-lg hover:bg-surface text-muted-foreground transition-colors">
                <Bell className="h-4 w-4" />
                <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-error" />
              </button>
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground text-xs font-semibold">
                JD
              </div>
            </div>
          </header>
          <div className="flex-1 flex min-h-0">
            <main className={`flex-1 p-6 overflow-auto bg-primary-foreground transition-all ${selectMode ? "cursor-crosshair" : ""}`}>
              {children}
            </main>
            <AiSidekick open={sidekickOpen} onClose={() => setSidekickOpen(false)} />
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}
