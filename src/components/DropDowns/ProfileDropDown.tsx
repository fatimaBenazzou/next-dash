import Image from "next/image";
import Link from "next/link";
import LogoutButton from "../LogoutButton";

export default function ProfileDropdown() {
    return (
        <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                    <Image width={300} height={300} src="https://placehold.co/100" alt="Profile" />
                </div>
            </label>
            <ul
                tabIndex={0}
                className="mt-3 p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
            >
                <li>
                    <Link href="/profile">Profile</Link>
                </li>
                <li>
                    <LogoutButton />
                </li>
            </ul>
        </div>
    );
}
