import { PrismaClient } from '@prisma/client';
import { dev } from '$app/environment';

console.log('DEV', dev);
console.log('NODE_ENV', process.env.NODE_ENV);

const globalForPrisma = global as unknown as {
	prisma: PrismaClient | undefined;
};

export const prisma =
	globalForPrisma.prisma ??
	new PrismaClient({
		log: ['query']
	});

if (dev) {
	globalForPrisma.prisma = prisma;
}
