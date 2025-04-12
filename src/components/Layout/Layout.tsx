
import { ReactNode } from "react";
import { Header } from "./Header";
import { useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const isAuthPage = location.pathname === "/login" || location.pathname === "/register";

  return (
    <div className="flex min-h-screen flex-col">
      {!isAuthPage && <Header />}
      <main className={cn(
        "flex-1",
        isAuthPage && "flex items-center justify-center p-4"
      )}>
        {children}
      </main>
      {!isAuthPage && (
        <footer className="py-6 border-t">
          <div className="container flex flex-col items-center justify-center gap-2 text-center">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} Grade Genius. All rights reserved.
            </p>
          </div>
        </footer>
      )}
    </div>
  );
}
