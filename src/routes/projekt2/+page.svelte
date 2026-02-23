<div class="container">
	<div class="sheet">
		<div class="rings">
			<div class="ring r1">
				<div class="ring r2">
					<div class="ring r3">
						<div class="ring r4"></div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	.sheet {
		margin: auto;
		height: 1000px;
		width: 500px;
		background-color: ghostwhite;
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.rings {
		width: 500px;
		height: 500px;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.ring {
		border-radius: 100%;
		padding: 50px;
	}
	.r1 {
		background-color: red;
	}
	.r2 {
		background-color: white;
	}
	.r3 {
		background-color: blue;
	}
	.r4 {
		background-color: white;
	}
</style>
