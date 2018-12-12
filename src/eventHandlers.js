// You can add your event handlers here! 

// initializing the gift
const giftInitializer = (gifts) => {
    const ul = document.querySelector(".gift-list")

    for(let gift of gifts){
        // Created the li
        let li = document.createElement('li');
    
        // Created, added, and appended the gift titles
        let p = document.createElement('p')
        p.textContent = gift.name
        li.appendChild(p)
    
        // created and appended the edit & delete button 
        let editButton = document.createElement('input')
        editButton.name = 'submit'
        editButton.value = 'Edit'
        editButton.type = 'submit'
        editButton.id = `${gift.name.split(' ').join('-')}-edit`
        li.appendChild(editButton)
    
        let deleteButton = document.createElement('input')
        deleteButton.name = 'submit'
        deleteButton.id = `${gift.name.split(' ').join('-')}-delete`
        deleteButton.value = 'Delete'
        deleteButton.type = 'submit'
        li.appendChild(deleteButton)
    
    
    
        //Created, added, and appended gift images
        let img = document.createElement('img')
        img.src = gift.image
        li.appendChild(img)
    
    
    
        //appended the li into ul
        ul.appendChild(li)
    
    
    
        // ANOTHER EXAMPLE!
    
        // gifts.forEach((gift) => {
        //   giftLift.innerHTML += `<li>
        //                           ${gift.name} </br>
        //                           <img src= `${gift.image}`width=200>
        //                           <button data-action='edit-gift' class = 'ui button'>Edit </button>
        //                            <button data-action='delete-gift' class = 'ui button'>Delete </button>
        //                         </li>`
        // })
        
      }
}