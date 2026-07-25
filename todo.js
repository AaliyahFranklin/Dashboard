import { supabase } from './supabaseClient.js'

//defining todo struct
class Todo{
    constructor(text){
      this.text = text
      this.completed = false
      this.id = Date.now()
    }
    
}


let todoList =[] 
const listContainer = document.getElementById('listContainer')
const addButton = document.getElementById('addBtn')
addButton.addEventListener('click',()=>{addTodo()})


async function addTodo()
{
    const textBox= document.getElementById('textBox')
    const text = textBox.value
    textBox.value = " " //make the text box empty

    const { error } = await supabase
    .from('Todos')
    .insert({text: text, completed: false})

    if(error)
    {
      console.error('Error adding todo:', error)
    }
    else{
      await displayList()
    }
}
async function displayList()
{
  //fetch from database then display
  const { data:Todos, error} = await supabase
  .from('Todos')
  .select('*')
  .order('completed', {ascending:true})

  if(error){
    console.error("Error fetching todos:", error)
    return
  }
  listContainer.textContent =""
  Todos.forEach(todo=>{
    //create the new todo
    const listItem = document.createElement('div');
    listItem.className ="listItem"

    //complete btn
    const completedBtn = document.createElement('button')
    completedBtn.className = "completedBtn" //name for css
    const completeBtnIcon = document.createElement('i')
    completeBtnIcon.classList.add("fa-solid", "fa-check")
    completedBtn.appendChild(completeBtnIcon)
    completedBtn.addEventListener('click', async()=>{
      await supabase
        .from('Todos')
        .update({completed: true})
        .eq('id', todo.id)
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
    deleteBtn.addEventListener('click',async ()=>{
      await supabase
        .from('Todos')
        .delete()
        .eq('id', todo.id)
      displayList()
    })


   
    const textSpan = document.createElement('span') //inline text
    textSpan.className = 'text'
    textSpan.textContent = todo.text

    listItem.appendChild(completedBtn)
    listItem.appendChild(textSpan)
    listItem.appendChild(deleteBtn)
    listContainer.appendChild(listItem)

    todoList = todoList.sort((a,b) => a.completed - b.completed)
  })
  
}


await displayList()