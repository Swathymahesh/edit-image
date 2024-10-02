let baseImage = new Image();
let uploadedImage = new Image();
let canvas, ctx, imageCanvas, imageCtx;

let imgX = 0, imgY = 0, imgScale = 1, imgAngle = 0;

document.addEventListener("DOMContentLoaded", () => {
    canvas = document.getElementById("baseCanvas");
    ctx = canvas.getContext("2d");
    imageCanvas = document.getElementById("imageCanvas");
    imageCtx = imageCanvas.getContext("2d");

    canvas.width = imageCanvas.width = 600;
    canvas.height = imageCanvas.height = 400;

    baseImage.src = "base_image_path.png"; // Replace with the path to your base image
    baseImage.onload = () => {
        ctx.drawImage(baseImage, 0, 0, canvas.width, canvas.height);
    };

    document.getElementById("fileInput").addEventListener("change", (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                uploadedImage.src = event.target.result;
            };
            reader.readAsDataURL(file);
        }
    });

    uploadedImage.onload = () => {
        drawImage();
    };
});

function drawImage() {
    imageCtx.clearRect(0, 0, imageCanvas.width, imageCanvas.height);
    imageCtx.save();
    imageCtx.translate(imageCanvas.width / 2, imageCanvas.height / 2);
    imageCtx.rotate((imgAngle * Math.PI) / 180);
    imageCtx.scale(imgScale, imgScale);
    imageCtx.drawImage(uploadedImage, imgX - imageCanvas.width / 2, imgY - imageCanvas.height / 2);
    imageCtx.restore();
}

function moveImage(direction) {
    switch (direction) {
        case 'up':
            imgY -= 5;
            break;
        case 'down':
            imgY += 5;
            break;
        case 'left':
            imgX -= 5;
            break;
        case 'right':
            imgX += 5;
            break;
    }
    drawImage();
}

function zoomImage(zoom) {
    if (zoom === 'in') {
        imgScale += 0.1;
    } else if (zoom === 'out') {
        imgScale -= 0.1;
    }
    drawImage();
}

function rotateImage(direction) {
    if (direction === 'clockwise') {
        imgAngle += 5;
    } else if (direction === 'anticlockwise') {
        imgAngle -= 5;
    }
    drawImage();
}

function flipImage(direction) {
    if (direction === 'horizontal') {
        imgScale = -imgScale;
    } else if (direction === 'vertical') {
        imgScale = -imgScale;
    }
    drawImage();
}
//to get final image
function generateFinalImage() {
    ctx.font = "20px Arial";
    ctx.fillStyle = "red";
    ctx.textAlign = "left"; 
    const boxStartX = canvas.width - 500; 
    const boxStartY = 100; 
    const boxWidth = 500; 
    const boxHeight = 270; 
    ctx.strokeRect(boxStartX, boxStartY, boxWidth, boxHeight);
    
    const yOffset = 40;

    ctx.fillStyle = "black"; // Color for the text
    ctx.fillText(`Name: ${document.getElementById('name').value}`, boxStartX + 200, boxStartY + yOffset * 1);
    ctx.fillText(`Std: ${document.getElementById('standard').value}`, boxStartX + 200, boxStartY + yOffset * 2);
    ctx.fillText(`Sec: ${document.getElementById('section').value}`, boxStartX + 200, boxStartY + yOffset * 3);
    ctx.fillText(`Subject: ${document.getElementById('subject').value}`, boxStartX + 200, boxStartY + yOffset * 4);
    ctx.fillText(`School: ${document.getElementById('school').value}`, boxStartX + 200, boxStartY + yOffset * 5);
    
}