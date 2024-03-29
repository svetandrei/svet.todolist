/**
 * Get todo by owner
 * @param owner
 * @returns {Promise<any>}
 */
export async function getTodoList(owner) {
  const response = await fetch(`http://localhost:3000/api/todos/?owner=${owner}`);
  return await response.json();
}

/**
 * Create todo item
 * @param name
 * @param owner
 * @returns {Promise<any>}
 */
export async function createTodoItem({ name, owner}) {
  const response = await fetch('http://localhost:3000/api/todos', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      name,
      owner
    })
  });
  return await response.json();
}

/**
 * Switch done by todo
 * @param todoItem
 */
export function switchTodoItemDone({ todoItem }) {
  todoItem.done = !todoItem.done;
  fetch(`http://localhost:3000/api/todos/${todoItem.id}`, {
    method: 'PATCH',
    body: JSON.stringify({
      done: todoItem.done,
    }),
    headers: {'Content-Type': 'application/json'},
  })
}

/**
 * Delete todo by id
 * @param element
 * @param todoItem
 * @returns {boolean}
 */
export function deleteTodoItem({ element, todoItem}) {
  if (!confirm('Вы уверены?')) {
    return false;
  }
  element.remove();
  fetch(`http://localhost:3000/api/todos/${todoItem.id}`, {
    method: 'DELETE',
  })
}
