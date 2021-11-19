var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
 spookySound.loop();

  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;


  ghost = createSprite(300,300,60,50);
  ghost.addImage("standing",ghostImg);
  ghost.scale=0.4;


  invisibleBlockGroup=createGroup();
  //invisibleBlock.add(invisibleBlockGroup);

  climbersGroup=createGroup();
  //climber.add(climbersGroup);
  
  doorsGroup=new Group();
  //door.add(doorsGroup);
  
}

function draw() {
  background(200);
  if(gameState==="play"){

 
  if(tower.y > 400){
      tower.y = 300
    }

    if(keyDown("Left_arrow")){
      ghost.x-=4
    }

    if(keyDown("right_arrow")){
      ghost.x+=4
    }
    if(keyDown("space")){
      ghost.velocityY=-8;
      
    }
    ghost.velocityY=ghost.velocityY+0.2;



    spawnDoors();


    if(climbersGroup.isTouching(ghost)){
    ghost.velocityY=0;
   
    }
    if(invisibleBlockGroup.isTouching(ghost) || ghost.y > 600){
     gameState="end";
      ghost.destroy();
      }
      
  }
 


    

    drawSprites();
    if(gameState==="end"){
      stroke("yellow");
      fill("yellow");
      textSize(30);
     text("GAME OVER",200,300);
     tower.velocityY=0;
     climbersGroup.velocityY=0;
    }
}
function spawnDoors(){
  if(frameCount%167===0){
    var door = createSprite(200, -50);
    var climber = createSprite(200,10);
    var invisibleBlock = createSprite(200,15);
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;


     door.x=Math.round(random(200,400));
     climber.x = door.x;
     invisibleBlock.x = door.x;

     door.addImage(doorImg);
     climber.addImage(climberImg);

     door.velocityY=1;
     climber.velocityY = 1;
     invisibleBlock.velocityY = 1;

     ghost.depth = door.depth;
     ghost.depth +=1;

      //assign lifetime to the variable
      door.lifetime=600;
      climber.lifetime = 600;
    invisibleBlock.lifetime = 600;

    doorsGroup.add(door);
    invisibleBlock.debug = true;
    climbersGroup.add(climber);
    invisibleBlockGroup.add(invisibleBlock);
 
  }

}







  