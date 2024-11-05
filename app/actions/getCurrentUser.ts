import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import prisma from '../lib/prismadb';
import { SafeUser } from "@/types/type";

export async function getSession() {
    return await getServerSession(authOptions);
}

export default async function getCurrentUser() {
    try {
        const session = await getSession();

        if (!session?.user?.email) {
            return null;
        }

        const currentUser = await prisma.user.findUnique({
            where: {
                email: session.user.email as string,
            },
        });

        if (!currentUser) {
            return null;
        }

        return {
            ...currentUser,
            // Return createdAt and updatedAt as Date objects
            createdAt: currentUser.createdAt, // No conversion to string
            updatedAt: currentUser.updatedAt, // No conversion to string
            emailVerified: currentUser.emailVerified || null, // Keep as Date or null
        } as SafeUser; // Cast to SafeUser type if needed
    } catch {
        return null;
    }
}
