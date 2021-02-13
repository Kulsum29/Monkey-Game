
var monkey, ground, bananaGroup, obstacleGroup, monkey_running
var banana ,bananaImage, obstacle, obstacleImage, bg, bgImage;
var FoodGroup, obstacleGroup,monkey_still;
var score=10,game="play", frequency=80;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  monkey_still=loadAnimation("sprite_0.png")
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  bgImage=loadImage("evergreen.png")
 
}



function setup() {
  bg=createSprite(200,197    );
  bg.addImage(bgImage)
  bg.scale=0.62
  bg.x=bg.width*bg.scale/2
  bg.velocityX=-2;
  monkey=createSprite(200,315,20,20);
  monkey.addAnimation("monkey",monkey_running);
  monkey.addAnimation("still",monkey_still);
  monkey.scale=0.1
  ground=createSprite(200,350,400,10);
  //ground.shapeColor="darkgreen"
  ground.visible=false
  bananaGroup=new Group();
  obstacleGroup=new Group();
  edges=createEdgeSprites();
}


function draw() {

  background("lemonchiffon")
  fill("yellow")
  stroke("gray")
  textSize(26)
  textFont("Georgia")

  monkey.velocityY+=0.5;
  monkey.collide(ground)
  
  if(game==="play"){
    //score=Math.ceil(frameCount/frameRate())
    score=score-0.02;
    newBanana()
    newObs();
    if(keyWentDown("space")){
      monkey.velocityY=-10;
    }
    if(bg.x<0){
      bg.x=bg.width*bg.scale/2
    }
  }

  if(bananaGroup.isTouching(monkey)){
    bananaGroup[0].destroy();
    score=score+2;
  }
  if(obstacleGroup.isTouching(monkey)||score<= 0){
    bananaGroup.setVelocityXEach(0)
    obstacleGroup.setVelocityXEach(0)
    game="end"
  }
  monkey.collide(edges[2])
  drawSprites()
  text("Lifetime: "+Math.ceil(score),140,380)
  if(game==="end"){
    bg.velocityX=0;
    bananaGroup.setLifetimeEach(-1)
    obstacleGroup.setLifetimeEach(-1)
    monkey.changeAnimation("still")
    fill("white")
    text("Game Over!",140,180)
  }
}

function newBanana(){
  if(frameCount%Math.ceil(frequency)===0){
    var b=createSprite(400,50,20,20);
    b.y=Math.round(random(1,250))
    b.addImage(bananaImage);
    b.scale=0.1;
    b.lifetime=200
    b.velocityX=-2; 
    b.setCollider("circle",0,0,40)
  bananaGroup.add(b)

  }
}

function newObs(){
  if(frameCount%300===0){
    var obs=createSprite(500,320,50,50)
    obs.addImage(obstacleImage)
    obs.velocityX=-2;
    obs.scale=0.2
    obs.lifetime=300;
    obs.rotation=5;
    obs.setCollider("circle",0,0,200)
    obstacleGroup.add(obs)
  }
}




