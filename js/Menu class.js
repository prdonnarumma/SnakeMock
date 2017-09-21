class Menu {
	
	constructor(width,height) {
		this._id = "menu";
		this._options = ['StartGame', 'Options', 'Credits'];
		this._currentOption = 0;
		this.createObjectElement(width,height);
	};

	navigateOptions(input) {
		if (input === 40) {
			this.currentOption += 1;
			if (this.currentOption > 2) {
				this.currentOption = 0;
			}
		} else if (input === 38){
			this.currentOption -= 1;
			if (this.currentOption < 0) {
				this.currentOption = 2;
			}
		}
		this.element.className = this.options;
	};

	createObjectElement(width,height) {
		if (typeof arguments[0] === 'number' && typeof arguments[1] === 'number') {
			this._element = document.createElement("div");
			this.element.id = this._id;
			this.width = width;
			this.height = height;
			this.element.style.width = this.width + 'px';
			this.element.style.height = this.height + 'px';
		} else {throw new Error('No width and height values for the Menu HTML object')}
	};

	appendTo(parent) {
		parent.element.appendChild(this.element);
	};

	removeObjectElement() {
		this.element.remove();
	};

	get options () 			{ return this._options[this.currentOption]; };
	get currentOption () 	{ return this._currentOption; };
	set currentOption (opt) { this._currentOption = opt;  };
	get element () 			{ return this._element;		  };
}