class Utilities {

	//Checks for collision between two rectangles
	static isColliding(objA, objB) { 
  		let left = objA.X < (objB.X + objB.elementWidth);
  		let rigth = (objA.X + objA.elementWidth) > objB.X;
  		let top = objA.Y < (objB.Y + objB.elementHeight);
  		let bottom = (objA.Y + objA.elementHeight) > objB.Y;
  		return left && rigth && top && bottom;
	};

	static willColideWith(x,y,width,height,objB) {
		let left = x < (objB.X + objB.elementWidth);
		let right = (x+width) > objB.X;
		let top = y < (objB.Y + objB.elementHeight);
		let bottom = (y+top) > objB.Y;
		return left && right && top && bottom;
	}

	static getRandomIntInclusive(min, max) {
  		min = Math.ceil(min);
  		max = Math.floor(max);
  		return Math.floor(Math.random() * (max - min + 1)) + min;
	};

	/*static cssProperty(id,property){
		let css = getComputedStyle(document.getElementById(id)).property;
	};*/
}