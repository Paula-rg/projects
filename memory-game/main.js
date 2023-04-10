const gameBoard = document.querySelector('#gameboard');
const infoDisplay = document.querySelector('#info');

let colors = ["#DFFDFF","#DFFDFF","#E0DFFF","#E0DFFF","#FFDFFC","#FFDFFC","#E7FFDF","#E7FFDF","#FFCB9A","#FFCB9A","#FFDFDF","#FFDFDF","#BDD8F1","#BDD8F1","#FFF9C3","#FFF9C3"];

let arrayColors = [... colors];

let clickCount = -1;

function createBoard() {
  for (let i = 0;i<arrayColors.length;i++) {
    createCell(pickColor()); 
  }
}

function pickColor(){
  const randomIndex = Math.floor(Math.random() * colors.length);
  let pickColor = colors[randomIndex];
  colors.splice(randomIndex,1);
  return pickColor
}

function createCell(color) {
    const cellElement = document.createElement('div');
    cellElement.addEventListener('click', handlePlay);
    cellElement.classList.add("squares");
    cellElement.id = color;
    gameBoard.append(cellElement);
}

function handlePlay(event) {
  clickCount++;
  handleClick()
  const selectedCell = event.target;
  const cellColor = selectedCell.id;
  selectedCell.style.backgroundColor = cellColor;
  verifyWin(selectedCell);
}


function handleClick() {
  if (clickCount === 2) {
    document.querySelectorAll('.squares').forEach(square => {
      square.style.backgroundColor = "rgba(0, 0, 0, 0)";
    });
    clickCount = 0;
  }
}

function verifyWin(cell) {
  const elements = document.querySelectorAll('.squares');
  let bgColors = [];
  elements.forEach((element) => {
    const computedStyle = getComputedStyle(element);
    const bgColor = computedStyle.getPropertyValue('background-color');
    bgColors.push(bgColor);
  });
  console.log(bgColors);
  let bg = removeValue(bgColors,"rgba(0, 0, 0, 0)");
  console.log(bg);
  console.log(cell.style.backgroundColor);
  if (bg.length>0 && cell.style.backgroundColor===bg[0]){
    infoDisplay.textContent = "you won :)";
    elements.forEach(square =>square.replaceWith(square.cloneNode(true)))
  };
  
}

function removeValue(myList,valueToRemove){
while (myList.includes(valueToRemove)) {
  let index = myList.indexOf(valueToRemove);
  myList.splice(index, 1);
}
  return myList;
}


createBoard();

