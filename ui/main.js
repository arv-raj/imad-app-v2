console.log('Loaded!');

var img = document.getElementById('madi');
var marginLeft = o;
function moveRight() {
    var marginLeft = marginLeft + 5;
    img.style.marginLeft = marginLeft + 'px';
}
img.onclick = function () {
    var interval = setInterval(moveRight, 50);
};
