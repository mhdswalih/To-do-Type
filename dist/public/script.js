"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const addForm = document.getElementById('addForm');
const taskList = document.getElementById('todoUl');
// Add Task
addForm.addEventListener('submit', (event) => __awaiter(void 0, void 0, void 0, function* () {
    event.preventDefault();
    const input = document.getElementById('todotext');
    console.log(input.value, 'this is add tak');
    let title = input.value;
    if (title.trim()) {
        const response = yield fetch(`/add-task/${title}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            // body: JSON.stringify({ title})
        });
        if (response) {
            location.reload();
        }
        else {
            console.error('Failed to add task');
        }
    }
}));
// Handle Task Actions (Delete, Complete, Edit)
taskList.addEventListener('click', (event) => __awaiter(void 0, void 0, void 0, function* () {
    const target = event.target;
    const deleteButton = target.closest('.delete-action');
    const doneButton = target.closest('.done-action');
    const editButton = target.closest('.edit-action');
    const saveButton = target.closest('.save-btn');
    console.log(editButton, 'this is editbutton');
    if (deleteButton) {
        // Delete Task
        const taskId = deleteButton.getAttribute('data-task-id');
        const response = yield fetch(`/delete-task/${taskId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            // body: JSON.stringify({ id: taskId })
        });
        if (response.ok) {
            location.reload();
        }
        else {
            console.error('Failed to delete task');
        }
    }
    else if (doneButton) {
        // Toggle Task Status
        const taskId = doneButton.getAttribute('data-task-id');
        const response = yield fetch(`/complete-task/${taskId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            // body: JSON.stringify({ id: taskId })
        });
        if (response.ok) {
            location.reload();
        }
        else {
            console.error('Failed to complete task');
        }
    }
    else if (editButton) {
        // Edit Task
        const id = editButton.getAttribute('data-task-id');
        console.log(id, 'thsi is id form edit');
        const spanElement = document.getElementById(`task-title-${id}`);
        console.log(spanElement, 'thsi is span element edit');
        const inputElement = document.createElement('input');
        console.log(inputElement, 'this is input element');
        inputElement.type = 'text';
        inputElement.value = spanElement.innerText;
        inputElement.id = `edit-input-${id}`;
        spanElement.replaceWith(inputElement);
        console.log(inputElement.value, 'this is input elemnt value ');
        inputElement.focus();
        // Change the Edit button to a Save button
        editButton.textContent = 'Save';
        editButton.classList.add('save-btn');
        editButton.classList.remove('edit-action');
    }
    else if (saveButton) {
        // Save Edited Task
        const id = saveButton.getAttribute('data-task-id');
        const title = (document.getElementById(`edit-input-${id}`));
        console.log(title, 'this is edit taks');
        const response = yield fetch(`/edit-task/${id}/${title.value}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            // body: JSON.stringify({ id: id, title: title.value })
        });
        if (response.ok) {
            location.reload();
        }
        else {
            console.error('Failed to edit task');
        }
    }
}));
