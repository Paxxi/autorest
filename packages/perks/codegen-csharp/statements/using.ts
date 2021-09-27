/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { indent, DeepPartial } from '@azure-tools/codegen';
import { Expression, ExpressionOrLiteral, toExpression } from '../expression';
import { OneOrMoreStatements, Statements } from './statement';

export class UsingStatement extends Statements {
  usingExpression: Expression;
  constructor(usingExpression: ExpressionOrLiteral, statements: OneOrMoreStatements, objectInitializer?: DeepPartial<UsingStatement>) {
    super(statements);
    this.usingExpression = toExpression(usingExpression);
    this.apply(objectInitializer);
  }
  public get implementation(): string {
    return `
using( ${this.usingExpression.value} )
{
${indent(super.implementation)}
}`.trim();
  }
}

export function Using(usingExpression: ExpressionOrLiteral, body: OneOrMoreStatements, objectInitializer?: DeepPartial<UsingStatement>): UsingStatement {
  return new UsingStatement(usingExpression, body, objectInitializer);
}
