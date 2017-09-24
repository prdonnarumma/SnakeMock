//GameMaster
class GameMaster {
//Before initiating the game, all assets from classes should be charged!!
	constructor() {
		var _entityArray = new Array;
		this.setNewEntity = function(id,entity) { _entityArray[id] = entity; };
		this.entity = function(id) { return _entityArray[id]; };
		this.entityAll = function() { return _entityArray};
		this.entityRemove = function(id) {
			delete _entityArray[id]; 
		};
		this.readInput();
		this.canvas = document.getElementById("game_canvas") || null;
		this.menu = null;
		this.gameState = null;
	};

	initializeMenu() {
		this.createMenu();
		this.gameState = 'Menu';
	};

	initializeGame() {
		this.points = this.createPoints();
		this.addGendarme(10,10,'player');
		this.addMaldonado(200,200,'maldonado');
		this.addMaldonado(400,400,'maldonadobis');
		this.gameState = 'Game';
	};

	createPoints() {
		let points = new Points();
		return points;
	};

	createMenu() {
		let menu = new Menu();
		this.menu = menu;
	};

	addMaldonado(x,y,id) {
		let maldonado = new Maldonado(x,y,id);
		this.setNewEntity(id,maldonado);
	};

	addGendarme(x,y,id) {
		let gendarme = new Gendarme(x,y,id);
		this.setNewEntity(id,gendarme);
	};

	readInput() {
		let self = this;
		document.addEventListener('keydown',function(evt) {
			self.input = evt.which;
			/*switch(self.gameState) {
				case 'Menu': {
					self.updateMenu();
				};
			}*/
		});

		document.addEventListener('keyup',function() {
			self.input = null;
		});
	};

	spawnMaldonado(id) {
		let self = this;
		let gameMax_x = parseInt(this.canvas.width) - parseInt(24);//24 es el width
		let gameMax_y = parseInt(this.canvas.height) - parseInt(24);//24 es el height
		let new_x = Utilities.getRandomIntInclusive(0, gameMax_x);
		let new_y = Utilities.getRandomIntInclusive(0, gameMax_y);
		if (Utilities.willColideWith(new_x,new_y,24,24,this.entity('player').bounds)) {
			return this.spawnMaldonado(id);
		} else {
			setTimeout(function() {
			self.addMaldonado(new_x,new_y,id.toString())
			},3000);
		}
	};

	updateGame(ctx) {
		let player = this.entity('player');
		let input = this.input;

		//Update the player
		if (typeof player !== 'object') { throw new Error("Player entity doesn't exist!"); }
		else {
			player.update(input);
			player.updateFrameCount();
			player.draw(ctx);
		};

		//Update food
		for (let ent in this.entityAll()) {
			let object = this.entity(ent);
			if (object.classType === 'maldonado') {
				if (Utilities.isColliding(object.bounds,player.bounds)) {
					this.points.updatePoints(20);
					this.entityRemove(ent);
					this.spawnMaldonado(ent);
				}
				object.updateFrameCount();
				object.draw(ctx);
			}
		}

		//Update loss condition
		let cur_time = new Date().getTime();
		let time_diff = cur_time - this.points.checkPoint;
		if (time_diff > 200) {
			this.points.updatePoints(-1);
			this.points.checkPoint = cur_time;
		}
	};

	startGame() {
		this.initializeGame();
	};

	updateMenu(ctx) {
		let input = this.input;
		let menu = this.menu;
		//Navigate through menu and actualize sprite
		menu.draw(ctx);
		if (!menu._fading) {
			menu.navigateOptions(input);
			if (input === 13) {
				if (menu.options === 'StartGame') {
					menu._fading = true;
					//this.startGame();
				} else if (menu.options === 'Options') {
					console.log('Options yet not implemented...');
				} else {
					console.log('You can thank me, Dio, for making the game :3.')
				}
			}
		} else {
			if (menu._alpha - 0.1 < 0) {
				delete this.menu;
				this.startGame();
			}
		}
			
	};
};