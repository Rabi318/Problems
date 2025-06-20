const { readTickets, writeTickets } = require("../models/ticket.model");

const getAllTickets = (req, res) => {
  const tickets = readTickets();
  res.json(tickets);
};

const getTicketById = (req, res) => {
  const id = Number(req.params.id);
  const tickets = readTickets();
  const ticket = tickets.find((t) => t.id === id);

  if (!ticket) {
    return res.status(404).json({ message: "Ticket not found" });
  }

  res.json(ticket);
};

const createTicket = (req, res) => {
  const { title, description, priority, user } = req.body;
  const tickets = readTickets();
  const id = tickets.length > 0 ? tickes[tickets.length - 1].id + 1 : 1;
  const newTicket = {
    id,
    title,
    description,
    priority,
    user,
    status: "pending",
  };

  tickets.push(newTicket);
  writeTickets(tickets);
  res.status(201).json(newTicket);
};

const updateTicket = (req, res) => {
  const id = Number(req.params.id);
  const { title, description, priority } = req.body;
  const tickets = readTickets();
  const index = tickets.findIndex((t) => t.id === id);
  if (index === -1) return res.status(404).json({ error: "Ticket not found" });

  if (title) tickets[index].title = title;
  if (description) tickets[index].description = description;
  if (priority) tickets[index].priority = priority;

  writeTickets(tickets);
  res.status(200).json({ message: "Ticket updated", ticket: tickets[index] });
};

const deleteTicket = (req, res) => {
  const id = Number(req.params.id);
  const tickets = readTickets();
  const index = tickets.findIndex((t) => t.id === id);
  if (index === -1) return res.status(404).json({ error: "Ticket not found" });

  const removed = tickets.splice(index, 1);
  writeTickets(tickets);
  res.status(200).json({ message: "Ticket deleted", ticket: removed[0] });
};

const resolveTicket = (req, res) => {
  const id = Number(req.params.id);
  const tickets = readTickets();
  const index = tickets.findIndex((t) => t.id === id);
  if (index === -1) return res.status(404).json({ error: "Ticket not found" });

  tickets[index].status = "resolved";
  writeTickets(tickets);
  res.status(200).json({ message: "Ticket resolved", ticket: tickets[index] });
};

module.exports = {
  getAllTickets,
  getTicketById,
  createTicket,
  updateTicket,
  deleteTicket,
  resolveTicket,
};
