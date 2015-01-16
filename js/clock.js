
function getTime() {
   var curr = new Date();
   var h=curr.getHours();
   var m=curr.getMinutes();
   var s=curr.getSeconds();
   var currTime = h+":"+m+":"+s;
   document.getElementById("time").innerHTML = currTime;
      
   var y = setTimeout(function(){getTime()}, 1000);
}
getTime();
