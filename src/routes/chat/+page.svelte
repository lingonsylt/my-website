<script>
	import { enhance } from '$app/forms';
	import Elizabot from 'elizabot';
	const eliza = new Elizabot();

	let chat = $state([
		{
			id: 0,
			user: 'Eliza',
			message: eliza.getInitial()
		}
	]);

	async function write(text) {
		chat.push({
			id: chat.length,
			user: 'User',
			message: text
		});
		await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random(1000)));
		let reply = eliza.transform(text);
		chat.push({
			id: chat.length,
			user: 'Eliza',
			message: reply
		});
	}
</script>

<main>
	<seciton class="messages">
		{#each chat as message (message.id)}
			<article>
				<p>{message.message}</p>
			</article>
		{/each}
	</seciton>
	<form
		action=""
		class="input"
		method="post"
		use:enhance={({ formElement, formData, action, cancel }) => {
			cancel();
			const text = formData.get('text');
			write(text);
			formElement.reset();
		}}
	>
		<input type="text" name="text" placeholder="Send a message" />
		<button type="submit">Send</button>
	</form>
</main>

<style>
	main {
		margin: auto;
		width: 60vw;
		height: 70vh;
		display: grid;
		grid-template: 9fr 1fr / 1fr;
		border-radius: 10px;
		padding: 10px;
		background-color: rgb(0, 50, 50);
	}
	.messages {
		overflow-y: scroll;
	}
	.input {
		width: 90%;
		display: flex;
	}
	.messages article {
		width: 90%;
	}
	.input input {
		width: 100%;
	}
	.input button {
		background-color: rgba(0, 0, 0, 0.3);
	}
	.messages article,
	.input * {
		margin: 10px;
		padding: 10px;
		border-radius: 10px;
		border: none;
		background-color: rgba(0, 0, 0, 0.1);
	}
	.messages article p {
		margin: 0;
	}
</style>
