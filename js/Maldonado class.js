class Maldonado extends Entity{

	constructor(x,y,id) {
		super(x,y)
		this._class = "maldonado";
		super.createObjectElement(id);
		super.fillObjectElement();
	};

};
