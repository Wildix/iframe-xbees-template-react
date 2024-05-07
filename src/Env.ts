import ContactsRepository from './mocks/ContactsRepository';
import startFetchRequestsInterceptor from './mocks/RequestsInterceptor';

class Env {
  static appName = APP_NAME;

  static appVersion = APP_VERSION;

  static beforeStart() {
    console.log(Env.appName, `v${Env.appVersion}`);

    startFetchRequestsInterceptor();

    ContactsRepository.getInstance().refreshFromStorage();
  }

  static isDev() {
    return import.meta.env.DEV;
  }
}

export default Env;
