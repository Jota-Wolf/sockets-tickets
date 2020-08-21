const { io } = require("../server");
const { TicketControl } = require("../classes/ticket-control");

const ticketControl = new TicketControl();

io.on("connection", (client) => {
  console.log("Usuario conectado");

  client.on("disconnect", () => {
    console.log("Usuario desconectado");
  });

  client.on("siguienteTicket", (data, callback) => {
    let siguiente = ticketControl.siguienteTicket();
    console.log(siguiente);
    callback(siguiente);
  });

  client.emit("estadoActual", {
    actual: ticketControl.getUltimoTicket(),
    ultimosCuatro: ticketControl.getUltimoCuatro(),
  });

  client.on("atenderTicket", (data, callback) => {
    if (!data.escritorio) {
      return callback({
        err: true,
        mensaje: "El escritorio es necesario",
      });
    }

    let atenderTicket = ticketControl.atenderTicket(data.escritorio);

    callback(atenderTicket);

    client.broadcast.emit("ultimosCuatro", {
      ultimosCuatro: ticketControl.getUltimoCuatro(),
      tickets: ticketControl.getTickets(),
    });
  });
});
