const shelf_1 = document.querySelector('.shelf_1')
const shelf_2 = document.querySelector('.shelf_2')
const shelf_3 = document.querySelector('.shelf_3')
const cart = document.querySelector('.cartBox')


document.addEventListener('touchmove', (e) => {
  if (e.target.classList.contains('draggable')) {
   e.preventDefault

  let draggedElement = e.target
  
  let touch = e.touches[0]

  let rect;
    if (shelf_1.contains(draggedElement)) {
      rect = shelf_1.getBoundingClientRect();
    } else if (shelf_2.contains(draggedElement)) {
      rect = shelf_2.getBoundingClientRect();
    } else if (shelf_3.contains(draggedElement)) {
      rect = shelf_3.getBoundingClientRect();
    }
  

  let offsetX = touch.clientX - rect.left - (draggedElement.offsetWidth / 2)
  let offsetY = touch.clientY - rect.top - (draggedElement.offsetHeight / 2)

  draggedElement.style.top = (offsetY) + 'px'
  draggedElement.style.left = (offsetX) + 'px'
  }
  
})

document.addEventListener('touchend', (e) => {
  const element = e.target
  const elRect = e.target.getBoundingClientRect();
  const cartRect = cart.getBoundingClientRect();

  if (
    elRect.left > cartRect.left &&
    elRect.left < cartRect.right &&
    elRect.top> cartRect.top &&
    elRect.bottom < cartRect.bottom
  ) {
      cart.appendChild(element)
      if (element.tagName !== 'BUTTON') {
        element.style.left = (elRect.x - cartRect.left) + 'px';
        element.style.top = (elRect.y - cartRect.top) + 'px';
      }
  }

  if (cart.childElementCount === 4) {
    let button = document.createElement('button')
    button.classList.add('button')
    button.textContent = 'Оплатить корзину'

    cart.appendChild(button)
  }
})

document.addEventListener('touchstart', () => {
  if (document.querySelector('.button')) {
    window.location.href = 'https://lavka.yandex.ru';
  }
  
})
