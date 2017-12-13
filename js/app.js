// Global variables

var playerX = 200;
var playerY = 395;

var lives = 3;
var play = true;

var windowX = [0, 100, 200, 300, 400];
var windowY = [55, 140, 225, 310];

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = -100;
    this.y = windowY[Math.floor((Math.random() * windowY.length))];
    this.speed = Math.floor((Math.random() * 70) + 10);


    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if(play){
      if(this.x < 505) {
        this.x += this.speed * dt;
      } else {
          this.x = -100;
          this.y = windowY[Math.floor((Math.random() * windowY.length))];
          this.speed = Math.floor((Math.random() * 70) + 10);
      }
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function() {
  this.x = playerX;
  this.y = playerY;
  this.sprite = 'images/char-princess-girl.png';
};

Player.prototype.update = function(dt) {};

// Draw the player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// player`s movements
Player.prototype.handleInput = function(keyCode) {
  if(play) {
    if(keyCode === "up") {
      if(this.y === -30){
        this.y = -30;
      } else {
        this.y -= 85;
      }
    }
    if(keyCode === "down") {
      if(this.y === 395){
        this.y = 395;
      } else {
        this.y += 85;
      }
    }
    if(keyCode === "left") {
      if(this.x === 0){
        this.x = 0;
      } else {
          this.x -= 100;
      }
    }
    if(keyCode === "right") {
      if(this.x === 400){
        this.x = 400;
      } else {
        this.x += 100;
      }
    }
  } else {
    if(keyCode) {

      allRocks = [];
      for(var i = 0; i < 4; i++) {
        allRocks[i] = new Rocks(i);
      }

      allEnemies = [];
      for( var i = 0; i < 3; i++ ) {
          allEnemies[i] = new Enemy();
      }

      hearts = [];
      for(var i = 0; i < 3; i++) {
        hearts[i] = new Heart(i);
      }

      player = new Player();

      lives = 3;

      play = true;

      console.log("sei la");
      console.log(allEnemies);
      console.log(hearts);
    }

  }
};

var Rocks = function(i) {
    this.x = windowX[i];
    this.y = 55;
    this.sprite = 'images/Rock.png';
};

//player`s obstacles
Rocks.prototype.update = function(i) {
  if(player.x < 400){
    if(player.y === this.y) {
      player.y = 140;
    }
  }
};

Rocks.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


var Heart = function(i) {
    this.x = windowX[i];
    this.y = 60;
    this.sprite = 'images/heart.png';

};

Heart.prototype.update = function(dt) {
  hearts = [];
  for(var i = 0; i < lives; i++) {
    hearts[i] = new Heart(i);
  }
};

Heart.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var Win = function() {
    player.x = 165;
    player.y = 200;
    player.sprite = 'images/YOUWIN.png';
};

var lost = function() {
    player.x = 165;
    player.y = 200;
    player.sprite = 'images/game-over.jpg';
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];

var allRocks = [];

var hearts = [];

var player;

// document.addEventListener("mouse", handleMouseClick);
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
