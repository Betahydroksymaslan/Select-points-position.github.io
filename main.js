const pointBox = document.querySelector('.pointsBox');
const display = document.querySelector('.display')
const showPointsBtn = document.querySelector('.showPointsBtn');
const wrapper = document.querySelector('.wrapper');
const actualPosition = document.querySelector('.actualPosition');
const hoverPosition = document.querySelector('.hoverPosition');
const editButton = document.querySelector('.editBtn');
let isAddingActive = true;
let isShowListBtnClicked = false;
let isEditBtnActive = false;
let id = 0;
const elements = [];

showPointsBtn.addEventListener('click', () => {
    if (!isShowListBtnClicked) {
        showPointsBtn.classList.add('btnDisabled');
        isShowListBtnClicked = !isShowListBtnClicked;
        isAddingActive = !isAddingActive;
        const resultBox = new Result();
        resultBox.addResult(); 
        const newElements = [...elements];
        newElements.forEach(element => {
            document.querySelector('.result').innerHTML += `<li>x:${element.x} y:${element.y}</li>`;
        })
}
})

document.addEventListener('click', e => {
    if (e.target === document.querySelector('.exit')) {
        const result = document.querySelector('.result');
        result.remove();
        showPointsBtn.classList.remove('btnDisabled');
        isAddingActive = !isAddingActive;
        isShowListBtnClicked = !isShowListBtnClicked;
    } 
})

pointBox.addEventListener('click', e => {
    let x = e.clientX;
    let y = e.clientY;
    const point = new NewObject(x, y, id);
    if (isAddingActive && !isEditBtnActive) {
        point.addignDiv(x, y);
        display.textContent = `x:${x} y:${y}`
        elements.push(point);
        id++;
    }
})

pointBox.addEventListener('mousemove', e => actualPosition.textContent = `x:${e.clientX} y:${e.clientY}`);

document.addEventListener('click', e => {
    if (e.target.classList.contains('object')) {
        hoverPosition.textContent = `x ${e.clientX} y ${e.clientY}`;

    }
})

editButton.addEventListener('click', e => {
    const points = document.querySelectorAll('.object');
    let isMouseDown = false;
    let offsetX = null;
    let offsetY = null;

    if (!isEditBtnActive) {
        editButton.textContent = 'Koniec';
        isEditBtnActive = !isEditBtnActive;           
        if (points.length) {
            points.forEach(point => {
                point.classList.add('pointsActive');
                
                point.addEventListener('mousedown', e => {
                    isMouseDown = !isMouseDown;
                    offsetX = e.offsetX;
                    offsetY = e.offsetY;
                })

                point.addEventListener('mousemove', e => {
                    e.preventDefault();
                    if (isMouseDown) {
                        point.style.position = 'absolute';
                        point.style.left = `${e.clientX - offsetX}px`
                        point.style.top = `${e.clientY - offsetY}px`
                    }
                    
                })

                point.addEventListener('mouseup', e => {
                    isMouseDown = !isMouseDown;
                })
            })
        }
    } else {
        editButton.textContent = 'Edytuj';
        isEditBtnActive = !isEditBtnActive;
        if (points.length) {
            points.forEach(point => {
                point.classList.remove('pointsActive');
            })
        }
    }
})

class NewObject {
    constructor(x, y, id) {
        this.x = x;
        this.y = y;
        this.id = id;
    }

    addignDiv() {
        const div = document.createElement('div');
        div.classList.add('object');
        div.style.left = `${this.x - 5}px`;
        div.style.top = `${this.y - 5}px`;
        div.dataset.id = this.id;
        wrapper.appendChild(div);
    }
}

class Result {

    addResult() {
        const div = document.createElement('div');
        div.classList.add('result');
        wrapper.appendChild(div);

        const exit = document.createElement('div');
        exit.classList.add('exit');
        exit.textContent = 'Zamknij';
        div.appendChild(exit);
    }
}