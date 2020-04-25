let _2DCanvas = document.getElementById("oldCanvas");
let ctx = _2DCanvas.getContext("2d");

ctx.font = '20pt Arial';

ctx.fillStyle = 'white';
ctx.fillRect(10, 10, _2DCanvas.width - 20, _2DCanvas.height - 20);
ctx.fillStyle = 'black';
ctx.textAlign = "center";
ctx.textBaseline = "middle";
ctx.fillText(new Date().getTime(), _2DCanvas.width / 2, _2DCanvas.height / 2);


_2DCanvas.addEventListener('mousemove', (e) => {
    let rect = _2DCanvas.getBoundingClientRect();
    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;
    ctx.fillRect(x, y, 5, 5);
});