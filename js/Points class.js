class Points {

	constructor(width,height) {
		this._id = "points";
		this.createObjectElement(width,height);
		this._amount = 0;
	};

	createObjectElement(width,height) {
		if (typeof arguments[0] === 'number' && typeof arguments[1] === 'number') {
			this._element = document.createElement("div");
			this.element.id = this._id;
			this.width = width;
			this.height = height;
			this.element.style.width = this.width + 'px';
			this.element.style.height = this.height + 'px';
		} else {throw new Error("No width and height values for the Points HTML object")}
	};

	appendTo(parent) {
		parent.element.appendChild(this.element);
	};

	toggleVisibility() {
		let visState = this.element.style.display;
		if  (visState === 'none') {
			visState = 'inline';
		} else {
			visState = 'none'
		}
	};

	addPoints(numb) {
		this.amount += parseInt(numb);
	};

	updatePoints() {
		this.element.innerText = this.amount;
	};

	get amount ()			  { return this._amount;										}
	set amount (numb)		  { this._amount = numb;										}
	get elementWidth () 	  { return this.element.clientWidth;							}
	set elementWidth (width)  { this.element.clientWidth = width;							}
	get elementHeight ()	  { return this.element.clientHeight;							}
	set elementHeight (height){ this.element.clientHeight = height;							}
	get element () 			  { return this._element										}
}