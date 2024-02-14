import {
  Image,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/react";
import React from "react";

import { useState } from "react";

export const NAV_LINKS = [
  {
    name: "Inicio",
    href: "#home",
  },
  {
    name: "Funcionamiento",
    href: "#how-it-works",
  },
  {
    name: "Servicios",
    href: "#services",
  },
  {
    name: "Webs",
    href: "#webs",
  },
  {
    name: "Preguntas frecuentes",
    href: "#faq",
  },
  {
    name: "Contacto",
    href: "#contact",
  },
];

export default function NextNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Navbar
      className="items-center h-[90px] sticky top-0 text-white bg-[#1A2530]"
      id="navbar"
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarBrand className="sm:hidden flex-1">
        <a
          href="#home"
          aria-label="Ir al inicio de la pagina tocando la imagen"
        >
          <Image
            src="/brand/horizontal-logo.svg"
            className="w-full h-[90px]"
            alt="Logo horizontal de Teclearla"
            title="Logo horizontal de Teclearla"
          />
        </a>
      </NavbarBrand>

      <NavbarBrand className="flex-1 hidden sm:flex">
        <a
          href="#home"
          aria-label="Ir al inicio de la pagina tocando la imagen"
        >
          <Image
            src="/brand/horizontal-logo.svg"
            alt="Logo horizontal de Teclearla"
            title="Logo horizontal de Teclearla"
            className="h-[60px]"
          />
        </a>
      </NavbarBrand>

      <NavbarContent className="text-white lg:hidden lg:!justify-center">
        <li className="h-full">
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Cerrar menu" : "Abrir menu"}
            className="lg:hidden"
          />
        </li>
      </NavbarContent>

      <NavbarContent className="hidden w-full gap-4 lg:flex items-center md:!justify-between">
        {NAV_LINKS.map((link) => (
          <NavbarItem key={link.name} className="text-lg">
            <a href={link.href} className="hover:underline">
              {link.name}
            </a>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarContent className="hidden lg:flex">
        <li>
          <Link
            className={`cursor-pointer z-10 text-white bg-primary px-8 xl:px-12 py-3 rounded-xl text-md justify-center`}
            href="#contact"
          >
            Quiero mi web
          </Link>
        </li>
      </NavbarContent>

      <NavbarMenu
        className="!top-[80px] !h-[calc(100vh-80px)] gap-4 bg-[#0f1820] pt-4 p-8"
        id="navmenu"
      >
        {NAV_LINKS.map((link) => (
          <NavbarMenuItem key={link.name} className="text-xl">
            <a
              href={link.href}
              className="hover:underline z-90 text-white"
              onClick={() => setIsMenuOpen(false)}
            >
              {link.name}
            </a>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
