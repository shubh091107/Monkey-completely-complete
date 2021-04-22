
var monkey , monkey_running,monkeystop
var obstacle, obstacleImage
var obstacleGroup
var score
var bg , im ,im2
var invisibleground
var score = 0
var PLAY = 1
var END = 0
var gamestate = PLAY
var cry
function preload(){
  
  
  monkey_running = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  monkeystop = loadImage("11.png")
  im = loadImage("bg1.jpg")
  obstacleImage = loadImage("obstacle.png");
 im2 = loadImage("2.jpg")
}



function setup() {
  createCanvas(displayWidth,displayHeight - 150)
  bg = createSprite(10,250,0,0)
  bg.addImage(im)
  bg.x = -bg.width
  bg.velocityX = -9
  monkey = createSprite(displayWidth/8,displayHeight-200,20,20)
  monkey.addAnimation("running",monkey_running)
  monkey.addAnimation("stop",monkeystop)
  monkey.setCollider("rectangle",0,0,monkey.width,monkey.height)
  monkey.scale = 0.3
  invisibleground = createSprite(displayWidth/8,displayHeight-200,displayWidth,5)  
  invisibleground.visible = false

  
  obstacleGroup = createGroup()
  
}


function draw() {
  background(255)
  if (gamestate === PLAY){
  score = score+ Math.round(getFrameRate()/60)
  camera.position.x = displayWidth - displayWidth/1.99
  if (keyDown("space") && monkey.y > displayHeight/2){
    monkey.velocityY = -20
  }
  
  monkey.velocityY = monkey.velocityY + 0.6
  
  
  
  if (bg.x <   400){
    bg.x = bg.width/2
  }
  monkey.collide(invisibleground)

  createobstacle()
  }
   
  
  if (obstacleGroup.isTouching(monkey)){
    gamestate = END
  }
  
  if (gamestate === END){
    bg.velocityX = 0 
    obstacleGroup.setVelocityXEach (0)          
    obstacleGroup.setLifetimeEach  (-1)
    obstacleGroup.destroyEach()
    monkey.x = displayWidth/2
    monkey.y = displayHeight/2-200
    monkey.changeAnimation("stop",monkeystop) 
    monkey.velocityY = 0 
    clear()
    bg.addImage(im2)
  }
  
  drawSprites()
  if (gamestate === END){
    fill(0)
    textSize(30)
    text("GAME OVER",displayWidth/2-75,displayHeight/2-50)
    textSize(20)
    fill(0)
    text ("survival time :"+score,displayWidth/2-75,displayHeight/2-20)
    textSize(20)
    fill(0)
    text ("Thanks For Playing",displayWidth/2-75,displayHeight/2)
  }
  if (gamestate === PLAY){
  textSize(20)
  fill(255)
  text ("survival time :"+score,150,30)
}}

function createobstacle(){
  if (frameCount % 100 === 0){
    var obstacle = createSprite(displayWidth,displayHeight-250,20,20)
    obstacle.addImage(obstacleImage)
    obstacle.velocityX = random(-8,-10)
    obstacle.lifetime = 200
    obstacle.scale = 0.3
    obstacleGroup.add(obstacle)
  
  }
}