declare interface BaseUserI {
    role: "admin" | "user";
    firstName: string;
    lastName: string;
    email: string;
}

declare interface UserI<ID = string> extends BaseUserI {
    _id: ID;
    createdAt: Date;
    updatedAt: Date;
}
