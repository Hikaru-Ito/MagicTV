var data = "tuple={\"where\":\"delta\",\"name\":\"light\", \"cmd\":\"push\"}";
var xmlHttpRequest = new XMLHttpRequest();
xmlHttpRequest.open( 'POST', 'http://linda-server.herokuapp.com/masuilab' );
xmlHttpRequest.setRequestHeader( 'Content-Type', 'application/x-www-form-urlencoded' );
xmlHttpRequest.send(data);
console.log('Executed LightOn');