<!DOCTYPE html>
<html>
<head>
  <title>Fetch Image App</title>
</head>
<body>
  <input type="text" id="widthInput" placeholder="Ширина (100-300)">
  <input type="text" id="heightInput" placeholder="Высота (100-300)">
  <button id="submitButton">Submit</button>
  <div id="resultContainer"></div>

  <script>
    const widthInput = document.getElementById('widthInput');
    const heightInput = document.getElementById('heightInput');
    const submitButton = document.getElementById('submitButton');
    const resultContainer = document.getElementById('resultContainer');

    submitButton.addEventListener('click', () => {
      const width = parseInt(widthInput.value);
      const height = parseInt(heightInput.value);

      if (isNaN(width) || isNaN(height) || width < 100 || width > 300 || height < 100 || height > 300) {
        resultContainer.innerHTML = 'Одно из чисел вне диапазона от 100 до 300';
      } else {
        const url = `https://picsum.photos/${width}/${height}`;
        fetch(url)
          .then(response => {
            const image = document.createElement('img');
            image.src = response.url;
            resultContainer.innerHTML = '';
            resultContainer.appendChild(image);
          })
          .catch(error => {
            resultContainer.innerHTML = 'Ошибка при загрузке изображения';
            console.error(error);
          });
      }
    });
  </script>
</body>
</html>

