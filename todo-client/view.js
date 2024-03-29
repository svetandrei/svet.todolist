/**
 * Create title html
 * @param title
 * @returns {HTMLHeadingElement}
 */
function createAppTitle(title) {
  let appTitle = document.createElement('h2');
  appTitle.innerHTML = title;
  return appTitle;
}

/**
 * Create form for send
 * @returns {{input: HTMLInputElement, form: HTMLFormElement, btn: HTMLButtonElement}}
 */
function createTodoItemForm(){
  let form = document.createElement('form');
  let input = document.createElement('input');
  let btnWrapper = document.createElement('div');
  let btn = document.createElement('button');

  form.classList.add('input-group', 'mb-3');
  input.classList.add('form-control');
  input.placeholder = 'Введите название нового дела';
  btnWrapper.classList.add('input-group-append');
  btn.classList.add('btn', 'btn-primary');
  btn.disabled = true;
  btn.textContent = 'Добавить дело';

  input.addEventListener('input', function() {
    input.value ? btn.disabled = false : btn.disabled = true;
  });

  btnWrapper.append(btn);
  form.append(input);
  form.append(btnWrapper);

  return {
    form,
    input,
    btn
  }
}

/**
 * Main list of tag
 * @returns {HTMLUListElement}
 */
function listTodo() {
  let list = document.createElement('ul');
  list.classList.add('list-group');
  return list;
}

/**
 * Add list of items by owner
 * @param container
 * @param title
 * @param owner
 * @param todoItemList
 * @param onCreateFormSubmit
 * @param onDoneClick
 * @param onDeleteClick
 * @returns {Promise<void>}
 */
async function createTodoApp(container, {
  title,
  owner,
  todoItemList = [],
  onCreateFormSubmit,
  onDoneClick,
  onDeleteClick
}){
  let todoAppTitle = createAppTitle(title);
  let todoItemForm = createTodoItemForm();
  let todoList = listTodo();
  let todoItemElement;
  const handlers = {
    onDone: onDoneClick, onDelete: onDeleteClick
  }

  container.append(todoAppTitle);
  container.append(todoItemForm.form);
  container.append(todoList);

  todoItemList.forEach((obj) => {
    obj.owner = owner;
    todoItemElement = addTodoItem(obj, handlers);
    todoList.append(todoItemElement);
  });

  todoItemForm.form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!todoItemForm.input.value) {
      return;
    }

    const todoItem = await onCreateFormSubmit({
      owner,
      name: todoItemForm.input.value.trim()
    });
    todoItem.owner = owner;
    todoItemElement = addTodoItem(todoItem, handlers);

    todoList.append(todoItemElement);
    todoItemForm.input.value = '';
    todoItemForm.btn.disabled = true;
  })

}

/**
 * Add item by owner
 * @param obj
 * @param onDone
 * @param onDelete
 * @returns {HTMLLIElement}
 */
function addTodoItem(obj, { onDone, onDelete}) {
  let item = document.createElement('li');

  let btnGroup = document.createElement('div');
  let doneButton = document.createElement('button');
  let deleteButton = document.createElement('button');

  item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
  item.dataset.id = obj.id;
  item.textContent = obj.name;
  obj.done ? item.classList.add('list-group-item-success') : item.classList.remove('list-group-item-success');

  btnGroup.classList.add('btn-group', 'btn-group-sm');
  doneButton.classList.add('btn', 'btn-success');
  doneButton.textContent = "Готово";
  deleteButton.classList.add('btn', 'btn-danger');
  deleteButton.textContent = 'Удалить';

  doneButton.addEventListener('click', function (){
    item.classList.toggle('list-group-item-success');
    onDone({todoItem: obj, element: item});
  });
  deleteButton.addEventListener('click', function (){
    onDelete({todoItem: obj, element: item});
  });

  btnGroup.append(doneButton);
  btnGroup.append(deleteButton);
  item.append(btnGroup);

  return item;
}

export { createTodoApp };

