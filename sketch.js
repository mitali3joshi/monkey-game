  //creating the game states
  var PLAY = 1;
  var END = 0;
  var gameState = PLAY;

  //creating the variables
  var banana, bananaImage, foodGroup;
  var ground;
  var obstacle, obstacleImage, obstacleGroup;
  var monkey, monkeyImage;

  //creating the score
  var score = 0;

  function preload(){

    // loading the images

    bananaImage = loadImage("banana.png");

    obstacleImage = loadImage("obstacle.png");

    monkeyImage =     loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
   }

  function setup(){
    createCanvas(450,450);

    ground = createSprite(225, 400, 9000000000, 10);
    ground.velocityX = -1.5;

    monkey = createSprite(90, 365, 100, 100);
    monkey.addAnimation("monkeyImg", monkeyImage);
    monkey.scale = 0.1;

    foodGroup = new Group();
    obstacleGroup = new Group();
  }

  function draw(){
    background(255);



    if(gameState === PLAY){
      text("SURVIVAL COUNT: "+ score, 80, 80);

      if(keyDown("space") && monkey.y >= 159) {
        monkey.velocityY = -12;
      }
      monkey.velocityY = monkey.velocityY + 0.8

      monkey.collide(ground);

      spawnfood();
      spawnobstacle();

      if(foodGroup.isTouching(monkey)){
        score = score + 1;
      }

      if(obstacleGroup.isTouching(monkey)){
        gameState = END;
      }

      drawSprites();

    }
    else if(gameState === END){
      //set velcity of each game object to 0
      monkey.velocityY = 0;
      ground.velocityX = 0;
      obstacleGroup.setvelocityXEach = 0;
      foodGroup.setvelocityXEach = 0;

      obstacleGroup.destroyEach();
      foodGroup.destroyEach();

      textSize(20);
      text("PRESS SPACE TO RESTART", 100, 200);

      if(keyDown("space")){
        reset();
      }
    }
  }

  function spawnfood(){
    if(frameCount % 100 === 0){
      banana = createSprite(480, 300, 100, 100);
      banana.addAnimation("bananaImg", bananaImage);
      banana.scale = 0.1;
      banana.y = Math.round(random(170,250));
      banana.velocityX = -5;
      banana.lifetime = 240;

      foodGroup.add(banana);
    }
  }

  function spawnobstacle(){
    if(frameCount % 150 === 0){
      obstacle = createSprite(480, 358, 100, 100);
      obstacle.addAnimation("obstacleImg", obstacleImage);
      obstacle.scale = 0.2;
      obstacle.velocityX = -5;
      obstacle.lifetime = 240;

      obstacleGroup.add(obstacle);
    }
  }

  function reset(){
    gameState = PLAY;
    score = 0;
  }

