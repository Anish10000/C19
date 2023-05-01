var tower, towerImg;

var door, doorImg, doorGroup;

var climber, climberImg, climberGroup;

var ghost, ghostAnimation;

var invisibleBlock, invisibleBlockGroup;




function preload(){
  towerImg = loadImage("assets/tower.png");
  doorImg = loadImage("assets/door.png");
  climberImg = loadImage("assets/climber.png");
  ghostAnimation = loadAnimation("assets/ghost-jumping.png", "assets/ghost-standing.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  tower =createSprite(width/2, height/2, 50,60);
  tower.addImage(towerImg);
  tower.velocityY = 3;
  

  doorGroup = new Group();

  climberGroup = new Group();

  invisibleBlockGroup = new Group();

  ghost=createSprite(width/2, height/2);
  ghost.addAnimation("jumping", ghostAnimation);
  ghost.scale = 0.6;
  ghost.debug = true;   
  ghost.setCollider("circle", 0, 0, 100);  




}

function draw() {
  background("black");

  //console.log(tower.y);
  if(tower.y>600){
tower.y = width/2;
  }


  if(keyIsDown(LEFT_ARROW)){
   ghost.x = ghost.x - 3;
  }

  
  if(keyIsDown(RIGHT_ARROW)){
    ghost.x = ghost.x + 3;
   }

   if(keyDown("space")){
    ghost.velocityY = -5;  
   }

   ghost.velocityY = ghost.velocityY + 0.5;



   if(climberGroup.isTouching(ghost)){
     ghost.velocityY = 0;                                       
   }
   
 

  
  spawnDoors();
  
  drawSprites();


  if(invisibleBlockGroup.isTouching(ghost) || ghost.y>height){
    ghost.destroy();
    
    fill("black");
    textSize(30)
    text("Game Over", 200,200)
 
 
    }
 




}


function spawnDoors(){
  if(frameCount%150 == 0){
    door = createSprite(Math.round(random(200,width-220)), -1, 5, 20);
    door.velocityY = 3;
    door.addImage(doorImg);
    doorGroup.add(door);
    door.lifetime = height/3;

    climber=createSprite(door.x, door.y + 65);
    climber.velocityY = 3;
    climber.addImage(climberImg);
    climberGroup.add(climber);
    climber.lifetime = height/3;

   invisibleBlock = createSprite(door.x, climber.y + 10, climber.width, 2);
   invisibleBlock.velocityY = 3; 
   invisibleBlock.lifetime = height/3;
   invisibleBlockGroup.add(invisibleBlock);
   invisibleBlock.visible = false; 
   //invisibleBlock.debug = true;  


   




    ghost.depth = climber.depth + 1;
    


  }
  

}









