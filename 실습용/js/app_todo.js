const toDoForm = document.querySelector("#todo-form");
const toDoInput = document.querySelector("#todo-form input");
const toDoList = document.querySelector("#todo-list");

const TODOS_KEY = "todos";

let toDos = []; //할 일 목록을 저장할 배열

function saveToDos() {
    localStorage.setItem("todos", JSON.stringify(toDos));
    //JSON.stringify()는 자바스크립트의 객체나 배열을 문자열(string)로 변환
    //JSON.parse()는 문자열(string)을 자바스크립트의 객체나 배열로 변환
}

function deleteToDo(event) {
    const li = event.target.parentElement;
    //event.target은 클릭된 버튼, parentElement는 그 버튼의 부모요소(여기서는 li)
    li.remove();
    toDos = toDos.filter((toDo) => toDo.id !== parseInt(li.id)); //parseInt()는 문자열을 숫자로 변환
    //filter()는 배열의 각 요소에 대해 함수를 실행하고, true인 요소만 가지고 새로운 배열을 만듦
    //forEach처럼 ()안에 함수를 넣어 사용해도됨
    saveToDos();
}

function paintToDo(newTodo) {
    const li = document.createElement("li");
    li.id = newTodo.id; //li에 id를 부여
    const span = document.createElement("span");
    span.innerText = newTodo.text;
    const button = document.createElement("button");
    button.innerText = "❌";
    button.addEventListener("click", deleteToDo);
    li.appendChild(span);
    li.appendChild(button);
    toDoList.appendChild(li);
}

function handleToDoSubmit(event) {
    event.preventDefault();//새로고침 방지
    const newTodo = toDoInput.value;
    toDoInput.value = "";
    const newTodoObj = {
        text: newTodo,
        id: Date.now(), //Date.now()는 현재 시간을 밀리초로 나타냄(거의 랜덤한 숫자)
    };
    toDos.push(newTodoObj)//배열에 newTodo를 추가
    paintToDo(newTodoObj);
    saveToDos();
}

toDoForm.addEventListener("submit", handleToDoSubmit);

const savedToDos = localStorage.getItem(TODOS_KEY);
console.log(savedToDos);
if (savedToDos !== null) {
    const parsedToDos = JSON.parse(savedToDos);
    console.log(parsedToDos);
    toDos = parsedToDos; //toDos가 값을 기록할 수 있게 해줌
    parsedToDos.forEach(paintToDo);
    //forEach는 배열의 각 요소의 수에 따라 함수를 실행
    //parsedToDos.forEach((item) => console.log("this is the turn of", item)); 
    //위 코드를 함수 없이 사용, 이는 화살표 함수라고 불림
}