import { httpService } from "./http-service.js";

const cases = document.querySelector('.cases')
const form = document.querySelector('.form')
const btnForm = document.querySelector('.btn-form')
const inputForm = document.querySelector('.input-form')
const inputEmail = document.querySelector('.input-form-email')
const inputMessage = document.querySelector('.input-form-message')



inputForm.focus()


async function fetchHandler (type, id, task, comment, completed) {
    const data = await httpService[type](id, task, comment, completed);
    if(type === "get") {
        data.forEach(element => {
            boxCreator(element.task, element.completed, element.comments, element._id, element.date, element.status, element.email, element.message)
        });
    }else if ( type == "post") {
        console.log("POST IN HANDLER")
        refresh()
    }else if ( type === "patch") {
        console.log('PATCH IN HANDLER')
    }else if ( type === "delete") {
        console.log('DELETE IN HANDLER')
    }
}

fetchHandler("get")


btnForm.addEventListener('click', e => {
    e.preventDefault()
    if(inputForm.value == ""){
        console.log('input är tom')
        return false
    }
    if(inputEmail.value == ""){
        console.log('email är tom')
        return false
    }
    if(inputMessage.value == ""){
        console.log('message är tom')
        return false
    }
    fetchHandler("post", inputForm.value, inputEmail.value, inputMessage.value)
    inputForm.value = ""
    inputEmail.value = ""
    inputMessage.value = ""
})

function boxCreator(task, completed, comments, id, date, status, email, message){
    const caseContainer = document.createElement('div')
    const paraDate = document.createElement('p')
    const headerCase = document.createElement('input')
    const inputComments = document.createElement('input')
    const btnEdit = document.createElement('button')
    const btnDelete = document.createElement('button')
    const paraEmail = document.createElement('p')
    const paraMessage = document.createElement('p')
    const infoContainer = document.createElement('div')


    
    cases.append(caseContainer)
    caseContainer.append(infoContainer)
    infoContainer.append(paraMessage)
    infoContainer.append(paraEmail)

    caseContainer.append(headerCase)
    caseContainer.append(inputComments)
    caseContainer.append(btnEdit)
    caseContainer.append(btnDelete)
    caseContainer.append(paraDate)

    //DROPDOWN

    const dropdown = document.createElement('select')
    const optionLabel = document.createElement('label')

    const waitingOption = document.createElement('option')
    const ongoingOption = document.createElement('option')
    const finishedOption = document.createElement('option')

    caseContainer.append(dropdown)
    dropdown.append(optionLabel)
    dropdown.append(waitingOption)
    dropdown.append(ongoingOption)
    dropdown.append(finishedOption)

    if(status == "WAITING"){
        waitingOption.selected = true
        dropdown.style.backgroundColor = "red"
    }
    if(status == "ONGOING"){
        ongoingOption.selected = true
        dropdown.style.backgroundColor = "yellow"
    }
    if(status == "FINISHED"){
        finishedOption.selected = true
        dropdown.style.backgroundColor = "green"
    }
    

    waitingOption.innerText = "WAITING"
    ongoingOption.innerText = "ONGOING"
    finishedOption.innerText = "FINISHED"

    dropdown.setAttribute('class', 'dropdown')

    headerCase.value = task
    inputComments.value = comments
    btnEdit.innerText = "EDIT"
    btnDelete.innerText = "DELETE"
    paraDate.innerText = date
    paraEmail.innerText = email
    paraMessage.innerText = message


    
    caseContainer.setAttribute('class', "case-container")
    inputComments.setAttribute('readonly', 'readonly')
    headerCase.setAttribute('readonly', 'readonly')
    inputComments.setAttribute('class', 'input-readonly')
    headerCase.setAttribute('class', 'input-readonly')
    paraEmail.setAttribute('class', 'email-style')
    paraMessage.setAttribute('class', 'message-style')
    paraDate.setAttribute('class', 'date-style')
    
    
    dropdown.addEventListener('change', e => {
        if(dropdown.value == "WAITING"){
            dropdown.style.backgroundColor = "red"
        }
        if(dropdown.value == "ONGOING"){
            dropdown.style.backgroundColor = "yellow"
        }
        if(dropdown.value == "FINISHED"){
            dropdown.style.backgroundColor = "green"
        }

        const newStatus = dropdown.value
        fetchHandler('patch', `${id}`, task, comments, newStatus)
        console.log(newStatus)
    })
    

    btnEdit.addEventListener('click', e => {
        e.preventDefault()
        if(btnEdit.innerText == "EDIT"){
            btnEdit.innerText = "SAVE";
            inputComments.removeAttribute('readonly', 'readonly')
            headerCase.removeAttribute('readonly', 'readonly')
            inputComments.setAttribute('class', 'input-readable')
    headerCase.setAttribute('class', 'input-readable')
        }else if(btnEdit.innerText = "SAVE"){
            btnEdit.innerText = "EDIT"
            inputComments.setAttribute('readonly', 'readonly')
            headerCase.setAttribute('readonly', 'readonly')
            inputComments.setAttribute('class', 'input-readonly')
            headerCase.setAttribute('class', 'input-readonly')
            const completed = dropdown.value
            fetchHandler('patch', `${id}`, `${headerCase.value}`, `${inputComments.value}`, completed)
        }
    })
    
    btnDelete.addEventListener('click', e => {
        e.preventDefault()
        btnDelete.parentElement.remove()
        fetchHandler("delete", `${id}`)
    })
}


function refresh() {
    inputForm.focus()
    document.querySelectorAll('.case-container').forEach(e => e.remove());
    fetchHandler("get")
}

