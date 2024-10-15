const dropzone = document.getElementById('cart');
let draggedElement = null;
let offsetX = 0;
let offsetY = 0;
let isTouching = false; // Флаг для определения сенсорного ввода

document.addEventListener('touchstart', (e) => {
  if (e.target.classList.contains('draggable')) {
      draggedElement = e.target;
      isTouching = true; // Активируем флаг касания

      // Получаем смещение относительно элемента
      const touch = e.touches[0];
      const rect = draggedElement.getBoundingClientRect();
      offsetX = touch.clientX - rect.left;
      offsetY = touch.clientY - rect.top;

      draggedElement.classList.add('dragging'); // Визуальный эффект
  }
});

// Перемещение пальца по экрану (touchmove)
document.addEventListener('touchmove', (e) => {
  if (isTouching && draggedElement) {
      e.preventDefault(); // Предотвращаем скроллинг страницы при касании

      const touch = e.touches[0];
      draggedElement.style.left = (touch.clientX - offsetX) + 'px';
      draggedElement.style.top = (touch.clientY - offsetY) + 'px';
  }
});

// Завершение касания (touchend)
document.addEventListener('touchend', (e) => {
  if (isTouching && draggedElement) {
      const touch = e.changedTouches[0];
      const dropzoneRect = dropzone.getBoundingClientRect();

      // Проверяем, находится ли элемент в пределах дропзоны
      if (
          touch.clientX > dropzoneRect.left &&
          touch.clientX < dropzoneRect.right &&
          touch.clientY > dropzoneRect.top &&
          touch.clientY < dropzoneRect.bottom
      ) {
          dropzone.appendChild(draggedElement); // Добавляем элемент в дропзону
      }

      draggedElement.classList.remove('dragging');
      draggedElement = null;
      isTouching = false;
  }
});