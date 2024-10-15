const dropzone = document.getElementById('cart');
let isTouching = false;
let draggedElement = null;
let offsetX = 0;
let offsetY = 0;

document.addEventListener('touchmove', (e) => {
  if (e.target.classList.contains('draggable')) {
    e.preventDefault()
    draggedElement = e.target;

    const touch = e.targetTouches[0];
    const rect = draggedElement.getBoundingClientRect();
    offsetX = touch.clientX - rect.left;
    offsetY = touch.clientY - rect.top;

    draggedElement.style.position = 'absolute';
    draggedElement.style.left = (touch.clientX - offsetX) + 'px';
    draggedElement.style.top = (touch.clientY - offsetY) + 'px'; 
  }
});

document.addEventListener('touchend', (e) => {
  if (isTouching && draggedElement) {
    const touch = e.changedTouches[0];
    const dropzoneRect = dropzone.getBoundingClientRect();

    if (
        touch.clientX > dropzoneRect.left &&
        touch.clientX < dropzoneRect.right &&
        touch.clientY > dropzoneRect.top &&
        touch.clientY < dropzoneRect.bottom
    ) {
        dropzone.appendChild(draggedElement);
    }

    draggedElement.classList.remove('dragging');
    draggedElement = null;
    isTouching = false;
  }
});