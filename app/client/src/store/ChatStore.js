import { observable, action } from 'mobx';

class ChatStore {
  @observable adminSelectionChatId = -1;

  @action setIsAdminOpenDialog() {
    // Ваша логика установки состояния для диалога администратора
  }

  @action setIsUserOpenDialog() {
    // Ваша логика установки состояния для диалога пользователя
  }
}

const chatStore = new ChatStore();
export default chatStore;
