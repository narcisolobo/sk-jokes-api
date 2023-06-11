import { json } from '@sveltejs/kit';
import { PrismaClient } from '@prisma/client';
import { jokeModel, type JokeModel } from '$lib/models/joke-model.js';
import { prisma } from '$lib/prisma/prisma.js';

type jokeIssue = {
	code: string;
	minimum: number;
	type: string;
	inclusive: boolean;
	exact: boolean;
	message: string;
	path: string[];
};

type error = {
	path: string;
	message: string;
};

prisma.$extends({
	query: {
		joke: {
			create({ args, query }) {
				args.data = jokeModel.parse(args.data);
				return query(args);
			}
		}
	}
});

export async function GET() {
	const allJokes = await prisma.joke.findMany();
	return json(allJokes, { status: 200 });
}

export async function POST({ request }) {
	try {
		const { setup, punchline } = await request.json();
		const newJoke = await prisma.joke.create({
			data: {
				setup: setup,
				punchline: punchline
			}
		});
		return json(newJoke, { status: 201 });
	} catch (error: any) {
		console.log(error?.issues);

		const errors: error[] = [];

		for (const issue of error?.issues) {
			const jokeIssue: jokeIssue = issue;
			errors.push({
				path: jokeIssue.path[0],
				message: jokeIssue.message
			});
		}
		return json(errors);
	}
}
