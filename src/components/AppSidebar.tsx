import { 
  BarChart3, 
  Database, 
  Settings, 
  Activity, 
  Wifi, 
  FileText,
  Users,
  AlertTriangle,
  MapPin
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const items = [
  { title: "Dashboard", url: "/", icon: BarChart3 },
  { title: "Data Sources", url: "/data-sources", icon: Database },
  { title: "Real-time", url: "/realtime", icon: Activity },
  { title: "IoT Devices", url: "/devices", icon: Wifi },
  { title: "Route Display", url: "/route-display", icon: MapPin },
  { title: "Reports", url: "/reports", icon: FileText },
  { title: "Alerts", url: "/alerts", icon: AlertTriangle },
  { title: "Users", url: "/users", icon: Users },
  { title: "Settings", url: "/settings", icon: Settings },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => currentPath === path;
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? "text-sidebar-accent-foreground bg-sidebar-accent font-medium"
      : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground";

  return (
    <Sidebar className={isCollapsed ? "w-14" : "w-64"} collapsible="icon">
      <SidebarContent>
        <div className="p-4">
          <div className="flex items-center gap-2">
            <Activity className="h-8 w-8 text-primary" />
            {!isCollapsed && (
              <div>
                <h2 className="text-lg font-bold text-sidebar-foreground">IoT Dashboard</h2>
                <p className="text-xs text-muted-foreground">Data Visualization</p>
              </div>
            )}
          </div>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground">Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} end className={getNavCls}>
                      <item.icon className="h-4 w-4" />
                      {!isCollapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}