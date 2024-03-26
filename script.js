
let gridSize = 16;

const container = document.querySelector('.grid-container');

let bgColor = '#ffffff';
container.style.backgroundColor = bgColor;

function createGrid() {
  
  let gridWidth = container.offsetWidth / gridSize;
  container.style.gridTemplateColumns = `repeat(${gridSize - 3}, ${gridWidth}px) 1fr 1fr 1fr`;
  container.style.gridTemplateRows = `repeat(${gridSize - 3}, ${gridWidth}px) 1fr 1fr 1fr`;
  if (gridSize < 4) {
    container.style.gridTemplateColumns = `repeat(${gridSize},1fr`;
    container.style.gridTemplateRows = `repeat(${gridSize}, 1fr`;
  }

  for (let i = 0; i < gridSize ** 2; i++) {
    const square = document.createElement('div');
    square.classList.add('grid-item');
    square.setAttribute('draggable', 'false');
    square.style.backgroundColor = bgColor;
    container.appendChild(square);

   

    square.classList.add('border-top-left');
  }
  
  const rightItems = document.querySelectorAll(`.grid-item:nth-child(${gridSize}n)`);
  for (let i = 0; i < rightItems.length; i++) {
    rightItems[i].setAttribute('data-right', 'true');
    rightItems[i].classList.toggle('border-right');
  }

  
  let gridItems = document.querySelectorAll('.grid-item');
  const lastItems = Array.from(gridItems).slice(-`${gridSize}`);
  for (let i = 0; i < lastItems.length; i++) {
    lastItems[i].setAttribute('data-bottom', 'true');
    lastItems[i].classList.toggle('border-bottom');
  }
}

createGrid();

gridItems = document.querySelectorAll('.grid-item');

let ink = '#000000';

const colorPicker = document.querySelector('#color-select');
colorPicker.addEventListener('input', (e) => {
  ink = e.target.value;
  if (grab) {
    grab = false;
    dropper.classList.remove('btn-on');
  }
 
});


const bgColorPicker = document.querySelector('#bg-color-select');


const buttons = document.getElementsByTagName('button');

for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', () => {
    buttons[i].classList.toggle('btn-on');
  });
}


let shading = false;
const shaderButton = document.querySelector('#shader-btn');
shaderButton.addEventListener('click', () => {
  if (shading) {
    shading = false;
  } else {
    shading = true;
    rainbow = false;
    rainbowButton.classList.remove('btn-on');
    lighten = false;
    lightenButton.classList.remove('btn-on');
    eraser = false;
    eraserButton.classList.remove('btn-on');
  }
  if (grab) {
    grab = false;
    dropper.classList.remove('btn-on');
  }
});

let lighten = false;
const lightenButton = document.querySelector('#lighten-btn');
lightenButton.addEventListener('click', () => {
  if (lighten) {
    lighten = false;
  } else {
    lighten = true;
    shading = false;
    shaderButton.classList.remove('btn-on');
    rainbow = false;
    rainbowButton.classList.remove('btn-on');
    eraser = false;
    eraserButton.classList.remove('btn-on');
  }
  if (grab) {
    grab = false;
    dropper.classList.remove('btn-on');
  }
});


function RGBToHex(rgb) {
  let sep = rgb.indexOf(',') > -1 ? ',' : ' ';
  rgb = rgb.substr(4).split(')')[0].split(sep);

  let r = (+rgb[0]).toString(16),
    g = (+rgb[1]).toString(16),
    b = (+rgb[2]).toString(16);

  if (r.length == 1) r = '0' + r;
  if (g.length == 1) g = '0' + g;
  if (b.length == 1) b = '0' + b;
  b = (+rgb[2]).toString(16);

  if (r.length == 1) r = '0' + r;
  if (g.length == 1) g = '0' + g;
  if (b.length == 1) b = '0' + b;
  return '#' + r + g + b;
}

function adjust(RGBToHex, rgb, amount) {
  let color = RGBToHex(rgb);
  return (
    '#' +
    color
      .replace(/^#/, '')
      .replace(/../g, (color) =>
        ('0' + Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16)).substr(-2)
      )
  );
}

const dropper = document.querySelector('#color-grabber');
let grab = false;
dropper.addEventListener('click', () => {
  if (grab) {
    grab = false;
    dropper.classList.remove('btn-on');
  } else {
    grab = true;
  }

  if (fill) {
    fill = false;
    colorFillButton.classList.remove('btn-on');
  }
});

let eraser = false;
const eraserButton = document.querySelector('#eraser-btn');
eraserButton.addEventListener('click', () => {
  if (eraser) {
    eraser = false;
  } else {
    eraser = true;
    shading = false;
    shaderButton.classList.remove('btn-on');
    rainbow = false;
    rainbowButton.classList.remove('btn-on');
    lighten = false;
    lightenButton.classList.remove('btn-on');
  }

  if (grab) {
    grab = false;
    dropper.classList.remove('btn-on');
  }
});

let rainbow = false;
const rainbowButton = document.querySelector('#rainbow-btn');
rainbowButton.addEventListener('click', () => {
  if (rainbow) {
    rainbow = false;
  } else {
    rainbow = true;
    shading = false;
    shaderButton.classList.remove('btn-on');
    lighten = false;
    lightenButton.classList.remove('btn-on');
    eraser = false;
    eraserButton.classList.remove('btn-on');
  }

  if (grab) {
    grab = false;
    dropper.classList.remove('btn-on');
  }
});

function randomColor() {
 
  return `hsl(${Math.random() * 360}, 100%, 50%)`;
}


let progressBar = document.getElementById('progress-bar');

function rangeSlider(value) {
  let gridLabels = document.querySelectorAll('#range-value');
  progressBar.style.width = (value / 120) * 100  + '%';
  for (let i = 0; i < gridLabels.length; i++) {
    gridLabels[i].textContent = value;
  }
  gridSize = parseInt(value);
  deleteGrid();
  createGrid();
  listen();
  reInit();
  const gridButton = document.querySelector('#grid-btn');
  if (gridButton.classList.contains('btn-on')) {
  } else {
    gridButton.classList.toggle('btn-on');
  }
}

function reInit() {
  deleteGrid();
  createGrid();
  listen();
}


function rangeSliderValue(value) {
  let gridLabels = document.querySelectorAll('#range-value');
  for (let i = 0; i < gridLabels.length; i++) {
    gridLabels[i].textContent = value;
  }
  progressBar.style.width = (value / 120) * 100 + '%';
}

function deleteGrid() {
  while (container.firstChild) {
    container.removeEventListener('mousedown', drawClick);
    container.removeEventListener('mouseenter', drawClickHover);
    container.lastChild = null;
    container.removeChild(container.lastChild);
  }
}

function fadeGrid(item) {
  if (item.style.backgroundColor == '' || item.style.backgroundColor == 'transperent') {
    item.style.backgroundColor == bgColor;
  }



  let fadeSpeed = Math.random() * 10;
  if (fadeSpeed > 8) {
    item.classList.add('clear-fade');
  } else if (fadeSpeed > 6) {
    item.classList.add('clear-fade-2');
  } else if (fadeSpeed > 4) {
    item.classList.add('clear-fade-3');
  } else if (fadeSpeed > 2) {
    item.classList.add('clear-fade-4');
  } else {
    item.classList.add('clear-fade-5');
  }
}

let root = document.documentElement;
const clearButton = document.querySelector('#clear-grid');
function clearGrid() {
  root.style.setProperty('--bg-color', bgColor);
  gridItems = document.querySelectorAll('.grid-item');
  for (let i = 0; i < gridItems.length; i++) {
    fadeGrid(gridItems[i]);
  }
  setTimeout(function () {
    for (let i = 0; i < gridItems.length; i++) {
      gridItems[i].style.backgroundColor = '';
      gridItems[i].removeAttribute('data-inked');
      gridItems[i].removeAttribute('data-shade');
      gridItems[i].classList.remove('clear-fade');
      gridItems[i].classList.remove('clear-fade-2');
      gridItems[i].classList.remove('clear-fade-3');
      gridItems[i].classList.remove('clear-fade-4');
      gridItems[i].classList.remove('clear-fade-5');
    }
  }, 1500);
  container.style.backgroundColor = bgColor;

  setTimeout(function () {
    clearButton.classList.remove('btn-on');
  }, 1400);
}
clearButton.addEventListener('click', clearGrid);


const colorFillButton = document.querySelector('#color-fill');
let fill = false;
colorFillButton.addEventListener('click', () => {
  if (grab) {
    grab = false;
    dropper.classList.remove('btn-on');
  }
  if (fill) {
    fill = false;
  } else {
    fill = true;
  }
});
function toMatrix(arr, width) {
  return arr.reduce(function (rows, key, index) {
    return (index % width == 0 ? rows.push([key]) : rows[rows.length - 1].push(key)) && rows;
  }, []);
}



function hexToRGB(hex) {
  let r = parseInt(hex[1] + hex[2], 16);
  let g = parseInt(hex[3] + hex[4], 16);
  let b = parseInt(hex[5] + hex[6], 16);

  return `rgb(${r}, ${g}, ${b})`;
}

function findNeighbors(matrix, x, y, oldColor, newColor) {
  const possibleNeighbors = [
    { cell: matrix?.[x]?.[y - 1], x: x, y: y - 1 }, // west
    { cell: matrix?.[x]?.[y + 1], x: x, y: y + 1 }, // east
    { cell: matrix?.[x - 1]?.[y], x: x - 1, y: y }, // north
    { cell: matrix?.[x + 1]?.[y], x: x + 1, y: y }, // south
  ];

  const neighbors = [];

  for (const neighbor of possibleNeighbors) {
    if (
      neighbor.cell !== undefined &&
      neighbor.cell.style.backgroundColor === oldColor &&
      neighbor.cell.style.backgroundColor !== newColor
    ) {
      neighbors.push(neighbor);
    }
  }

  return neighbors;
}

function floodFill(image, x, y, oldColor, newColor) {
  if (oldColor === newColor) return;

  oldColor = hexToRGB(oldColor);
  newColor = hexToRGB(newColor);

  const toPaint = [{ x: x, y: y }]; 

  while (toPaint.length > 0) {
    const { x, y } = toPaint.shift();

    const neighbors = findNeighbors(image, x, y, oldColor, newColor);

    for (const { cell, x, y } of neighbors) {
      toPaint.push({ x, y });
      cell.style.backgroundColor = rainbow ? randomColor() : newColor;
      cell.setAttribute('data-inked', 'true');
    }
  }
}


function colorFill(e) {
  if (fill) {
    const ogIndex = Array.from(e.target.parentElement.children).indexOf(
      e.target
    );

    gridItems = document.querySelectorAll('.grid-item');
    const gridItemsArray = Array.from(gridItems);

    const gridItemsArray2D = toMatrix(gridItemsArray, gridSize);

    const gridX = Math.floor(ogIndex / gridSize);
    const gridY = ogIndex % gridSize;

    const seed = gridItemsArray2D[gridX][gridY];
    const oldInk = seed.style.backgroundColor
      ? RGBToHex(seed.style.backgroundColor)
      : bgColor;

    floodFill(gridItemsArray2D, gridX, gridY, oldInk, ink);

    colorFillButton.classList.remove('btn-on');
    fill = false;
  }
}

function drawClick(e) {
  if (!grab && !fill) {
    if (eraser) {
      e.target.style.backgroundColor = '';
      e.target.removeAttribute('data-inked');
      e.target.removeAttribute('data-shade');
    } else if (rainbow) {
      e.target.style.backgroundColor = randomColor();
      e.target.setAttribute('data-inked', 'true');
      e.target.removeAttribute('data-shade');
    } else if (shading) {
      if (!e.target.dataset.shade) {
        e.target.setAttribute('data-shade', '1');
      } else {
        
        let shadeAmount = parseInt(e.target.getAttribute('data-shade'));
        shadeAmount++;
        e.target.setAttribute('data-shade', `${shadeAmount}`);
      }
      if (e.target.style.backgroundColor == '' || e.target.style.backgroundColor == 'transperent') {
        e.target.style.backgroundColor = bgColor;
      }

      e.target.style.backgroundColor = adjust(RGBToHex, e.target.style.backgroundColor, -15);
      
    } else if (lighten) {
      if (!e.target.dataset.shade) {
        e.target.setAttribute('data-shade', '-1');
      } else {
        
        let shadeAmount = parseInt(e.target.getAttribute('data-shade'));
        shadeAmount--;
        e.target.setAttribute('data-shade', `${shadeAmount}`);
      }
      if (e.target.style.backgroundColor == '' || e.target.style.backgroundColor == 'transperent') {
        e.target.style.backgroundColor = bgColor;
      }
      e.target.style.backgroundColor = adjust(RGBToHex, e.target.style.backgroundColor, +15);
     
    } else {
      e.target.style.backgroundColor = ink;
      e.target.setAttribute('data-inked', 'true');
      e.target.removeAttribute('data-shade');
    }
  }
}

function drawClickHover(e) {
  if (e.buttons > 0) {
    if (!grab && !fill) {
      if (eraser) {
        e.target.style.backgroundColor = '';
        e.target.removeAttribute('data-inked');
        e.target.removeAttribute('data-shade');
      } else if (rainbow) {
        e.target.style.backgroundColor = randomColor();
        e.target.setAttribute('data-inked', 'true');
        e.target.removeAttribute('data-shade');
      } else if (shading) {
       
        if (!e.target.dataset.shade) {
          e.target.setAttribute('data-shade', '1');
        } else {
          
          let shadeAmount = parseInt(e.target.getAttribute('data-shade'));
          shadeAmount++;
          e.target.setAttribute('data-shade', `${shadeAmount}`);
        } 
        if (
          e.target.style.backgroundColor == '' ||
          e.target.style.backgroundColor == 'transperent'
        ) {
          e.target.style.backgroundColor = bgColor;
        }

        e.target.style.backgroundColor = adjust(RGBToHex, e.target.style.backgroundColor, -15);
      } else if (lighten) {
        if (!e.target.dataset.shade) {
          e.target.setAttribute('data-shade', '-1');
        } else {
          
          let shadeAmount = parseInt(e.target.getAttribute('data-shade'));
          shadeAmount--;
          e.target.setAttribute('data-shade', `${shadeAmount}`);
        }
        if (
          e.target.style.backgroundColor == '' ||
          e.target.style.backgroundColor == 'transperent'
        ) {
          e.target.style.backgroundColor = bgColor;
        }
        e.target.style.backgroundColor = adjust(RGBToHex, e.target.style.backgroundColor, +15);
      } else {
        e.target.style.backgroundColor = ink;
        e.target.setAttribute('data-inked', 'true');
        e.target.removeAttribute('data-shade');
      }
    }
  }
}

function listen() {
  gridItems = document.querySelectorAll('.grid-item');
  for (let i = 0; i < gridItems.length; i++) {
    gridItems[i].addEventListener('mousedown', drawClick);
    gridItems[i].addEventListener('mouseenter', drawClickHover);
  }

  for (let i = 0; i < gridItems.length; i++) {
    gridItems[i].addEventListener('click', (e) => {
      if (grab) {
        ink = e.target.style.backgroundColor;
        if (ink == '') {
          colorPicker.value = bgColor;
        } else {
          colorPicker.value = RGBToHex(ink);
        }
        dropper.classList.remove('btn-on');
        grab = false;

        rainbow = false;
        rainbowButton.classList.remove('btn-on');
        shading = false;
        shaderButton.classList.remove('btn-on');
        lighten = false;
        lightenButton.classList.remove('btn-on');
        eraser = false;
        eraserButton.classList.remove('btn-on');
      }
    });
  }

  for (let i = 0; i < gridItems.length; i++) {
    gridItems[i].addEventListener('click', colorFill);
  }

  bgColorPicker.addEventListener('input', (e) => {
    gridItems = document.querySelectorAll('.grid-item');
    bgColor = e.target.value;
    for (let i = 0; i < gridItems.length; i++) {
      if (!gridItems[i].dataset.inked) {
        container.style.backgroundColor = bgColor;
      }
     
      if (!gridItems[i].dataset.inked) {
        if (gridItems[i].dataset.shade) {
          gridItems[i].style.backgroundColor = bgColor;
          let shadeAmount = parseInt(gridItems[i].getAttribute('data-shade'));
         
          let reshadeValue = shadeAmount * -15;
          gridItems[i].style.backgroundColor = adjust(
            RGBToHex,
            gridItems[i].style.backgroundColor,
            reshadeValue
          );
        }
      }
    }
  });

  const gridButton = document.querySelector('#grid-btn');

  gridButton.addEventListener('click', () => {
    for (i = 0; i < gridItems.length; i++) {
      gridItems[i].classList.toggle('border-top-left');
      if (gridItems[i].dataset.right) {
        gridItems[i].classList.toggle('border-right');
      }
      if (gridItems[i].dataset.bottom) {
        gridItems[i].classList.toggle('border-bottom');
      }
    }
  });
}

listen();