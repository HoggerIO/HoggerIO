// prismaClient.ts
import { PrismaClient } from "@prisma/client";

declare global {
  // Allow global 'var' declarations
  // @ts-ignore
  var prisma: PrismaClient | undefined;
}

// @ts-ignore
export const prisma = global.prisma || new PrismaClient({ log: ["query"] });

// @ts-ignore
if (process.env.NODE_ENV !== "production") global.prisma = prisma;
