document.addEventListener("DOMContentLoaded", () => {
    const stordata = JSON.parse(localStorage.getItem('task'));

    if (stordata) {
        stordata.forEach((tasks) => task.push(tasks))
    }
})
let task = [];
const addTask = () => {
    const taskInput = document.getElementById("taskInput");
    const text = taskInput.value.trim();

    if (text) {
        task.push({ text: text, completed: false })
    }
    updateTask();
    updatState();
    saveTask()
}

function saveTask() {
    localStorage.setItem("task", JSON.stringify(task))
}

function toggleComplete(index) {
    task[index].completed = !task[index].completed;
    updateTask();
    updatState();
    saveTask()
}

function deleteTask(index) {
    task.splice(index, 1);
    updateTask();
    updatState();
    saveTask()
}

function editTask(index) {
    const taskInput = document.getElementById('taskInput');
    taskInput.value = task[index].text;
    task.splice(index, 1);
    updateTask();
    updatState();
    saveTask()

}
const updatState = () => {
    const completeTask = task.filter(task => task.completed).length;
    const total = task.length;
    let progress = (completeTask / total) * 100;
    const progresBar = document.getElementById("progress");
    console.log(progress)
    if(isNaN(progress)){ progress = 0
    console.log("progress")
    }
    progresBar.style.width = `${progress}%`
    document.getElementById("number").innerText = `${completeTask} / ${total}`
}
const updateTask = () => {
    const classlist = document.getElementById("class-list");
    classlist.innerHTML = ''; 

    task.forEach((task, index) => {
        const listItem = document.createElement("li");
        listItem.innerHTML = '';

        listItem.innerHTML = `
        <div class = "task-item" > 
            <div class="task ${task.completed ? 'completed' : ''}" >
                <input type = "checkbox" class = "checkbox" ${task.completed ? 'checked' : ''}>
                <p>${task.text}</p>
            </div>
            <div class="icons">
                <span id = "ediot"  onclick = "editTask(${index})" ><i class="fa-solid fa-pen-to-square"></i></span>
                <span id = "bin"  onclick = "deleteTask(${index})"><i class="fa-solid fa-trash"></i></span>
            </div>
        </div>
        `
        listItem.addEventListener("change", () => toggleComplete(index));
        classlist.append(listItem);
    })

}

document.getElementById("new-task").addEventListener("click", (e) => {
    e.preventDefault();
    addTask();
})