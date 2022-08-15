class timer{
  
  constructor(_millis){
    this.savedTime = 0;
    this.totalTime = _millis;
  }

  run(){
    
    var passedTime = millis() - this.savedTime;

    if(passedTime > this.totalTime){
      this.savedTime = millis();
      return true; 
      
    }

  }

}

class hole {
  
  constructor (_x, _y){ 
    this.Xpos = _x;
    this.Ypos = _y;
    this.sizeX = 135; //size of the original image
    this.sizeY = 58;
    this.dir = 1; //directional toggle for shrinking animation 
    this.breathSpeed = random(0.2, 0.5); // picks random speed for speed of breath 
    this.isBreath = false;
    this.breathAmount = random(10,30);
  }

  IsIdle(){
    if(this.mapping >= 135) {
      return true;
    }
    return false;
  }

  shrink(){ // takes the distance between hole and mouse and maps it to the X size of the hole
    this.num = dist(mouseX, mouseY, this.Xpos * scaleFactor, this.Ypos * scaleFactor)/500;
    this.mapping = map(this.num,0.05 * scaleFactor, 0.5 * scaleFactor,0.1 , 135 , true); 
  }
  
  draw(){ 
   
    if(this.IsIdle()){image(hole_img, this.Xpos * scaleFactor, this.Ypos * scaleFactor, this.sizeX * scaleFactor, this.sizeY * scaleFactor);}
    if(!this.IsIdle()){image(hole_img, this.Xpos * scaleFactor, this.Ypos * scaleFactor, this.mapping * scaleFactor, this.sizeY * scaleFactor);} 
    
    if(this.isBreath == true){ 
      this.breath2();
    }
     
  }


  breath2(){
    
    this.sizeX -= this.breathSpeed * this.dir;
    
    if(this.sizeX < 135 - this.breathAmount){
      this.sizeX = 135 - this.breathAmount;
      //this.breathSpeed = 0.1;
      this.dir = - this.dir;
    }

    if(this.sizeX > 135){
      this.sizeX = 135;
      //this.breathSpeed = 0.1;
      this.dir = - this.dir;
      this.isBreath = false;
    }
  }
}

var holes = [];
var idle = true;
var time = new timer(2000);
var scaleFactor;


function setup() {
  var cHeight = windowWidth; //height of the window
  var cWidth = windowHeight * (1080/1920); 
  scaleFactor = cHeight/1920;
  
  
  createCanvas(cWidth, cHeight);
  Bk_img = loadImage("img/Sewer_Prep_01_0002_Background.png");
  hole_img = loadImage("img/Sewer_Prep_01_0001_Background.png");
  stick_img = loadImage("img/Sewer_Prep_01_0000_Background.png");
  imageMode(CENTER);
  setupGrid();
  
  
}

function setupGrid(){
  for(let k = 0; k < 4;k++){ 
    for(let i = 0; i < 9; i++){
      holes[i + (k * 9)] = new hole(323 + (k * 141), 692 + (i * 65)); 
    }
  } 
}

function draw() {
  imageMode(CORNER);
  image(Bk_img, 0, 0,Bk_img.width * scaleFactor, Bk_img.height * scaleFactor);
  imageMode(CENTER);
  if(time.run()) {
    var uni = UniqueRandomNum(holes.length, 10);
  
  for(let x of uni){
    holes[x - 1].isBreath = true;  
    console.log(x - 1); 
  }
  }
  
  idle = true;
  
  for(let i = 0; i < holes.length; i++){
    
    
    holes[i].draw(); 
    holes[i].shrink();
    
    if(!holes[i].IsIdle()){
      idle = false;   
    }
  } 

  
  
  image(stick_img,740 * scaleFactor,765 * scaleFactor, stick_img.width * scaleFactor, stick_img.height * scaleFactor);  
  
}


function touchStarted(){
  
  if(!fullscreen()){
    fullscreen(true); 
  }
  return false;
  
} 

function UniqueRandomNum(range, outputCount){
  
  let arr = [];
  for(let i = 0; i < range; i++) {
    arr.push(i + 1);
  }

  let result = [];

  for (let i = 1; i <= outputCount; i++){
    const random = Math.floor(Math.random() * (range - i));
    result.push(arr[random]);
    arr[random] = arr[range - i]; 
       
  }

  return result;

}



