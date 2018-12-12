document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM has been fully loaded')
  console.table(gifts)

  const giftList = document.querySelector(".gift-list")
  console.log(giftList)

  if (gifts.length > 0) {
    giftList.innerHTML = ""

    gifts.forEach(function (gift) {
      const newGift = document.createElement("li")

      const giftName = document.createElement("p")
      giftName.textContent = gift.name
      newGift.appendChild(giftName)

      const giftImg = document.createElement("img")
      giftImg.src = gift.image
      newGift.appendChild(giftImg)

      const deleteBtn = document.createElement("button")
      deleteBtn.textContent = "Delete"
      deleteBtn.classList.add("delete");
      newGift.appendChild(deleteBtn)

      const editBtn = document.createElement("button")
      editBtn.textContent = "Edit"
      editBtn.classList.add("edit");
      newGift.appendChild(editBtn)

      giftList.appendChild(newGift)
    })
  }

  // other way for forEach or adding to the DOM in general
  // can interpolate string to write html in string format
  // giftList.innerHTML += `<li>
  //                          ${gift.name}
  //                          <img src='${gift.image}'>
  //                        </li>`

  const giftForm = document.querySelector("#new-gift-form")
  console.log(giftForm);

  giftForm.addEventListener('submit', function submitHandler(event) {
    event.preventDefault()
    const giftNameInput = document.querySelector("#gift-name-input")
    const giftImageInput = document.querySelector("#gift-image-input")
    console.log(giftNameInput);
    console.log(giftImageInput);


    const newGift = document.createElement("li")

    const giftName = document.createElement("p")
    giftName.textContent = giftNameInput.value
    newGift.appendChild(giftName)

    const giftImg = document.createElement("img")
    giftImg.src = giftImageInput.value
    newGift.appendChild(giftImg)

    const editBtn = document.createElement("button")
    editBtn.textContent = "Edit"
    editBtn.classList.add("edit");
    newGift.appendChild(editBtn)

    const deleteBtn = document.createElement("button")
    deleteBtn.textContent = "Delete"
    deleteBtn.classList.add("delete")
    newGift.appendChild(deleteBtn)


    giftList.appendChild(newGift)

    giftForm.reset()

  })


  giftList.addEventListener('click', function buttonHandler(event) {
    console.log(event.target);
    if (event.target.className === "delete"){
      event.target.parentNode.remove()
    } else if (event.target.className === "edit") {
      event.target.setAttribute("disabled", true)
      console.log(event.target);
      const editForm = document.createElement("div")

      const editFormNameInput = document.createElement("input")
      editFormNameInput.setAttribute("name", "gift-name")
      editFormNameInput.setAttribute("placeholder", "Enter name")
      editForm.appendChild(editFormNameInput)

      const editFormImageInput = document.createElement("input")
      editFormImageInput.setAttribute("name", "gift-image")
      editFormImageInput.setAttribute("placeholder", "Enter image url")
      editForm.appendChild(editFormImageInput)

      const editSubmitBtn = document.createElement("button")
      editSubmitBtn.textContent = "Update Gift"
      editSubmitBtn.classList.add("update");
      editForm.appendChild(editSubmitBtn)

      event.target.parentNode.appendChild(editForm)
    } else if (event.target.className === "update") {
      const editForm = event.target.parentNode
      const targetItem = event.target.parentNode.parentNode
      const nameInput = editForm.querySelector('input[name="gift-name"]')
      const imageInput = editForm.querySelector('input[name="gift-image"]')

      const targetItemP = targetItem.querySelector('p')
      const targetItemImg = targetItem.querySelector('img')
      targetItemP.textContent = nameInput.value
      targetItemImg.src = imageInput.value
      editForm.remove()
      console.log(targetItem.textContent);

      const edit = targetItem.document.querySelector("button.edit")
      edit.setAttribute("disabled", false)

      // const updateNameInput = document.querySelector()
    }
  })

  // const search = document.querySelector("#filter-input")
  // const searchIcon = document.querySelector(".search.icon")
  //
  // searchIcon.addEventListener("click", function searchClickHandler(event) {
  //   const query = search.value
  //   console.log(query);
  //
  //   const gifts = giftList.querySelectorAll("li")
  //   const searchedGifts = gifts.filter
  // })


  const search = document.querySelector("#filter-input")

  search.addEventListener("keydown", function searchClickHandler(event) {

    if (event.which === 13) {
      const query = search.value
      const gifts = giftList.querySelectorAll("li")
      const giftArray = Array.from(gifts)
      const filteredGifts = giftArray.filter(function(gift) {

      const name = gift.querySelector("p").textContent
        return name.includes(query)
      })

      filteredGifts.forEach(function (gift) {
        giftList.innerHTML = ""
        giftList.appendChild(gift)
      })
    }


  })


})

// Esther changes
