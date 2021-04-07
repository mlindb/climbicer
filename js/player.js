function Player(id, container) {
	const me = this;
	
	const playerSpriteImg = new Image();
	playerSpriteImg.src = "images/running.png";

	const canvas = document.createElement("canvas");
	canvas.width = 225;
	canvas.height = 251;
	canvas.id = id;
	canvas.className = "player";
	
	container.appendChild(canvas);
	
	const $canvas = $(canvas);

	const sprite = new Sprite(document.getElementById(id).getContext('2d'), 
		canvas.width, 
		canvas.height, 
		playerSpriteImg);
		
	const intervals = [];
	
	/*
	Public interface starts here.
	*/	
	me.getPosition = function() {
		return  {
				top: parseInt($canvas.css("top").replace("px", "")),
				left: parseInt($canvas.css("left").replace("px", ""))
			};
	}
	
	me.move = function(direction, isJumping) {
		let step = 0;
		let horizontalOffset = me.getPosition().left;
		let verticalOffset = me.getPosition().top;
		let verticalVelocity = [-80, -40, -20, -10, -5, 0, 5, 10, 20, 40, 80];
		let i = 0;
		let velocity = 40;
		
		intervals.push(setInterval(function() {
			// Calculate the offset based on direction
			horizontalOffset += direction === "right" ? velocity : -velocity;
			
			if (isJumping) {
				if (i < verticalVelocity.length) {
					verticalOffset += verticalVelocity[i++];
				}
				$canvas.css("top", verticalOffset);
			}
			
			// move the canvas sprite
			$canvas.css("left", horizontalOffset);
		
			// rotate steps 1-3 over and over, as these are the three
			// running steps in the sprite
			if (step > 3) {
				step = 1;
			}
			
			// Perform the actual rendering.
			sprite.render(step++, direction)
		}, 100));		
	}
	
	me.jump = function(direction, isMoving) {
		if (isMoving) {
			// If we are moving, call the more complex move function
			me.move(direction, true);
		} else {
			// If player is stationary, we can do a simple-type jump here.
			let offset = me.getPosition().top;
			let velocity = [-80, -40, -20, -10, -5, 0, 5, 10, 20, 40, 80];
			let i = 0;
		
			intervals.push(setInterval(function() {
				if (i < velocity.length) {
					offset += velocity[i++];
				} else {
					me.clearIntervals();
					return;
				}
			
				$canvas.css("top", offset);
			}, 100));
		}
	}	
	
	me.stop = function(direction) {
		me.clearIntervals();
		
		// Render the stop sprite.
		sprite.render(direction === "right" ? 4 : 0, direction);
		setTimeout(function() {
			sprite.render(direction === "right" ? 0 : 4, direction)
		}, 300);
	}
	
	me.clearIntervals = function() {
		// Loop through all stored intervals and clear them all.
		intervals.forEach(function(interval) {
			clearInterval(interval)
		});
	}
}
