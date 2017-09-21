//GameMaster
class GameMaster {

	constructor() {
		var _entityArray = new Array;
		this.setNewEntity = function(id,entity) { _entityArray[id] = entity; };
		this.entity = function(id) { return _entityArray[id]; };
		this.entityAll = function() { return _entityArray};
		this.entityRemove = function(id) { 
			this.entity(id).removeObjectElement();
			delete _entityArray[id]; 
		};
		this.readInput();
		this.canvas = null;
		this.menu = null;
		this.gameState = null;
	};

	initializeMenu() {
		this.canvas = this.createCanvas();
		this.createMenu();//this.menu = this.createMenu();
		this.gameState = 'Menu';
	};

	initializeGame() {
		if (typeof this.canvas !== 'object') {
			this.canvas = this.createCanvas();
		}

		this.points = this.createPoints();
		this.addGendarme(10,10,'player');
		this.addMaldonado(50,50,'maldonado');
		this.gameState = 'Game';
	};

	createCanvas() {
		//let canvas = new Canvas(); test
		return new Canvas();
	};

	createPoints() {
		let points = new Points(50,40);
		if (typeof this.canvas !== null) {
			points.appendTo(this.canvas)
		} else { throw new Error('canvas not found')}
		return points;
	};

	createMenu() {
		let template = document.getElementById("menuTemplate");
		let menu = new Menu(parseInt(template.style.width),parseInt(template.style.height));
		if (typeof self.canvas !== null) {
			menu.appendTo(this.canvas)
		} else { throw new Error('canvas not found')}
		this.menu = menu;
	};

	addMaldonado(x,y,id) {
		let maldonado = new Maldonado(x,y,id);
		this.setNewEntity(id,maldonado);
		if (typeof this.canvas !== null) {
			maldonado.appendTo(this.canvas)
		} else { throw new Error('canvas not found')}
	};

	addGendarme(x,y,id) {
		let gendarme = new Gendarme(x,y,id);
		this.setNewEntity(id,gendarme);
		if (typeof this.canvas !== null) {
			gendarme.appendTo(this.canvas)
		} else { throw new Error('canvas not found')}
	};

	readInput() {
		let self = this;
		document.addEventListener('keydown',function(evt) {
			self.input = evt.which;
			switch(self.gameState) {
				case 'Menu': {
					self.updateMenu();
				};
			}
		});
	};

	spawnMaldonado(id) {
		let self = this;
		let gameMax_x = parseInt(this.canvas.width) - parseInt(24);//24 es el width
		let gameMax_y = parseInt(this.canvas.height) - parseInt(24);//24 es el height
		let new_x = Utilities.getRandomIntInclusive(0, gameMax_x);
		let new_y = Utilities.getRandomIntInclusive(0, gameMax_y);
		if (Utilities.willColideWith(new_x,new_y,24,24,this.entity('player'))) {
			return this.spawnMaldonado(id);
		} else {
			setTimeout(function() {
			self.addMaldonado(new_x,new_y,id.toString())
			},3000);
		}
	};

	updateGame() {
		let player = this.entity('player');
		let input = this.input;

		//Update the player
		if (typeof player !== 'object') { throw new Error("Player entity doesn't exist!"); }
		else {
			player.update(input);
		};

		//Update food
		for (let ent in this.entityAll()) {
			let object = this.entity(ent);
			if (object.classType === 'maldonado') {
				if (Utilities.isColliding(object,player)) {
					this.points.addPoints(100);
					this.entityRemove(ent);
					this.spawnMaldonado(ent);
				}
			}
		}

		//Update the points
		this.points.updatePoints();

		//Update sprites
	};

	startGame() {
		var self = this;
		this.initializeGame();
		setInterval(function() { 
			self.updateGame()} ,250);
	};

	updateMenu() {
		let input = this.input;
		let menu = this.menu;
		//Navigate through menu and actualize sprite
		menu.navigateOptions(input);
		if (input === 13) {
			if (menu.options === 'StartGame') {
				this.menu.removeObjectElement();
				delete this.menu;
				this.startGame();
			} else if (menu.options === 'Options') {
				console.log('Options yet not implemented...');
			} else {
				console.log('You can thank me, Dio, for making the game :3.')
			}
		}
	};
};