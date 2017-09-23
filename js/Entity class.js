class Entity {

	constructor(x,y) {
		this._x = x;
		this._y = y;
		this._width = null;
		this._height = null;
		this._sprite = null;
		this._sprite_frame_count_max = null;
		this._sprite_frame_count = 0;
		this._sprite_change_per_frame = null;
		this._sound = null;
		this._class = null;
		this._canvas = document.getElementById("game_canvas") || null; //Requires a canvas to work fine
	};

	//functions non setters and getters

	/*
	*initAssets() function fills all of the entity's properties accordingly to the entity that called it
	*it will need to be defined also in the sublclasses passing, the sprite URL, and the sound
	*also if needed, x and y positions should be passed, along with the sprite frame count max (which will have 
	*to be diminished)
	*/

	initAssets() {
		var self = this;
		//this.sound = this._sound_src;
		this.sprite = new Image();
		this.sprite.onload = function() {
			self.initProperties();
		}
		this.sprite.src = this._src;
	};

	initProperties() {
		var sprite = this._sprite;
		var max_frame = this._sprite_frame_count_max;

		this._width = sprite.width/max_frame;
		this._height = sprite.height;

		this._sprite_frame_count_max--;

		this.loaded = true;
	}

	/*
	*draw() function will handle the drawing of the entity in the canvas
	*the draw function has to be extended having in mind different kind of movement that the
	*entities may have. (Eg. Gendarme can move in four directions)
	*ctx: context of the canvas
	*/

	draw(ctx) {

	}

	/*
	*updateFrameCount() function will update the frame count so the sprite changes frame
	*count: the frame that wants to be showed.
	*/

	updateFrameCount(count) {
		if (typeof count !== 'number') {
			this._sprite_frame_count++;

			if (parseInt(this._sprite_frame_count/this._sprite_change_per_frame) > this._sprite_frame_count_max) {
				this._sprite_frame_count = 0;
			}
			return
		}
		this._sprite_frame_count = count;
	}

	//setters and getters
	set X (x)      		{ this._x = x 												}
	get X ()       		{ return this._x  											}
	set Y (y)      		{ this._y = y 												}
	get Y ()       		{ return this._y  											}
	get classType ()	{ return this._class;										}
	set classType (cls) { this._class = cls;										}
	set sprite (image)	{ this._sprite = image; 									}
	get sprite ()		{ return this._sprite;										}
	set sound (snd)		{ this._sound = snd;										}
	get sound ()		{ return this._sound;										}
	get bounds()		{
							var b={};
							b.start_x = this.X;
							b.start_y = this.Y;
							b.end_x = this.X + this._width;
							b.end_y = this.Y + this._height;
							return b;
						}
}