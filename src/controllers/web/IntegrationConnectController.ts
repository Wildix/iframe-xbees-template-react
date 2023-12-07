import {IntegrationConnectController} from '../IntegrationConnectController';
import {IPayloadViewPort, ResponseMessage} from '@wildix/xbees-connect/dist-types/types';

export class IntegrationConnectControllerWeb extends IntegrationConnectController<HTMLIFrameElement> {
  protected copyToClipboard(payload: string) {
    super.copyToClipboard(payload);
    // copyToClipboard(payload);
  }

  protected setViewPort(payload: IPayloadViewPort): void {
    super.setViewPort(payload);

    const iFrame = this.getIframe();

    if (iFrame && payload) {
      iFrame.setAttribute('height', `${payload.height}`);
      iFrame.setAttribute('width', `${payload.width}`);
    }
  }

  protected sendResponse(event: MessageEvent, responseMessage: ResponseMessage) {
    super.sendResponse(event, responseMessage);
    const {ports: [target] = []} = event;
    target?.postMessage(responseMessage);
  }

  protected postMessage(message: ResponseMessage) {
    super.postMessage(message);
    const iFrame = this.getIframe();
    iFrame?.contentWindow?.postMessage(message, '*');
  }
}
