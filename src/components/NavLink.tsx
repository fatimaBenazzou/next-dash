"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLink({ href, title }: NavLinkI) {
    const pathname = usePathname();
    const isActive = pathname === href;

    return (
        <li>
            <Link
                href={href}
                className={`btn btn-ghost w-full justify-start ${
                    isActive ? "bg-primary text-white" : ""
                }`}
            >
                {title}
            </Link>
        </li>
    );
}
