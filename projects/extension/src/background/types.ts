import { AppMediator } from './AppMediator';

export interface InitAppNameSpec {
  id: string,
  chainName: string,
  origin: string,
  uAppName: string,
  chainSpec?: string
}

// TODO: this is duplicated with `NetworkStatus` in ../types
export type AppState = 'connected' | 'ready' | 'disconnecting' | 'disconnected';

export interface MessageIDMapping {
  readonly appID: number | undefined;
  readonly smoldotID: number;
}

export interface SubscriptionMapping {
  readonly appIDForRequest: number | undefined;
  subID: number | string  | undefined;
  method: string;
}

export interface ConnectionManagerInterface {
  hasClientFor: (name: string) => boolean;
  sendRpcMessageTo: (name: string, message: JsonRpcRequest) => number;
  registerApp: (app: AppMediator, name: string) => void;
  unregisterApp: (app: AppMediator, name: string) => void;
}

export interface JsonRpcObject {
  id?: number;
  jsonrpc: string;
}

export interface JsonRpcRequest extends JsonRpcObject {
  method: string;
  params: unknown[];
}

export interface JsonRpcResponseBaseError {
  code: number;
  data?: number | string;
  message: string;
}

export interface JsonRpcResponseSingle {
  error?: JsonRpcResponseBaseError;
  result?: unknown;
}

export interface JsonRpcResponseSubscription {
  method?: string;
  params?: {
    error?: JsonRpcResponseBaseError;
    result: unknown;
    subscription: number | string;
  };
}

export type JsonRpcResponseBase = JsonRpcResponseSingle & JsonRpcResponseSubscription;

export type JsonRpcResponse = JsonRpcObject & JsonRpcResponseBase
