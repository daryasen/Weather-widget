 function showScreenSize() {
      var screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
      var screenHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
      var screenSizeText = 'Размер экрана: ' + screenWidth + ' x ' + screenHeight;
      alert(screenSizeText);
