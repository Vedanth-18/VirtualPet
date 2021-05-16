var dog,sadDog,happyDog, database;
var foodS, foodS2,foodStock;
var addFood;
var foodObj;
var database;
//create feed and lastFed variable here
var feed, lastFed;
var feedingButton;
var r;
var time;
var hour;
var lastFeedTime;
var t;

function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.gif");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock, showError);
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.855;

  lastFed = database.ref('feedTime');
  lastFed.on('value', readFedTime, showError);
  //create feed the dog button here

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

  feedingButton = createButton("Feed The Dog");
  feedingButton.position(700, 95);
  feedingButton.mousePressed(feedDog);
  
  lastFeedTime = hour();
}

function draw() {
  
   background("WHITE");
  foodObj.display();
  push();
  textStyle(BOLD);
  fill("BLACK");
  text("FOOD STOCK: " + foodS, 20, 30);
  pop();
  if(hour<=12){
    textSize(20);
    fill("BLACK");
    textStyle(BOLD);
    text("Last Fed: 12 AM", 18, 388);
  }
   else if(hour>=12){
     textSize(20);
     fill("BLACK");
     textStyle(BOLD);
    text("Last Fed: 12 PM", 18, 388);
   }
   else{
    text("Last Fed: 12 PM", 18, 388);
   }
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  console.log(foodS);
  console.log(data);
  foodObj.updateFoodStock(foodS);
}

function feedDog(data){
  dog.addImage(happyDog);
  foodS = foodS-1;
  database.ref('/').update({
  Food:foodS
  })
} 

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
  Food:foodS
  })
}
 function showError(){
   textStyle(BOLD);
   textSize(40);
   text("Error occured while processing⚠⚠⚠", 500, 200);
 }
  function readFedTime(data){
    lastFed=data.val();
    console.log("Previously Fed: " + lastFeedTime);
    foodObj.getFedTime(lastFeedTime);
  }

  function updateFedTime(){
    console.log("Hour: " + lastFeedTime);
    t = lastFeedTime;
    database.ref('/').update({
      feedTime: t
    })
  }