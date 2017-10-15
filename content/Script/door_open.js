var data = "tuple={\"where\":\"delta\",\"type\":\"door\", \"cmd\":\"open\"}";
var xmlHttpRequest = new XMLHttpRequest();
xmlHttpRequest.open( 'POST', 'http://linda-server.herokuapp.com/masuilab' );
xmlHttpRequest.setRequestHeader( 'Content-Type', 'application/x-www-form-urlencoded' );
xmlHttpRequest.send(data);
console.log('Executed DoorOpen');