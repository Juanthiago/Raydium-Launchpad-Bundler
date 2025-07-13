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

const SidebarBase = () => {
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
        <SidebarGroup>
          <SidebarGroupLabel className="text-lg font-semibold">
            Menu
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
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
