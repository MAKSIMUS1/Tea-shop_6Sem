import { observable } from 'mobx';

class UserStore {
  @observable type = 'user'; // Предположим, что по умолчанию пользователь - обычный пользователь, а не администратор
  @observable name = 'Пользователь'; // Предположим, что по умолчанию имя пользователя "Пользователь"
  @observable id = 1; // Предположим, что по умолчанию id пользователя равен 1

  // Другие поля и методы могут быть добавлены сюда в зависимости от вашей логики и потребностей
}

const userStore = new UserStore();
export default userStore;
