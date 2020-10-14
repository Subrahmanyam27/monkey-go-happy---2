var forest,back;
var monkey,monkeyrunning;
var banana,bananacoming;
var obstacle,obstaclecoming;
var bananaGroup,obstacleGroup;
var score = 0;
var gameState = "play";

function preload(){
  
 monkeyrunning =  
 loadAnimation("sprite_0.png","sprite_1.png",                                   
               "sprite_2.png","sprite_3.png",
               "sprite_4.png","sprite_5.png",                                    
               "sprite_6.png","sprite_7.png", 
               "sprite_8.png");

  bananacoming = loadImage("banana.png");   

  obstaclecoming = loadImage("obstacle.png");

  back = loadImage("forest.PNG");
  
}

function setup(){
  createCanvas(400,400);

  //forest background
  forest = createSprite(200,200);
  forest.addImage(back);
  forest.scale = 1.8;
  forest.velocityX = -5;
  forest.x = forest.width/2;

  //loading ground and monkey fuctions
  createmonkey();
  createground();
  
  //creating groups
  bananaGroup = createGroup();
  obstacleGroup = createGroup();
  
}

function draw(){
  background("white");
  
  if(gameState === "play"){

    //getting score when monkey is touching the banana
    if(bananaGroup.isTouching(monkey)){
      score = score+2;
      bananaGroup.destroyEach();
    }

    if(obstacleGroup.isTouching(monkey)){
      gameState = "end";
      obstacleGroup.destroyEach();
      bananaGroup.destroyEach();
    }

    //giving control for monkey
    if(keyDown("space") && monkey.y > 320){
      monkey.velocityY = -18;
    }
    
    //giving gravity for monkey
    monkey.velocityY = monkey.velocityY+0.8;
    
    //colliding the monkey to the ground
    monkey.collide(ground);

    //rolling the forest
    if(forest.x < 20){
      forest.x = forest.width/2;
    }
    
    //rolling the ground
    if(ground.x < 200){
      ground.x = ground.width/2;
    }

    switch(score){
      case 10 : monkey.scale = 0.12;
                break;
      case 20 : monkey.scale = 0.14;
                break;
      case 30 : monkey.scale = 0.16;
                break;
      case 40 : monkey.scale = 0.17;
                break;
      default:  break;                              
    }
    
    //giving banana and obstacles functions
    spawnbanana();
    spawnobstacle();
    
    //console.log(monkey.y);

    drawSprites();

    fill("black");
    textSize(20);
    text("Score : " + score,100,40);
  }

  if(gameState === "end"){
    score = 0;
    monkey.scale = 0.12;
    gameState = "play";
  }

}

function createmonkey(){
  //creating monkey
  monkey = createSprite(70,350);
  monkey.scale = 0.12;
  monkey.addAnimation("monkeygo",monkeyrunning)
}

function createground(){
  //creating ground
  ground = createSprite(400,380,400,15);
  ground.velocityX = -3;
  ground.x = ground.width/2;
  ground.visible = false;
}

function spawnbanana(){
  if(frameCount % 150 === 0){
    banana = createSprite(400,Math.round(random(120,200)));
    banana.addImage(bananacoming);
    banana.velocityX = -4;
    banana.scale = 0.13;
    banana.lifetime = 100;
    
    bananaGroup.add(banana);
  }
}

function spawnobstacle(){
  if(frameCount % 300 === 0){
    obstacle = createSprite(400,350);
    obstacle.addImage(obstaclecoming);
    obstacle.velocityX = -4;
    obstacle.scale = 0.13;
    obstacle.lifetime = 100;  
    
    obstacleGroup.add(obstacle);
  }
}