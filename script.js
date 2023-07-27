var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

var bird = new Image();
var bg = new Image();
var fg = new Image();
var pipeUp = new Image();
var pipeBottom = new Image();

bird.src = "img/bird.png";
bg.src = "img/bg.png";
fg.src = "img/fg.png";
pipeUp.src = "img/pipeUp.png";
pipeBottom.src = "img/pipeBottom.png";

// Звуковые файлы
var fly = new Audio();
var score_audio = new Audio();

fly.src = "audio/fly.mp3";
score_audio.src = "audio/score.mp3";

var gap = 90;

// При нажатии на клавишу или клике мыши
document.addEventListener("keydown", moveUp);
document.addEventListener("mousedown", moveUp);

function moveUp() {
    velocity = -8;
    fly.play();
}

// Создание блоков
var pipe = [];

pipe[0] = {
    x: cvs.width,
    y: 0
}

var score = 0;
var xPos = 10;
var yPos = 150;
var velocity = 0;
var grav = 0.6;

function draw() {
    ctx.drawImage(bg, 0, 0);

    for (var i = 0; i < pipe.length; i++) {
        var constant = pipeUp.height + gap;
        ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y);
        ctx.drawImage(pipeBottom, pipe[i].x, pipe[i].y + constant);

        pipe[i].x--;

        if (pipe[i].x == 125) {
            pipe.push({
                x: cvs.width,
                y: Math.floor(Math.random() * pipeUp.height) - pipeUp.height
            });
        }

        if (pipe[i].x === 5) {
            score++;
            score_audio.play();
        }

        // Отслеживание прикосновений
        if (
            xPos + bird.width >= pipe[i].x &&
            xPos <= pipe[i].x + pipeUp.width &&
            (yPos <= pipe[i].y + pipeUp.height || yPos + bird.height >= pipe[i].y + constant) ||
            yPos + bird.height >= cvs.height - fg.height
        ) {
            // Collision with pipe or ground, reset the game
            pipe = [];
            pipe[0] = {
                x: cvs.width,
                y: 0
            };
            score = 0;
            yPos = 150;
            velocity = 0; // Reset the velocity as well
        }
    }

    ctx.drawImage(fg, 0, cvs.height - fg.height);
    ctx.drawImage(bird, xPos, yPos);

    velocity += grav;
    yPos += velocity;

    ctx.fillStyle = "#000";
    ctx.font = "24px Verdana";
    ctx.fillText("Счет: " + score, 10, cvs.height - 20);

    requestAnimationFrame(draw);
}

bird.onload = draw;
