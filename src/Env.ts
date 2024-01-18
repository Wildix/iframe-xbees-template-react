import startFetchRequestsInterceptor from './mocks/RequestsInterceptor';
import ContactsRepository from './mocks/ContactsRepository';

class Env {
  static appName = APP_NAME;

  static appVersion = APP_VERSION;

  static beforeStart() {
    console.log(Env.appName, `v${Env.appVersion}`);

    startFetchRequestsInterceptor();

    ContactsRepository.getInstance().refreshFromStorage();
  }

  static isDev() {
    return import.meta.env.DEV
  }
}

export default Env;
