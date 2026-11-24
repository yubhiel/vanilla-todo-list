// Initialize the application once the DOM content is fully loaded
document.addEventListener('DOMContentLoaded', () => {
	const STORAGE_KEY = 'todos';

	const input = document.querySelector('#new-todo');
	const addButton = document.querySelector('#add-todo');
	const list = document.querySelector('#todo-list');

	function saveTodos() {
		const todos = [];

		for (const item of list.children) {
			todos.push({
				text: item.querySelector('span').textContent,
				done: item.classList.contains('done'),
			});
		}

		localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
	}

	function addTodoItem(text) {
		const item = document.createElement('li');
		item.classList.add('todo-item');

		const label = document.createElement('span');
		label.textContent = text;

		const actions = document.createElement('div');
		actions.classList.add('todo-actions');

		const checkButton = document.createElement('button');
		checkButton.classList.add('action-check');
		checkButton.textContent = 'Terminée';

		const deleteButton = document.createElement('button');
		deleteButton.classList.add('action-delete');
		deleteButton.textContent = 'Supprimer';

		function setDone(isDone) {
			item.classList.toggle('done', isDone);
			checkButton.textContent = isDone ? 'À faire' : 'Terminée';
		}

		checkButton.addEventListener('click', () => {
			setDone(!item.classList.contains('done'));
			saveTodos();
		});

		deleteButton.addEventListener('click', () => {
			item.remove();
			saveTodos();
		});

		actions.append(checkButton, deleteButton);
		item.append(label, actions);
		list.append(item);
	}

	function addTodo() {
		const text = input.value.trim();

		if (text === '') {
			return;
		}

		addTodoItem(text);
		saveTodos();

		input.value = '';
		input.focus();
	}

	addButton.addEventListener('click', addTodo);

	input.addEventListener('keydown', (event) => {
		if (event.key === 'Enter') {
			addTodo();
		}
	});
});