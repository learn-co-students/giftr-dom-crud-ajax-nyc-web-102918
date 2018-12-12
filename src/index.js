document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM has been fully loaded')
  console.table(gifts)

  let giftsLength = gifts.length
  console.log("gifts:", giftsLength);

  const giftList = document.querySelector(".gift-list")
  console.log(giftList)

  if (gifts.length > 0) {
    giftList.innerHTML = ""

    gifts.forEach(function (gift) {
      const newGift = document.createElement("li")
      newGift.textContent = gift.name
      newGift.setAttribute("data-id", gift.id)

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

  const giftForm = document.querySelector("#new-gift-form")
  console.log(giftForm);

  giftForm.addEventListener('submit', function submitHandler(event) {
    event.preventDefault()
    const giftNameInput = document.querySelector("#gift-name-input")
    const giftImageInput = document.querySelector("#gift-image-input")
    console.log(giftNameInput);
    console.log(giftImageInput);

    giftsLength++


    const newGift = document.createElement("li")
    newGift.textContent = giftNameInput.value
    newGift.setAttribute("data-id", giftsLength)

    const giftImg = document.createElement("img")
    giftImg.src = giftImageInput.value
    newGift.appendChild(giftImg)

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
      console.log(event.target);
      const editForm = document.createElement("div")

      const editFormNameInput = document.createElement("input")
      editFormNameInput.setAttribute("name", `gift-${event.target.parentNode.dataset.id}-name`)
      editFormNameInput.setAttribute("placeholder", "Enter name")
      editForm.appendChild(editFormNameInput)

      const editFormImageInput = document.createElement("input")
      editFormImageInput.setAttribute("name", `gift-${event.target.parentNode.dataset.id}-image`)
      editFormImageInput.setAttribute("placeholder", "Enter image url")
      editForm.appendChild(editFormImageInput)

      const editSubmitBtn = document.createElement("button")
      editSubmitBtn.textContent = "Update Gift"
      editSubmitBtn.classList.add("update");
      editForm.appendChild(editSubmitBtn)

      event.target.parentNode.appendChild(editForm)
    } else if (event.target.className === "update") {
      console.log(event.target.parentNode.parentNode.children[0]);
    }
  })


})

// Esther changes
