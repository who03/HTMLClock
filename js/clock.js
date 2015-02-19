var currentUserId;

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

function getAllAlarms(userId) {
	Parse.initialize("P1bdGllccdIegm0srtvRbqp1jJePkNywFGHWW8zF", "0a5VvbSayMudMFNEfjoCgc7j0O24TYd7pPOmavNM");
	var AlarmObject = Parse.Object.extend("Alarm");
	var query = new Parse.Query(AlarmObject);
	currentUserId = userId;
	query.equalTo("userId", currentUserId);
	query.find({
		success: function(results) {
			for (var i = 0; i < results.length; i++) {
				var time = results[i].get("time");
				insertAlarm(time.hours, time.mins, time.ampm,
				results[i].get("alarmName"));
			}
		}
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
	var newDiv = $("<div>").addClass("flexable").attr("id", alarmName);
	var div1 = $("<div>").addClass("name").html(alarmName);
	var div2 = $("<div>").addClass("time").html(hours + ":" + mins + ampm);
	var deleteButton = $("<input>")
		.attr("type", "button")
		.attr("id", "alarm" + alarmName)
		.attr("value", "Delete")
		.attr("onclick","deleteAlarm('" + alarmName + "')")
		.addClass("button");
	newDiv.append(div1)
	      .append(div2)
	      .append(deleteButton);
	          
	$("#alarms").append(newDiv);
	hideAlarmPopup();
}

function deleteAlarm(alarmName) {
	var AlarmObject = Parse.Object.extend("Alarm");
	var query = new Parse.Query(AlarmObject);
	query.equalTo("alarmName", alarmName);
	query.find({
		success: function(results) {
			for (var i = 0; i < results.length; i++) {
				var obj = results[i];
				if (obj.alarmName = alarmName) {
					obj.destroy({
						success: function(object) {
							$("div[id='" + alarmName+ "']").remove();
						}
					});
				}
			}
		}
	});
	//$("#alarm" + alarmName).remove();
}

function addAlarm() {
	var hours = $("#hours option:selected").text();
	var mins = $("#mins option:selected").text();
	var ampm = $("#ampm option:selected").text();
	var alarmName = $("input[type='text']").val();
	
	var AlarmObject = Parse.Object.extend("Alarm");
	var alarmObject = new AlarmObject();
	var time = {
		hours : hours,
		mins : mins,
		ampm : ampm,
	};
	alarmObject.save({"time": time, "alarmName": alarmName, "userId": currentUserId}, {
					 success: function(object) {
							insertAlarm(hours, mins, ampm, alarmName);
							hideAlarmPopup();
						}
					 });
}

function signinCallback(authResult) {
  if (authResult['status']['signed_in']) {
    // Update the app to reflect a signed in user
    // Hide the sign-in button now that the user is authorized, for example:
    getAllAlarms(authResult['id_token']['sub']);
    $("#signedIn").removeClass("hide");
    document.getElementById('signinButton').setAttribute('style', 'display: none');
  } else {
    // Update the app to reflect a signed out user
    // Possible error values:
    //   "user_signed_out" - User is signed-out
    //   "access_denied" - User denied access to your app
    //   "immediate_failed" - Could not automatically log in the user
    $("#signedIn").addClass("hide");
    console.log('Sign-in state: ' + authResult['error']);
  }
}

window.onload = function() {
	getTemp();
}

