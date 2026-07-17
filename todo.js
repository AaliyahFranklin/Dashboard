//defining todo struct
class Todo{
    constructor(text){
      this.text = text
      this.starred = false
      this.completed = false
      this.id = Date.now()
    }
    
}


let todoList =[] 
const listContainer = document.getElementById('listContainer')
const addButton = document.getElementById('addBtn')
addButton.addEventListener('click',()=>{addTodo()})


function addTodo()
{
    const textBox= document.getElementById('textBox')
    const text = textBox.value
    textBox.value = " " //make the text box empty
    if(text !== " ")
    {
      const newTodo = new Todo(text)
      todoList.push(newTodo)
      displayList()
    }
   

}
function displayList()
{
  listContainer.textContent =""
  todoList.forEach(todo=>{
    //create the new todo
    const listItem = document.createElement('div');
    listItem.className ="listItem"

    //complete btn
    const completedBtn = document.createElement('button')
    completedBtn.className = "completedBtn" //name for css
    const completeBtnIcon = document.createElement('i')
    completeBtnIcon.classList.add("fa-solid", "fa-check")
    completedBtn.appendChild(completeBtnIcon)
    completedBtn.addEventListener('click', ()=>{
      todo.completed = true;
      todoList = todoList.sort((a,b) => a.completed - b.completed) //moves completed todos to bottom
      displayList()
    })
    //mark as complete
    if(todo.completed == true)
    {
      completedBtn.style.backgroundColor ='rgb(130, 207, 170)'
      listItem.style.textDecoration='line-through'
    }
    

    //trash btn
    const deleteBtn = document.createElement('button')
    deleteBtn.className ="deleteBtn" //name for css
    const deleteBtnIcon = document.createElement('i')
    deleteBtnIcon.classList.add("fa-solid", "fa-trash")
    deleteBtn.appendChild(deleteBtnIcon)
    deleteBtn.addEventListener('click',()=>{
      todoList = todoList.filter(t=> t.id !== todo.id) //checks if the todo id we are looking at is different than the one we are removing
      displayList()
    })
    
    listItem.textContent = todo.text;
    listItem.appendChild(completedBtn)
    listItem.appendChild(deleteBtn)

    listContainer.appendChild(listItem)
    todoList = todoList.sort((a,b) => a.completed - b.completed)
  })
  
}
displayList()