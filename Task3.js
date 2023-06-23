<!DOCTYPE html>
<html>
<head>
  <title>Приложение с картинками</title>
  <style>
    .image-container {
      display: flex;
      flex-wrap: wrap;
    }

    .image-container img {
      width: 200px;
      height: 200px;
      object-fit: cover;
      margin: 10px;
    }

    .error-message {
      color: red;
    }
  </style>
</head>
<body>
  <input type="number" id="numberInput" placeholder="Введите число от 1 до 10">
  <button id="submitButton">Показать картинки</button>
  <div id="imageContainer" class="image-container"></div>
  <div id="errorMessage" class="error-message"></div>

  <script>
    const numberInput = document.getElementById('numberInput');
    const submitButton = document.getElementById('submitButton');
    const imageContainer = document.getElementById('imageContainer');
    const errorMessage = document.getElementById('errorMessage');

    submitButton.addEventListener('click', () => {
      const number = parseInt(numberInput.value);

      if (number < 1 || number > 10) {
        errorMessage.textContent = 'Число вне диапазона от 1 до 10';
        imageContainer.innerHTML = '';
      } else {
        errorMessage.textContent = '';

        const url = `https://picsum.photos/v2/list?limit=${number}`;

        fetch(url)
          .then(response => response.json())
          .then(data => {
            imageContainer.innerHTML = '';

            data.forEach(item => {
              const image = document.createElement('img');
              image.src = item.download_url;
              imageContainer.appendChild(image);
            });
          })
          .catch(error => {
            errorMessage.textContent = 'Ошибка при загрузке картинок';
            imageContainer.innerHTML = '';
            console.error(error);
          });
      }
    });
  </script>
</body>
</html>
