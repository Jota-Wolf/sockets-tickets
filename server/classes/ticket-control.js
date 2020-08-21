const fs = require("fs");

//La clase Ticket se crea para poder manejar los tickets que van quedando en cola
//y asignarlo a un escritorio de trabajo
class Ticket {
  constructor(numero, escritorio) {
    this.numero = numero;
    this.escritorio = escritorio;
  }
}

class TicketControl {
  constructor() {
    this.ultimo = 0;
    this.hoy = new Date().getDate();
    //En este arreglo se van almacenar todos los tickets pendiente de revision
    this.tickets = [];
    this.ultimosCuatro = [];

    let data = require("../data/data.json");

    if (data.hoy === this.hoy) {
      this.ultimo = data.ultimo;
      this.tickets = data.tickets;
      this.ultimosCuatro = data.ultimosCuatro;
    } else {
      this.reiniciarConteo();
    }
  }

  siguienteTicket() {
    this.ultimo += 1;

    let ticket = new Ticket(this.ultimo, null);
    this.tickets.push(ticket);

    this.grabarArchivo();

    return `Ticket ${this.ultimo}`;
  }

  getUltimoTicket() {
    return `Ticket ${this.ultimo}`;
  }

  getUltimoCuatro() {
    return this.ultimosCuatro;
  }

  getTickets() {
    return this.tickets;
  }

  atenderTicket(escritorio) {
    if (this.tickets.length === 0) {
      return "No hay tickets";
    }

    //Obtengo el primer numero del ticket que tengo pendiente en la cola
    let numeroTicket = this.tickets[0].numero;
    //Con la funcion shift borro el primer elemento de un arreglo
    this.tickets.shift();
    //Declaro una nueva instancia de ticket que es el que voy atender
    let atenderTicket = new Ticket(numeroTicket, escritorio);
    //Con la funcion unshift agrego un valor al inicio del arreglo
    this.ultimosCuatro.unshift(atenderTicket);

    if (this.ultimosCuatro.length > 4) {
      //Con la funcion splice(-1,1) borro el ultimo elemento del arreglo
      this.ultimosCuatro.splice(-1, 1);
    }

    console.log("Ultimos 4");
    console.log(this.ultimosCuatro);

    this.grabarArchivo();
    return atenderTicket;
  }

  reiniciarConteo() {
    this.ultimo = 0;
    this.tickets = [];
    this.ultimosCuatro = [];
    console.log("Se ha inicializado el sistema");
    this.grabarArchivo();
  }

  grabarArchivo() {
    let jsonData = {
      ultimo: this.ultimo,
      hoy: this.hoy,
      tickets: this.tickets,
      ultimosCuatro: this.ultimosCuatro,
    };

    let jsonDataString = JSON.stringify(jsonData);

    fs.writeFileSync("./server/data/data.json", jsonDataString);
  }
}

module.exports = {
  TicketControl,
};
