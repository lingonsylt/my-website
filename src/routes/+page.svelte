<!--Delar upp sidan i två delar-->
<main>
	<div>
		<h1 class="name">Morgan Kemppe</h1>
		<h2>
			Här har jag samlat min uppgifter jag gjort i samband med webbutveckling i årskurs 2 på Maja
			Beskowgymnasiet!
		</h2>
		<h3>Inspirerade citat för min webbutvecklingsresa:</h3>
		<!--Under denna kommer vi lägga till fler element-->
		<p id="inspo">
			"The only way to learn a new programming language is by writing programs in it." - <strong
				>Dennis Ritchie</strong
			>, creator of the C programming language.
		</p>

		<p style="background-color:pink">
			"Every great developer you know got there by solving problems they were unqualified to solve
			until they actually did it." - <span
				>Patrick McKenzie, software engineer and entrepreneur</span
			>.
		</p>
	</div>
	<!--Här kommer vi lägga till en bild senare i uppgiften 1.2.4 Extra styling-->

	<svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
		<path
			fill="#FF0066"
			d="M29.5,-44C37.1,-41,41.4,-30.9,43.5,-21.3C45.7,-11.7,45.8,-2.5,46.6,8.2C47.5,19,49.1,31.5,43.9,38.7C38.7,45.9,26.6,47.8,14.3,53.8C1.9,59.9,-10.8,70,-18.4,66.2C-26,62.4,-28.6,44.7,-40.2,33.5C-51.8,22.4,-72.5,17.9,-75.7,9.6C-78.8,1.3,-64.3,-10.7,-56.1,-24.3C-47.8,-37.9,-45.8,-53,-37.5,-55.7C-29.2,-58.3,-14.6,-48.4,-1.8,-45.6C10.9,-42.7,21.9,-46.9,29.5,-44Z"
			transform=" translate(100,70)"
		/>
	</svg>
</main>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"
	><path
		fill="#0099ff"
		fill-opacity="1"
		d="M0,96L21.8,106.7C43.6,117,87,139,131,133.3C174.5,128,218,96,262,90.7C305.5,85,349,107,393,133.3C436.4,160,480,192,524,176C567.3,160,611,96,655,101.3C698.2,107,742,181,785,218.7C829.1,256,873,256,916,218.7C960,181,1004,107,1047,90.7C1090.9,75,1135,117,1178,117.3C1221.8,117,1265,75,1309,74.7C1352.7,75,1396,117,1418,138.7L1440,160L1440,320L1418.2,320C1396.4,320,1353,320,1309,320C1265.5,320,1222,320,1178,320C1134.5,320,1091,320,1047,320C1003.6,320,960,320,916,320C872.7,320,829,320,785,320C741.8,320,698,320,655,320C610.9,320,567,320,524,320C480,320,436,320,393,320C349.1,320,305,320,262,320C218.2,320,175,320,131,320C87.3,320,44,320,22,320L0,320Z"
	></path></svg
>

<style>
	main {
		/*Styling för att dela upp sidan i två delar. */
		/*Vi kommer gå igenom detta i detalj senare*/
		margin: auto;
		width: 80vw;
		height: 70vh;
		display: grid;
		grid-template-columns: repeat(2, 50%);
		overflow: hidden;
	}
	h1 {
		color: grey;
	}
	h2 {
		color: rgb(255, 165, 0);
	}
	h3 {
		color: #3cb371;
		font-family: sans-serif;
		font-weight: bold;
	}
	.name {
		font-family: 'Gill Sans';
		font-size: 50px;
	}

	#inspo {
		font-family: courier;
		font-size: 160%;
	}

	span {
		color: green;
	}

	div {
		/*Styling för att centrera texten i behållaren*/
		margin: auto;
	}

	/* Vi skiljer elementen med ett kommatecken(,) för att ge möjligheten till att ge flera element samma styling*/
	h1,
	h2,
	h3,
	p {
		display: inline-block;
		/*Ger utrymme mellan element*/
		margin: 10px;
	}
</style>
