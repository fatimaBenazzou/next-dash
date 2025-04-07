// components/Navbar.tsx
import Link from "next/link";
import ProfileDropdown from "./DropDowns/ProfileDropDown";
import ThemeToggle from "./ThemeToggle";

export default function DashNavbar() {
    return (
        <nav className="navbar bg-base-100 shadow-md">
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
            {/* <div className="container mx-auto px-4 py-2 flex justify-between items-center"> */}
            <Link href="/" className="text-xl mx-2 flex-1 px-2 font-bold">
                My E-Commerce
            </Link>
            <ThemeToggle />
            <ProfileDropdown />
        </nav>
    );
}
