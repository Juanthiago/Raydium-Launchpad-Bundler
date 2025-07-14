"use client";
import React, { ReactNode, useState } from "react";
import SidebarBase from "../Sidebar";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex h-screen w-screen bg-gray-50 dark:bg-neutral-900 overflow-hidden">
      <aside
        className={`transition-all duration-200 border-r border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-950
          ${collapsed ? "w-16" : "w-64"} h-full flex flex-col`}
      >
        <SidebarBase
          collapsed={collapsed}
          onToggleCollapse={() => setCollapsed((v) => !v)}
        />
      </aside>
      <main className="flex-1 h-full overflow-y-auto p-0 md:p-8">
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
