import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Brain, LayoutDashboard, FileQuestion, BarChart3, BookOpen, LogOut, Menu, X, User } from 'lucide-react';
import { useState } from 'react';

const navLinks = [
  { to: '/dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
  { to: '/quiz', label: 'Quiz', icon: <FileQuestion className="w-5 h-5" /> },
  { to: '/analytics', label: 'Analytics', icon: <BarChart3 className="w-5 h-5" /> },
  { to: '/resources', label: 'Resources', icon: <BookOpen className="w-5 h-5" /> },
];

export function DashboardNavbar() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="sticky top-0 z-50 bg-card/95 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/dashboard" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center shadow-md">
              <Brain className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-lg text-foreground hidden sm:block">
              Learning Gap
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  location.pathname === link.to
                    ? 'bg-primary text-primary-foreground shadow-md'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                {link.icon}
                <span>{link.label}</span>
              </Link>
            ))}
          </div>

          {/* User Menu */}
          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-3">
              <img
                src={user?.avatar}
                alt={user?.name}
                className="w-9 h-9 rounded-full border-2 border-primary/20"
              />
              <div className="text-sm">
                <div className="font-semibold text-foreground">{user?.name}</div>
                <div className="text-muted-foreground text-xs">{user?.grade}</div>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={handleLogout} title="Logout">
              <LogOut className="w-5 h-5" />
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border animate-slide-up">
            {/* User Info */}
            <div className="flex items-center gap-3 pb-4 mb-4 border-b border-border">
              <img
                src={user?.avatar}
                alt={user?.name}
                className="w-12 h-12 rounded-full border-2 border-primary/20"
              />
              <div>
                <div className="font-semibold text-foreground">{user?.name}</div>
                <div className="text-muted-foreground text-sm">{user?.grade}</div>
              </div>
            </div>

            {/* Nav Links */}
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all ${
                    location.pathname === link.to
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  {link.icon}
                  <span>{link.label}</span>
                </Link>
              ))}
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 px-4 py-3 rounded-lg font-medium text-destructive hover:bg-destructive/10 transition-colors mt-2"
              >
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
