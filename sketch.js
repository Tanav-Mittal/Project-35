//Create variables here
var dog, happyDog, database, foodS, foodStock
var Imgdog,ImgHappydog
var feed, adFood
var fedTime, lastFed
var foodObj


function preload()
{
  Imgdog = loadImage("dogImg.png")
  ImgHappydog = loadImage("dogImg1.png")
}

function setup() {
  database = firebase.database();
  createCanvas(800,500);
  
  dog = createSprite(500,250,10,10)
  dog.addImage(Imgdog);
  dog.scale = 0.3

  foodStock = database.ref('Food')
  foodStock.on("value",readStock)

  foodObj = new Food()

  feed = createButton("Feed the dog")
  feed.position(600,95)
  feed.mousePressed(feedDog)

  adFood = createButton("Add food")
  adFood.position(700,95)
  adFood.mousePressed(addFood)
  
}


function draw() {  
  background(46,139,87)

  foodObj.display();

  fedTime = database.ref('FeedTime')
  fedTime.on("value",function(data)
  {
    lastFed = data.val();
  })

  fill(255,255,254)
  textSize(15)
  if(lastFed>=12)
  {
    text("Last Feed: "+lastFed % 12 + " PM",325,30)
  }
  else if(lastFed === 0)
  {
    text("Last Feed : 12 AM",325,30)
  }
 else 
 {
   text("Last Feed : " + lastFed + "AM",325,30)
 }

  drawSprites();
  //add styles here

}

function readStock(data)
{
  foodS = data.val()
  foodObj.updateFoodStock(foodS)
}


function feedDog()
{
  dog.addImage(ImgHappydog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update(
    {
      Food:foodObj.getFoodStock(),
      FeedTime:hour()
    }
  )
}

function addFood()
{
  foodS++;
  database.ref('/').update({
    Food:foodStock
  })
}