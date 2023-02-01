class IdleTimer {
  timeout: any;
  onTimeout: any;
  eventHandler: any;
  interval: any;
  timeoutTracker: any;

  constructor({ timeout, onTimeout, onExpired }: any) {
    this.timeout = timeout;
    this.onTimeout = onTimeout;

    const expiredTime = Number(localStorage.getItem('_expiredTime') || 0);
    if (expiredTime > 0 && expiredTime < Date.now()) {
      onExpired();
      return;
    }

    this.eventHandler = this.updateExpiredTime.bind(this);
    this.tracker();
    this.startInterval();
  }

  startInterval() {
    this.updateExpiredTime();

    this.interval = setInterval(() => {
      const expiredTime = Number(localStorage.getItem('_expiredTime') || 0);
      if (expiredTime < Date.now()) {
        if (this.onTimeout) {
          this.onTimeout();
          this.cleanUp();
        }
      }
    }, 1000);
  }

  updateExpiredTime() {
    if (this.timeoutTracker) {
      clearTimeout(this.timeoutTracker);
    }
    this.timeoutTracker = localStorage.setItem('_expiredTime', String(Date.now() + this.timeout * 1000));
  }

  tracker() {
    window.addEventListener('mousemove', this.eventHandler);
    window.addEventListener('scroll', this.eventHandler);
    window.addEventListener('keydown', this.eventHandler);
    window.addEventListener('click', this.eventHandler);
  }

  cleanUp() {
    localStorage.removeItem('_expiredTime');
    clearInterval(this.interval);
    window.removeEventListener('mousemove', this.eventHandler);
    window.removeEventListener('scroll', this.eventHandler);
    window.removeEventListener('keydown', this.eventHandler);
    window.addEventListener('click', this.eventHandler);
  }
}
export default IdleTimer;
