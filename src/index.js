document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM has been fully loaded')
  console.table(gifts)

  const giftList = document.querySelector('.gift-list')
  const searchForm = document.querySelector('#filter-input')

  for(const gift of gifts) {
    renderGift(gift, giftList)

  }

  giftList.addEventListener('click', function buttonHandler(event) {
    if(event.target.tagName !== 'BUTTON') {
      return
    }
    const listItem = document.querySelector(`#li-${event.target.dataset.id}`)
    const gift = gifts.find(gift => gift.id == event.target.dataset.id)
    if(event.target.textContent === 'Update') {
      if(listItem.querySelector('form'))return;

      const updateForm = document.createElement('form')
      const textInput = document.createElement('input')
      const imageInput = document.createElement('input')
      const submitInput = document.createElement('input')
      updateForm.dataset.id = event.target.dataset.id
      imageInput.type = 'text'
      textInput.type = 'text'
      textInput.value = gift.name
      submitInput.type = 'submit'
      textInput.id = 'text-' + event.target.dataset.id

      updateForm.appendChild(imageInput)
      updateForm.appendChild(textInput)
      updateForm.appendChild(submitInput)

      listItem.appendChild(updateForm)
    } else if(event.target.textContent === 'Delete') {
      gifts.splice(gifts.indexOf(gift), 1)
      listItem.remove()

    }
  })

  giftList.addEventListener('submit', function submitHelper(event) {
    event.preventDefault()
    const listItem = document.querySelector(`#li-${event.target.dataset.id}`)
    const gift = gifts.find(gift => gift.id == event.target.dataset.id)
    gift.name = giftList.querySelector(`#text-${event.target.dataset.id}`).value
    event.target.remove()
    const children = [].slice.call(listItem.children)
    listItem.textContent = gift.name
    for(const child of children) {
      listItem.appendChild(child)
    }
  })

  searchForm.addEventListener('keyup', function searchHelper(event) {
    giftList.innerHTML = ''
    const filteredGifts = gifts.filter(function (gift){
      return gift.name.includes(event.target.value)

    })
    for(const gift of filteredGifts){
      renderGift(gift, giftList)
    }
  })

})
