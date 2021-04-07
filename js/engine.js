function Engine(player) {
	const $document = $(document);
	let direction;
	let isMoving = false;
	let isJumping = false;
	
	$document.bind("keydown keyup", function(e) {
		console.log(e);

		/* 
		Only call the move method if it is not currently executing
		its internal setInterval or we'll end up with a bunch of simultaneous
		animations 
		*/
		if (e.keyCode === 73 && e.type === "keydown") {
			player.jump(direction, isMoving);
		} else if (!isMoving && e.type === "keydown") {
			switch (e.keyCode) {
				case 74:
					player.move("left");
					direction = "left";
					break;
				case 76:
					player.move("right");
					direction = "right";
					break;
				case 32:
					player.jump("right");
					direction = "right";
					break;
			}
			
			isMoving = true;
		} else if (e.type === "keyup") {
			if (e.keyCode === 74 || e.keyCode === 76) {
				// add isJumping here?
				player.stop(direction);
			}
			isMoving = false;
		}
	});
}