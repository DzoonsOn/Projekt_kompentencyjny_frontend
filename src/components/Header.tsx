"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import MenuHamburgerSVG from "../public/menu";
import EyeSVG from "../public/EyeSVG";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const navigate = (path: string) => {
    router.push(path);
    setMenuOpen(false);
  };

  const getNavItemClass = (path: string) =>
    `px-4 py-2 rounded-2xl transition-colors text-lg lg:text-2xl ${
      pathname === path
        ? "bg-white/90 text-[#99ccff] font-semibold"
        : "hover:bg-[rgba(65,105,225,0.3)]"
    }`;

  return (
    <header
      className="w-full text-white shadow-md "
      style={{ backgroundColor: "#99ccff" }}
    >
      <div className="flex items-center justify-between px-6 py-5 md:px-10">
        {/* Logo przekierowujące do strony głównej */}
        <button
          onClick={() => navigate("/")}
          className="flex items-center space-x-3 cursor-pointer"
        >
          <EyeSVG className="w-8 h-8" />
          <span className="lg:text-3xl font-extrabold hidden sm:inline">
            ProductFinder
          </span>
        </button>

        {/* Nawigacja + menu */}
        <div className="flex items-center space-x-3">
          {/* Nawigacja desktop */}
          <nav className="hidden md:flex space-x-4">
            <button
              onClick={() => navigate("/categories")}
              className={getNavItemClass("/categories")}
            >
              Kategorie
            </button>
            <button
              onClick={() => navigate("/products")}
              className={getNavItemClass("/products")}
            >
              Produkty
            </button>
            <button
              onClick={() => navigate("/contact")}
              className={getNavItemClass("/contact")}
            >
              Kontakt
            </button>
          </nav>

          {/* Przycisk mobilny */}
          <button
            className="border border-white p-2 rounded-xl md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <MenuHamburgerSVG />
          </button>
        </div>
      </div>

      {/* Nawigacja mobilna */}
      {menuOpen && (
        <div className="md:hidden flex flex-col items-end bg-[#99ccff] text-white shadow-inner rounded-b-2xl transition-all duration-300">
          <button
            onClick={() => navigate("/categories")}
            className="w-full text-right px-4 py-3 text-lg hover:bg-[rgba(65,105,225,0.3)] transition-colors"
          >
            Kategorie
          </button>
          <button
            onClick={() => navigate("/products")}
            className="w-full text-right px-4 py-3 text-lg hover:bg-[rgba(65,105,225,0.3)] transition-colors"
          >
            Produkty
          </button>
          <button
            onClick={() => navigate("/contact")}
            className="w-full text-right px-4 py-3 text-lg hover:bg-[rgba(65,105,225,0.3)] transition-colors"
          >
            Kontakt
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
