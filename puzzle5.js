let w = 0, h = 0;
const image = new Image();
const puzzleSize = 3, spacing = 10;

let pieces = [];

function fixSize() {
    w = window.innerWidth;
    h = window.innerHeight;
    const canvas = document.getElementById('puzzleCanvas');
    canvas.width = w;
    canvas.height = h;
}

function processKey(event) {

    let x, y;

    gapFinder:
    for (x = 0; x < puzzleSize; x++) {
        for (y = 0; y < puzzleSize; y++) {
            if (pieces[x][y] === null) break gapFinder;
        }
    }

    let p = x, q = y;

    if (event.key === "ArrowDown" && y > 0) q--;
    if (event.key === "ArrowUp" && y < puzzleSize - 1) q++;
    if (event.key === "ArrowRight" && x > 0) p--;
    if (event.key === "ArrowLeft" && x < puzzleSize - 1) p++;

    if (x === p && y === q) return;

    let temp = pieces[x][y];
    pieces[x][y] = pieces[p][q];
    pieces[p][q] = temp;

}

function pageLoad() {

    for (let x = 0; x < puzzleSize; x++) {
        let row = [];
        for (let y = 0; y < puzzleSize; y++) {
            if (x == puzzleSize-1 && y == puzzleSize-1) {
                row.push(null);
            } else {
                row.push({x, y});
            }
        }
        pieces.push(row);
    }

    const keys = ["ArrowDown", "ArrowUp", "ArrowLeft", "ArrowRight"]
    for (let shuffles = 0; shuffles < 100; shuffles ++) {
        let randomChoice = Math.floor(Math.random() * 4);
        processKey({key: keys[randomChoice]});
    }

    window.addEventListener("resize", fixSize);
    fixSize();

    window.addEventListener("keydown", processKey);

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
            if (pieces[i][j] !== null) {
                context.drawImage(image,
                    pieces[i][j].x*pieceWidth, pieces[i][j].y*pieceHeight, pieceWidth, pieceHeight,
                    left + i*pieceWidth, top + j*pieceHeight, pieceWidth - spacing, pieceHeight - spacing);
            }
        }
    }

    window.requestAnimationFrame(redraw);

}
