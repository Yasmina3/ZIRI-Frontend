
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { 
  LayoutDashboard, 
  Briefcase, 
  FileText, 
  Settings as SettingsIcon,
  Home,
  Send,
  TrendingUp
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

const navigationItems = [
  {
    title: "Home",
    url: createPageUrl("Landing"),
    icon: Home,
  },
  {
    title: "Dashboard",
    url: createPageUrl("Dashboard"),
    icon: LayoutDashboard,
  },
  {
    title: "Jobs",
    url: createPageUrl("Jobs"),
    icon: Briefcase,
  },
  {
    title: "Applications",
    url: createPageUrl("Applications"),
    icon: Send,
  },
  {
    title: "Settings",
    url: createPageUrl("Settings"),
    icon: SettingsIcon,
  },
];

export default function Layout({ children, currentPageName }) {
  const location = useLocation();
  
  // Don't show sidebar on landing page
  if (currentPageName === "Landing") {
    return <div className="min-h-screen">{children}</div>;
  }

  return (
    <SidebarProvider>
      <style>{`
        :root {
          --sqps-orange: #FF6B35;
          --sqps-orange-light: #FF8C61;
          --sqps-orange-dark: #E5512A;
          --sqps-grey: #6B7280;
          --sqps-grey-light: #F3F4F6;
          --sqps-grey-dark: #374151;
        }
        
        .sqps-accent {
          color: var(--sqps-orange);
        }
        
        .sqps-bg-accent {
          background-color: var(--sqps-orange);
        }
        
        .sqps-border-accent {
          border-color: var(--sqps-orange);
        }
        
        .sqps-hover-accent:hover {
          background-color: var(--sqps-orange-light);
        }
      `}</style>
      
      <div className="min-h-screen flex w-full bg-gray-50">
        <Sidebar className="border-r border-gray-200">
          <SidebarHeader className="border-b border-gray-200 p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 sqps-bg-accent rounded-lg flex items-center justify-center shadow-md">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="font-bold text-gray-900 text-lg">Zivi Agent</h2>
                <p className="text-xs text-gray-500">AI Job Assistant</p>
              </div>
            </div>
          </SidebarHeader>
          
          <SidebarContent className="p-2">
            <SidebarGroup>
              <SidebarGroupLabel className="text-xs font-medium text-gray-500 uppercase tracking-wider px-2 py-2">
                Navigation
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {navigationItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton 
                        asChild 
                        className={`transition-colors duration-200 rounded-lg mb-1 ${
                          location.pathname === item.url 
                            ? 'bg-orange-50 text-orange-600 font-medium' 
                            : 'hover:bg-gray-100 text-gray-700'
                        }`}
                      >
                        <Link to={item.url} className="flex items-center gap-3 px-3 py-2">
                          <item.icon className="w-4 h-4" />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter className="border-t border-gray-200 p-4">
            <div className="text-xs text-gray-500 text-center">
              <p className="font-medium text-gray-700 mb-1">Powered by SQPS</p>
              <p>Compliance & Automation</p>
            </div>
          </SidebarFooter>
        </Sidebar>

        <main className="flex-1 flex flex-col">
          <header className="bg-white border-b border-gray-200 px-6 py-4 md:hidden">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="hover:bg-gray-100 p-2 rounded-lg transition-colors duration-200" />
              <h1 className="text-xl font-semibold">Zivi Agent</h1>
            </div>
          </header>

          <div className="flex-1 overflow-auto">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
