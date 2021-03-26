const listContainer = document.querySelector('[data-lists]')
const newListForm = document.querySelector('[data-new-list-form]')
const newListInput = document.querySelector('[data-new-list-input]')
const deleteListButton =document.querySelector('[data-delete-list-button]')

//create too keys 
const LOCAL_STORAGE_LIST_KEY = 'task.lists'
const LOCAL_STORAGE_SELECTED_LIST_ID_KEY = 'task.selectedListId'
let lists = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY))|| []
//it saying get (this) information from local stirage using this key and if it exists, parse it into an object
let selectedListId = localStorage.getItem
//get a variable for our selected list
(LOCAL_STORAGE_SELECTED_LIST_ID_KEY)

listContainer.addEventListener('click', e =>{
  if (e.target.tagName.toLowerCase() === 'li') {
    selectedListId = e.target.dataset.listId
    saveAndRender()
  }
})

deleteListButton.addEventListener('click', e => {
  lists = lists.filter(list => list.id !== selectedListId)
  selectedListId = null
  saveAndRender()
})

newListForm.addEventListener('submit', e => { //get event when you sibmit
  e.preventDefault()
  const listName = newListInput.value //name that you typed in new list
  //check if the new list or if the list name
  if (listName == null || listName === '')return
  const list = createList(listName)
  newListInput.value = null
  lists.push(list)
  saveAndRender() // add new list that type something in ...
}) 

function createList(name) {
  return { id: Date.now().toString(), name: name, tasks: []} //take the date object and convert that to a string
}

function saveAndRender() {
  save()
  render()
}

function save() {
  localStorage.setItem(LOCAL_STORAGE_LIST_KEY, JSON.stringify(lists))
  localStorage.setItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY,selectedListId) 
}

function render() {
  crearElement(listContainer)
  lists.forEach(list => {
    const listElement = document.createElement('li')
    listElement.dataset.listId = list.id
    listElement.classList.add("list-name") //add class
    listElement.innerText = list.name
    if (list.id = selectedListId) {
      listElement.classList.add('active-list')
    }
    listContainer.appendChild(listElement)
  })
}

function crearElement(elment) {
  while (elment.firstChild) { //remove it if the element has a first chilld
    elment.removeChild(elment.firstChild)
  }
}

//call render function
render()