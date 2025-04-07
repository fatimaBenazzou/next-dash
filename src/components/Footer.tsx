// components/Footer.tsx
export default function Footer() {
    return (
        <footer className="bg-base-100 shadow-md mt-auto">
            <div className="container mx-auto px-4 py-4 text-center">
                <p className="text-sm">
                    &copy; {new Date().getFullYear()} My E-Commerce. All rights reserved.
                </p>
            </div>
        </footer>
    );
}
