import {IConnectController, IntegrationConnectVariants } from './types';
import {EventType} from '@wildix/xbees-connect';

export class IntegrationSendActionsController {
  static supportedActionTypes = new Map<IntegrationConnectVariants, string[]>([
    [
      'info-frame',
      [
        // WEB_CALL_START,
        // SIPJS_CALL_MAKE_VIA_DEVICE_FAILED,
        // SIPJS_CALL_MAKE_CALLBACK_FAILED,
        // APP_WEB_ACTIONS.USE_DARK_THEME,
        // APP_WEB_ACTIONS.USE_LIGHT_THEME,
        // APP_EVENTS.THEME_CHANGED,
      ],
    ],
    ['daemon', [
        // searchIntegrationsContacts.type,
      // integrationLookUpAndMatch.type
    ]],
    ['dialog', []],
  ]);

  static getSupportedActions(variant: IntegrationConnectVariants) {
    return this.supportedActionTypes.get(variant) as string[];
  }

  private integration: WimIFrameIntegration;

  private integrationRef: React.RefObject<IConnectController>;

  constructor(integration: WimIFrameIntegration, integrationRef: React.RefObject<IConnectController>) {
    this.integration = integration;
    this.integrationRef = integrationRef;
  }

  onAction = (action: AnyAction) => {
    try {
      const {current} = this.integrationRef;
      const isThemeOptionsSupported = getComparatorForVersion('v1.0.10');

      // extend here cases which inform integration with messages
      switch (action.type) {
        case WEB_CALL_START:
          current?.sendMessage({type: EventType.ADD_CALL});
          break;
        case SIPJS_CALL_MAKE_VIA_DEVICE_FAILED:
        case SIPJS_CALL_MAKE_CALLBACK_FAILED:
          current?.sendMessage({type: EventType.TERMINATE_CALL});
          break;

        case APP_EVENTS.THEME_CHANGED: {
          const {theme} = action;

          if (isThemeOptionsSupported(current?.version())) {
            current?.sendTheme(theme);
          } else {
            current?.sendMessage({type: EventType.USE_THEME, payload: theme});
          }

          break;
        }

        case APP_WEB_ACTIONS.USE_DARK_THEME: {
          if (isThemeOptionsSupported(current?.version())) {
            current?.sendTheme('dark');
          } else {
            current?.sendMessage({type: EventType.USE_THEME, payload: 'dark'});
          }

          break;
        }

        case APP_WEB_ACTIONS.USE_LIGHT_THEME: {
          if (isThemeOptionsSupported(current?.version())) {
            current?.sendTheme('light');
          } else {
            current?.sendMessage({type: EventType.USE_THEME, payload: 'light'});
          }

          break;
        }

        case integrationLookUpAndMatch.type: {
          if (this.integration.usePbxToken) {
            fetchCognitoIdToken()
              .then((token: string) => {
                current?.sendMessage({
                  type: EventType.PBX_TOKEN,
                  payload: token,
                });
              })
              .then(() => {
                current?.sendMessage({
                  type: EventType.GET_LOOK_UP_AND_MATCH,
                  payload: action.payload,
                });
              });
          }

          break;
        }

        case searchIntegrationsContacts.type:
          if (this.integration.usePbxToken) {
            fetchCognitoIdToken()
              .then((token: string) => {
                current?.sendMessage({
                  type: EventType.PBX_TOKEN,
                  payload: token,
                });
              })
              .then(() => {
                current?.sendMessage({
                  type: EventType.GET_CONTACTS_AUTO_SUGGEST,
                  payload: action.payload.search,
                });
              });
          } else {
            current?.sendMessage({
              type: EventType.GET_CONTACTS_AUTO_SUGGEST,
              payload: action.payload.search,
            });
          }

          break;
        default:
      }
    } catch (error) {
      // captureException(error, {
      //   level: 'error',
      //   extra: {
      //     action,
      //   },
      // });
    }
  };
}
