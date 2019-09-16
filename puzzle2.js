let w = 0, h = 0;
const image = new Image();
const puzzleSize = 3, spacing = 10;

function fixSize() {
    w = window.innerWidth;
    h = window.innerHeight;
    const canvas = document.getElementById('puzzleCanvas');
    canvas.width = w;
    canvas.height = h;
}

function pageLoad() {

    window.addEventListener("resize", fixSize);
    fixSize();

    image.src = "puzzle.jpg";
    image.onload = () => window.requestAnimationFrame(redraw);

}

function redraw() {

    const canvas = document.getElementById('puzzleCanvas');
    const context = canvas.getContext('2d');

    context.fillStyle = '#000088';
    context.fillRect(0, 0, w, h);

    const left = w/2 - image.width/2 + spacing/2;
    const top = h/2 - image.height/2 + spacing/2;

    const pieceWidth = image.width/puzzleSize;
    const pieceHeight = image.height/puzzleSize;

    for (let i = 0; i < puzzleSize; i++) {
        for (let j = 0; j < puzzleSize; j++) {
            if (!(i == puzzleSize-1 && j == puzzleSize-1)) {
                context.drawImage(image,
                    i*pieceWidth, j*pieceHeight, pieceWidth, pieceHeight,
                    left + i*pieceWidth, top + j*pieceHeight, pieceWidth - spacing, pieceHeight - spacing);
            }
        }
    }

    window.requestAnimationFrame(redraw);

}
