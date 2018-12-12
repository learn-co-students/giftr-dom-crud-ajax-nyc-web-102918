function renderGift(gift, giftList) {
  const button = document.createElement('button')
  const newLiTag = document.createElement('li')
  const newImgTag = document.createElement('img')
  const deleteButton = document.createElement('button')
  deleteButton.textContent = 'Delete'
  deleteButton.dataset.id = gift.id
  deleteButton.className = 'ui negative button'
  newImgTag.src = gift.image
  newLiTag.textContent = gift.name
  newLiTag.id = 'li-' + gift.id
  button.textContent = 'Update'
  button.className = 'ui icon button'
  button.dataset.id = gift.id

  newImgTag.className ='ui tiny image'

  newLiTag.appendChild(newImgTag)
  newLiTag.appendChild(button)
  newLiTag.appendChild(deleteButton)
  giftList.appendChild(newLiTag)
}
