export enum WebhookActionType {
  POST_USER_CREATION = 'POST_USER_CREATION',
  POST_USER_USER = 'POST_USER_USER',
  POST_PASSWORD_CHANGED = 'POST_PASSWORD_CHANGED',
}

export interface WebhookCreate {
  actionType: WebhookActionType
  url: string
}

export interface WebhookUpdate extends Partial<WebhookCreate>{}
