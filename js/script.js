// SELECT UI ELEMENT
const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const taskList = document.querySelector("#task-list");
const clearAll = document.querySelector("#clear-task");
const searchInput = document.querySelector("#search-input");

// EVENT LISTENER
immediateLoadEventListener();

function immediateLoadEventListener() {
  // Mendapat todos dari local Storage
  document.addEventListener("DOMContentLoaded", getTodoLocalStorage);
  // Menambah task
  todoForm.addEventListener("submit", addTodo);
  // Menghapus task
  taskList.addEventListener("click", deleteTask);
  // Menghapus seluruh task
  clearAll.addEventListener("click", clearTask);
  // Mencari Task
  searchInput.addEventListener("keyup", filter);
}

// REUSABLE FUNCTION
function createHTMLElement(value) {
  const li = document.createElement("li");
	li.className =
		"list-group-item d-flex justify-content-between align-items-center mb-3";
	li.id = "task-item";
	li.appendChild(document.createTextNode(value));

	const link = document.createElement("a");
	link.href = "#";
	link.className = "badge badge-danger p-2 delete-task";
	link.innerHTML = "DELETE";

	li.appendChild(link);
	taskList.appendChild(li);
}

// Create and Update Function
function getLocalStorageData() {
	// Sediakan variable utk menampung data yang kita dapatkan dari
	// local storage
	let todos;

	// Dengan konsep CRUD (Create, Read, Update, Delete)
	// Read terlebih dahulu
	// Kalau kosong maka array menjadi kosong
	if (localStorage.getItem("taskList") == null) {
		todos = [];
	} else {
		// Jika ada value atau object maka kita ambil value atau object tersebut
		// tetapi agar object itu dapat kita "Update" maka kita parse menjadi
		// string agar bisa dioleh dengan Javascript
		todos = JSON.parse(localStorage.getItem("taskList"));
	}
  return todos;
}

function setItemLocalStorage(todos) {
  localStorage.setItem("taskList", JSON.stringify(todos));
}

// SPESIFIC FUNCTION
function addTodo(e) {
  e.preventDefault();

  if(todoInput.value) {
    // const li = document.createElement("li");
    // li.className =
		// 	"list-group-item d-flex justify-content-between align-items-center mb-3";
    // li.id = "task-item";
    // li.appendChild(document.createTextNode(todoInput.value));

    // const link = document.createElement("a");
    // link.href = "#";
    // link.className = "badge badge-danger p-2 delete-task";
    // link.innerHTML = "DELETE";

    // li.appendChild(link);
    // taskList.appendChild(li);
    createHTMLElement(todoInput.value);
    addTodoLocalStorage(todoInput.value);
    todoInput.value = "";
  }
}

// Menggunakan database dari browser
function addTodoLocalStorage(todoInputValue) {
  let todos = getLocalStorageData();
  // Push value baru ke array
  todos.push(todoInputValue);

  // Create array kedalam local storage dengan kata lain
  // masukkan kembali value atau object yang telah kita oleh
  // agar masuk kembali ke local storage website 
  setItemLocalStorage(todos);
}

// Function Read dari local storage
function getTodoLocalStorage() {
  let todos = getLocalStorageData();
  todos.forEach((item) => {
    createHTMLElement(item);
  })
}

function deleteTask(e) {
  e.preventDefault();
  if(e.target.classList.contains("delete-task")) {
    if(confirm("Delete Task ?")) {
      const parent = e.target.parentElement;
      deleteLocalStorage(parent);
      parent.remove();
    }
  }
}

function deleteLocalStorage(deleteData) {
  let todos = getLocalStorageData();
  todos.forEach((item, idx) => {
    if(deleteData.firstChild.textContent === item) {
      todos.splice(idx, 1);
    }
  });
  setItemLocalStorage(todos);
}

function clearTask() {
  taskList.innerHTML = "";
  clearLocalStorage();
}

function clearLocalStorage() {
  localStorage.clear();
}

function filter(e) {
  const text = e.target.value.toLowerCase();
  const taskList = document.querySelectorAll("#task-item");

  taskList.forEach((item) => {
    const itemText = item.firstChild.textContent.toLowerCase();

    if(itemText.indexOf(text) !== -1) {
      item.setAttribute("style", "display: block");
    } else {
      item.setAttribute("style", "display: none !important");
    }
  })
}