declare interface ProductI {
    _id?: string;
    name: string;
    description: string;
    price: {
        current: number;
        original?: number;
    };
    stock: number;
    image?: string;
    createdAt?: Date;
    updatedAt?: Date;
    category: string | CategoryI;
}
