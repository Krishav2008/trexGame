var PLAY=1;
var END=0;
var gameState=PLAY;
var trex, trex_running;
var ground, groundimage;
var invisibleground;
var cloud, cloudimage;
var obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;
var obstaclegroup,cloudgroup;
var trexcollided;


function preload(){
  trex_running=loadAnimation("trex1.png","trex3.png","trex4.png");
  groundimage=loadImage("ground2.png");
  cloudimage=loadImage("cloud.png");
  obstacle1=loadImage("obstacle1.png");
  obstacle2=loadImage("obstacle2.png");
  obstacle3=loadImage("obstacle3.png");
  obstacle4=loadImage("obstacle4.png");
  obstacle5=loadImage("obstacle5.png");
  obstacle6=loadImage("obstacle6.png");
  trexcollide=loadAnimation("trex_collided.png");
}

function setup(){
  createCanvas(800,300);
trex = createSprite(50,190,20,40);
trex.addAnimation("running",trex_running)
trex.addAnimation("collided",trexcollided);
trex.scale=0.9;

invisibleground = createSprite(200,260,800,10);
invisibleground.visible = false;

ground = createSprite(200,240,800,20);
ground.addImage("ground",groundimage);

obstaclegroup=createGroup();
trex.setCollider("circle",0,0,40);
cloudgroup=createGroup();
}



function draw(){
  background(220);
  if(gameState===PLAY){
    ground.velocityX = -4
  if (ground.x < 0){
    ground.x=ground.width/2
  }
  if (keyDown("space") && trex.y >= 100){
    trex.velocityY = -4
  }
  trex.velocityY=trex.velocityY+0.3;
  
spawnclouds();
spawnObstacles();
if (obstaclegroup.isTouching(trex)){
gameState=END;
  }
  
  }
  else if (gameState===END){
    trex.changeAnimation("collided",trexcollided)
    ground.velocityX=0;
    obstaclegroup.setLifetimeEach(-1);
    cloudgroup.setLifetimeEach(-1);
    obstaclegroup.setvelocityXEach(0);
    cloudgroup.setvelocityXEach(0);
  }
  trex.collide(invisibleground);
  drawSprites();
}



function spawnclouds(){
if(frameCount % 60===0){
  cloud = createSprite(650,40,40,10)
  cloud.y=random(60,20);
  cloud.velocityX=-2
  cloud.addImage(cloudimage)
  cloud.scale = 0.1
  cloud.depth = trex.depth;
  trex.depth = trex.depth + 1;
  cloud.lifetime=300
cloudgroup.add(cloud);

}

}

function spawnObstacles(){
  if (frameCount % 60 === 0){

var obstacle = createSprite(800,220,10,40);
obstacle.velocityX = -6


var rand = Math.round(random(1,6));
switch(rand){



case 1: obstacle.addImage(obstacle1);
break;



case 2: obstacle.addImage(obstacle2);
break;


case 3: obstacle.addImage(obstacle3);
break;


case 4: obstacle.addImage(obstacle4);
break;

case  5: obstacle.addImage(obstacle5);
break;

case 6: obstacle.addImage(obstacle6);
break;

default: break;
}

obstacle.scale=0.6;
obstacle.lifetime=300;
obstaclegroup.add(obstacle)





  }
}














