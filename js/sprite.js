function Sprite(context, width, height, image) {
	const me = this;
				
	me.context = context;
	me.width = width;
	me.height = height;
	me.image = image;
	
	me.render = function(step, direction) {
		console.log(direction);
		me.context.clearRect(0, 0, me.width, me.height);	
		me.context.drawImage(
			me.image,
			0 + step * me.width, 
			0 + (direction === "left" ? me.height : 0),
			me.width,
			me.height,
			0,
			0,
			me.width,
			me.height);
	}
}