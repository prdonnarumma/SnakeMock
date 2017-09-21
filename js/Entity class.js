class Entity {

	constructor(x,y) {
		this._x = x;
		this._y = y;
	};

	//functions non setters and getters
	fillObjectElement() {
		this.element.classList.add(this._class);
		this.element.style.left = this.X + 'px';
		this.element.style.top = this.Y + 'px';
	};

	createObjectElement(id) {
		this._id = id;
		this._element = document.createElement("div");
		this.element.id = this._id;
	};

	removeObjectElement() {
		this.element.remove();
	};

	appendTo(parent) {
		parent.element.appendChild(this._element);
	};

	//setters and getters
	set X (x)      		{ this.element.style.left = x + 'px'; this._x = x 			}
	get X ()       		{ return this._x  											}
	set Y (y)      		{ this.element.style.top = y + 'px'; this._y = y 			}
	get Y ()       		{ return this._y  											}
	get elementWidth () { return this.element.clientWidth;							}
	get elementHeight (){ return this.element.clientHeight;							}
	get classType ()	{ return this._class;										}
	get element () 		{ return this._element										}
}