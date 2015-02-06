
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

function showAlarmPopup() {
	$("#mask").removeClass("hide");
	$("#popup").removeClass("hide");
}

function hideAlarmPopup() {
	$("#mask").addClass("hide");
	$("#popup").addClass("hide");
}

function insertAlarm(hours, mins, ampm, alarmName) {
	var newDiv = $("<div>").addClass("flexable");
	var div1 = $("<div>").addClass("name").html(alarmName);
	var div2 = $("<div>").addClass("time").html(hours + ":" + mins + ampm);
	newDiv.append(div1)
	      .append(div2);
	          
	$("#alarms").append(newDiv);
	hideAlarmPopup();
}

function addAlarm() {
	var hours = $("#hours option:selected").text();
   var mins = $("#mins option:selected").text();
	var ampm = $("#ampm option:selected").text();
	var alarmName = $("input[type='text']").val();
	
	insertAlarm(hours, mins, ampm, alarmName);
	hideAlarmPopup();
}

window.onload = getTemp;

