import Link from "next/link";
import CartDropdown from "./DropDowns/CartDropDown";
import ProfileDropdown from "./DropDowns/ProfileDropDown";
import { getSession } from "@/lib/auth";
import ThemeToggle from "./ThemeToggle";

export default async function Navbar({ links }: { links: NavLinkI[] }) {
    const session = await getSession();
    const isAdmin = session?.role === "admin";

    return (
        <nav className="navbar bg-base-100 shadow-md ">
            <div className="flex-none lg:hidden">
                <label
                    htmlFor="my-drawer-3"
                    aria-label="open sidebar"
                    className="btn btn-square btn-ghost"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        className="inline-block h-6 w-6 stroke-current"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 6h16M4 12h16M4 18h16"
                        ></path>
                    </svg>
                </label>
            </div>
            <div className="flex w-full justify-between items-center">
                <Link href="/" className="text-xl font-bold">
                    My E-Commerce
                </Link>
                <div className="hidden flex-none lg:block">
                    <ul className="menu menu-horizontal">
                        {links.map((link) => {
                            if ((!session || isAdmin) && link.href === "/my-orders") {
                                return null;
                            }

                            return (
                                <li key={link.title}>
                                    <Link
                                        href={link.href}
                                        className="btn btn-ghost w-full justify-start"
                                    >
                                        {link.title}
                                    </Link>
                                </li>
                            );
                        })}
                        {isAdmin && (
                            <li key={"dashboard"}>
                                <Link
                                    href={"/dashboard"}
                                    className="btn btn-ghost w-full justify-start"
                                >
                                    Dashboard
                                </Link>
                            </li>
                        )}
                    </ul>
                </div>
                <div className="flex space-x-4">
                    {!isAdmin && <CartDropdown />}
                    <ThemeToggle />
                    {session ? (
                        <ProfileDropdown />
                    ) : (
                        <Link className="btn" href={"/auth/login"}>
                            Login
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
}
