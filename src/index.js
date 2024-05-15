import {Hono} from "hono";
import OpenAI from "openai";


const app = new Hono();

app.get("/completions", async (c) => {
	const openai = new OpenAI({
		apiKey: c.env.CLOUDFLARE_API_KEY,
		baseURL: `https://api.staging.cloudflare.com/client/v4/accounts/${c.env.CLOUDFLARE_ACCOUNT_ID}/ai/v1/`
	});

	const chatCompletion = await openai.chat.completions.create({
		messages: [{ role: "user", content: "Make some robot noises" }],
		model: "@cf/meta/llama-3-8b-instruct",
	});
	return c.json(chatCompletion);
});

app.get("/embeddings", async (c) => {
	const openai = new OpenAI({
		apiKey: c.env.CLOUDFLARE_API_KEY,
		baseURL: `https://api.staging.cloudflare.com/client/v4/accounts/${c.env.CLOUDFLARE_ACCOUNT_ID}/ai/v1/`
	});

	const embeddings = await openai.embeddings.create({
		model: "@cf/baai/bge-large-en-v1.5",
		input: "I'm a little teapot"
	});
	return c.json(embeddings);
})



export default app;
