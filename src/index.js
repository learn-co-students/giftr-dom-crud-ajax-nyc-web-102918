document.addEventListener('DOMContentLoaded', () => {
  
  const ul = document.querySelector("#gift-list")
  const newGift = document.getElementById("new-gift-form")
  const filterInput = document.querySelector('#filter-input')


  giftInitializer()

  ul.addEventListener('click', (event) => { 

    if(event.target.dataset.action == "delete"){
      event.target.parentNode.remove() 
    }
    else if (event.target.dataset.action == "edit"){
      addEditForm()
    }
  }) 

  document.addEventListener('submit', (event) =>{
    event.preventDefault()
    const newGiftName = event.target.querySelector("#gift-name-input").value

    const newGiftImage = event.target.querySelector("#gift-image-input").value

    addNewGift(newGiftName, newGiftImage)
  })

  filterInput.addEventListener('input', (event) => {
    if (event.target.value === ''){ 
      giftInitializer()
    }
    filteredGifts(ul)
  })
})




  // selected the ul node
  
  // another way document.getElementById('gift-list')

  // iterate through the gifts array  and assigned it to a list item and appended it to the ul node. 


    // iterate through ul's list items 
//     for (let listItem of ul.children){
//       // created event listeners for each childnode in ul. 
//       listItem.addEventListener('click', (event) =>{
//         event.preventDefault()
        
//         if (event.target.value == 'Edit'){
//           event.target.parentNode.querySelector('p')
//           .contentEditable = "true";

//           let list = event.target.parentNode
//           let img = event.target.parentNode.querySelector('img').src

//           //Create the url text are for the edit form 
//           url = document.createElement('input')
//           url.type = 'url'
//           url.value = img
//           url.id = 'url'

//           // Create the submit button for the edit form
//           urlSubmit = document.createElement('button')
//           urlSubmit.value = "Change Image"
//           urlSubmit.name = "Change Image"
//           urlSubmit.textContent = "Change Image"

//           list.appendChild(url)
//           list.appendChild(urlSubmit)

//           // let giftTitle = document.createElement('textarea')
//           // giftTitle.name = "Title"

//           // event.target.parentNode.appendChild(giftTitle)
//           // let giftImage = document.createElement('textarea')
//           // giftImage.name = "Image link"
//           // event.target.parentNode.appendChild(giftImage)


//         if(event.target.value =="Change Image"){
//           // find the url node using the ID
//           let urlText = event.target.parentNode.querySelector('#url')

//           // find the image node
//           let image = event.target.parentNode.querySelector('img')
//           // replace the img src with the new value
//           image.src = urlText.value

//           // remove the edit form
//           urlText.remove()
//           event.target.remove()
//         }
//       })
//     }

//     let filterInput = document.querySelector('#filter-input')

//     filterInput.addEventListener('input', (event) => {
//       event.preventDefault()
      
//       const search = event.target.value

//       const filtered_gift = gifts.filter(gift => gift.name.includes(search))

//       ul.innerHTML = ''

//       //in the Event Handler
//       giftInitializer(filtered_gift) 


//     })

// });


// giftList.addeventListener('click', (event) => {
//     if (event.target.dataset.action === 'edit-gift'){
//       constgiftId = event.target.dataset.id
//       const gift = document.getElementById(`gift-${giftId}`)

//       gift.innerHTML += `<form id="edit-gift-form" class="ui form" action="index.html" method="POST">
//       <label for="name">Gift Name: </label>
//       <input id="edit-gift-name-input" type="text" name="name" value="">
//       <label for="image">Gift Image: </label>
//       <input id="edit-gift-image-input" type="text" name="image" value="">
//       <br>
//       <button data-action='edit-gift-details' id="edit-gift-form-button" type="submit" name="button" class="ui button">Create a Edit Gift</button>
//     </form>`
//     }else if(event.target.dataset.action === 'delete-gift'){
//         event.target.parentNode.remove()
//     }
//     if (event.target.dataset.action === 'edit-gift-form-button'){
//       event.preventDefault()

//       const name = document.getElementById('edit-gift-name').value
//       const image = documenet.getElementById('edit-gift-image-input').value
//       const gift = event.target
//       gift.innerHTML += `${gift.name} </br>
//                           <img src= `${gift.image}`width=200>
//                           <button data-action='edit-gift' class = 'ui   button'>Edit </button>`
//     } 



//   }
// )


// filterInput.addEventListener('input', (event) => {
//   // event.preventDefault()

//   let searchTerm = event.target.value

//   const filteredGifts = gifts.filter(gift =>  gift.name.includes(searchTerm))

//   giftLists.innerHTML = ''

//   filteredGifts.forEach((gift) => {
//       giftLift.innerHTML += `<li>
//                               ${gift.name} </br>
//                               <img src= `${gift.image}`width=200>
//                               <button data-action='edit-gift' class = 'ui button'>Edit </button>
//                                <button data-action='delete-gift' class = 'ui button'>Delete </button>
//                             </li>`
//     })

// })