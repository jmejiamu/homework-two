interface Todo {
  id: number;
  text: string;
  done: boolean;
}

const todoInput = document.getElementById("todo-input") as HTMLInputElement;
const addTodoButton = document.getElementById("add-btn") as HTMLButtonElement;
const todoList = document.getElementById("todo-list") as HTMLUListElement;

let todos: Todo[] = [];

const renderTodos = () => {
  todoList.innerHTML = "";

  todos.forEach((todo) => {
    const li = document.createElement("li");

    const todoText = document.createElement("span");
    todoText.textContent = todo.text;
    todoText.style.textDecoration = todo.done ? "line-through" : "none";

    li.addEventListener("click", () => {
      todo.done = !todo.done;
      renderTodos();
    });

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.className = "delete-btn";
    deleteButton.addEventListener("click", () => deleteTodoById(todo.id));

    li.appendChild(todoText);
    li.appendChild(deleteButton);
    todoList.appendChild(li);
  });
};

const addTodo = () => {
  const text = todoInput.value.trim();
  if (text !== "") {
    const newTodo: Todo = {
      id: Date.now(),
      text: text,
      done: false,
    };
    todos.push(newTodo);
    todoInput.value = "";
    renderTodos();
  }
};

const deleteTodoById = (id: number) => {
  todos = todos.filter((todo) => todo.id !== id);
  renderTodos();
};

addTodoButton.addEventListener("click", addTodo);

todoInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") addTodo();
});
