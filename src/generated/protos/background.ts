/* eslint-disable */
import { ChannelCredentials, Client, makeGenericClientConstructor, Metadata } from "@grpc/grpc-js";
import type {
  CallOptions,
  ClientOptions,
  ClientUnaryCall,
  handleUnaryCall,
  ServiceError,
  UntypedServiceImplementation,
} from "@grpc/grpc-js";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "background";

export interface SendBackgroundRequest {
  id: string;
  name: string;
}

export interface SendBackgroundResponse {
  success: boolean;
}

function createBaseSendBackgroundRequest(): SendBackgroundRequest {
  return { id: "", name: "" };
}

export const SendBackgroundRequest = {
  encode(message: SendBackgroundRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.name !== "") {
      writer.uint32(18).string(message.name);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SendBackgroundRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSendBackgroundRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.id = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.name = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SendBackgroundRequest {
    return {
      id: isSet(object.id) ? globalThis.String(object.id) : "",
      name: isSet(object.name) ? globalThis.String(object.name) : "",
    };
  },

  toJSON(message: SendBackgroundRequest): unknown {
    const obj: any = {};
    if (message.id !== "") {
      obj.id = message.id;
    }
    if (message.name !== "") {
      obj.name = message.name;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SendBackgroundRequest>, I>>(base?: I): SendBackgroundRequest {
    return SendBackgroundRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SendBackgroundRequest>, I>>(object: I): SendBackgroundRequest {
    const message = createBaseSendBackgroundRequest();
    message.id = object.id ?? "";
    message.name = object.name ?? "";
    return message;
  },
};

function createBaseSendBackgroundResponse(): SendBackgroundResponse {
  return { success: false };
}

export const SendBackgroundResponse = {
  encode(message: SendBackgroundResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.success !== false) {
      writer.uint32(8).bool(message.success);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SendBackgroundResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSendBackgroundResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.success = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SendBackgroundResponse {
    return { success: isSet(object.success) ? globalThis.Boolean(object.success) : false };
  },

  toJSON(message: SendBackgroundResponse): unknown {
    const obj: any = {};
    if (message.success !== false) {
      obj.success = message.success;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SendBackgroundResponse>, I>>(base?: I): SendBackgroundResponse {
    return SendBackgroundResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SendBackgroundResponse>, I>>(object: I): SendBackgroundResponse {
    const message = createBaseSendBackgroundResponse();
    message.success = object.success ?? false;
    return message;
  },
};

export type BackgroundServiceService = typeof BackgroundServiceService;
export const BackgroundServiceService = {
  sendBackground: {
    path: "/background.BackgroundService/SendBackground",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: SendBackgroundRequest) => Buffer.from(SendBackgroundRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => SendBackgroundRequest.decode(value),
    responseSerialize: (value: SendBackgroundResponse) => Buffer.from(SendBackgroundResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => SendBackgroundResponse.decode(value),
  },
} as const;

export interface BackgroundServiceServer extends UntypedServiceImplementation {
  sendBackground: handleUnaryCall<SendBackgroundRequest, SendBackgroundResponse>;
}

export interface BackgroundServiceClient extends Client {
  sendBackground(
    request: SendBackgroundRequest,
    callback: (error: ServiceError | null, response: SendBackgroundResponse) => void,
  ): ClientUnaryCall;
  sendBackground(
    request: SendBackgroundRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: SendBackgroundResponse) => void,
  ): ClientUnaryCall;
  sendBackground(
    request: SendBackgroundRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: SendBackgroundResponse) => void,
  ): ClientUnaryCall;
}

export const BackgroundServiceClient = makeGenericClientConstructor(
  BackgroundServiceService,
  "background.BackgroundService",
) as unknown as {
  new (address: string, credentials: ChannelCredentials, options?: Partial<ClientOptions>): BackgroundServiceClient;
  service: typeof BackgroundServiceService;
  serviceName: string;
};

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends globalThis.Array<infer U> ? globalThis.Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
