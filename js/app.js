//Basic class providing properties and method for enemies and player objects
class GameObject {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

//enemy class
class Enemy extends GameObject{
    constructor(x, y, speed) {
        super(x, y);                                //coordinates for enemy objects, take it from GameObject
        this.sprite = 'images/enemy-bug.png';       
        this.speed = speed;
    }
    
    update(dt) {
        //code managing enemies moving conditions  
        if (this.x >= 500) {            //if enemy go out of the right side, bring it back to the left side                 
            this.x = -100;
            if (this.y < 226) {
                this. y += 83;          //after crossing all path from left to right, bring this enemy level lower
            }
            else this.y = 60;           // if the enemy is in the lowest level, bring it to the top
        }
        this.x += this.speed * dt;      //update x-dimension state of enemy
        if (Math.abs((player.x) - (this.x)) <= 50 && Math.abs((player.y) - (this.y)) <= 10) {       //check if the plaer is in the area of 50x10px counting from the coordinates of enemy
            player.y = 393;             //bring player back to the grass
        }
    }

    render() {
        super.render();
    }
};

//player class
class Player extends GameObject{
    constructor(x, y) {
        super(x, y);                    //coordinates for player objects, take it from GameObject
        this.sprite = 'images/char-pink-girl.png';
    }

    render() {
        super.render();
    }

    handleInput(pressedKey) {           //get info which key has been pressed
        console.log('y: '+this.y);
        console.log('x: '+this.x);
        if (pressedKey == 'up') {
            if (this.y == -22) this.y = -22;  //prevent player from going out of the top edge of canvas      
            else this.y -= 83;                //move player one level higher
        }
        else if (pressedKey == 'right') {
            if (this.x == 404) this.x = 0;    //if player go out of the right side of canvas, bring it to the left side
            else this.x += 101;               //move player one step right
        }
        else if (pressedKey == 'down') {
            if (this.y == 393) this.y = 393;  //prevent player from going out of the bottom edge of canvas    
            else this.y += 83;                //move player one level lower
        }
        else {
            if (this.x == 0) this.x = 404;    //if player go out of the left side of canvas, bring it to the right side
            else this.x -= 101;               //move player one step left
        }
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies

const allEnemies = [];
const enemy1 = new Enemy(0, 60, 300);
const enemy2 = new Enemy(-200, 143, 200);
const enemy3 = new Enemy(-100, 226, 150);
const enemy4 = new Enemy(-300, 60, 100);
const enemy5 = new Enemy(0, 143, 70);
allEnemies.push(enemy1, enemy2, enemy3, enemy4, enemy5);

// Place the player object in a variable called player
const player = new Player(202, 393);

//listen for key press
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);     //call handleInput function and pass the pressed key direction name
});