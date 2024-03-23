"use client";
import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem } from "@/components/ui/Navbar-menu";
import { cn } from "@/utils/cn";
export function NavBarPage({ className }: { className?: string }) {
    const [active, setActive] = useState<string | null>(null);
    return (
      <div
        className={cn("fixed top-2 inset-x-0 max-w-2xl gap-7 mx-auto z-50 ", className)}
      >
        <Menu setActive={setActive}>
        <HoveredLink href="/">
          <MenuItem setActive={setActive} active={null} item="Home">
          </MenuItem>
          </HoveredLink>
          <MenuItem setActive={setActive} active={active} item="Services">
            <div className="flex flex-col space-y-4 text-sm">
              <HoveredLink href="/Register">Register</HoveredLink>
              <HoveredLink href="/RegisterUsers">Registered users</HoveredLink>
            </div>
          </MenuItem>
        </Menu>
      </div>
    );
  }
