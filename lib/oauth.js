var queryStringParams, callbackFunc, popup;
var timer;

function checkLogin() {
    if (popup.closed) {
        callBackUsername(); 
        clearInterval(timer);
    }
}

function init(obj) {
	queryStringParams = "client_id=" + obj.client_id + 
						"&response_type=" + obj.type;
	callbackFunc = obj.callbackFunc;
}

function login() {
	popup = window.open("https://api.imgur.com/oauth2/authorize?" + 
		queryStringParams);
	timer = setInterval(checkLogin, 500);
	/*$.ajax({
		url:"https://api.imgur.com/oauth2/authorize",
		type: "GET",
		data: {
			client_id: client_id,
			response_type: type
		},
		success: 
		error:
		
	});
	* */
}

function callBackUsername() {
	var name;
	$.ajax({
		url:"https://api.imgur.com/3/account/me",
		type: "GET",
		dataType : "json",
		success: function (json) {
			name = json.data.url;
			alert("Welcome " + name);
		},
		error: function (json) {
			console.log(json.data.error);
		}
	});
}

window.onload = init({
	"client_id":"bfae172484d298c",
	"type":"token",
	"callbackFunc":"callBackUsername"
});
