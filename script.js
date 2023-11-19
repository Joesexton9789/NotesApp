const saveBtn = document.getElementById('save')
const noteList = document.querySelector('.notes')
const titleInput = document.getElementById('input')
const textArea = document.getElementById('textarea')
const addNoteBtn = document.getElementById('add-note')

let notes = []
let editMode = false

function addToNotes() {
  
  if (createNoteDiv() === undefined) {
    return
  }

  if (textArea.value === '') {
    return
  }

  const note = createNoteDiv()
  noteList.appendChild(note)

  pushToArr(titleInput.value, textArea.value)

  titleInput.value = ''
  textArea.value = ''
  editMode = false
  saveBtn.innerText = 'Save'
  console.log(notes)
}

function createNoteDiv() {
  const div = document.createElement('div')
  div.classList.add('note')

  if (titleInput.value === '') {
    return
  }
  div.innerHTML = `${titleInput.value}<i class="fa fa-x"></i>`
  return div
}

function pushToArr(title, body) {
  notes.push({title: title, body: body})
}

function showNote(e) {
  console.log(e.target)

  if (!e.target.classList.contains('note')) {
    return
  }

  const child = e.target
  const parent = child.parentNode

  const indx = Array.prototype.indexOf.call(parent.children, child)

  if (e.target.classList.contains('fa-x')) {
    e.target.parentElement.remove()
  }

  titleInput.value = notes[indx-2].title
  textArea.value = notes[indx-2].body
  saveBtn.innerText = 'Edit'
  editMode = true

  return (indx - 2)
}

function clearInputs() {
  titleInput.value = ''
  textArea.value = ''
}

saveBtn.addEventListener('click', addToNotes)
noteList.addEventListener('click', showNote)
addNoteBtn.addEventListener('click', clearInputs)

titleInput.focus()
