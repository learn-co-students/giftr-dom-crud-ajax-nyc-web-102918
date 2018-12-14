// populates gifts!
const giftInitializer = () => {
    fetch('http://localhost:3000/gifts')
    .then(r => r.json())
    .then(gifts => {
        for(let gift of gifts){
            const ul = document.querySelector("#gift-list")
            ul.innerHTML += `<li> <p><strong>${gift.name}</strong></p>
                                <img id='gift_image' src ='${gift.image}'/>

                                <button type='submit' data-action='delete' class='ui button'>Delete</button>

                                <button type='submit' data-action='edit' class='ui button'>Edit</button>
                            </li>`
        }
    })
}

//add to database
const addNewGift = (newGiftName, newGiftImage) => {
    fetch('http://localhost:3000/gifts', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }, 
        body:JSON.stringify({
           name: newGiftName,
           image:  newGiftImage
        })    
    })
    .then(r => r.json())
    .then(gifts => {
            const ul = document.querySelector("#gift-list")
            ul.innerHTML += `<li> <p><strong>${newGiftName}</strong></p>
                                <img id='gift_image' src ='${newGiftImage}'/>

                                <button type='submit' data-action='delete' class='ui button'>Delete</button>

                                <button type='submit' data-action='edit' class='ui button'>Edit</button>
                            </li>`
    })
}

//creates edit form!
const addEditForm = () => {
    const node = event.target.parentNode
    const image = node.querySelector('img')
    const p = node.querySelector('p')
    node.innerHTML += `<form id="edit-gift-form" class="ui form" action="index.html" method="POST">
    <label for="name">Gift Name: </label>
    <input id="gift-name-input" type="text" name="name" value="${p.textContent}">
    <label for="image">Gift Image: </label>
    <input id="gift-image-input" type="text" name="image" value="${image.src}">
    <br>
    <button id="gift-form-button" type="submit" name="button" class="ui button">Edit Gift</button>
  </form>`
}

//filtered gifts based on search 
const filteredGifts = (ul) => {
    let gifts= [...ul.children]
    let filteredGifts = gifts.filter(gift => gift.textContent.includes(event.target.value))

     ul.innerHTML = ''

     for(let gift of filteredGifts){
       ul.innerHTML += `<li>${gift.innerHTML}</li>`
     }
}

// You can add your event handlers here! 

// initializing the gift
// const giftInitializer = (gifts) => {
//     // const ul = document.querySelector(".gift-list")

//     // for(let gift of gifts){
//     //     // Created the li
//     //     let li = document.createElement('li');
    
//     //     // Created, added, and appended the gift titles
//     //     let p = document.createElement('p')
//     //     p.textContent = gift.name
//     //     li.appendChild(p)
    
//     //     // created and appended the edit & delete button 
//     //     let editButton = document.createElement('input')
//     //     editButton.name = 'submit'
//     //     editButton.value = 'Edit'
//     //     editButton.type = 'submit'
//     //     editButton.id = `${gift.name.split(' ').join('-')}-edit`
//     //     li.appendChild(editButton)
    
//     //     let deleteButton = document.createElement('input')
//     //     deleteButton.name = 'submit'
//     //     deleteButton.id = `${gift.name.split(' ').join('-')}-delete`
//     //     deleteButton.value = 'Delete'
//     //     deleteButton.type = 'submit'
//     //     li.appendChild(deleteButton)
    
    
    
//     //     //Created, added, and appended gift images
//     //     let img = document.createElement('img')
//     //     img.src = gift.image
//     //     li.appendChild(img)
    
    
    
//     //     //appended the li into ul
//     //     ul.appendChild(li)
    
    
    
//         // ANOTHER EXAMPLE!
    
//         // gifts.forEach((gift) => {
//         //   giftLift.innerHTML += `<li>
//         //                           ${gift.name} </br>
//         //                           <img src= `${gift.image}`width=200>
//         //                           <button data-action='edit-gift' class = 'ui button'>Edit </button>
//         //                            <button data-action='delete-gift' class = 'ui button'>Delete </button>
//         //                         </li>`
//         // })
        
//       }
// }