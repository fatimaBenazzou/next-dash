// components/Sidebar.tsx

import Link from "next/link";
import LogoutButton from "./LogoutButton";
import { getSession } from "@/lib/auth";
import NavLink from "./NavLink";

export default async function Sidebar({ links }: { links: NavLinkI[] }) {
    const session = await getSession();
    return (
        <aside className="drawer-side">
            <label
                htmlFor="my-drawer-3"
                aria-label="close sidebar"
                className="drawer-overlay"
            ></label>

            <ul className="menu bg-base-200 min-h-full w-80 p-4">
                {links.map((link, i) => (
                    <NavLink key={i + link.title} {...link} />
                ))}
                <li>
                    {session ? (
                        <LogoutButton />
                    ) : (
                        <Link className="btn" href={"/auth/login"}></Link>
                    )}
                </li>
            </ul>
        </aside>
    );
}
