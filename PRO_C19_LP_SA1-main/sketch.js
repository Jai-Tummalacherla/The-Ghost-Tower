var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"
var spookySound;


function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  //spookySound.loop();
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  doorsGroup = new Group();
  climbersGroup = new Group();

  ghost = createSprite(200,200,50,50);
  ghost.addImage(ghostImg);
  ghost.scale = 0.4;

  invisibleBlockGroup = new Group();

}

function draw() {
  background(200);


  if(gameState==="play")
  {

  
   if(tower.y > 400){
      tower.y = 300
    }
    spawnDoors();

    if(keyDown("left_arrow"))
    {
      ghost.x = ghost.x-3
    }

    if(keyDown("right_arrow"))
    {
      ghost.x = ghost.x+3
    }

    if(keyDown("space"))
    {
      ghost.velocityY = -5
    }

    ghost.velocityY = ghost.velocityY + 0.8

    if (climbersGroup.isTouching(ghost))
    {
      ghost.velocityY = 0;
    }

    if(invisibleBlockGroup.isTouching(ghost)||ghost.y>600)
    {
      ghost.destroy();
      gameState = "end";
    }
    
    drawSprites();
  }
  if(gameState==="end")
  {
    stroke("white");
    fill("yellow");
    textSize(30);
    text("Game Over",230,250);
  }

}

function spawnDoors()
{
  if(frameCount%240===0)
  {
    
    door = createSprite(200,-50);
    door.velocityY = 1;
    door.addImage(doorImg);
    doorsGroup.add(door);
    door.lifetime = 800;
    door.x = Math.round(random(120,400));

    climber = createSprite(200,10);
    climber.velocityY = 1;
    climber.addImage(climberImg);
    climbersGroup.add(climber);
    climber.lifetime = 800;
    climber.x = door.x;
    
    invisibleBlock = createSprite(200,15);
    invisibleBlock.velocityY = 1;
    invisibleBlockGroup.add(invisibleBlock);
    invisibleBlock.lifetime = 800;
    invisibleBlock.x = climber.x;
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;
    invisibleBlock.visible = false;

    ghost.depth = door.depth;
    ghost.depth = ghost.depth + 1;

  }

}