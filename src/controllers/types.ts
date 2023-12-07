import {ThemeOptions} from '@mui/material';
import {ContactQuery, IPayloadViewPort, Message, MessageIFrameResponse} from '@wildix/xbees-connect/dist-types/types';
import {ClientEventType, EventType} from '@wildix/xbees-connect';


export type IntegrationConnectVariants = 'info-frame' | 'daemon' | 'dialog';

export type ThemeMode = 'light' | 'dark';

export interface Theme {
  mode: ThemeMode;
  themeOptions?: Partial<ThemeOptions>;
}


export interface IConnectController {
  onMessageEvent: (messageEvent: MessageEvent<MessageIFrameResponse>) => void;
  sendTheme: (theme: ThemeMode) => void;
  sendMessage: (message: Message<EventType>) => void;
  isInitialized: () => boolean;
  isActive: () => boolean;
  version: () => string;
}

export interface SearchContactsCompleteResult {
  query: string;
  contacts: Record<string, string>[];
}

export interface MatchContactResult {
  query: ContactQuery;
  contact: Record<string, string>[];
}

export type ShowToast = (data: Record<string, string>) => void;
export type StartCall = (number: string) => void;
export type IntegrationStatusAction = (status: string) => void;
export type SearchContactsCompleteAction = (payload: SearchContactsCompleteResult) => void;
export type LookUpAndMatchContactResultAction = (payload: MatchContactResult) => void;
export type ComponentStateUpdate = (type: ClientEventType, payload: IPayloadViewPort) => void;
