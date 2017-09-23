class Gendarme extends Entity {

	constructor(x,y) {
		super(x,y)
		this._class = "gendarme";
		this._direction = "Right"; //Always right
		this.loaded = false;
		this._src = "images/gendarme.png";
		this._sound_src = null;
		this._sprite_frame_count_max = 2;
		this._sprite_change_per_frame = 5.0;
		super.initAssets();
	};

	draw(ctx) {
		var cur_frame = this._sprite_frame_count/this._sprite_change_per_frame;

		if ((cur_frame%1) == 0) { //if current frame is an integer
			var source_x = cur_frame*this._width;
		} else {
			var old_sprite_frame = parseInt(cur_frame);
			var source_x = old_sprite_frame*this._width;
		}
		//Add changes due to behaviour of character, for example mirroring when going to the left

		ctx.save();
		ctx.translate(this.X,this.Y);
		ctx.translate(this._width/2, this._height/2);

		ctx.drawImage(
          this.sprite,
          source_x,
          0,
          this._width,
          this._height,
          -this._width/2,
          -this._height/2,
          this._width,
          this._height
        );

      ctx.restore();
	};

	move() {
		var method = "move" + this.direction;
		this[method]();
	};

	moveRight() {
		let _gameRight = parseInt(this._canvas.width) - parseInt(this._width);
		let _gameLeft = 0;
		if (this.X + 2 > _gameRight) {
			this.X = _gameLeft;
		} else {
			this.X += 2;
		};
	};

	moveLeft() {
		let _gameRight = parseInt(this._canvas.width) - parseInt(this._width);
		let _gameLeft = 0;
		if (this.X - 2 < _gameLeft) { 
			this.X = _gameRight;
		} else {
			this.X -= 2;
		}
	};

	moveUp() {
		let _gameBottom = parseInt(this._canvas.height) - parseInt(this._height);
		let _gameTop = 0;
		if (this.Y - 2 < _gameTop) {
			this.Y = _gameBottom;
		} else {
			this.Y -= 2;
		}
	};

	moveDown() {
		let _gameBottom = parseInt(this._canvas.height) - parseInt(this._height);
		let _gameTop = 0;
		if (this.Y+2 > _gameBottom) {
			this.Y = _gameTop;
		} else {
			this.Y += 2;
		}
	};

	update(input) {
		if (typeof input !== 'number') {}
		else {
			switch(input) {
			case 38:
				this.direction = 'Up';
				break;
			case 39:
				this.direction = 'Right';
				break;
			case 40:
				this.direction = 'Down';
				break;
			case 37:
				this.direction = 'Left';
				break;
			}
		}
		this.move()
	};

	set direction (dir) 	{ this._direction = dir 	};
	get direction ()    	{ return this._direction 	};
}