import { z } from 'zod';

const jokeModel = z.object({
	setup: z.string().min(1, 'Please enter setup.'),
	punchline: z.string().min(1, 'Please enter punchline.')
});

export { jokeModel };
export type JokeModel = z.infer<typeof jokeModel>;
