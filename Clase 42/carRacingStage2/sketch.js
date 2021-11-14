var canvas, backgroundImage;

var gameState = 0;
var playerCount;
var allPlayers;
var distance = 0;
var database;

var form, player, game;

var cars, car1, car2, car3, car4;

var track, car1_img, car2_img, car3_img, car4_img;

var carsAtEnd;

var carSound;
function preload(){
  track = loadImage("images/track.jpg");
  car1_img = loadImage("images/car1.png");
  car2_img = loadImage("images/car2.png");
  car3_img = loadImage("images/car3.png");
  car4_img = loadImage("images/car4.png");
  ground = loadImage("images/ground.png");
  carSound = loadSound("Audio/car vroom.mp3");
}

function setup(){
  canvas = createCanvas(displayWidth - 20, displayHeight-30);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
  database.ref("carsAtEnd").on("value", (data)=> {
    carsAtEnd = data.val();
  });
}


function draw(){
  if(playerCount === 4){
    game.update(1);
  }
  if(gameState === 1){
    clear();
    game.play();
  }
  if(gameState === 2){
    game.end();
  }
  if (carsAtEnd === 4) {
    rectMode(CENTER);
    fill("yellow");
    rect(displayWidth / 2, camera.position.y, displayWidth - 300, displayHeight - 200);
    Player.getPlayerInfo();
    var y = camera.position.y - 150;
    var index = 0;
    for (var plr in allPlayers) {
      index += 1;
      fill("#00FF00");
      textSize(30);
      text(allPlayers[plr].name + " : " + allPlayers[plr].rank, displayWidth / 2, y);
      y = y + 100;
    }
  }
}
