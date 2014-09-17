$("#overlay").height = $("#overlay").height - $("header").height - $("footer").height;
$("#overlay").width = $(window).width;

var canvas = document.createElement("canvas");
canvas.height = $("#overlay").height() * 1.25;
canvas.width = $("#overlay").width();
var ctx = canvas.getContext("2d");

var colors = [
{
    r: 242,
    g: 231,
    b: 82
},
{
    r: 120,
    g: 26,
    b: 100
},
{
    r: 90,
    g: 26,
    b: 122
},
{
    r: 172,
    g: 25,
    b: 184
},
{
    r: 227,
    g: 205,
    b: 59
},
{
    r: 244,
    g: 240,
    b: 38
},
{
    r: 41,
    g: 21,
    b: 102
},
{
    r: 200,
    g: 230,
    b: 22
}];

window.requestAnimFrame = function()
{
    return (window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(c) { window.setTimeout(c, 1000 / 60); });
}();

var squares = [];
var lastRender = Date.now();
var lastCreate = Date.now();

function render() {
    var timeDelta = new Date().getTime() - lastRender;
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    if (Date.now() - lastCreate >= 20) {
        var sze = randr(20, 50);
        var color = colors[Math.floor(Math.random() * colors.length)];
        squares.push({
            width: sze,
            height: sze,
            vel: randr(50, 200), //pixs per second
            x: randr(-sze + 10, canvas.width - 10),
            y: randr(10, canvas.height - 10),
            age: 1,
            r: color.r,
            g: color.g,
            b: color.b
        });
        lastCreate = Date.now();
    }

    for (var i = 0; i < squares.length; i++)
    {
        var sq = squares[i];
        ctx.fillStyle = ["rgba(", sq.r, ", ", sq.g, ", ", sq.b, ",", (sq.age / 400), ")"].join("");
        ctx.fillRect(sq.x, sq.y, sq.width, sq.height);
        sq.y -= sq.vel / 1000 * timeDelta;
        sq.age++;
        if (sq.y + sq.height < 0)
        {
            squares.splice(i, 1);
            i--;
        }
    }
    lastRender = new Date().getTime();
}

function randr(min, max) {
    return Math.random() * (max - min) + min;
}

function resize() {
    $("#overlay").height = $("#overlay").height - $("header").height - $("footer").height;
    $("#overlay").width = $(window).width;
    canvas.height = $("#overlay").height() * 1.25;
    canvas.width = $("#overlay").width();

    if (window.devicePixelRatio == 2)
    {
        canvas.width = wi * 2;
        canvas.height = he * 2;
        canvas.style.height = he;
        canvas.style.width = wi;
        ctx.scale(2, 2);
    }
}

window.onresize = resize;
resize();

(function loop() {
    //requestAnimFrame(loop);
    //document.getElementById("overlay").style.background = "transparent url('"+canvas.toDataURL()+"')";
    //render();
})();