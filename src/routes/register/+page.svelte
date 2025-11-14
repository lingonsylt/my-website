<script>
	let name = '';
	let email = '';
	let password = '';
	let color = 'black';
	function handleSubmit() {
		alert('Välkommen');
	}
</script>

<main>
	<div class="container">
		<h1>Registrering</h1>
		<form on:submit|preventDefault={handleSubmit}>
			<div
				style="width: 100px; height: 100px; border-radius: 50%; overflow:hidden; background-color:{color};"
			></div>
			<div>
				<label for="name">Namn:</label>
				<input type="text" id="name" />
			</div>
			<div>
				<label for="email">E-post:</label>
				<input type="email" id="email" />
			</div>
			<div>
				<label for="password">Lösenord:</label>
				<input type="password" id="password" />
			</div>
			<div>
				<label for="color">Favoritfärg</label>
				<select bind:value={color} name="color" id="color">
					<option value="blue">Blå</option>
					<option value="red">Röd</option>
				</select>
			</div>
			<input type="submit" value="Registrera" />
		</form>
	</div>
</main>

<style>
	main {
		background-image: url('https://t4.ftcdn.net/jpg/05/21/65/59/360_F_521655929_N80d5GaCQJ2VP073PfTXJTe9mkvsNtHE.jpg');
		background-size: cover;
		width: 100%;
		height: 100%;
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
		min-width: 500pt;
		height: 80%;
		background-color: #3a2e3b;
		margin: auto;
	}
	form div {
		display: block;
	}
</style>
