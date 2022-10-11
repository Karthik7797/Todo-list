let toDoInput; 
let errorInfo; 
let addBtn; 
let ulList; 
let newToDo; 

let popup; 
let popupInfo; 
let todoToEdit; 
let popupInput; 
let popupAddBtn; 
let popupCloseBtn; 

const main = () => {
    // calls our functions
    prepareDOMElements();
    prepareDOMEvents();
}

const prepareDOMElements = () => {
    // get all items
    toDoInput = document.querySelector('.todo-input');
    errorInfo = document.querySelector('.error-info');
    addBtn = document.querySelector('.btn-add');
    ulList = document.querySelector('.todolist ul');

    popup = document.querySelector('.popup');
    popupInfo = document.querySelector('.popup-info');
    popupInput = document.querySelector('.popup-input');
    popupAddBtn = document.querySelector('.accept');
    popupCloseBtn = document.querySelector('.cancel');
}

const prepareDOMEvents = () => {
   // we broadcast
    addBtn.addEventListener('click',addNewToDo);
    ulList.addEventListener('click', checkClick);
    popupCloseBtn.addEventListener('click', closePopup);
    popupAddBtn.addEventListener('click', changeTodoText);
    toDoInput.addEventListener('keyup', enterKeyCheck);
}

const addNewToDo = () => {
   // create a new toDo
    if (toDoInput.value != ''){
        newToDo = document.createElement('li');
        newToDo.textContent = toDoInput.value;
        // (buttons)
        createToolAreal();
        
// add our ToDo to the ul list
        ulList.append(newToDo);
        
        // wipe error and input after adding ToDo
        toDoInput.value = '';
        errorInfo.textContent = '';
    } else {
        errorInfo.textContent = 'Enter the task!';
    }
}

const createToolAreal = () => {
    //we create elements
    const div = document.createElement('div');
    div.classList.add('tools');
    //we are adding our tools to the new toDo
    newToDo.append(div);

    const buttonDone = document.createElement('button');
    buttonDone.classList.add('complete');
    buttonDone.innerHTML = '<i class="fas fa-check"></i>'

    const buttonEdit = document.createElement('button');
    buttonEdit.classList.add('edit');
    buttonEdit.textContent = 'EDIT';

    const buttonCancel = document.createElement('button');
    buttonCancel.classList.add('delete');
    buttonCancel.innerHTML = '<i class="fas fa-times"></i>'

    //dodajemy elementy do siebie 
    div.append(buttonDone, buttonEdit, buttonCancel);
}

//a function that checks what we click
const checkClick = (e) => {
    if(e.target.matches('.complete')){
        e.target.closest('li').classList.toggle('completed'); //after clicking complete, add the completed class to the nearest li (grandfather) element

        e.target.classList.toggle('completed');

    } else if (e.target.matches('.edit')) {
        editToDo(e);

    } else if (e.target.matches('.delete')) { //else if ponywaz if we clicked anywhere except delete, the condition would also be executed
        deleteToDo(e);

    }
}

//popup functions
const editToDo = (e) => { 
    todoToEdit = e.target.closest('li');    //edit the closest to the button (message B-))
    popupInput.value = todoToEdit.firstChild.textContent; // assign to input (editor) the value we had in child (text) of li element
    popup.style.display = 'flex';
}

const closePopup = () => {
    popup.style.display = 'none';
    popupInfo.textContent = '';
}

// function that makes changes from input to our li element
const changeTodoText = () => {
    if (popupInput.value != '') {
        todoToEdit.firstChild.textContent = popupInput.value;

        popup.style.display = 'none';
        popupInfo.textContent = '';
    } else {
        popupInfo.textContent = 'Musisz podać jakąś treść!';
    }
}

const deleteToDo = (e) => {
    e.target.closest('li').remove(); 

    // display missing elements when missing
    const allToDos = ulList.querySelectorAll('li');
    if (allToDos.length == 0) {
        errorInfo.textContent = 'Nothing to do!';
    }
}


const enterKeyCheck = (e) => {
    if(e.key == 'Enter'){
        addNewToDo();
    }
}


document.addEventListener('DOMContentLoaded', main);



