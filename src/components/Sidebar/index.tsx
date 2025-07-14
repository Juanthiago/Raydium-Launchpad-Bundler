import Link from "next/link";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "../ui/sidebar";
import { LucideIcon } from "lucide-react";
import { HomeIcon, MessageCircleIcon, SettingsIcon } from "lucide-react";

import { ChevronLeft, ChevronRight } from "lucide-react";

interface SidebarBaseProps {
  collapsed?: boolean;
  onToggleCollapse?: () => void;
}

const SidebarBase = ({
  collapsed = false,
  onToggleCollapse,
}: SidebarBaseProps) => {
  const items = [
    {
      title: "Página Inicial",
      url: "/",
      icon: HomeIcon,
    },
    {
      title: "Conversas",
      url: "/conversations",
      icon: MessageCircleIcon,
    },

    {
      title: "Configurações",
      url: "/settings",
      icon: SettingsIcon,
    },
  ];
  return (
    <SidebarProvider>
      <SidebarContent>
        <div className="flex items-center justify-between p-2 border-b border-gray-200 dark:border-neutral-800">
          <span className="font-bold text-lg">{collapsed ? "Z" : "Zuppo"}</span>
          {onToggleCollapse && (
            <button
              aria-label={collapsed ? "Expandir menu" : "Recolher menu"}
              onClick={onToggleCollapse}
              className="p-1 rounded hover:bg-gray-100 dark:hover:bg-neutral-900 transition-colors"
            >
              {collapsed ? (
                <ChevronRight size={20} />
              ) : (
                <ChevronLeft size={20} />
              )}
            </button>
          )}
        </div>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link
                      className="flex items-center gap-2"
                      href={item.title === "Conversas" ? "/chat" : item.url}
                    >
                      <div className="flex items-center justify-center w-6 h-6">
                        <item.icon className="w-6 h-6" />
                      </div>
                      {!collapsed && <span>{item.title}</span>}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </SidebarProvider>
  );
};

export default SidebarBase;
