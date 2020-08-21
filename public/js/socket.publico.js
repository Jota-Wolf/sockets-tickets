var socket = io();

var lblTicket1 = $("#lblTicket1");
var lblTicket2 = $("#lblTicket2");
var lblTicket3 = $("#lblTicket3");
var lblTicket4 = $("#lblTicket4");

var lblEscritorio1 = $("#lblEscritorio1");
var lblEscritorio2 = $("#lblEscritorio2");
var lblEscritorio3 = $("#lblEscritorio3");
var lblEscritorio4 = $("#lblEscritorio4");

var lblTickets = [lblTicket1, lblTicket2, lblTicket3, lblTicket4];
var lblEscritorios = [
  lblEscritorio1,
  lblEscritorio2,
  lblEscritorio3,
  lblEscritorio4,
];

socket.on("estadoActual", function (data) {
  actualizaHTML(data.ultimosCuatro);
});

socket.on("ultimosCuatro", function (data) {
  var audio = new Audio("audio/gta-v.mp3");
  var audio_no = new Audio("audio/new-ticket.mp3");
  if (data.tickets.length === 0) {
    audio_no.play();
  } else {
    audio.play();
  }
  actualizaHTML(data.ultimosCuatro);
});

function actualizaHTML(ultimosCuatro) {
  for (var i = 0; i <= ultimosCuatro.length - 1; i++) {
    lblTickets[i].text("Ticket " + ultimosCuatro[i].numero);
    lblEscritorios[i].text("Escritorio " + ultimosCuatro[i].escritorio);
  }
}
