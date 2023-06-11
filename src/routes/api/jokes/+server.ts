import { json } from '@sveltejs/kit';

interface Joke {
	setup: string;
	punchline: string;
}

export function GET() {
	return json({ message: 'hello world' });
}
