import {ClientEventType} from '../lib/enums';

const DEFAULT_THROTTLING_DELAY = 1000;
export const THROTTLE_CALLS_MESSAGE_TYPES = [
  ClientEventType.START_CALL,
  ClientEventType.NOT_AUTHORIZED,
  ClientEventType.AUTHORIZED,
];

class MessageThrottler {
  private throttlingDelay: number;
  private monitoringTypes: string[];
  private lastHandledTimes: Map<string | undefined, number>;

  constructor(typesToMonitor: string[] = [], throttlingDelay = DEFAULT_THROTTLING_DELAY) {
    this.throttlingDelay = throttlingDelay;
    this.lastHandledTimes = new Map();
    this.monitoringTypes = typesToMonitor;
  }

  public shouldBeSkipped({type, payload}: {type?: string; payload?: unknown}): boolean {
    const isMonitoringAll = this.monitoringTypes.length === 0;
    if (!type) {
      return true;
    }
    if (!isMonitoringAll && !this.monitoringTypes.includes(type)) {
      return false;
    }

    const currentTime = Date.now();

    if (this.lastHandledTimes.has(type)) {
      const lastHandledTime = this.lastHandledTimes.get(type) as number;
      this.lastHandledTimes.set(type, currentTime);
      return currentTime - lastHandledTime < this.throttlingDelay;
    }
    // todo only for 'xBeesStartCall'
    this.lastHandledTimes.set(type, currentTime);
    return false;
  }
}

export default MessageThrottler;
