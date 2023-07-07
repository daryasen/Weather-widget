var socket;

        function init() {
            socket = new WebSocket("wss://echo-ws-service.herokuapp.com");
            socket.onmessage = function(event) {
                var message = event.data;
                displayMessage(message);
            };
        }

        function sendMessage() {
            var inputElement = document.getElementById("messageInput");
            var message = inputElement.value;
            socket.send(message);
            displayMessage(message);
            inputElement.value = "";
        }

        function sendLocation() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function(position) {
                    var latitude = position.coords.latitude;
                    var longitude = position.coords.longitude;
                    var locationLink = "https://www.openstreetmap.org/?mlat=" + latitude + "&mlon=" + longitude;
                    displayMessage("Моя геолокация: <a href='" + locationLink + "' target='_blank'>Посмотреть на карте</a>");
                    socket.send(latitude + "," + longitude);
                });
            } else {
                displayMessage("Геолокация недоступна");
            }
        }

        function displayMessage(message) {
            var chatBox = document.getElementById("chatBox");
            var messageElement = document.createElement("div");
            messageElement.innerHTML = message;
            chatBox.appendChild(messageElement);
        }
