/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { EOL, Initializer, DeepPartial } from '@azure-tools/codegen';
import { Access } from './access-modifier';
import { Attribute } from './attribute';

import { Method } from './method';
import { TypeContainer, IInterface } from './type-container';
import { Property } from './property';
import { TypeDeclaration } from './type-declaration';
import { length } from '@azure-tools/linq';

export class Type extends Initializer implements TypeDeclaration {
  public description = '';
  public methods = new Array<Method>();
  public properties = new Array<Property>();
  public genericParameters = new Array<string>();
  public where?: string;
  public interfaces = new Array<IInterface>();
  public accessModifier = Access.Public;
  public attributes = new Array<Attribute>();
  public partial = false;
  private filename: string;

  protected get attributeDeclaration(): string {
    return length(this.attributes) > 0 ? `${this.attributes.joinWith(each => `${each.value}`, EOL)}${EOL}` : '';
  }

  constructor(public namespace: TypeContainer, public name: string, objectIntializer?: Partial<Type>) {
    super();
    this.apply(objectIntializer);
    this.filename = name;
  }

  get fileName() {
    return this.filename;
  }

  set fileName(value: string) {
    this.filename = value;
  }

  toString(): string {
    return this.fullName;
  }
  public get allProperties(): Array<Property> {
    const result = new Array<Property>(...this.properties);
    for (const parent of this.interfaces) {
      result.push(...parent.allProperties);
    }
    return result;
  }

  public get genericDeclaration(): string {
    return length(this.genericParameters) === 0 ? '' : `<${this.genericParameters.join(',')}>`;
  }

  public get fullName(): string {
    return `${this.namespace.fullName}.${this.name}${this.genericDeclaration}`;
  }

  public get declaration(): string {
    throw new Error('Not Implemented: property \'declaration\' in Type subclass ');
  }

  public get definition(): string {
    throw new Error('Not Implemented: property \'definition\' in Type subclass ');
  }

  public validation(propertyName: string): string {
    return '/*VALIDATION*/';
  }

  public addProperty(property: Property): Property {
    this.properties.push(property);
    return property;
  }
  public addMethod(method: Method): Method {
    this.methods.push(method);
    return method;
  }
  public add<T extends object>(item: T & (Method | Property | Attribute)): T {
    if (item instanceof Method) {
      this.methods.push(item);
      return item;
    }
    if (item instanceof Property) {
      if (!this.properties.find(p => p.name === item.name)) {
        this.properties.push(item);
      }
      return item;
    }
    if (item instanceof Attribute) {
      this.attributes.push(item);
      return item;
    }
    throw Error(`FATAL - UNABLE TO ADD UNKNOWN TYPE for '${JSON.stringify(item)}'`);
  }

}
