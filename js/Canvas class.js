class Canvas {
	constructor(width,height) {
		this._id = "canvas";
		this.createObjectElement(width,height);
	}

	createObjectElement(width,height) {
		this._element = document.createElement("div");
		document.body.appendChild(this._element);
		this.element.id = this._id;
		if (typeof arguments[0] === 'number' && typeof arguments[1] === 'number') {
			this.width = width;
			this.height = height;
			this.element.clientWidth = this.width + 'px';
			this.element.clientHeight = this.height + 'px';
		} else {
			this.width = this.element.clientWidth;
			this.height = this.element.clientHeight;
		}
	};

	set width (width)   { this._width = width; 	}
	get width ()        { return this._width;  	}
	set height (height) { this._height = height;}
	get height ()       { return this._height;  }
	get element () 		{ return this._element;	}
}