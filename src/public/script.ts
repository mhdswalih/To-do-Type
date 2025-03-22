const addForm = document.getElementById('addForm') as HTMLFormElement;
const taskList = document.getElementById('todoUl') as HTMLUListElement;



// Add Task
addForm.addEventListener('submit', async (event: Event) => {
    event.preventDefault();
    const input = document.getElementById('todotext') as HTMLInputElement;
   
    let title = input.value;
    if (title.trim()) {
        const response = await fetch(`/add-task/${title}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' 
            },
            // body: JSON.stringify({ title})

        });

        if (response) {
            location.reload();
        } else {
            console.error('Failed to add task');
        }
    }
});

// Handle Task Actions (Delete, Complete, Edit)
taskList.addEventListener('click', async (event: Event) => {
    const target = event.target as HTMLElement;

    const deleteButton = target.closest('.delete-action');
    const doneButton = target.closest('.done-action');
    const editButton = target.closest('.edit-action');
    const saveButton = target.closest('.save-btn');
   
    

    if (deleteButton) {
        // Delete Task
        const taskId = deleteButton.getAttribute('data-task-id');
        const response = await fetch(`/delete-task/${taskId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            // body: JSON.stringify({ id: taskId })
        });

        if (response.ok) {
            location.reload();
        } else {
            console.error('Failed to delete task');
        }
    } else if (doneButton) {
        // Toggle Task Status
        const taskId = doneButton.getAttribute('data-task-id');
        const response = await fetch(`/complete-task/${taskId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            // body: JSON.stringify({ id: taskId })
        });

        if (response.ok) {
            location.reload();
        } else {
            console.error('Failed to complete task');
        }
    } else if (editButton) {
        // Edit Task

        const id = editButton.getAttribute('data-task-id');
       
        
        const spanElement = document.getElementById(`task-title-${id}`) as HTMLElement;
       
        
        
        const inputElement = document.createElement('input');
      
        
        inputElement.type = 'text';
        inputElement.value = spanElement.innerText;
        inputElement.id = `edit-input-${id}`;
        spanElement.replaceWith(inputElement);
      
        
        inputElement.focus();

        // Change the Edit button to a Save button
        editButton.textContent = 'Save';
        editButton.classList.add('save-btn');
        editButton.classList.remove('edit-action');
    } else if (saveButton) {
        // Save Edited Task
        const id = saveButton.getAttribute('data-task-id');
        const title = (document.getElementById(`edit-input-${id}`)) as HTMLInputElement;
       
        
        const response = await fetch(`/edit-task/${id}/${title.value}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            // body: JSON.stringify({ id: id, title: title.value })
        });

        if (response.ok) {
            location.reload();
        } else {
            console.error('Failed to edit task');
        }
    }
});