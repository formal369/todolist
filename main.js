// 유저가 값을 입력한다.
// + 버튼을 클릭하면, 할일이 추가된다.
// delete버튼을 누르면 할일이 삭제된다.
// check버튼을 누르면 할일이 끝나면서 밑줄이 간다.
// 1. check버튼을 클릭하는 순간 false -> true
// 2. true이면 끝난걸로 간주하고 밑줄 보여주기.
// 3. false이면 안끝난걸로 간주하고 그대로
// 진행중 끝남 탭을 누르면, 언더바가 이동한다.
// 끝남 탭은, 끝난 아이템만, 진행중 탭은 진행중인 아이템만
// 전체탭을 누르면 다시 전체아이템으로 돌아옴.

let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let tabs = document.querySelectorAll(".task-tabs div")
let taskBoard = document.getElementById("task-board");
let underLine = document.getElementById("under-line");
let taskList = [];
let filteredList = [];
let mode = 'all';
addButton.addEventListener("click", addTask);

for(let i=1;i<tabs.length;i++){
  tabs[i].addEventListener("click", function(event){filter(event)})
}

console.log(tabs)

function addTask() {
  let task = {
    id: randomIDGenerate(),
    taskContent: taskInput.value,
    isComplete: false,
  };
  taskList.push(task);
  console.log(taskList);
  render();
}

function render(){
  let list = [];
  if(mode == "all"){
    list = taskList;
  }else if(mode == "ongoing" || mode == "done"){
    list = filteredList;
  }
  let resultHTML = '';
  for(let i=0;i<list.length;i++){
    if(list[i].isComplete) {
      resultHTML += 
      `<div class="task">
        <div class="task-done">
          ${list[i].taskContent}
        </div>
        <div>
          <button onclick="toggleComplete('${list[i].id}')">Check</button>
          <button onclick="deleteTask('${list[i].id}')">Delete</button>
        </div>
      </div>`;  
    }else{
      resultHTML += 
        `<div class="task">
          <div>
            ${list[i].taskContent}
          </div>
          <div>
            <button onclick="toggleComplete('${list[i].id}')">Check</button>
            <button onclick="deleteTask('${list[i].id}')">Delete</button>
          </div>
        </div>`;
    }
  }
  taskBoard.innerHTML = resultHTML;
}

function toggleComplete(id) {
  console.log("id", id);
  for(let i=0;i<taskList.length;i++){
    if(taskList[i].id == id) {
      taskList[i].isComplete = !taskList[i].isComplete;
      break;
    }
  }
  render();
  console.log(taskList);
}

function filter(event){
  mode = event.target.id;
  filteredList = [];
  console.log("filter", event.target.id);
  if(mode == "all"){
    render();
  }else if(mode == "ongoing"){
    for(let i=0;i<taskList.length;i++){
      if(taskList[i].isComplete == false){
        filteredList.push(taskList[i]);
      }
    }

    render();
  }else if(mode == "done"){
    for(let i=0;taskList.length;i++){
      if(taskList[i].isComplete == true){
        filteredList.push(taskList[i]);
      }
    }
    
    render();
  }
  console.log("filteredList", filteredList);
  
}

function randomIDGenerate(){
  return '_' + Math.random().toString(36).substr(2, 9);
}

function deleteTask(id) {
  console.log('delete', id)
  for(let i=0;i<taskList.length;i++) {
    if(taskList[i].id == id) {
      taskList.splice(i, 1);
      break;
    }
  }
  render();
  console.log("삭제후", taskList);
}

// CSS
for(let i=1;i<tabs.length;i++){
  tabs[i].addEventListener("click", function(event){menuIndicator(event)})
}

function menuIndicator(event){
  underLine.style.left = event.currentTarget.offsetLeft + "px";
  underLine.style.width = event.currentTarget.offsetWidth + "px";
  underLine.style.top = event.currentTarget.offsetTop + event.currentTarget.offsetHeight - 5 + "px"
}

