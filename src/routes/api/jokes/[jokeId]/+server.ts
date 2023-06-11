import { PrismaClient } from '@prisma/client';
import { json } from '@sveltejs/kit';
import { prisma } from '$lib/prisma/prisma.js';

export async function GET({ params }) {
	try {
		const joke = await prisma.joke.findUnique({
			where: {
				id: +params.jokeId
			}
		});

		if (!joke) {
			throw { message: 'Joke not found.' };
		}
		return json(joke, { status: 200 });
	} catch (error) {
		return json(error, { status: 404 });
	}
}

export async function PUT({ params, request }) {
	const { setup, punchline } = await request.json();
	const joke = await prisma.joke.update({
		where: {
			id: +params.jokeId
		},
		data: {
			setup,
			punchline
		}
	});
	return json(joke, { status: 200 });
}

export async function DELETE({ params }) {
	const joke = await prisma.joke.delete({
		where: {
			id: +params.jokeId
		}
	});
	return json({ message: 'Joke deleted.' }, { status: 200 });
}
