/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { comment, docCommentPrefix, EOL, indent, sortByName } from '@azure-tools/codegen';
import { Type } from './type';
import { TypeContainer } from './type-container';
import { length } from '@azure-tools/linq';

export class Interface extends Type {
  constructor(parent: TypeContainer, name: string, objectIntializer?: Partial<Interface>) {
    super(parent, name);
    this.apply(objectIntializer);
    parent.addInterface(this);

    if (!this.description.trim()) {
      this.description = '';
    }
  }

  public get definition(): string {
    const colon = length(this.interfaces) > 0 ? ' : ' : '';
    const implementsInterfaces = this.interfaces.map(v => v.declaration).join(',\n    ');
    const description = comment(this.description, docCommentPrefix);
    const methods = this.methods.sort(sortByName).map(m => m.interfaceDeclaration).join(EOL);
    const properties = this.properties.sort(sortByName).map(m => m.declaration).join(EOL);
    const partial = this.partial ? 'partial ' : '';

    return `
${description}
${this.attributeDeclaration}${this.accessModifier} ${partial}interface ${this.name}${colon}
    ${implementsInterfaces} 
{
${indent(properties, 1)}

${indent(methods, 1)}
}
`.trim();
  }

  public get declaration(): string {
    return this.fullName;
  }

}
