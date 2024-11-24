"use client";

import { Avatar, DropdownMenu, Text } from "@radix-ui/themes";
import classNames from "classnames";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiFillBug } from "react-icons/ai";
import { Skeleton } from "@/app/components";

const Navbar = () => {
  return (
    <header className="bg-gray-800 text-white p-4 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <div className="logo">
          <Link href="/">
            <AiFillBug size={25} />
          </Link>
        </div>
        <nav className="flex space-x-4">
          <NavLinks />
        </nav>
      </div>
      <div>
        <AuthStatus />
      </div>
    </header>
  );
};

const NavLinks = () => {
  const currentPath = usePathname();
  const links = [
    {
      label: "Dashboard",
      href: "/",
    },
    {
      label: "Issues",
      href: "/issues/list",
    },
  ];

  return (
    <>
      {links.map((link) => (
        <Link
          href={link.href}
          key={link.href}
          className={classNames({
            "nav-link": true,
            "!text-gray-400": link.href === currentPath,
          })}
        >
          {link.label}
        </Link>
      ))}
    </>
  );
};

const AuthStatus = () => {
  const { status, data: session } = useSession();

  if (status === "loading") {
    return <Skeleton width="3rem" />;
  }

  if (status === "unauthenticated") {
    return (
      <Link href="/api/auth/signin" className="nav-link">
        Login
      </Link>
    );
  }

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Avatar
          src={session!.user!.image!}
          fallback={"?"}
          size={"2"}
          radius="full"
          className="cursor-pointer"
          referrerPolicy="no-referrer"
        />
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Label>
          <Text size={"2"}>{session!.user!.email}</Text>
        </DropdownMenu.Label>
        <DropdownMenu.Item>
          <Link href="/api/auth/signout">Logout</Link>
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};

export default Navbar;
