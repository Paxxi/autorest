/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { Extensions } from './extensions';
import { Dictionary } from '@azure-tools/linq';
import { DeepPartial } from '@azure-tools/codegen';

export class Contact extends Extensions implements Contact {
  extensions = new Dictionary<any>();

  constructor(initializer?: DeepPartial<Contact>) {
    super();
    this.apply(initializer);
  }
}

export class Info extends Extensions implements Info {
  extensions = new Dictionary<any>();

  constructor(public title: string, public version: string, initializer?: DeepPartial<Info>) {
    super();
    this.apply(initializer);
  }
}

export class License extends Extensions implements License {
  extensions = new Dictionary<any>();

  constructor(public name: string, initializer?: DeepPartial<License>) {
    super();
    this.apply(initializer);
  }
}

export interface Contact extends Extensions {
  name?: string;
  url?: string; // uriref
  email?: string; // email
}

export interface Info extends Extensions {
  title: string;
  description?: string;
  termsOfService?: string; // uriref
  contact?: Contact;
  license?: License;
  version: string;
}

export interface License extends Extensions {
  name: string;
  url?: string; // uriref
}
