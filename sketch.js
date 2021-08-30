//Create variables here
var database;
var dog, happyDog, database, foodS, foodStock;
var dogImg, happyDogImg;

function preload()
{
  dogImg = loadImage("images/Dog.png");
  happyDogImg = loadImage("images/happydog.png");
}

function setup() {
	createCanvas(500, 500);
  database = firebase.database();

  dog=createSprite(250,300,150,150);
  dog.addImage(dogImg);
  dog.scale=0.15;

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);

}

function draw() {  

  background("green");

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDogImg);
  }

  drawSprites();

  fill("white");
  stroke(2);
  text("Food remaining : "+foodS, 170, 200);

  fill("white");
  textSize(23);
  textSize(20);
  text("Note: Press UP_ARROW Key To Feed Drago Milk!", 30, 100);

}

//Function to read values from DB
function readStock(data){
  foodS=data.val();
}

//Function to write values in DB
function writeStock(x){
  if(x<=0){
    x=0;
  }
  else{
    x=x-1;
  } 
  database.ref('/').update({
    Food:x
  })
}