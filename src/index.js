document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM has been fully loaded')
 let ul = document.querySelector('.gift-list');
if (gifts.length > 0){ul.children[0].remove();}
  function addGifts(giftArray){


         giftArray.forEach(function(gift){
        // create elements for gift
          const giftContainer =document.createElement('div')
          const newLi =document.createElement('li')
          const form = document.createElement('form')
          form.id=`form${gift.id}`
          const giftImage =document.createElement('img')
          const editBtn =document.createElement('button')
          const deleteBtn=document.createElement('button')

          const giftInput=document.createElement('input')
          ///set element attributes

          giftInput.type='text';
          giftInput.className='hide';      // make input start out hidden
          editBtn.innerText='edit me'
          editBtn.className='editBtn';
          deleteBtn.innerText='delete me'
          deleteBtn.className='deleteBtn'
          newLi.innerText=gift.name;
          newLi.id=gift.id.toString();
          giftInput.id=`input${gift.id}`;
          editBtn.dataset.inputId=`input${gift.id}`

          giftImage.src=gift.image;
          giftImage.className='gift-icon';
          //append elements to ul
          console.log('ul is',ul);
          ul.appendChild(giftContainer);
          giftContainer.appendChild(newLi);
          giftContainer.appendChild(form);
          form.appendChild(giftInput);
          giftContainer.appendChild(deleteBtn);
          giftContainer.appendChild(editBtn);
          giftContainer.appendChild(giftImage);

        })
      }
  if (gifts){addGifts(gifts)};
  ul.addEventListener('submit', editGift)
  function editGift(event){
    event.preventDefault();
    event.target.previousSibling.innerText=event.target.querySelector('input').value;
    console.log(event.target.querySelector('input'));
  }
  function clickBtn(){
    console.log (event.target.tagName)

    if (event.target.tagName === 'BUTTON' && event.target.className ==='editBtn'){
      document.querySelector(`#${event.target.dataset.inputId}`).className='show';
    }
    if (event.target.tagName === 'BUTTON' && event.target.className ==='deleteBtn'){
      event.target.parentElement.remove();
    }
    }
  ul.addEventListener('click', clickBtn)
  const filterEl=document.querySelector('#filter-input')
  filterEl.addEventListener('input', function(){
    const filtered = gifts.filter(function(gift){return gift.name.includes(filterEl.value)})
    ul.remove();
    ul=document.createElement('ul');
    document.querySelector(".segment").appendChild(ul);
    console.log(ul);

    addGifts(filtered);
  })
})
