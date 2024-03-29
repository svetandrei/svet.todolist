/**
 * Save data to storage
 * @param owner
 * @param arObj
 */
function saveDataStorage(owner, arObj) {
  localStorage.setItem(owner, JSON.stringify(arObj));
}
/**
 * Get data from storage by owner
 * @param owner
 * @returns {any}
 */
export function getTodoList(owner) {
  if (localStorage.getItem(owner)) {
    return JSON.parse(localStorage.getItem(owner));
  }
}

/**
 * Create item by owner
 * @param name
 * @param owner
 * @returns {{}}
 */
export function createTodoItem({ name, owner}) {
  let obj = {};
  obj.id = Math.random().toString(36).substring(2, 5);
  obj.name = name;
  obj.done = false;

  let arrRes = getTodoList(owner);
  if(typeof arrRes === 'undefined') {
    arrRes = [];
  }

  arrRes.push(obj);
  saveDataStorage(owner, arrRes);

  return obj;
}

/**
 * Switch done by todo item
 * @param todoItem
 */
export function switchTodoItemDone({ todoItem }) {
  todoItem.done = !todoItem.done;

  let arrRes = getTodoList(todoItem.owner);

  let post = arrRes.find((post) => post.id === todoItem.id);
  post.done ? post.done = false : post.done = true;
  saveDataStorage(todoItem.owner, arrRes);
}

/**
 * Delete item by id from storage
 * @param element
 * @param todoItem
 * @returns {boolean}
 */
export function deleteTodoItem({ element, todoItem}) {
  if (!confirm('Вы уверены?')) {
    return false;
  }
  let arrRes = getTodoList(todoItem.owner);

  const index = arrRes.findIndex(n => n.id === element.dataset.id);
  if (index !== -1) {
    arrRes.splice(index, 1);
    element.remove();
    saveDataStorage(todoItem.owner, arrRes);
  }
}
