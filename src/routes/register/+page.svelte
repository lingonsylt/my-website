<script>
	import { resolve } from '$app/paths';
	import { users } from '$lib/users';

	let colors = $state([
		{
			name: 'Svart',
			value: 'black'
		},
		{
			name: 'Blå',
			value: 'blue'
		},
		{
			name: 'Röd',
			value: 'red'
		},
		{
			name: 'Lila',
			value: 'purple'
		},
		{ name: 'Gul', value: 'yellow' }
	]);

	// Unused, broke the selector
	function shuffleColors() {
		colors.sort(() => Math.random() - 0.5);
		colors = [...colors];
	}
	shuffleColors();

	let name = $state('');
	let email = $state('');
	let password = $state('');
	let color = $state('black');

	function handleSubmit(event) {
		event.preventDefault();

		if ($users.some((user) => user.name == name)) {
			alert('Name already in use!');
			return;
		} else if ($users.some((user) => user.email == email)) {
			alert('Email already in use!');
			return;
		}

		let newUser = { name, password, email, color };
		$users = [...$users, newUser];

		alert(
			`Välkommen!\nNamn: ${name}\nE-post: ${email}\nPassword: ${password
				.split('')
				.map(() => '*')
				.join('')}`
		);
	}
</script>

<main>
	<div class="container">
		<h1>Registrering</h1>
		<div
			style="width: 100px; height: 100px; border-radius: 50%; overflow:hidden; background-color:{color};"
		></div>
		<form onsubmit={handleSubmit}>
			<div>
				<label for="name">Namn:</label>
				<input bind:value={name} type="text" id="name" />
			</div>
			<div>
				<label for="email">E-post:</label>
				<input bind:value={email} type="email" id="email" />
			</div>
			<div>
				<label for="password">Lösenord:</label>
				<input bind:value={password} type="password" id="password" />
			</div>
			<div>
				<label for="color">Favoritfärg</label>
				<select bind:value={color} name="color" id="color">
					{#each colors as color (color.name)}
						<option value={color.value}>{color.name}</option>
					{/each}
				</select>
			</div>
			<input type="submit" value="Registrera" />
		</form>
		<p>Har du redan ett konto? <a href={resolve('/login')}>Logga in</a></p>
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
