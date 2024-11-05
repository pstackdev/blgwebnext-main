import { Blog, User } from "@prisma/client";

export type SafeUser = Omit<User, 
"createdAt" | "updateAt" | "emailVerified"
> & {
  createdAt: string | Date;
  updatedAt: string | Date;
  emailVerified: string | null;
};

export type SafeBlogs = Omit<Blog, "createdAt"> & {
  createdAt: string | Date;
  authorName?: string; // Add authorName as an optional property
};
