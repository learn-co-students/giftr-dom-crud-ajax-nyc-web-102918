document.addEventListener('DOMContentLoaded', () => {
  // console.log('DOM has been fully loaded')
  // console.log(gifts)
  // const giftList = document.querySelector('.gift-list')
  const giftList = document.getElementById('gift-list')
  const filterInput = document.getElementById('filter-input')
  const giftForm = document.getElementById('new-gift-form')

  // boolean to check if we clicked on the edit button:
  let clicked = false
  // for (let gift of gifts) {
  //   console.log(gift)
  // }
  let allGifts = []
  let editForm

  function fetchGifts() {
    fetch("http://localhost:3000/gifts")
    .then(r => {
      return r.json()
    })
    .then(data => {
      allGifts = data
      showGifts(data)
    })
  }



  // ADD NEW GIFT
  giftForm.addEventListener('submit', event => {
    event.preventDefault()
    const giftName = event.target.querySelector('#gift-name-input').value
    const giftImage = event.target.querySelector('#gift-image-input').value
    //console.log(giftName, giftImage);

    fetch("http://localhost:3000/gifts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
				"Accept": "application/json"
      },
      body: JSON.stringify({
				name: giftName,
				image: giftImage
			})

    })
    .then(response => {
      return response.json()
    })
    .then(data => {
      giftForm.reset()
      allGifts.push(data)
      showGifts(allGifts)
    })

  })









  // BUTTON CLICK HANDLERS
  giftList.addEventListener( 'click', (event) => {
    // EDIT BUTTON
    if (event.target.dataset.action === "edit-gift") {
      clicked = !clicked

      if (clicked) {
        const gift = event.target.parentNode
        console.log(gift);
        // const gift = event.target.dataset.id
        // const gift = document.getElementById(`gift-${giftId}`)

        gift.innerHTML += `
          <form id="edit-gift-form" data-actionclass="ui form" action="index.html" method="POST">
            <label for="name">Gift Name: </label>
            <input id="edit-gift-name" type="text" name="name" value="">
            <label for="image">Gift Image: </label>
            <input id="edit-gift-image" type="text" name="image" value="">
            <br>
            <button data-action='edit-gift-details' id="edit-gift-form-button" type="submit" name="button" class="ui button">Edit Gift</button>
          </form>`
          const editGiftForm = document.getElementById('edit-gift-form')
          editGift(editGiftForm, gift)
      } else {
        const form = document.getElementById('edit-gift-form')
        form.remove()
      }
    }

    // if (event.target.dataset.action === 'edit-gift-details') {
    //   event.preventDefault()
    //
    //   const name = document.getElementById('edit-gift-name').value
    //   const image = document.getElementById('edit-gift-image').value
    //   const gift = event.target.parentNode.parentNode
    //
    //   gift.innerHTML = `
    //       ${name} <br />
    //       <img src='${image}' height=200 width=200>
    //       <br>
    //       <button data-action='edit-gift' class='ui button'>Edit</button>
    //       <button data-action='delete-gift' class='ui button'>Delete</button>`
    //
    // }



    // EDIT GIFT
    function editGift(editForm, gift) {
      editForm.addEventListener("submit", event => {
        event.preventDefault()
        giftId = gift.dataset.id
        updatedName = event.target.querySelector("#edit-gift-name").value
        updatedImage = event.target.querySelector("#edit-gift-image").value

        fetch(`http://localhost:3000/gifts/${giftId}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
    				"Accept": "application/json"
          },
          body: JSON.stringify({
    				name: updatedName,
    				image: updatedImage
    			})
        })
        .then(response => {
          return response.json()
        })
        .then(data => {
          console.log(data);

          const selectedGift = allGifts.find(gift => {
            return gift.id === data.id
          })

          selectedGift.name = data.name
          selectedGift.image = data.image

          console.log(selectedGift, allGifts);

          gift.innerHTML = `
            ${data.name} <br />
              <img src='${data.image}' height=200 width=200>
              <br>
              <button data-action='edit-gift' class='ui button'>Edit</button>
              <button data-action='delete-gift' class='ui button'>Delete</button>`
        })
      })
    }




    // DELETE BUTTON
    if (event.target.dataset.action === 'delete-gift') {
      const giftId = event.target.parentNode.dataset.id

      fetch(`http://localhost:3000/gifts/${giftId}`, {
        method: "DELETE"
      })

      const selectedGift = allGifts.find(gift => {
        return gift.id == giftId
      })

      const deleteIndex = allGifts.indexOf(selectedGift)

      allGifts.splice(deleteIndex, 1)

      event.target.parentNode.remove()
    }
  })





  // Search Filter
  filterInput.addEventListener( 'input', (event) => {
    const searchTerm = event.target.value

    const filteredGifts = allGifts.filter(function(gift) {
      return gift.name.includes(searchTerm)
    })

    giftList.innerHTML = ''

    showGifts(filteredGifts)
  })


  function showGifts(gifts) {
    giftList.innerHTML = ""
    gifts.forEach(function(gift) {
      giftList.innerHTML += `
        <li data-id='${gift.id}'>
          ${gift.name} <br />
          <img src='${gift.image}' height=200 width=200>
          <br>
          <button data-action='edit-gift' class='ui button'>Edit</button>
          <button data-action='delete-gift' class='ui button'>Delete</button>
        </li>`
    })
  }



fetchGifts()

}) // end of DOM load event
