const displayedImage = document.querySelector('.displayed-img');
const thumbBar = document.querySelector('.thumb-bar');

const btn = document.querySelector('button');
const overlay = document.querySelector('.overlay');

const imageFilenames = ['pic1.jpg', 'pic2.jpg', 'pic3.jpg', 'pic4.jpg', 'pic5.jpg'];

const altText = {
  'pic1.jpg': 'Imagem 1',
  'pic2.jpg': 'Imagem 2',
  'pic3.jpg': 'Imagem 3',
  'pic4.jpg': 'Imagem 4',
  'pic5.jpg': 'Imagem 5'
};

for (let i = 0; i < imageFilenames.length; i++) {
  const newImage = document.createElement('img');
  newImage.setAttribute('src', 'images/' + imageFilenames[i]);
  newImage.setAttribute('alt', altText[imageFilenames[i]]);
  thumbBar.appendChild(newImage);

  newImage.onclick = function (e) {
    displayedImage.src = e.target.getAttribute('src');
  };
}

btn.onclick = function () {
  const currentClass = btn.getAttribute('class');

  if (currentClass === 'dark') {
    btn.setAttribute('class', 'light');
    btn.textContent = 'Clarear';
    overlay.style.backgroundColor = 'rgba(0,0,0,0.5)';
  } else {
    btn.setAttribute('class', 'dark');
    btn.textContent = 'Escurecer';
    overlay.style.backgroundColor = 'rgba(0,0,0,0)';
  }
};