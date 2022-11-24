const { httpError } = require("../helpers/handleErrors");
const ChatDaoMongoose = require("../daos/daoChatMongoose");

const { ChatService } = require("../services/chat");

class ChatController {
  constructor() {
    this.controller = new ChatService();
  }

  getChat = async (req, res) => {
    const username = req.user.username;

    await this.controller.listAllMsgs();
    res.render("chat", { username: username });
  };

  getChatHistory = async (req, res) => {
    const email = req.params.email;
    const chats = await this.controller.listChatHistory(email);
    res.render("chatFilter", { username: email, chats });
  };
}

module.exports = { ChatController };