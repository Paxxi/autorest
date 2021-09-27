/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { comment, docCommentPrefix, EOL, fail, indent, sortByName } from '@azure-tools/codegen';
import { Attribute } from './attribute';
import { xmlize } from './doc-comments';
import { Expression, toExpression, valueOf } from './expression';
import { Field } from './field';
import { Method } from './method';
import { TypeContainer } from './type-container';
import { Property } from './property';
import { Type } from './type';
import { length } from '@azure-tools/linq';

export function sortByNamePartialFirst(a: Method, b: Method): number {
  if (a.isPartial !== b.isPartial) {
    return a.isPartial ? -1 : 1;
  }
  return sortByName(a, b);
}

export class Class extends Type {
  protected classOrStruct: 'class' | 'struct' = 'class';
  public isStatic = false;

  protected fields = new Array<Field>();

  constructor(namespace: TypeContainer, name: string, public parent?: Class, objectIntializer?: Partial<Class>) {
    super(namespace, name);
    this.partial = true;
    this.apply(objectIntializer);
    namespace.addClass(this);

    if (!this.description.trim()) {
      this.description = '';
    }
  }

  hasMethodWithSameDeclaration(method: Method) {
    for (const eachMethod of this.methods) {
      if (method.interfaceDeclaration === eachMethod.interfaceDeclaration) {
        return true;
      }
    }
    return false;
  }

  public get headerComment(): string {
    return comment(xmlize('summary', this.description), docCommentPrefix) || '';
  }

  public get signature(): string {
    const colon = (this.parent || length(this.interfaces) > 0) ? ' : ' : '';
    const comma = (this.parent && length(this.interfaces) > 0) ? ', ' : '';

    const extendsClass = this.parent ? this.parent.fullName : '';
    const implementsInterfaces = this.interfaces.map(v => v.declaration).join(',\n    ');

    const partial = this.partial ? 'partial ' : '';
    const stat = this.isStatic ? 'static ' : '';

    return `
${this.headerComment}
${this.attributeDeclaration}${this.accessModifier} ${stat}${partial}${this.classOrStruct} ${this.name}${colon}${extendsClass}${comma}
    ${implementsInterfaces}
`.trim();
  }

  public get definition(): string {
    const fields = this.fields.sort(sortByName).map(m => m.declaration).join(EOL + EOL);
    const methods = this.methods.sort(sortByNamePartialFirst).map(m => m.implementation).join(EOL + EOL);
    const properties = this.properties.sort(sortByName).map(m => m.declaration).join(EOL + EOL);
    return `
${this.signature}
{
${indent(fields, 1)}

${indent(properties, 1)}

${indent(methods, 1)}
}
`.trim();
  }

  public add<T extends object>(item: T & (Method | Property | Attribute | Field)): T {
    if (item instanceof Field) {
      if (!this.fields.find(p => p.name === item.name)) {
        this.fields.push(item);
      }
      return item;
    }
    return super.add(item);
  }

  public addField(field: Field): Field {
    this.fields.push(field);
    return field;
  }

  public get declaration(): string {
    return `
${this.fullName}
`.trim();
  }

  public new(...parameters: Array<Expression>): Expression {
    return toExpression(`new ${this.name}(${parameters.joinWith(each => valueOf(each))})`);
  }

  public property(name: string): Property {
    return this.properties.find(p => p.name === name) || fail(`No property ${name}`);
  }

  public $<T extends (Property | Method | Field)>(name: string): T {
    return <T>this.properties.find(p => p.name === name) ||
      this.methods.find(p => p.name === name) ||
      this.fields.find(p => p.name === name) || fail(`No Property/Method/Field ${name}`);
  }
}
