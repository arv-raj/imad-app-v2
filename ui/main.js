/*console.log('Loaded!');

var img = document.getElementById('madi');
var marginLeft = 0;
function moveRight() {
    marginLeft = marginLeft + 5;
    img.style.marginLeft = marginLeft + 'px';
}
img.onclick = function () {
   var interval = setInterval(moveRight, 50);
};*/

var button = document.getElementById('counter');
var counter = 0;
button.onclick = function () {
    
    //Create request and send the request
    
    //Response to the request
    
    //Render the request in the web page
    counter = counter + 1;
    var span = document.getElementById('count');
    span.innerHTML = counter.toString();
};