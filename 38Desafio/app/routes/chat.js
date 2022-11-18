const { Router } = require("express");
const routerChat = Router();
const isLogged = require("../middlewares/isLogged");

const { ChatController } = require("../controllers/chat");

class RouterChat {
  constructor() {
    this.controller = new ChatController();
  }

  config() {
    routerChat.get("/", isLogged, this.controller.getChat);

    routerChat.get("/:email", isLogged, this.controller.getChatHistory);

    return routerChat;
  }
}

module.exports = RouterChat;