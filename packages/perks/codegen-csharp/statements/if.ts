/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { indent, DeepPartial } from '@azure-tools/codegen';
import { Expression, ExpressionOrLiteral, LiteralExpression, toExpression, valueOf } from '../expression';
import { StatementPossibilities, Statements } from './statement';
import { TypeDeclaration } from '../type-declaration';


export class IfStatement extends Statements {
  constructor(private conditional: ExpressionOrLiteral, statements: StatementPossibilities, objectInitializer?: DeepPartial<IfStatement>) {
    super(statements);
    this.apply(objectInitializer);
  }
  public get implementation(): string {
    return `
if (${valueOf(this.conditional)})
{
${indent(super.implementation)}
}`.trim();
  }
}


export class WhileStatement extends Statements {
  conditional: Expression;
  constructor(conditional: ExpressionOrLiteral, statements: StatementPossibilities, objectInitializer?: DeepPartial<IfStatement>) {
    super(statements);
    this.conditional = toExpression(conditional);
    this.apply(objectInitializer);
  }
  public get implementation(): string {
    return `
while (${this.conditional.value})
{
${indent(super.implementation)}
}`.trim();
  }
}

export class DoWhileStatement extends Statements {
  conditional: Expression;
  constructor(conditional: ExpressionOrLiteral, statements: StatementPossibilities, objectInitializer?: DeepPartial<DoWhileStatement>) {
    super(statements);
    this.conditional = toExpression(conditional);
    this.apply(objectInitializer);
  }
  public get implementation(): string {
    return `
do 
{
${indent(super.implementation)}
} while (${this.conditional.value})`.trim();
  }
}


export class ElseIfStatement extends Statements {
  conditional: Expression;
  constructor(conditional: ExpressionOrLiteral, statements: StatementPossibilities, objectInitializer?: DeepPartial<IfStatement>) {
    super(statements);
    this.conditional = toExpression(conditional);
    this.apply(objectInitializer);
  }
  public get implementation(): string {
    return `
else if (${this.conditional.value})
{
${indent(super.implementation)}
}`.trim();
  }
}

export function ElseIf(conditional: ExpressionOrLiteral, statements: StatementPossibilities, objectInitializer?: DeepPartial<IfStatement>) {
  return new ElseIfStatement(conditional, statements, objectInitializer);
}


export class ElseStatement extends Statements {
  constructor(statements: StatementPossibilities, objectInitializer?: DeepPartial<IfStatement>) {
    super(statements);
    this.apply(objectInitializer);
  }
  public get implementation(): string {
    return `
else
{
${indent(super.implementation)}
}`.trim();
  }
}

export function Not(conditional: Expression): Expression {
  return new LiteralExpression(`!(${conditional.value})`);
}

export function IsAssignableFrom(targetType: TypeDeclaration, instanceType: ExpressionOrLiteral) {
  return toExpression(`typeof(${targetType.declaration}).IsAssignableFrom(${valueOf(instanceType)})`);
}

export function If(conditional: ExpressionOrLiteral, statements: StatementPossibilities, objectInitializer?: DeepPartial<IfStatement>) {
  return new IfStatement(conditional, statements, objectInitializer);
}

export function Else(statements: StatementPossibilities, objectInitializer?: DeepPartial<ElseStatement>) {
  return new ElseStatement(statements, objectInitializer);
}

export function DoWhile(conditional: ExpressionOrLiteral, statements: StatementPossibilities, objectInitializer?: DeepPartial<DoWhileStatement>) {
  return new DoWhileStatement(conditional, statements, objectInitializer);
}

export function While(conditional: ExpressionOrLiteral, statements: StatementPossibilities, objectInitializer?: DeepPartial<IfStatement>) {
  return new WhileStatement(conditional, statements, objectInitializer);
}
