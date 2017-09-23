class Maldonado extends Entity{
	//Maldonado should now be an array of maldonados
	constructor(x,y,id) {
		super(x,y)
		this._class = "maldonado";
		this.loaded = false;
		this._src = "images/santiago.png";
		this._sound_src = null;
		this._sprite_frame_count_max = 2;
		this._sprite_change_per_frame = 14;
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
};
