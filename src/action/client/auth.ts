// actions/client/auth.ts
import { signIn, signOut } from "next-auth/react";
import axiosConfig from "./axiosConfig";

export async function doLogout() {
    await signOut({ redirect: true, callbackUrl: "/" });
}

export async function doCredentialLogin(loginData: { email: string; password: string }) {
    console.log(loginData);
    const response = await signIn("credentials", {
        email: loginData.email,
        password: loginData.password,
        redirect: false,
    });
    console.log(response);
    if (response?.error) {
        throw new Error(response.error);
    }

    return response;
}

export async function register(body: BaseUserI) {
    try {
        const response = await axiosConfig.post("/register", {
            body,
        });
        return response.data;
    } catch (error) {
        throw new Error((error as Error).message);
    }
}
