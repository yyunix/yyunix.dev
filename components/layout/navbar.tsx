import ThemeToggler from "../shared/theme-toggler";
import Menu from "./menu";
import MenuIcon from "@/assets/menu.svg";

interface NavbarProps {
  toggleSidebar: () => void;
}

const Navbar = ({ toggleSidebar }: NavbarProps) => {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur transition-colors duration-150 border-b border-gray-900/10 dark:border-gray-50/[0.06] bg-white supports-backdrop-blur:bg-white/95 dark:bg-gray-900/75">
      <div className="py-4 px-6 md:px-16 max-w-5xl m-auto relative flex items-center justify-between">
        <nav className="text-sm font-semibold text-fore-secondary">
          <Menu />
        </nav>
        <div className="flex space-x-2">
          <ThemeToggler />
          <button onClick={toggleSidebar} className=" sm:hidden">
            <MenuIcon className="h-6 w-6" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
