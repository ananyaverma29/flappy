var coinImg, pipeImg, pipe2Img;
var cityImg, birdImg;
var background, coin, bird,pipes,pipes2, treasure=0, resetImg, gameOverImg,reset,r;
var tpGroup, bpGroup, coinsGroup;
var gameState=1;
function preload()
{
coinImg = loadImage("./assets/coin.png");
cityImg = loadImage("./assets/city.png");
pipeImg = loadImage("./assets/pipes.png");
pipe2Img = loadImage("./assets/pipes2.png");
birdImg = loadImage("./assets/bird.png");
resetImg = loadImage("./assets/reset.png");
gameOverImg = loadImage("./assets/game.png");
}

function setup()
{
    cityImg.resize(windowWidth,windowHeight);
    gameOverImg.resize(windowWidth,windowHeight);
    var canvas = createCanvas(windowWidth,windowHeight);
    background = createSprite(width/2, height/2, width, height);
    background.addImage(cityImg);
    background.scale = 1;

    bird = createSprite(200,200);
    bird.addImage(birdImg);
    bird.scale = 0.2;
    bird.setCollider("circle", 0,0,100);
    bird.debug=true;
 
    reset = createSprite(200,200);
    reset.addImage(resetImg);
    reset.scale = 1;
reset.visible=false;
    gameOver = createSprite(windowWidth/2, windowHeight/2);
    gameOver.addImage(gameOverImg);
    gameOver.scale = 1;
    gameOver.visible = false;
    bpGroup = createGroup();
    tpGroup = createGroup();
    coinsGroup = createGroup();

}
    
function draw()
{
    if(World.frameCount%50 == 0)
  {
    if(r==1){
      topPipes();
      r=2;
    }
    else if(r==2){
      bottomPipes();
      r=1;
    }
    
    
  }
  if(touches.length > 0 &&bird.y  >= height-120 ) {
     
    bird.velocityY = -10;
     touches = [];
  }
  //bird.velocityY = bird.velocityY - 0.1;
    if(touches.length>0) {      
    reset();
    touches = [];
  }
  if(keyDown("up")) 
  {
    bird.y = bird.y-4;
  }
   if(keyDown("down"))
   {
     bird.y= bird.y+4;
   }
   coins();
   if(bird.collide(tpGroup)|| bird.collide(bpGroup))
   {
     gameState=2;
    
      // playSound("sound://category_music/fun_game_win_musical_1.mp3");
   }
   if(gameState == 2)
   {
    
      coinsGroup.setVelocityEach = 0;
      bird.velocityX=0;
     bird.velocityY=0;
     bird.destroy();
     tpGroup.setVisibleEach(false);
      bpGroup.setVisibleEach(false);
      tpGroup.setVelocityEach=0;
      
     bpGroup.setVeocityEach=0;
     coinsGroup.setVisibleEach(false);
    gameover.visible=true;
   }

   if(bird.isTouching(coinsGroup))
   {
     
     //playSound("sound://category_achievements/lighthearted_bonus_objective_1.mp3");
     
   }
   bird.overlap(coinsGroup,removeCoin);
    drawSprites();
    textSize(20);
   text("Total coins:"+ " " + treasure,47, 50);
    drawSprites();
}
function topPipes(){
    var tp = createSprite(400,0);
    tp.addImage(pipesImg);
   
    var y = Math.round(random(1,5));
    switch(y)
    {
      case 1: tp.scale =1.5;
              tp.height =200;
             
       break;
        case 2: tp.scale =1.5;
                tp.height =200;
               
        break;
        case 3: tp.scale = 1;
                tp.height = 100;
             
      break;  
        case 4:tp.scale = 1;
                tp.height =200;
                
        break;
        case 5: tp.scale = 1;
                tp.height =70;
                
      break;
      
    }
    
       tp.velocityX = -2; 
   tpGroup.add(tp);
        
    }
    
    
    function bottomPipes()
    {
      var bp = createSprite(400,400);
      bp.addImage(pipes2Img);
      
      var x = Math.round(random(1,5));
      
      switch(x)
      {
        case 1: bp.scale =5;
               bp.height =50;
             
        break;
        case 2: bp.scale =1.5;
                bp.height =200;
                
        break;
        case 3: bp.scale = 1.5;
                bp.height = 200;
                
        break;
        case 4:bp.scale = 1.5;
                bp.height =100;
        break;
        case 5: bp.scale = 2;
                bp.height =200;
              
        break;
    
    }
    bp.velocityX = -2; 
      bpGroup.add(bp);
      }

  
   function removeCoin(bird, coin){
    treasure+=10;
    
    coin.remove();
    coin.destroy();
    
  }
  function coins(){
    if(World.frameCount%50 == 0){
      var coin = createSprite(World.width+10, random(50,350),10,10);
      coin.addImage(coinImg);
      coin.scale = 0.35;
      coin.velocityX = -3;
      coinsGroup.add(coin);
    }
  }
  function reset(){
    gameState = 1;
    gameover.visible = false;
    resetbutton.visible = false;
   treasure = 0;
    
  }  
