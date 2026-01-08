// ================= LINKED LIST STRUCTURE ======================

class Node {
    constructor(task){
        this.task = task;
        this.completed = false;
        this.next = null;
    }
}

class LinkedList {
    constructor(){
        this.head = null;
    }

    add(task){
        const newNode = new Node(task);

        if(!this.head){
            this.head = newNode;
            return;
        }

        let temp = this.head;
        while(temp.next){
            temp = temp.next;
        }
        temp.next = newNode;
    }

    delete(index){
        if(index === 0){
            this.head = this.head.next;
            return;
        }

        let temp = this.head;
        let prev = null;
        let count = 0;

        while(temp && count !== index){
            prev = temp;
            temp = temp.next;
            count++;
        }

        if(temp){
            prev.next = temp.next;
        }
    }

    toggleComplete(index){
        let temp = this.head;
        let count = 0;

        while(temp){
            if(count === index){
                temp.completed = !temp.completed;
                break;
            }
            temp = temp.next;
            count++;
        }
    }

    moveUp(index){
        if(index === 0) return;

        const tasks = this.toArray();
        const temp = tasks[index];
        tasks[index] = tasks[index - 1];
        tasks[index - 1] = temp;

        this.fromArray(tasks);
    }

    moveDown(index){
        const tasks = this.toArray();
        if(index === tasks.length - 1) return;

        const temp = tasks[index];
        tasks[index] = tasks[index + 1];
        tasks[index + 1] = temp;

        this.fromArray(tasks);
    }

    toArray(){
        const arr = [];
        let temp = this.head;
        while(temp){
            arr.push({ task: temp.task, completed: temp.completed });
            temp = temp.next;
        }
        return arr;
    }

    fromArray(arr){
        this.head = null;
        arr.forEach(item => {
            const node = new Node(item.task);
            node.completed = item.completed;
            this.add(node.task);
            this.toggleCompleteFromBool(item.completed);
        });
    }

    toggleCompleteFromBool(bool){
        if(bool === false) return;
        let temp = this.head;
        while(temp){
            if(temp.completed === false){
                temp.completed = true;
                return;
            }
            temp = temp.next;
        }
    }
}

let taskList = new LinkedList();


// =================== UI FUNCTIONS ============================

function addTask(){
    const input = document.getElementById("taskInput");
    const value = input.value.trim();

    if(value === "") return;

    taskList.add(value);
    input.value = "";
    saveTasks();
    renderTasks();
}

function renderTasks(){
    const listDiv = document.getElementById("taskList");
    listDiv.innerHTML = "";

    const arr = taskList.toArray();

    arr.forEach((item, index) => {
        listDiv.innerHTML += `
            <div class="task-item">
                <span style="text-decoration:${item.completed ? 'line-through' : 'none'};">
                    ${item.completed ? "✔ " : ""}${item.task}
                </span>

                <div class="task-buttons">
                    <button class="move-btn" onclick="moveUp(${index})">⬆</button>
                    <button class="move-btn" onclick="moveDown(${index})">⬇</button>
                    <button class="complete-btn" onclick="completeTask(${index})">${item.completed ? "Undo" : "Done"}</button>
                    <button class="delete-btn" onclick="deleteTask(${index})">Delete</button>
                </div>
            </div>
        `;
    });

    updateProgress();
}


// ================== OPERATIONS ========================

function completeTask(i){
    taskList.toggleComplete(i);
    saveTasks();
    renderTasks();
}

function deleteTask(i){
    taskList.delete(i);
    saveTasks();
    renderTasks();
}

function moveUp(i){
    taskList.moveUp(i);
    saveTasks();
    renderTasks();
}

function moveDown(i){
    taskList.moveDown(i);
    saveTasks();
    renderTasks();
}


// ================== PROGRESS SYSTEM ======================

function updateProgress(){
    const arr = taskList.toArray();
    if(arr.length === 0){
        setProgress(0);
        return;
    }

    const completed = arr.filter(t => t.completed).length;
    const percent = Math.round((completed / arr.length) * 100);

    setProgress(percent);
}

function setProgress(value){
    const circle = document.getElementById("plannerProgress");
    const text = document.getElementById("progressText");
    if(!circle || !text)return;
    circle.style.setProperty("--percent", value);
    text.innerText = value + "%";

    // Update Dashboard progress
    localStorage.setItem("prepProgress", value);
}


// ================== LOCAL STORAGE ========================

function saveTasks(){
    localStorage.setItem("tasks", JSON.stringify(taskList.toArray()));
}

function loadTasks(){
    const data = JSON.parse(localStorage.getItem("tasks"));
    if(data){
        taskList.fromArray(data);
    }
    renderTasks();
}


// =================== IMPORT AI TASKS ========================

function importAITasks(){
    const aiTasks = [
        "Complete LinkedList problems",
        "Solve 3 LeetCode questions",
        "Study OS notes (1 hour)",
        "Watch React Hooks tutorial",
        "Apply for Internship"
    ];

    aiTasks.forEach(t => taskList.add(t));
    saveTasks();
    renderTasks();
}


// Load on start
loadTasks();
function importAI() {
    const data = JSON.parse(localStorage.getItem("aiRoadmap"));

    if (!data || data.length === 0) {
        alert("❌ No AI roadmap found. Ask PrepPilot AI to generate one!");
        return;
    }

    data.forEach(task => taskList.add(task));
    saveTasks();
    renderTasks();

    alert("✅ AI Roadmap successfully imported into your Study Planner!");
}