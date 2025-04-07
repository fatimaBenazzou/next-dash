import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import React from "react";

const links: NavLinkI[] = [
    {
        title: "Home",
        href: "/",
    },
    {
        title: "Products",
        href: "/products",
    },
    {
        title: "My Orders",
        href: "/my-orders",
    },
];

export default function layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="drawer ">
            <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col">
                <Navbar links={links} />
                <main className="flex-grow">{children}</main>
                <Footer />{" "}
            </div>
            <Sidebar links={links} />
        </div>
    );
}
