const dropzone = document.getElementById('cart');
let draggedElement = null;
let placeholder = null;
let originalParent = null;
let originalNextSibling = null; 
let offsetX = 0;
let offsetY = 0;

document.addEventListener('dragstart', (e) => {
    if (e.target.classList.contains('draggable')) {
        draggedElement = e.target;
        originalParent = draggedElement.parentNode;
        originalNextSibling = draggedElement.nextElementSibling; 
        offsetX = e.offsetX;
        offsetY = e.offsetY;

        draggedElement.classList.add('dragging');

        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/plain', e.target.id);
    }
});

document.addEventListener('dragend', () => {
  if (draggedElement) {
      draggedElement.classList.remove('dragging');
      if (!dropzone.contains(draggedElement)) {
        if (originalNextSibling) {
            originalParent.insertBefore(draggedElement, originalNextSibling);
        } else {
            originalParent.appendChild(draggedElement);
        }
    }
    originalParent = null;
    originalNextSibling = null; 
    draggedElement = null;
  }
});

dropzone.addEventListener('dragover', (e) => {
  e.preventDefault();
  e.dataTransfer.dropEffect = 'move';

  placeholder = document.createElement('div');
  placeholder.classList.add('placeholder');
  placeholder.style.width = `${draggedElement.offsetWidth}px`;
  placeholder.style.height = `${draggedElement.offsetHeight}px`;
}, {passive: false});

dropzone.addEventListener('drop', (e) => {
  e.preventDefault();
  if (draggedElement) {
    const dropzoneRect = dropzone.getBoundingClientRect();

    draggedElement.classList.add('dragged')
    draggedElement.style.left = (e.clientX - dropzoneRect.left - offsetX) + 'px';
    draggedElement.style.top = (e.clientY - dropzoneRect.top - offsetY) + 'px';

    dropzone.appendChild(draggedElement);
  }
});