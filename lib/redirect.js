
function redirect_init() {
    // First, parse the query string
    var params = {}, queryString = location.hash.substring(1),
        regex = /([^&=]+)=([^&]*)/g, m;
    while (m = regex.exec(queryString)) {
        params[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
        alert (decodeURIComponent(m[1])+ ":" +params[decodeURIComponent(m[1])]);
    }

    // And send the token over to the server
    var req = new XMLHttpRequest();
    // consider using POST so query isn't logged
    req.open('GET', 'https://' + window.location.host + '/catchtoken?' + queryString, true);

    req.onreadystatechange = function (e) {
        if (req.readyState == 4) {
            if(req.status == 200){
                window.location = params['state']
            }
            else if(req.status == 400) {
                alert('There was an error processing the token.')
            }
            else {
                alert('something else other than 200 was returned')
            }
        }
    };
    req.send(null);
    // Call callback function: in parent window
    
    // Close window
    window.close();
}

window.onload = redirect_init;
