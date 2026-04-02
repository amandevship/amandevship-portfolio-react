import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  User, 
  Briefcase, 
  Code, 
  FolderOpen, 
  GraduationCap, 
  Image, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  Bell,
  Search
} from 'lucide-react';
import { cn } from '../../../lib/utils';
import type { User as UserType } from '../../../types/auth';

interface AdminLayoutProps {
  children: React.ReactNode;
  user: UserType;
  onLogout: () => void;
}

interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
  href: string;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  children,
  user,
  onLogout,
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('dashboard');

  const navItems: NavItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
    { id: 'personal', label: 'Personal Info', icon: User, href: '/personal' },
    { id: 'experience', label: 'Experience', icon: Briefcase, href: '/experience' },
    { id: 'skills', label: 'Skills', icon: Code, href: '/skills' },
    { id: 'projects', label: 'Projects', icon: FolderOpen, href: '/projects' },
    { id: 'education', label: 'Education', icon: GraduationCap, href: '/education' },
    { id: 'media', label: 'Media Library', icon: Image, href: '/media' },
    { id: 'settings', label: 'Settings', icon: Settings, href: '/settings' },
  ];

  const handleNavClick = (itemId: string) => {
    setActiveSection(itemId);
    setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-space-darker">
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-space-dark border-r border-neon-cyan/20 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-neon-cyan/20">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-neon-cyan to-flame rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">A</span>
            </div>
            <span className="text-text-primary font-semibold">Admin Portal</span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-text-secondary hover:text-text-primary"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={cn(
                "w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all",
                activeSection === item.id
                  ? "bg-neon-cyan/10 text-neon-cyan border-l-2 border-neon-cyan"
                  : "text-text-secondary hover:text-text-primary hover:bg-space-card/50"
              )}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-neon-cyan/20">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-r from-neon-cyan to-flame rounded-full flex items-center justify-center">
              <span className="text-white font-semibold">
                {user.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="flex-1">
              <p className="text-text-primary font-medium text-sm">{user.name}</p>
              <p className="text-text-secondary text-xs">{user.email}</p>
            </div>
          </div>
          <button
            onClick={onLogout}
            className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-space-card/50 border border-neon-cyan/20 rounded-lg text-text-secondary hover:text-text-primary hover:bg-space-card transition-all"
          >
            <LogOut className="w-4 h-4" />
            <span className="text-sm font-medium">Logout</span>
          </button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Header */}
        <header className="sticky top-0 z-30 bg-space-dark/80 backdrop-blur-xl border-b border-neon-cyan/20">
          <div className="flex items-center justify-between h-16 px-6">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden text-text-secondary hover:text-text-primary"
              >
                <Menu className="w-6 h-6" />
              </button>
              
              {/* Search Bar */}
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-64 pl-10 pr-4 py-2 bg-space-card/50 border border-neon-cyan/20 rounded-lg text-text-primary placeholder-text-secondary focus:outline-none focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan"
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <button className="relative p-2 text-text-secondary hover:text-text-primary">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-flame rounded-full"></span>
              </button>

              {/* User Menu */}
              <div className="flex items-center space-x-3">
                <div className="hidden md:block text-right">
                  <p className="text-text-primary text-sm font-medium">{user.name}</p>
                  <p className="text-text-secondary text-xs capitalize">{user.role}</p>
                </div>
                <div className="w-8 h-8 bg-gradient-to-r from-neon-cyan to-flame rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
};
