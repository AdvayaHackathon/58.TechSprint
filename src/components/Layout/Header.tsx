
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { 
  ChevronDown, 
  LogOut, 
  Menu, 
  User, 
  BarChart4, 
  Home, 
  FileText 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

export function Header() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const navItems = [
    { name: "Home", path: "/", icon: Home },
    { name: "Dashboard", path: "/dashboard", icon: BarChart4, authRequired: true },
    { name: "Grading", path: "/grading", icon: FileText, authRequired: true },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-background/95 backdrop-blur-sm border-b">
      <div className="container flex h-16 items-center justify-between py-4">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2">
            <span className="h-8 w-8 rounded-full bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center text-white font-bold">
              GG
            </span>
            <span className="font-bold text-lg hidden md:inline-block">Grade Genius</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => 
              (!item.authRequired || isAuthenticated) && (
                <Link
                  key={item.path}
                  to={item.path}
                  className="text-sm font-medium transition-colors hover:text-primary flex items-center gap-1"
                >
                  <item.icon className="h-4 w-4" />
                  {item.name}
                </Link>
              )
            )}
          </nav>
        </div>

        <div className="flex items-center gap-2">
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground">
                    <User className="h-4 w-4" />
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user?.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user?.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate("/dashboard")}>
                  <BarChart4 className="mr-2 h-4 w-4" />
                  <span>Dashboard</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/grading")}>
                  <FileText className="mr-2 h-4 w-4" />
                  <span>Grading</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => navigate("/login")}
              >
                Log in
              </Button>
              <Button 
                size="sm" 
                onClick={() => navigate("/register")}
              >
                Sign up
              </Button>
            </div>
          )}

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="flex flex-col gap-4 mt-8">
                {navItems.map((item) => 
                  (!item.authRequired || isAuthenticated) && (
                    <Link
                      key={item.path}
                      to={item.path}
                      className="flex items-center gap-2 py-2 text-lg hover:text-primary transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      <item.icon className="h-5 w-5" />
                      {item.name}
                    </Link>
                  )
                )}
                
                {isAuthenticated ? (
                  <Button 
                    variant="outline" 
                    className="mt-4 w-full justify-start" 
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                  >
                    <LogOut className="mr-2 h-5 w-5" />
                    Log out
                  </Button>
                ) : (
                  <div className="flex flex-col gap-2 mt-4">
                    <Button 
                      onClick={() => {
                        navigate("/login");
                        setIsOpen(false);
                      }}
                    >
                      Log in
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => {
                        navigate("/register");
                        setIsOpen(false);
                      }}
                    >
                      Sign up
                    </Button>
                  </div>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
