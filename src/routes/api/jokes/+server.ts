import { json } from '@sveltejs/kit';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
	const allJokes = await prisma.joke.findMany();
	return json(allJokes, { status: 200 });
}

export async function POST({ request }) {
	const { setup, punchline } = await request.json();
	const newJoke = await prisma.joke.create({
		data: {
			setup: setup,
			punchline: punchline
		}
	});
	return json(newJoke, { status: 201 });
}
