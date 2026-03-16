import {
  LayoutDashboard,
  ShoppingBag,
  BarChart3,
  Users,
  Globe,
  TrendingUp,
  Settings,
  Sparkles,
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const mainNav = [
  { title: "Overview", url: "/", icon: LayoutDashboard },
  { title: "Products", url: "/products", icon: ShoppingBag },
  { title: "Sales", url: "/sales", icon: BarChart3 },
  { title: "Customers", url: "/customers", icon: Users },
  { title: "Channels", url: "/channels", icon: Globe },
  { title: "Performance", url: "/performance", icon: TrendingUp },
];

const bottomNav = [
  { title: "Settings", url: "/settings", icon: Settings },
];

interface AppSidebarProps {
  onToggleSidekick?: () => void;
  sidekickOpen?: boolean;
}

export function AppSidebar({ onToggleSidekick, sidekickOpen }: AppSidebarProps) {
  const location = useLocation();
  const currentPath = location.pathname;
  const isActive = (path: string) => currentPath === path;
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  return (
    <Sidebar className="border-r border-border bg-background" collapsible="icon">
      <div className={collapsed ? "flex justify-center py-4" : "px-6 py-6"}>
        {collapsed ? (
          <span className="font-bold text-primary text-base">L</span>
        ) : (
          <>
            <h1 className="font-bold text-primary tracking-tight text-lg font-sans">
              LUMIÈRE
            </h1>
            <p className="label-caps mt-1 text-muted-foreground">Analytics</p>
          </>
        )}
      </div>
      <Separator />
      <SidebarContent className={collapsed ? "px-1 py-4" : "px-3 py-4"}>
        <SidebarGroup>
          <SidebarGroupContent>
            <TooltipProvider delayDuration={0}>
              <SidebarMenu>
                {mainNav.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <SidebarMenuButton
                          asChild
                          isActive={isActive(item.url)}
                          className={`h-10 rounded-lg text-sm font-medium transition-colors ${collapsed ? "px-0 justify-center" : "px-3"}`}
                        >
                          <NavLink
                            to={item.url}
                            end
                            className="text-muted-foreground hover:text-foreground hover:bg-surface"
                            activeClassName="bg-brand-light text-primary font-semibold"
                          >
                            <item.icon className={`h-4 w-4 text-primary ${collapsed ? "" : "mr-3"}`} />
                            {!collapsed && <span className="text-sidebar-foreground">{item.title}</span>}
                          </NavLink>
                        </SidebarMenuButton>
                      </TooltipTrigger>
                      {collapsed && (
                        <TooltipContent side="right">
                          {item.title}
                        </TooltipContent>
                      )}
                    </Tooltip>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </TooltipProvider>
          </SidebarGroupContent>
        </SidebarGroup>

        <div className="mt-auto pt-4">
          <Separator className="mb-4" />
          <TooltipProvider delayDuration={0}>
            <SidebarMenu>
              {bottomNav.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <SidebarMenuButton
                        asChild
                        className={`h-10 rounded-lg text-sm font-medium ${collapsed ? "px-0 justify-center" : "px-3"}`}
                      >
                        <NavLink
                          to={item.url}
                          end
                          className="text-muted-foreground hover:text-foreground hover:bg-surface"
                          activeClassName="bg-brand-light text-primary font-semibold"
                        >
                          <item.icon className={`h-4 w-4 ${collapsed ? "" : "mr-3"}`} />
                          {!collapsed && <span>{item.title}</span>}
                        </NavLink>
                      </SidebarMenuButton>
                    </TooltipTrigger>
                    {collapsed && (
                      <TooltipContent side="right">
                        {item.title}
                      </TooltipContent>
                    )}
                  </Tooltip>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </TooltipProvider>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
