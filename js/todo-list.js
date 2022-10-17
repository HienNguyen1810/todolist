export class ToDoList {
	constructor(name) {
		this.stt = name;
		this.tdList = JSON.parse(localStorage.getItem(`tdList${this.stt}`)) || [];
	}

	addToDo(todo) {
		if (!this.tdList.map((d) => d.textTodo).includes(todo.textTodo)) {
			this.tdList.push(todo);
			localStorage.setItem(`tdList${this.stt}`, JSON.stringify(this.tdList));
			return true;
		} else {
			alert(`duplicate task name: ${todo.textTodo}`);
			return false;
		}
	}

	removeToDo(index) {
		if (index <= this.tdList.length) {
			this.tdList.splice(index, 1);
			localStorage.setItem(`tdList${this.stt}`, JSON.stringify(this.tdList));
		}
	}

	renderToDo() {
		let content = "";
		content = this.tdList.reduceRight((tdContent, item, index) => {
			tdContent += `
                <li>
                    <span>${item.textTodo}</span>
                    <div class="buttons">
                        <button class="remove" data-index="${index}" data-status="${item.status}" onclick="deleteToDo(event)">
                            <i class="fa fa-trash-alt"></i>
                        </button>
                        <button class="complete" data-index="${index}"  data-status="${item.status}" onclick="completeToDo(event)" >
                            <i class="far fa-check-circle"></i>
                            <i class="fas fa-check-circle"></i>
                        </button>
                    </div>
                </li>
            `;
			return tdContent;
		}, "");
		return content;
	}

	sortToDoList(isDES) {
		this.tdList.sort((todo, nextToDo) => {
			const textA = todo.textTodo.toLowerCase();
			const textB = nextToDo.textTodo.toLowerCase();

			return textB.localeCompare(textA);
		});
		if (isDES) {
			this.tdList.reverse();
		}
	}
}
