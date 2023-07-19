import { App } from './app';

class Initialize extends App {
  constructor() {
    super();
    this.start();
  }

  private start() {
    this.config.listen(2000, () => 'http://localhost:2000');
  }
}
(function () {
  new Initialize();
})();
