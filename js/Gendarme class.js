class Gendarme extends Entity {

	constructor(x,y,id) {
		super(x,y)
		this._class = "gendarme";
		super.createObjectElement(id);
		super.fillObjectElement();
		this._direction = "Right";
	};

	move() {
		var method = "move" + this.direction;
		this[method]();
	};

	moveRight() {
		let _gameRight = parseInt(this.element.parentElement.clientWidth) - parseInt(this.elementWidth);
		let _gameLeft = 0;
		if (this.X + 30 > _gameRight) {
			this.X = _gameLeft;
		} else {
			this.X += 30;
		};
	};

	moveLeft() {
		let _gameRight = parseInt(this.element.parentElement.clientWidth) - parseInt(this.elementWidth);
		let _gameLeft = 0;
		if (this.X - 30 < _gameLeft) { 
			this.X = _gameRight;
		} else {
			this.X -= 30;
		}
	};

	moveUp() {
		let _gameBottom = parseInt(this.element.parentElement.clientHeight) - parseInt(this.elementHeight);
		let _gameTop = 0;
		if (this.Y - 30 < _gameTop) {
			this.Y = _gameBottom;
		} else {
			this.Y -= 30;
		}
	};

	moveDown() {
		let _gameBottom = parseInt(this.element.parentElement.clientHeight) - parseInt(this.elementHeight);
		let _gameTop = 0;
		if (this.Y+30 > _gameBottom) {
			this.Y = _gameTop;
		} else {
			this.Y += 30;
		}
	};

	update(input) {
		if (typeof input === 'undefined') {}
		else if (typeof input !== 'number') { throw new Error('invalid input'); }
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
			default:
				break;
			}
		}
		this.move()
	};

	set direction (dir) 	{ this._direction = dir 	};
	get direction ()    	{ return this._direction 	};
}