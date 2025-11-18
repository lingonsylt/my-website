<script>
	import { resolve } from '$app/paths';
	import { users } from '$lib/users';

	let email = $state('');
	let password = $state('');

	function handleSubmit(event) {
		event.preventDefault();

		if (!$users.some((user) => user.email == email && user.password == password)) {
			alert('Felaktig e-post eller lösenord');
			return;
		}

		alert(`Du är inloggad!`);
	}
</script>

<main>
	<div class="container">
		<h1>Inlogging</h1>
		<form onsubmit={handleSubmit}>
			<div>
				<label for="email">E-post:</label>
				<input bind:value={email} type="email" id="email" />
			</div>
			<div>
				<label for="password">Lösenord:</label>
				<input bind:value={password} type="password" id="password" />
			</div>
			<input type="submit" value="Logga in" />
		</form>
		<p>Har du inget konto? <a href={resolve('/register')}>Registrera</a></p>
	</div>
</main>

<style>
	main {
		background-image: url('https://t4.ftcdn.net/jpg/05/21/65/59/360_F_521655929_N80d5GaCQJ2VP073PfTXJTe9mkvsNtHE.jpg');
		background-size: cover;
		width: 100%;
		height: 100%;
		min-height: 500px;
		padding: 5%;
	}
	.container {
		display: flex;
		flex-direction: column;
		justify-content: space-evenly;
		align-items: center;
		border: solid 5px rosybrown;
		border-radius: 10px;
		width: 35%;
		height: 80%;
		min-width: 300px;
		background-color: #3a2e3b;
		margin: auto;
	}
	form div {
		display: block;
	}
</style>
