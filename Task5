html
<!DOCTYPE html>
<html>
<head>
  <title>Запрос картинок</title>
  <style>
    #images-container {
      display: flex;
      flex-wrap: wrap;
    }

    .image {
      margin: 5px;
      width: 200px;
      height: 200px;
    }

    .error {
      color: red;
    }
  </style>
</head>
<body>
  <h1>Запрос картинок</h1>

  <label for="page-input">Номер страницы:</label>
  <input type="text" id="page-input" />

  <label for="limit-input">Лимит:</label>
  <input type="text" id="limit-input" />

  <button id="request-button">Запрос</button>

  <div id="error-message" class="error"></div>

  <div id="images-container"></div>
  <script src="app.js"></script>
</body>
</html>

javascript
window.addEventListener('DOMContentLoaded', () => {
  const pageInput = document.getElementById('page-input');
  const limitInput = document.getElementById('limit-input');
  const requestButton = document.getElementById('request-button');
  const errorMessage = document.getElementById('error-message');
  const imagesContainer = document.getElementById('images-container');

  // Получение последних успешно выполненных параметров из localStorage
  const lastPage = localStorage.getItem('lastPage');
  const lastLimit = localStorage.getItem('lastLimit');
  if (lastPage && lastLimit) {
    pageInput.value = lastPage;
    limitInput.value = lastLimit;
    requestImages(lastPage, lastLimit);
  }

  requestButton.addEventListener('click', () => {
    const page = parseInt(pageInput.value);
    const limit = parseInt(limitInput.value);

    errorMessage.textContent = '';
    imagesContainer.innerHTML = '';

    if (isNaN(page) || isNaN(limit)) {
      errorMessage.textContent = 'Номер страницы и лимит должны быть числами.';
      return;
    }

    if (page < 1 || page > 10) {
      errorMessage.textContent = 'Номер страницы вне диапазона от 1 до 10.';
      return;
    }

    if (limit < 1 || limit > 10) {
      errorMessage.textContent = 'Лимит вне диапазона от 1 до 10.';
      return;
    }

    requestImages(page, limit);
  });

  function requestImages(page, limit) {
    // Сохранение параметров в localStorage
    localStorage.setItem('lastPage', page);
    localStorage.setItem('lastLimit', limit);

    const url = `https://picsum.photos/v2/list?page=${page}&limit=${limit}`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        data.forEach(item => {
          const imageElement = document.createElement('img');
          imageElement.src = item.download_url;
          imageElement.classList.add('image');
          imagesContainer.appendChild(imageElement);
        });
      })
      .catch(error => {
        console.error(error);
        errorMessage.textContent = 'Ошибка при выполнении запроса.';
      });
  }
});

