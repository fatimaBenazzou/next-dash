declare interface CartItem {
    product: ProductI;
    quantity: number;
}

declare interface CartI {
    items: CartItem[];
    total: number;
}
