interface CategoryI {
    _id?: string;
    name: string;
    slug: string;
    description?: string;
    image?: string;
    parentCategory?: string | CategoryI;
    isActive?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}
