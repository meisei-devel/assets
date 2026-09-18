document.addEventListener('DOMContentLoaded', () => {
  const dialog = document.querySelector('#estate-photo-dialog');
  if (!dialog) return;

  const image = dialog.querySelector('#estate-photo-dialog-image');
  const counter = dialog.querySelector('#estate-photo-counter');
  const thumbs = Array.from(document.querySelectorAll('[data-estate-photo]'));
  const closeButton = dialog.querySelector('.estate-photo-close');
  const prevButton = dialog.querySelector('.estate-photo-prev');
  const nextButton = dialog.querySelector('.estate-photo-next');

  if (!image || thumbs.length === 0) return;

  let current = 0;

  const showPhoto = (index) => {
    current = (index + thumbs.length) % thumbs.length;
    const thumb = thumbs[current];
    const src = thumb.dataset.estatePhoto || '';
    const thumbImage = thumb.querySelector('img');

    image.src = src;
    image.alt = thumbImage ? thumbImage.alt : '物件写真';
    if (counter) counter.textContent = `${current + 1} / ${thumbs.length}`;
    if (prevButton) prevButton.hidden = thumbs.length < 2;
    if (nextButton) nextButton.hidden = thumbs.length < 2;
  };

  thumbs.forEach((thumb, index) => {
    thumb.addEventListener('click', () => {
      showPhoto(index);
      if (typeof dialog.showModal === 'function') {
        dialog.showModal();
      } else {
        dialog.setAttribute('open', '');
      }
    });
  });

  closeButton?.addEventListener('click', () => dialog.close());
  prevButton?.addEventListener('click', () => showPhoto(current - 1));
  nextButton?.addEventListener('click', () => showPhoto(current + 1));

  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) dialog.close();
  });

  dialog.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') showPhoto(current - 1);
    if (event.key === 'ArrowRight') showPhoto(current + 1);
  });
});


document.addEventListener('DOMContentLoaded', () => {
  const checkbox = document.querySelector('#estate-viewing-check');
  const dates = document.querySelector('#estate-viewing-dates');
  const first = document.querySelector('#estate-preferred-1');
  const second = document.querySelector('#estate-preferred-2');
  const message = document.querySelector('#estate-inquiry-message');

  if (!checkbox) {
    if (message) message.required = true;
    return;
  }

  if (!dates || !first || !second) return;

  const updateViewingState = () => {
    const active = checkbox.checked;
    dates.classList.toggle('is-active', active);
    first.required = active;
    second.required = active;
    first.disabled = !active;
    second.disabled = !active;

    if (message) {
      message.required = true;
      if (active && message.value.trim() === '') {
        message.value = '内覧希望';
      }
    }
  };

  checkbox.addEventListener('change', updateViewingState);
  updateViewingState();
});
