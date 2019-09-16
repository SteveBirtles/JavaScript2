let w = 0, h = 0;
const image = new Image();

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

    const left = w/2 - image.width/2;
    const top = h/2 - image.height/2;

    context.drawImage(image, left, top);

    window.requestAnimationFrame(redraw);

}
