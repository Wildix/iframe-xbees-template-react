import React from 'react';

import MessageThrottler, {THROTTLE_CALLS_MESSAGE_TYPES} from './MessageThrottler';
import {
    IConnectController, IntegrationConnectVariants, IntegrationStatusAction, LookUpAndMatchContactResultAction,
    SearchContactsCompleteAction, SearchContactsCompleteResult, ShowToast, StartCall, Theme, ThemeMode
} from './types';
import {
    IPayloadAutoSuggestResult,
    IPayloadCallStart, IPayloadContactMatchResult,
    IPayloadVersion, IPayloadViewPort,
    Message, MessageIFrameResponse,
    MessageType,
    ResponseMessage
} from '@wildix/xbees-connect/dist-types/types';
import {ClientEventType, EventType} from '@wildix/xbees-connect';

type ContextInfo = unknown;
type WimIFrameIntegration = unknown;
export class IntegrationConnectController<T> implements IConnectController {
  private iFrameRef: React.RefObject<T>;

  private variant: IntegrationConnectVariants;

  private theme: Theme;

  private showToast: ShowToast;

  private startCallAction: StartCall;

  private integrationStatusChangedAction: IntegrationStatusAction;

  private searchContactsCompleteAction: SearchContactsCompleteAction;

  private lookUpAndMatchContactResultAction: LookUpAndMatchContactResultAction;

  private context: ContextInfo;

  private integration: WimIFrameIntegration;

  private messageThrottler: MessageThrottler;

  private initialized = false;

  private connectVersion = 'v0.0.1';

  private active: boolean | undefined = undefined;

  constructor(
    iframeRef: React.RefObject<T>,
    variant: IntegrationConnectVariants,
    theme: ThemeMode,
    context: ContextInfo,
    integration: WimIFrameIntegration,
    showToast: ShowToast,
    startCallAction: StartCall,
    integrationStatusChangedAction: IntegrationStatusAction,
    searchContactsCompleteAction: SearchContactsCompleteAction,
    lookUpAndMatchContactResultAction: LookUpAndMatchContactResultAction,
  ) {
    this.iFrameRef = iframeRef;
    this.variant = variant;
    this.context = context;
    this.integration = integration;
    this.showToast = showToast;
    this.startCallAction = startCallAction;
    this.integrationStatusChangedAction = integrationStatusChangedAction;
    this.searchContactsCompleteAction = searchContactsCompleteAction;
    this.lookUpAndMatchContactResultAction = lookUpAndMatchContactResultAction;
    this.theme = this.createTheme(theme);
    this.messageThrottler = new MessageThrottler(THROTTLE_CALLS_MESSAGE_TYPES);
  }

  private createTheme(theme: ThemeMode) {
    this.theme = {
      mode: theme,
      // themeOptions: {
      //   // @ts-expect-error TODO fix typography type
      //   typography: {...typography, fontFamily: this.getFontFamily()},
      //   palette: theme === 'dark' ? paletteDark : palette,
      // },
    };

    return this.theme;
  }

  // private getFontFamily() {
  //   // escaping quotes to prevent errors on serializing
  //   return typography.fontFamily.replace(/"/g, '\\"');
  // }

  private getResponseOnMessage<T extends MessageType = MessageType>(type: T, message: Message<T>): ResponseMessage {
    let resultPayload: unknown;
    let errorMessage = '';

    switch (type) {
      case ClientEventType.READY:
        this.initialized = true;
        this.connectVersion = (message.payload as IPayloadVersion).version;
        break;
      case ClientEventType.NOT_AUTHORIZED:
        if (this.active === false) {
          break;
        }

        this.active = false;

        if (this.variant !== 'dialog') {
          this.integrationStatusChangedAction('not_active');
        }

        break;
      case ClientEventType.AUTHORIZED:
        if (this.active === true) {
          break;
        }

        this.active = true;
        this.integrationStatusChangedAction('active');
        break;
      case ClientEventType.CONTEXT:
        resultPayload = this.context;
        break;
      case ClientEventType.CURRENT_CONTACT:
        resultPayload = this.context;
        break;
      case ClientEventType.THEME_MODE:
        resultPayload = this.theme.mode;
        break;
      case ClientEventType.THEME:
        resultPayload = this.theme;
        break;

      case ClientEventType.START_CALL: {
        const payloadForCall = message.payload as IPayloadCallStart;

        if (payloadForCall?.phoneNumber) {
          this.startCall(payloadForCall);
          resultPayload = 'call start accepted';
        } else {
          resultPayload = 'error';
          errorMessage = "payload doesn't exist or doesn't have a phone number";
        }

        break;
      }

      case ClientEventType.VIEW_PORT: {
        this.setViewPort(message.payload as IPayloadViewPort);
        resultPayload = 'ok';
        break;
      }

      case ClientEventType.REBOOT:
        // skip, think about remove
        resultPayload = 'skip';
        break;
      case ClientEventType.CONTACTS_AUTO_SUGGEST:
        if (message.payload) {
          this.autoSuggestResult(message.payload as IPayloadAutoSuggestResult);
          resultPayload = 'ok';
        }

        break;
      case ClientEventType.CONTACT_LOOKUP_AND_MATCH:
        if (message.payload) {
          this.matchedContact(message.payload as IPayloadContactMatchResult);
          resultPayload = 'ok';
        }

        break;
      case ClientEventType.TO_CLIPBOARD:
        if (message.payload) {
          this.copyToClipboard(message.payload as string);
          // this.showToast({
          //   variant: ToastVariant.SUCCESS,
          //   message: i18n.t('copied'),
          // });
          resultPayload = 'ok';
        } else {
          // this.showToast({
          //   variant: ToastVariant.ERROR,
          //   message: `${i18n.t('session.error')}. ${i18n.t('error.emptyMessageText')}`,
          // });
          resultPayload = 'error';
        }

        break;
      default:
        errorMessage = `command ${type} not supported`;
        console.warn('Unknown message type:', message.payload);
        // captureMessage('Unknown iframe message type:', {
        //   level: 'warning',
        //   extra: {
        //     payload: message.payload,
        //   },
        // });
    }

    // @ts-expect-error TODO fix payload type
    return {type, errorMessage, payload: resultPayload};
  }

  private isMessageSupportedByIntegration(type?: EventType) {
    return !!type;
  }

  public isInitialized(): boolean {
    return this.initialized;
  }

  public isActive(): boolean {
    return !!this.active;
  }

  public version(): string {
    return this.connectVersion;
  }

  public sendTheme(theme: ThemeMode) {
    this.sendMessage({type: EventType.USE_THEME, payload: this.createTheme(theme)});
  }

  public sendMessage(message: Message<EventType>) {
    try {
      if (this.initialized && this.iFrameRef.current && this.isMessageSupportedByIntegration(message.type)) {
        this.postMessage(message);
      }
    } catch (error) {
      // captureException(error, {
      //   level: 'error',
      //   extra: {
      //     message,
      //     controller: this,
      //   },
      // });
    }
  }

  public async onMessageEvent(event: MessageEvent<MessageIFrameResponse>) {
    const {data: message} = event;
    let response: ResponseMessage;

    if (!message.type) {
      // it's strange to be here
      response = {type: message.type, errorMessage: 'message skipped, message type should be provided'};
    } else if (this.messageThrottler.shouldBeSkipped(message)) {
      response = {type: message.type, errorMessage: 'message skipped, same message type called too fast'};
    } else {
      response = this.getResponseOnMessage(message.type, message);
    }

    this.sendResponse(event, response);
  }

  protected getIframe() {
    return this.iFrameRef.current;
  }

  protected copyToClipboard(payload: string) {
    console.debug('Integration - copy:', payload);
  }

  protected autoSuggestResult(result: IPayloadAutoSuggestResult) {
    const {contacts, query} = result;
    const payload: SearchContactsCompleteResult = {
      query,
      contacts: contacts.map((contact) => {
        const integrationContact: Record<string, string> = {...contact, integration: this.integration};

        return integrationContact;
      }),
    };
    this.searchContactsCompleteAction(payload);
    console.debug('Integration - SearchResult:', result);
  }

  protected matchedContact(result: IPayloadContactMatchResult) {
    const {contact, query} = result;
    this.lookUpAndMatchContactResultAction({
      contact: {...contact, integrationId: this.integration.integrationId, updatedAt: new Date()},
      query,
    });
    console.debug('Integration - MatchedContact:', result);
  }

  protected startCall(payload: IPayloadCallStart) {
    this.startCallAction(payload.phoneNumber);
    console.debug('Integration - start call:', payload);
  }

  protected setViewPort(payload: IPayloadViewPort): void {
    if (payload.height === 0 || payload.height === '0') {
      return;
    }

    console.debug('Integration - viewport change', payload);
  }

  protected sendResponse(event: MessageEvent, response: ResponseMessage) {
    console.debug('Integration - onmessage: ', event.data);
    console.debug('Integration - response:', response);
  }

  protected postMessage(message: Message) {
    console.debug('Integration - post message:', message);
  }
}
