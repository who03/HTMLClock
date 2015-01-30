
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

function getTempName(temp) {
	if (temp < 60)
		return "cold";
	else if (temp < 70)
		return "chilly";
	else if (temp < 80)
		return "nice";
	else if (temp < 90)
		return "warm";
	else
		return "hot";
}

function getTemp() {
	$.getJSON("https://api.forecast.io/forecast/f73dc0abe8201ac16c940e6c7ce817ac/35.300399,-120.662362?callback=?",
		function (data) {
			$("#forcastLabel").html(data.daily.summary);
			$("#forcastIcon").attr("src", "img/" + data.daily.icon + ".png");
			$("body").addClass(getTempName(data.daily.temperatureMax));
		});
}

window.onload = getTemp;
