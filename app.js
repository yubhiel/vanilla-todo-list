// Initialize the application once the DOM content is fully loaded
document.addEventListener('DOMContentLoaded', () => {
	const input = document.querySelector('#new-todo');
	const addButton = document.querySelector('#add-todo');
	const list = document.querySelector('#todo-list');

	console.log(input, addButton, list);
});
