
const area = {
  element: document.getElementById('area'),
  width: 1000,
  height: 800,
}

function initialize() {
    area.element.style.width  = area.width  + 'px';
    area.element.style.height = area.height + 'px';
}
        
var colorIndex = ["black", "red", "orange", "yellow", "green", "blue", "indigo", "violet"];
var divIndex = [];
            
function changeColor(thisDiv)
{
    thisDiv = document.getElementById(thisDiv);
    let randBgColor = Math.floor(Math.random() * colorIndex.length);
    let randContColor = Math.floor(Math.random() * colorIndex.length); 
    thisDiv.style.backgroundColor = colorIndex[randBgColor];
    thisDiv.style.color = colorIndex[randContColor];
    thisDiv.style.borderRadius = 50+"%";
    thisDiv.style.height = 50+"px";
    thisDiv.style.width = 50+"px";
    console.log("Div " + thisDiv.id + " bg: " + randBgColor + " text: " +randContColor);
}

function setStartPosition(thisDiv){
    thisDiv = document.getElementById(thisDiv);
    let randXPos = Math.floor(Math.random() * 75 * colorIndex.length);
    let randYPos = Math.floor(Math.random() * 75 * colorIndex.length);
    thisDiv.style.left = randXPos;
    thisDiv.style.top = randYPos; 

}

function createDiv(){
  let newDiv = document.createElement("div");
  newDiv.textContent = "div# :" + divIndex.length;
  newDiv.id = divIndex.length;
  divIndex.push(divIndex.length);
  area.element.appendChild(newDiv);
}

function divFactory(num){
  for(let i = 0; i < num; i++){
      createDiv();

  }
}

function applyStyle(){
  let dil = divIndex.length;
  let currentIndex = 0;
  for(let i = 0; i < dil; i++)
  {
    console.log("Attempting to style Div ID: " + currentIndex);
    changeColor(currentIndex);
    setStartPosition(currentIndex);
    currentIndex++;
  }     
}

function getReady(n){
  initialize();
  divFactory(n);
  applyStyle();
  setDirection();
}

function setDirection(){
  xDirectionIndex = [];
  yDirectionIndex = [];
  for (i = 0; i < divIndex.length; i++){
    xDirectionIndex.push(0);
    yDirectionIndex.push(0);
  }
}
var xDirectionIndex = [];
var yDirectionIndex = [];

//ar xDirection = 0;
//var yDirection = 0;
        
function moveTo(div){
  let currentDiv = div;
  div = document.getElementById(div);
  let xPos = parseInt(div.style.left);
  let yPos = parseInt(div.style.top);
  let divWidth = parseInt(div.style.width);
  let divHeight = parseInt(div.style.height);
  let areaWidth = parseInt(area.width);
  console.log('area width: ' + areaWidth);		
  let areaHeight = parseInt(area.height);
  console.log('area height: ' + areaHeight);
  const velocity = 10;
  xDirection = checkXBounds(currentDiv, xDirectionIndex[currentDiv], divWidth, xPos, areaWidth);
  if (xDirection) {
    xPos -= velocity;
    div.style.left = xPos + 'px';
  }
  else{
    xPos += velocity;
    div.style.left = xPos + 'px';
  }
  yDirection = checkYBounds(currentDiv, yDirectionIndex[currentDiv], divHeight, yPos, areaHeight);
  if (yDirection) {
    yPos -= velocity;
    div.style.top = yPos + 'px';
  }
  else{
    yPos += velocity;
    div.style.top = yPos + 'px';
  }
  console.log("xPos = "+ xPos + " | yPos = "+ yPos);         
  
}

function checkXBounds(div, xDirection, divWidth, xPos, areaWidth) {
  // Check X Axis then change if div has exceeded area border
  if (!xDirection){
    if((xPos + divWidth) > areaWidth){
        xDirectionIndex[div] = 1;
    }
  }
  else {
    if(xPos < 0){
      xDirectionIndex[div] = 0;
    //return xDirection;
    }
  } 
  console.log('xDirection: ' + xDirection);
  return xDirection; 
}
		
function checkYBounds(div, yDirection, divHeight, yPos, areaHeight) {
      
  // Check y Axis then change if div has exceeded area border
  if (!yDirection){
    if((yPos + divHeight) > areaHeight){
      yDirectionIndex[div] = 1;
    }
  }
  else {
    if(yPos < 0){
      yDirectionIndex[div] = 0;
    }
  }
 return yDirection; 
}	

function animateAll(){
  for (i = 0; i < divIndex.length; i++){
    moveTo(i);
  }
}

function animateButton(){
  setInterval('animateAll()',20);
}

/* Cancel Interval Not Working
function stopAnimateButton(){
  clearInterval(myVar);
}
*/