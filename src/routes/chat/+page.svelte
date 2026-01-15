<script>
	import { enhance } from '$app/forms';
	import Elizabot from 'elizabot';
	const eliza = new Elizabot();
	import { chatStore } from '$lib/chat';

	let chat = $state([
		{
			id: 0,
			user: 'eliza',
			message: eliza.getInitial()
		}
	]);
	if ($chatStore != []) {
		chat = $chatStore;
	}
	$effect(() => {
		$chatStore = chat;
	});

	async function write(text) {
		chat.push({
			id: chat.length,
			user: 'user',
			message: text
		});
		var element = document.getElementById('visible');
		element.style.display = 'flex';
		await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random(1000)));
		element.style.display = 'none';
		let reply = eliza.transform(text);
		chat.push({
			id: chat.length,
			user: 'eliza',
			message: reply
		});
	}
	function clearChat() {
		chat = [];
	}
</script>

<main>
	<seciton class="messages">
		{#each chat as message (message.id)}
			<article data-user={message.user} data-time="67:67" class="{message.user}-msg">
				<p>{message.message}</p>
			</article>
		{/each}
		<article id="visible">
			<span class="circle"></span>
			<span class="circle"></span>
			<span class="circle"></span>
		</article>
	</seciton>
	<form
		action=""
		class="input"
		method="post"
		use:enhance={({ formElement, formData, action, cancel }) => {
			cancel();
			const text = formData.get('text');
			if (text == '') {
				return;
			}
			write(text);
			formElement.reset();
		}}
	>
		<input type="text" name="text" placeholder="Send a message" />
		<button type="submit">Send</button>
		<button class="clear-btn" onclick={clearChat}>Clear</button>
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
		display: flex;
		flex-direction: column;
		overflow-y: scroll;
	}
	.input {
		width: 90%;
		display: flex;
	}
	.messages article {
		width: 70%;
	}
	.input input {
		width: 100%;
		transition: border 0.1s ease;
	}
	.input input::placeholder {
		font-style: italic;
		color: skyblue;
	}
	.input input:focus {
		border: 5px solid magenta;
	}
	.input button {
		background-color: rgba(0, 0, 0, 0.3);
	}
	.input * {
		margin: 10px;
		padding: 10px;
		border-radius: 10px;
		border: none;
		background-color: rgba(0, 0, 0, 0.1);
	}
	.messages article {
		margin: 5px;
		padding: 10px;
		border-radius: 10px;
		border: none;
		transition: filter 0.2s ease;
	}
	.messages article:hover {
		filter: brightness(1.5);
	}
	.messages article * {
		display: inline-block;
	}
	.eliza-msg::before,
	.user-msg::after {
		content: attr(data-user);
		font-weight: bold;
		color: pink;
	}
	.eliza-msg::after,
	.user-msg::before {
		content: attr(data-time);
		font-size: 0.8em;
		color: gray;
	}
	.eliza-msg:first-child {
		background-color: rgba(0, 0, 0, 0.175);
	}
	.eliza-msg {
		background-color: rgba(0, 0, 0, 0.1);
		text-align: start;
	}
	.user-msg {
		margin-left: 100%;
		background-color: rgba(0, 0, 0, 0.2);
		text-align: end;
		align-self: flex-end;
	}
	.messages article p {
		margin: 0 10px;
	}

	@keyframes typing {
		50% {
			transform: scale(1.4);
		}
	}

	#visible {
		background-color: rgba(0, 0, 0, 0.1);
		display: none;
		justify-content: center;
		align-items: center;
		width: 100px;
		height: 40px;
		padding: 0;
	}
	.circle {
		width: 10px;
		height: 10px;
		margin: 5px;
		border-radius: 50%;
		background-color: black;
		animation-name: typing;
		animation-duration: 1000ms;
		animation-iteration-count: infinite;
	}
	.circle:nth-child(1) {
		animation-delay: 0ms;
	}
	.circle:nth-child(2) {
		animation-delay: 333ms;
	}
	.circle:nth-child(3) {
		animation-delay: 666ms;
	}
	.clear-btn {
		transition: transform 0.2s ease;
	}
	.clear-btn:hover {
		transform: scale(1.2);
	}
	.clear-btn:active {
		transform: scale(0.9);
	}
</style>
