const gridRange = document.getElementById('grid-range');
const gridContainer = document.getElementById('container');
const sizeValue = document.getElementById('size-value');
const colorPicker = document.getElementById('color-picker');
const rainbowBtn = document.getElementById('rainbow-btn');
const eraserBtn = document.getElementById('eraser-btn');
const clearBtn = document.getElementById('clear-btn');

let isMouseDown = false;
let previousGridCell = null;

function eventListener(){
    gridRange.addEventListener('input', () => {
        const gridSize = parseInt(gridRange.value);
        sizeValue.textContent = `${gridSize} x ${gridSize}`;
        gridCell(gridSize);
    })
    gridContainer.addEventListener('mousedown', () =>{
        isMouseDown = true;
    })
    gridContainer.addEventListener('mouseup', () =>{
        isMouseDown = false;
        previousGridCell = null;
    })
    gridContainer.addEventListener('mouseleave', () =>{
        isMouseDown = false;
        previousGridCell = null;
    })
    gridContainer.addEventListener('mousemove', (event) => {
        if(isMouseDown) {
            const currentCell = event.target;
            if(currentCell.classList.contains('gridCell')){
                if(eraserBtn.classList.contains('active')){
                    currentCell.style.backgroundColor = '';
                }
                else if(previousGridCell !== currentCell){
                    if(rainbowBtn.classList.contains('active')){
                        currentCell.style.backgroundColor = generateRainbowColor();
                    } else {
                        currentCell.style.backgroundColor = colorPicker.value;
                    }
                    previousGridCell = currentCell;
                }
                
                
            }
        }
    })
    colorPicker.addEventListener('click', () =>{
        rainbowBtn.classList.remove('active');
        eraserBtn.classList.remove('active')
    })
    rainbowBtn.addEventListener('click', () => {
        rainbowBtn.focus();
        rainbowBtn.classList.add('active');
        eraserBtn.classList.remove('active');
        colorPicker.value = ''
        setTimeout(function(){
            rainbowBtn.blur();
        }, 100)
    })
    eraserBtn.addEventListener('click', () => {
        eraserBtn.focus();
        eraserBtn.classList.add('active');
        rainbowBtn.classList.remove('active');
        colorPicker.value = '';
        setTimeout(function(){
            eraserBtn.blur();
        }, 100)
    })
    clearBtn.addEventListener('click', () =>{
        clearBtn.focus();
        const cells = document.getElementsByClassName('gridCell')
        for(let cell of cells){
            cell.style.backgroundColor = '';
        }
        setTimeout(function(){
           clearBtn.blur();
        }, 100)
    })

    gridCell(parseInt(gridRange.value));

}



function gridCell(size){
    gridContainer.innerHTML = '';

    gridContainer.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    gridContainer.style.gridTemplateRows = `repeat(${size}, 1fr)`;

    for(let i = 0; i < size * size; i++){
        const cell = document.createElement('div');
        cell.classList.add('gridCell');
        gridContainer.appendChild(cell);
    }
}

function generateRainbowColor(){
    const hue = Math.floor(Math.random() * 360);
    const saturation = '100%';
    const lightness = '50%';
    return `hsl(${hue}, ${saturation}, ${lightness})`;
}

eventListener();

