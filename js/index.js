//Import lớp đối tượng
import { ToDoList } from "./todo-list.js";
import { ToDo } from "./todo.js";

$(document).ready(function () {
	let todoList = new ToDoList("todoList");
	let completeList = new ToDoList("completeList");

	const showToDoList = (ulToDo) => {
		ulToDo.html(todoList.renderToDo());
	};

	const showCompleteList = (ulCompleted) => {
		ulCompleted.html(completeList.renderToDo());
	};

	const moveToDo = (depart, arrival, obj, tdIndex) => {
		depart.removeToDo(tdIndex);
		arrival.addToDo(obj);
	};

	const sortASC = () => {
		let ulToDo = $("#todo");

		todoList.sortToDoList(false);
		showToDoList(ulToDo);
	};

	const sortDES = () => {
		let ulToDo = $("#todo");

		todoList.sortToDoList(true);
		showToDoList(ulToDo);
	};

	const addToDo = () => {
		let txtToDo = $("#newTask").val();
		let ulToDo = $("#todo");

		if (txtToDo != "") {
			let td = new ToDo(txtToDo, "todo");
			todoList.addToDo(td);
		}
		showToDoList(ulToDo);

		$("#newTask").val("");
	};

	const deleteToDo = (e) => {
		let tdIndex = e.currentTarget.getAttribute("data-index");
		let status = e.currentTarget.getAttribute("data-status");
		let ulToDo = $("#todo");
		let ulCompleted = $("#completed");

		if (status == "todo") {
			todoList.removeToDo(tdIndex);
			showToDoList(ulToDo);
		} else if (status == "completed") {
			completeList.removeToDo(tdIndex);
			showCompleteList(ulCompleted);
		} else {
			alert("Cannot delete todo!");
		}
	};

	window.deleteToDo = deleteToDo;

	const completeToDo = (e) => {
		let tdIndex = e.currentTarget.getAttribute("data-index");
		let status = e.currentTarget.getAttribute("data-status");
		let ulToDo = $("#todo");
		let ulCompleted = $("#completed");

		if (status == "todo") {
			// slice: start <=index <end
			let completedItem = todoList.tdList.slice(tdIndex, tdIndex + 1);
			let objToDo = new ToDo(completedItem[0].textTodo, "completed");

			moveToDo(todoList, completeList, objToDo, tdIndex);
			showToDoList(ulToDo);
			showCompleteList(ulCompleted);
		} else if (status == "completed") {
			let undoItem = completeList.tdList.slice(tdIndex, tdIndex + 1);
			let objToDo = new ToDo(undoItem[0].textTodo, "todo");

			moveToDo(completeList, todoList, objToDo, tdIndex);
			showToDoList(ulToDo);
			showCompleteList(ulCompleted);
		} else {
			alert("Cannot move todo !");
		}
	};

	window.completeToDo = completeToDo;

	$("#addItem").click(addToDo);
	$("#sortASC").click(sortASC);
	$("#sortDES").click(sortDES);

	let ulToDo = $("#todo");
	showToDoList(ulToDo);

	let ulCompleted = $("#completed");
	showCompleteList(ulCompleted);
});
