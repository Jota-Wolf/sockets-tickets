var socket = io();
//Puedo obtener los parametros por url con URLSearchParams
var serchParams = new URLSearchParams(window.location.search);
//La funcion has('escritorio) va a verificar si se esta mandando un escritorio por url
if (!serchParams.has("escritorio")) {
  window.location = "index.html";
  throw new Error("El escritorio es necesario");
}
//Con serchParams.get() obtengo el valor que viene por la url
var escritorio = serchParams.get("escritorio");
var label = $("small");
var h4 = $("h4");
$("h1").text("Escritorio " + escritorio);

$("button").on("click", function () {
  socket.emit("atenderTicket", { escritorio: escritorio }, function (resp) {
    if (resp === "No hay tickets") {
      label.text("Ya no quedan Tickets");
      return;
    }
    label.text("Ticket " + resp.numero);
  });
});
