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
button.onclick = function () {
    
    //Create request
    var request = new XMLHttpRequest();
    
    //Response to the request
    request.onreadystatechange = function () {
      if(request.readystate === XMLHttpRequest.DONE) {
          //Take some action
          if(request.status === 200){
              var counter = request.responsetext;
              var span = document.getElementById('count');
              span.innerHTML = counter.toString();
          }
      }  
    };
    //Make Request
    request.open('GET','http://arv-raj.imad.hasura-app.io/counter', true);
    request.send(null);
};