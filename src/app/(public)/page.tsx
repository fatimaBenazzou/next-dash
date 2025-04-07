// app/page.tsx
import Link from "next/link";
import Image from "next/image";
import { getCategories } from "@/action/server/category";

export default async function Home() {
    const data = await getCategories();
    const categories = data || [];
    return (
        <div className="min-h-screen bg-base-100">
            <section className="container mx-auto my-16 px-4">
                <h2 className="text-3xl font-bold text-center mb-8">Catégories</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {categories.map((category) => (
                        <Link
                            key={category.name}
                            href={category.image as string}
                            className="card bg-base-200 hover:shadow-xl transition-shadow"
                        >
                            <figure className="px-4 pt-4">
                                <Image
                                    src={category.image as string}
                                    alt={category.name}
                                    width={400}
                                    height={300}
                                    className="rounded-lg h-48 object-cover"
                                />
                            </figure>
                            <div className="card-body items-center text-center">
                                <h3 className="card-title">{category.name}</h3>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            <section className="bg-base-200 py-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-8">Produits populaires</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {[
                            {
                                id: 1,
                                name: "Smartphone X",
                                price: 499.99,
                                image: "/images/smartphone.jpg",
                                href: "/products/1",
                            },
                            {
                                id: 2,
                                name: "Laptop Pro",
                                price: 1299.99,
                                image: "/images/laptop.jpg",
                                href: "/products/2",
                            },
                            {
                                id: 3,
                                name: "Casque Audio",
                                price: 199.99,
                                image: "/images/headphones.jpg",
                                href: "/products/3",
                            },
                            {
                                id: 4,
                                name: "Montre Connectée",
                                price: 299.99,
                                image: "/images/smartwatch.jpg",
                                href: "/products/4",
                            },
                        ].map((product) => (
                            <Link
                                key={product.id}
                                href={product.href}
                                className="card bg-base-100 hover:shadow-xl transition-shadow"
                            >
                                <figure className="px-4 pt-4">
                                    <Image
                                        src={product.image}
                                        alt={product.name}
                                        width={300}
                                        height={200}
                                        className="rounded-lg h-48 object-cover"
                                    />
                                </figure>
                                <div className="card-body">
                                    <h3 className="card-title">{product.name}</h3>
                                    <p className="text-lg font-bold">${product.price.toFixed(2)}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            <section className="container mx-auto my-16 px-4">
                <h2 className="text-3xl font-bold text-center mb-8">Ce que disent nos clients</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[
                        {
                            name: "Alice",
                            comment:
                                "J'ai adoré mon expérience d'achat ! Les produits sont de haute qualité et la livraison était rapide.",
                            image: "/images/user1.jpg",
                        },
                        {
                            name: "Bob",
                            comment:
                                "Excellent service client et des prix très compétitifs. Je recommande vivement !",
                            image: "/images/user2.jpg",
                        },
                        {
                            name: "Charlie",
                            comment:
                                "Le site est facile à utiliser et les produits sont exactement comme décrits. Très satisfait !",
                            image: "/images/user3.jpg",
                        },
                    ].map((testimonial, index) => (
                        <div key={index} className="card bg-base-200 p-6">
                            <div className="flex items-center mb-4">
                                <Image
                                    src={testimonial.image}
                                    alt={testimonial.name}
                                    width={50}
                                    height={50}
                                    className="rounded-full"
                                />
                                <h3 className="text-xl font-bold ml-4">{testimonial.name}</h3>
                            </div>
                            <p className="text-base">{testimonial.comment}</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
