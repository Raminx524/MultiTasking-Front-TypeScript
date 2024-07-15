import React from "react";
import { Link } from "react-router-dom";
import { useUserContext } from "../contexts/auth.context";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider";

function Navbar() {
  const { user, logout } = useUserContext();
  const { setTheme } = useTheme();
  function toggleUserLink() {
    if (!user) {
      return (
        <>
          <Link
            to="/login"
            className="border-b border-transparent hover:border-current"
          >
            Log In
          </Link>
          <Link
            to="/register"
            className="border-b border-transparent hover:border-current"
          >
            Register
          </Link>
        </>
      );
    }
    return (
      <DropdownMenu>
        <DropdownMenuTrigger className="border-b rounded-full bg-secondary-foreground text-primary font-bold w-9 h-9 text-center border-transparent hover:border-current">
          {user.username.charAt(0).toUpperCase()}
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={logout}
            className="bg-red-600 text-white hover:bg-red-700"
          >
            Sign Out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }
  return (
    <nav className="px-1 py-3 text-xs shadow-sm bg-primary md:text-base lg:text-lg">
      <div className="flex justify-between max-w-7xl m-auto items-center">
        <Link to="/" className="font-semibold">
          MultiTasking
        </Link>
        <div className="flex gap-4 items-center">
          <Link
            to="/task"
            className=" border-b border-transparent hover:border-current"
          >
            Tasks
          </Link>
          <Link
            to="/about"
            className="border-b border-transparent hover:border-current"
          >
            About
          </Link>
          <Link
            to="/contact"
            className="border-b border-transparent hover:border-current"
          >
            Contact Us
          </Link>

          {toggleUserLink()}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="rounded-full">
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme("light")}>
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
