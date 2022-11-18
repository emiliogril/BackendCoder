const DaoChatMongoose = require("../daos/daoChatMongoose");

class ChatService {
  constructor() {
    this.dao = new DaoChatMongoose();
  }

  listAllMsgs = async () => {
    let chats = await this.dao.getAll();
    if (chats === []) {
      return "No Chats Found";
    }
    return chats;
  };

  listChatHistory = async (email) => {
    let chats = await this.dao.getAll();
    if (chats.lenght === 0) {
      return "No Chats Found";
    }
    const chatFiltered = chats.filter((chat) => chat.email === email);
    return chatFiltered;
  };
}

module.exports = { ChatService };