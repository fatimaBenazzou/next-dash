// types/order.ts
// types/province.ts
declare interface ProvinceI {
    id: number;
    name: {
        en: string;
        ar: string;
    };
    price: number;
}

declare interface Delivery {
    province: number;
    city: string;
    address?: string;
    phone: string;
}

declare interface BaseOrderI<USER = string, PRODUCT = USER> {
    cart: { product: PRODUCT; quantity: number }[]; // Utiliser l'USER du produit
    userId: USER;
    delivery: DeliveryI;
    total: number;
    status: "pending" | "confirmed" | "shipped" | "delivered" | "cancelled" | "returned";
}

declare interface OrderI<ID = string, USER = ID, PRODUCT = ID> extends BaseOrderI<USER, PRODUCT> {
    _id: ID;
    createdAt: Date;
    updatedAt: Date;
}
