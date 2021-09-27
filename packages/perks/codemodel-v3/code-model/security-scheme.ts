/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { Extensions } from './extensions';
import { ParameterLocation } from './http-operation';
import { Dictionary } from '@azure-tools/linq';
import { DeepPartial } from '@azure-tools/codegen';

export enum Scheme {
  Bearer = 'bearer'
}
export enum SecurityType {
  ApiKey = 'apiKey',
  Http = 'http',
  OAuth2 = 'oauth2',
  OpenIDConnect = 'openIdConnect'
}

export class APIKeySecurityScheme extends Extensions implements APIKeySecurityScheme {
  extensions = new Dictionary<any>();

  constructor(public name: string, inWhere: ParameterLocation, initializer?: DeepPartial<APIKeySecurityScheme>) {
    super();
    this.in = inWhere;
    this.type = SecurityType.ApiKey;
    this.apply(initializer);
  }
}

export class BearerHTTPSecurityScheme extends Extensions implements BearerHTTPSecurityScheme {
  extensions = new Dictionary<any>();
  scheme = Scheme.Bearer;

  constructor(initializer?: DeepPartial<BearerHTTPSecurityScheme>) {
    super();
    this.type = SecurityType.Http;
    this.apply(initializer);
  }
}

export class ImplicitOAuthFlow extends Extensions implements ImplicitOAuthFlow {
  extensions = new Dictionary<any>();
  scopes = new Dictionary<string>();

  constructor(public authorizationUrl: string, initializer?: DeepPartial<ImplicitOAuthFlow>) {
    super();
    this.apply(initializer);
  }
}

export class NonBearerHTTPSecurityScheme extends Extensions implements NonBearerHTTPSecurityScheme {
  extensions = new Dictionary<any>();

  constructor(public scheme: string, initializer?: DeepPartial<NonBearerHTTPSecurityScheme>) {
    super();
    this.apply(initializer);
    this.type = SecurityType.Http;
  }
}

export class OAuth2SecurityScheme extends Extensions implements OAuth2SecurityScheme {
  extensions = new Dictionary<any>();

  constructor(public flows: OAuthFlows, initializer?: DeepPartial<OAuth2SecurityScheme>) {
    super();
    this.type = SecurityType.OAuth2;
    this.apply(initializer);
  }

}

export class OAuthFlows extends Extensions implements OAuthFlows {
  extensions = new Dictionary<any>();

  constructor(initializer?: DeepPartial<OAuthFlows>) {
    super();
    this.apply(initializer);
  }
}

export interface OpenIdConnectSecurityScheme extends Extensions {

  type: SecurityType.OpenIDConnect;
  openIdConnectUrl: string; // url
  description?: string;
}

export class OpenIdConnectSecurityScheme extends Extensions implements OpenIdConnectSecurityScheme {
  extensions = new Dictionary<any>();

  constructor(public openIdConnectUrl: string, initializer?: DeepPartial<OpenIdConnectSecurityScheme>) {
    super();
    this.type = SecurityType.OpenIDConnect;
    this.apply(initializer);
  }
}

export interface PasswordOAuthFlow extends Extensions {

  tokenUrl: string; // uriref
  refreshUrl?: string; // uriref
  scopes: Dictionary<string>;
}

export class PasswordOAuthFlow extends Extensions implements PasswordOAuthFlow {
  extensions = new Dictionary<any>();
  scopes = new Dictionary<string>();

  constructor(public tokenUrl: string, initializer?: DeepPartial<PasswordOAuthFlow>) {
    super();
    this.apply(initializer);
  }
}

export type HTTPSecurityScheme = NonBearerHTTPSecurityScheme | BearerHTTPSecurityScheme;
export type SecurityScheme =
  APIKeySecurityScheme
  | HTTPSecurityScheme
  | OAuth2SecurityScheme
  | OpenIdConnectSecurityScheme;

export interface APIKeySecurityScheme extends Extensions {

  type: SecurityType.ApiKey;
  name: string;
  in: ParameterLocation;
  description?: string;
}

export class AuthorizationCodeOAuthFlow extends Extensions implements AuthorizationCodeOAuthFlow {
  extensions = new Dictionary<any>();
  scopes = new Dictionary<string>();
  constructor(public authorizationUrl: string, tokenUrl: string, initializer?: DeepPartial<AuthorizationCodeOAuthFlow>) {
    super();
    this.apply(initializer);
  }
}
export class ClientCredentialsFlow extends Extensions implements ClientCredentialsFlow {
  extensions = new Dictionary<any>();
  scopes = new Dictionary<string>();
  constructor(public tokenUrl: string, initializer?: DeepPartial<ClientCredentialsFlow>) {
    super();
    this.apply(initializer);
  }
}

export interface AuthorizationCodeOAuthFlow extends Extensions {
  authorizationUrl: string; // uriref
  tokenUrl: string; // uriref
  refreshUrl?: string; // uriref
  scopes: Dictionary<string>;
}

export interface BearerHTTPSecurityScheme extends Extensions {
  scheme: Scheme.Bearer;
  bearerFormat?: string;
  type: SecurityType.Http;
  description?: string;
}

export interface ClientCredentialsFlow extends Extensions {
  tokenUrl: string; // uriref
  refreshUrl?: string; // uriref
  scopes: Dictionary<string>;
}

export interface ImplicitOAuthFlow extends Extensions {
  authorizationUrl: string; // uriref
  refreshUrl?: string; // uriref
  scopes: Dictionary<string>;
}

export interface NonBearerHTTPSecurityScheme extends Extensions {
  scheme: string;
  description?: string;
  type: SecurityType.Http;
}

export interface OAuth2SecurityScheme extends Extensions {
  type: SecurityType.OAuth2;
  flows: OAuthFlows;
  description?: string;
}

export interface OAuthFlows extends Extensions {
  implicit?: ImplicitOAuthFlow;
  password?: PasswordOAuthFlow;
  clientCredentials?: ClientCredentialsFlow;
  authorizationCode?: AuthorizationCodeOAuthFlow;
}
