import { Document, Model, Schema, Types, model, models } from "mongoose";
import bcrypt from "bcrypt";
interface UserD extends Document<Types.ObjectId>, BaseUserI {
    password: string;
    comparePassword: (candidatePassword: string) => Promise<boolean>;
    toBaseUser: () => BaseUserI;
    toUser: () => UserI;
}

const userSchema: Schema = new Schema<UserD>(
    {
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        role: { type: String, enum: ["admin", "user"], default: "user" },
    },
    {
        timestamps: true,
    }
);

userSchema.pre<UserD>("save", async function (next) {
    try {
        if (this.isNew || this.isModified("password")) {
            this.password = await bcrypt.hash(this.password, 10);
        }
        next();
    } catch (err) {
        next(err as Error);
    }
});

userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
    return await bcrypt.compare(candidatePassword, this.password);
};
userSchema.methods.toBaseUser = function (): BaseUserI {
    return {
        email: this.email,
        firstName: this.firstName,
        lastName: this.lastName,
        role: this.role,
    };
};
userSchema.methods.toUser = function (): UserI {
    return {
        ...this.toBaseUser(),
        _id: this._id.toString(),
        createdAt: this.createdAt.toString(),
        updatedAt: this.updatedAt.toString(),
    };
};

const UserModel = (models["User"] || model<UserD>("User", userSchema)) as Model<UserD>;
export default UserModel;
