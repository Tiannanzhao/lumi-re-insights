import {
  LayoutDashboard,
  ShoppingBag,
  BarChart3,
  Users,
  Globe,
  TrendingUp,
  Settings } from
"lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem } from
"@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";

const mainNav = [
{ title: "Overview", url: "/", icon: LayoutDashboard },
{ title: "Products", url: "/products", icon: ShoppingBag },
{ title: "Sales", url: "/sales", icon: BarChart3 },
{ title: "Customers", url: "/customers", icon: Users },
{ title: "Channels", url: "/channels", icon: Globe },
{ title: "Performance", url: "/performance", icon: TrendingUp }];


const bottomNav = [
{ title: "Settings", url: "/settings", icon: Settings }];


export function AppSidebar() {
  const location = useLocation();
  const currentPath = location.pathname;
  const isActive = (path: string) => currentPath === path;

  return (
    <Sidebar className="border-r border-border bg-background w-[240px]" collapsible="icon">
      <div className="px-6 py-6">
        <h1 className="font-bold text-primary tracking-tight text-lg font-sans">
          LUMIÈRE
        </h1>
        <p className="label-caps mt-1 text-muted-foreground">Analytics</p>
      </div>
      <Separator />
      <SidebarContent className="px-3 py-4">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNav.map((item) =>
              <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                  asChild
                  isActive={isActive(item.url)}
                  className="h-10 rounded-lg px-3 text-sm font-medium transition-colors">
                  
                    <NavLink
                    to={item.url}
                    end
                    className="text-muted-foreground hover:text-foreground hover:bg-surface"
                    activeClassName="bg-brand-light text-primary font-semibold">
                    
                      <item.icon className="mr-3 h-4 w-4 text-primary" />
                      <span className="text-sidebar-foreground">{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <div className="mt-auto pt-4">
          <Separator className="mb-4" />
          <SidebarMenu>
            {bottomNav.map((item) =>
            <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                asChild
                className="h-10 rounded-lg px-3 text-sm font-medium">
                
                  <NavLink
                  to={item.url}
                  end
                  className="text-muted-foreground hover:text-foreground hover:bg-surface"
                  activeClassName="bg-brand-light text-primary font-semibold">
                  
                    <item.icon className="mr-3 h-4 w-4" />
                    <span>{item.title}</span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )}
          </SidebarMenu>
        </div>
      </SidebarContent>
    </Sidebar>);

}