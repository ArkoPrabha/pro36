var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;

//create feed and lastFed variable here
var feed
var lastFed

function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage("sad",sadDog);
  dog.addImage("happy",happyDog)
  dog.scale=0.15;

  //create feed the dog button here
  feedthedog= createButton("FEED THE DOG")
  feedthedog.position(480,95)
  feedthedog.mousePressed(feedDog)


  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);
  database.ref("Food").on("value",readStock)
}

function draw() {
  background(46,139,87);
  foodObj.display();

  //write code to read fedtime value from the database 
  
 
  //write code to display text lastFed time here
  
  fill("black")
  if(lastFed!=undefined&&lastFed>12){
    text("last Fed "+lastFed%12+"PM",200,95)
  }
  else if(lastFed!=undefined&&lastFed===0){
    text("last Fed 12AM",200,95)
  }
  else if(lastFed!=undefined){
    text("last Fed"+lastFed +"AM",200,95)
  }
  

 
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.changeImage("happy",happyDog);
  foodS--;
  database.ref('/').update({
    Food:foodS,
    fedtime:hour()
  })
  database.ref("fedtime").on("value",function(data){
    lastFed=data.val()
  })
  //write code here to update food stock and last fed time
  
}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
