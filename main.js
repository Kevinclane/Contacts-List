let contacts = []

loadContacts()
drawContacts()

function loadAddContact() {
  document.getElementById("new-contact-form").classList.remove("hidden")

}

function hideAddContact() {
  document.getElementById("new-contact-form").classList.add("hidden")

}

function addContact(event) {
  event.preventDefault()
  let form = event.target

let contact = {
  id: generateId(),
  name: form.name.value,
  number: form.number.value,
  ICE: form.EMC.checked
} 
  contacts.push(contact)
  console.log(contacts)
  saveContacts()
  form.reset()
  hideAddContact()
}

function saveContacts() {
  window.localStorage.setItem("contacts", JSON.stringify(contacts))
  drawContacts()
}

function loadContacts() {
  let savedContacts = JSON.parse(window.localStorage.getItem("contacts"))
  if (savedContacts){
    contacts = savedContacts
  }
}

function drawContacts() {
  let contactListElem = document.getElementById("contact-list")  
  let template =""
  contacts.forEach(contact => {
    template += `
    <div class="contact-card card mt-1 mb-1 ${contact.ICE ?  'emergency-contact' : ''}">
    <h3 class="mt-1 mb-1">${contact.name}</h3>
    <div class="d-flex space-between">
      <p>
        <i class="fa fa-fw fa-phone"></i>
        <span>${contact.number}</span>
      </p>
      <i class="action fa fa-trash text-danger" onclick = "removeContact('${contact.id}')"></i>
    </div>
  </div>
    `
  })
  contactListElem.innerHTML = template
}

function removeContact(contactId) {
  let index  = contacts.findIndex(contact => contact.id == contactId)
  if (index == -1){
    throw new Error("Invalid contact ID")
  }
  contacts.splice(index, 1)
  saveContacts()
}

function generateId() {
  return Math.floor(Math.random() * 10000000) + "-" + Math.floor(Math.random() * 10000000)
}

