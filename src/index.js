document.addEventListener('DOMContentLoaded', () => {
//   console.log('DOM has been fully loaded')
//   console.table(gifts)
//   //Hello Meghan
//   const giftList = document.querySelector('.gift-list')
//   const form = document.querySelector('#new-gift-form')
//     form.addEventListener('submit', function () {
//       event.preventDefault()
//
//       const newGift = event.target.querySelector('#gift-name-input').value
//       const newImg = event.target.querySelector('#gift-image-input').value
//       const newLiTag = document.createElement('li')
//       newLiTag.textContent = newGift
//       newLiTag.urlContent = newImg
//       giftList.appendChild(newLiTag)
//     })
//   const searchForm = document.querySelector('.ui.icon.input')
//   searchForm.addEventListener('enter', function (event) {
//     // let key = event.which || event.keyCode;
//     // if (key === 36) {} // 13 is enter apparently // code for enter
//     const input = document.querySelector('#filter-input').value
//     console.log(input)
// })
  let allGifts = []
  const giftList = document.querySelector('.gift-list')
  const form = document.querySelector('#new-gift-form')
  const filterInput = document.querySelector('#filter-input')
  const editForm = document.querySelector('#edit-gift-form')
function giftFetch(){
  fetch("http://localhost:3000/gifts")
  .then((res) => res.json())
  .then((data) => {
    allGifts = data
    showAllGifts(data)
  })
}

function showAllGifts(gifts) {
  gifts.forEach((gift) =>{
    renderOneGift(gift)
  })
}
function renderOneGift(gift) {
  giftList.innerHTML += `
  <li>"${gift.name}"
  <img data-id="${gift.id}" src="${gift.image}" height=200px weight=200px>
  <button data-id="${gift.id}", data-action="edit-gift", type="button">Edit</button>
  <button data-id="${gift.id}", data-action="delete-gift", type="button">Delete</button>
  </li>
  `
}

giftList.addEventListener("click", (e) => {
		if(e.target.dataset.action === "edit-gift") {
			const foundGift = allGifts.find(gift => {
				return gift.id === parseInt(e.target.dataset.id)
			})
      // console.log(foundGift)
      let editName = editForm.querySelector('#gift-name-input')
      let editImg = editForm.querySelector('#gift-image-input')
      // console.log(editName)
      // console.log(editImg)
      editForm.dataset.id = foundGift.id
      editName.value = foundGift.name
      editImg.value = foundGift.image
      // console.log(editForm)
		}
    // else if (e.target.dataset.action === "delete-gift") {
    //   const foundGift = allGifts.find(gift => {
		// 		return gift.id === parseInt(e.target.dataset.id)
		// 	})
    //   // console.log(foundGift);
    //   event.target.parentNode.remove(foundGift)
    // }
	})

  editForm.addEventListener('submit', (e) => {
    e.preventDefault()
    // console.log(e.target)

    const foundGift = allGifts.find((gift) => gift.id === parseInt(e.target.dataset.id))
    const giftId = foundGift.id
    // const giftIndex =
    // console.log(foundGift);
    let editedName = editForm.querySelector('#gift-name-input').value
    let editedImg = editForm.querySelector('#gift-image-input').value
    const headers = {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        "id": giftId,
        "name": editedName,
        "image": editedImg
      })
    }
    fetch(`http://localhost:3000/gifts/${giftId}`, headers)
    .then(res => res.json())
    .then(data => {
      allGifts[(giftId - 1)] = data
      giftList.innerHTML = ""
      showAllGifts(allGifts)
    })

  })

filterInput.addEventListener("input", (e) => {

		const filteredGift = allGifts.filter((gift) => {
			return gift.name.includes(e.target.value)
		})

    giftList.innerHTML = ""

		showAllGifts(filteredGift)
	})

giftFetch()
})
