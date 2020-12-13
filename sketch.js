var dog,HappyDogImg,dogImg1,MilkBottleImg;
var database;
var foodS,foodStock,readStock;
var feed,addFood;
var feedDog,addFoods,position,position,gameState,lastfed,lastFed;

function preload(){
   dogImg=loadImage("Dog.png");
   dogImg1=loadImage("HappyDog.png");
   MilkBottleImg=loadImage("Milk.png")
  }

function setup() {
  database=firebase.database();
  createCanvas(900,500);

  dog=createSprite(250,300,150,150);
  dog.addImage(dogImg);
  dog.scale=0.15;

  feed=createButton("Feed the dog");
  feed.position(370,20);
  feed.mousePressed(feedDog);

  addFood=createButton("Add food");
  addFood.position(470,20);
  addFood.mousePressed(addFoods);

  foodStock=database.ref('foodS');
  foodStock.on("value",readStock);
  textSize(20); 
}

function draw() {
  background(46,139,87);
  fill(255,255,254);
  stroke("black");
  text("Food remaining : "+foodS,170,200);
  textSize(13);
  fill(255,255,254);
textSize(15);
if(lastFed>=12){
  text("Last Feed : "+lastFed%12 + "PM", 200,30);
}else if(lastfed==0){
  text("Last Feed : 12 AM",350,30);
}else{
  text("Last Feed : "+lastfed + "AM",200,30);
}

  drawSprites();




  if (gameState == "game") {
    foodObj.display();
    dog.display();
    cursor(ARROW);
    fedTime = database.ref("Feed Time");
    fedTime.on("value", function (data) {
      lastFed = data.val();
    });

    fill("skyblue");
    stroke(0);
    strokeWeight(5);
    textStyle(BOLD);
    textSize(25);
    textFont("georgia");

    textSize(30);
    fill("yellow");
    stroke(0);
    strokeWeight(6);
    textFont("Georgia");
    textStyle(BOLD);

    if (foodS != 0) {
      text("Food Packages Left :  " + foodS, 5, 50);
    } else {
      text("No Food Left - Your pet may die", 5, 50)
    }
    if (foodS == 0) {
      dog.rotation = 90;
      dog.addImage(happyDogImg);
    }

  }
}

function readStock(data) {
  foodS = data.val();
}

function writeStock(x) {

  if (x <= 0) {
    x = 0
  } else {
    x = x - 1;
  }

  database.ref('/').update({
    foodS: x
  });
}

function addFoods() {
  foodS++;
  database.ref('/').update({
    Food: foodS
  });
}

function feedDog() {
  foodS = foodS - 1;
  dog.addImage(HappyDogImg);
  foodObj.updateFoodStock(foodObj.getFoodStock(FeedTime) - 1);
  database.ref('/').update({
    foodS: foodObj.getFoodStock(),
    FeedTime: hour(),
    foodS : foodS
  });
}