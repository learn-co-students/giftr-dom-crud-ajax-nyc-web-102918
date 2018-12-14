document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM has been fully loaded')
  console.table(gifts)

  const giftList = document.querySelector('.gift-list')
  const newGiftForm = document.querySelector('#new-gift-form')
  let allGifts = []

  const fetchGifts = () => {
    fetch('http://localhost:3000/gifts')
    .then(response => response.json())
    .then(data => {
      allGifts = data

      showAllGifts(allGifts)
    })
  }

  let clicked = false;

  const showAllGifts = (allGifts) => {
    allGifts.forEach((gift) => {
      giftList.innerHTML += `<li id="${gift.id}">
                              ${gift.name} <br />
                              <img src='${gift.image}' height=200 width=200>
                              <br>
                              <button data-action='edit-gift' class='ui button'>Edit</button>
                              <button data-action='delete-gift' class='ui button'>Delete</button>
                            </li>`
    })
  }


  ///////////////////// EDIT ///////////////////////

  giftList.addEventListener('click', (event) => {
    if (event.target.dataset.action === 'edit-gift') {
      clicked = !clicked;

      if (clicked) {
        const gift = event.target.parentNode
        gift.innerHTML += `<form id="edit-gift-form" class="ui form" action="index.html" method="POST">
                            <label for="name">Gift Name: </label>
                            <input id="edit-gift-name" type="text" name="name" value="">
                            <label for="image">Gift Image: </label>
                            <input id="edit-gift-image" type="text" name="image" value="">
                            <br>
                            <button data-action='edit-gift-details' id="edit-gift-form-button" type="submit" name="button" class="ui button">Edit Gift</button>
                          </form>`
      } else {
          const form = document.getElementById('edit-gift-form')
          form.remove()
      }
    }

    if (event.target.dataset.action === 'edit-gift-details') {
      event.preventDefault()

      const name = document.querySelector('#edit-gift-name').value;
      const image = document.querySelector('#edit-gift-image').value;
      const giftLi = event.target.parentNode.parentNode

      let foundGift = allGifts.find((gift) => {
        return gift.id == giftLi.id
      })

      giftLi.innerHTML = `
                        ${name} <br />
                        <img src= '${image}' height=200 width=200>
                        <br>
                        <button data-action='edit-gift' class='ui button'>Edit</button>
                        <button data-action='delete-gift' class='ui button'>Delete</button>
                        `

      fetch(`http://localhost:3000/gifts/${foundGift.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type' : 'application/json',
          'Accept' : 'application/json'
        },
        body: JSON.stringify({
          name: name,
          image: image
        })
      })
      .then(response => response.json())
      .then(data => {
        foundGift.name = data.name;
        foundGift.image = data.image;
      })
    }

    ///////////////////// DELETE /////////////////////////

    if (event.target.dataset.action === 'delete-gift') {
      const giftLi = event.target.parentNode
      event.target.parentNode.remove()

      let foundGift = allGifts.find((gift) => {
        return gift.id == giftLi.id
      })

      fetch(`http://localhost:3000/gifts/${foundGift.id}`, {
        method: 'DELETE'
      })

      allGifts.splice(allGifts.indexOf(foundGift), 1)
      console.log(allGifts);

    }


  })

  ///////////////////// FILTER //////////////////

  const filterInput = document.querySelector('#filter-input')

  filterInput.addEventListener('input', (event) => {
    const searchTerm = event.target.value;
    const filteredGifts = allGifts.filter((gift) => {
      return gift.name.includes(searchTerm)
    })

    giftList.innerHTML = ''

    showAllGifts(filteredGifts)
  })

  /////////////////// ADD NEW GIFT ///////////////////

  newGiftForm.addEventListener('submit', (event) => {
    event.preventDefault()
    const giftName = event.target.querySelector("#gift-name-input").value
    const giftImage = event.target.querySelector("#gift-image-input").value

    fetch('http://localhost:3000/gifts', {
      method: "POST",
      headers: {
        'Content-Type' : 'application/json',
        'Accept' : 'application/json'
      },
      body: JSON.stringify({
        name: giftName,
        image: giftImage
      })
    })
    .then(response => response.json())
    .then(data => {
      allGifts.push(data)
      giftList.innerHTML += `<li id="${data.id}">
                              ${giftName} <br />
                              <img src='${giftImage}' height=200 width=200>
                              <br>
                              <button data-action='edit-gift' class='ui button'>Edit</button>
                              <button data-action='delete-gift' class='ui button'>Delete</button>
                            </li>`
    })

  })

  fetchGifts()

})
