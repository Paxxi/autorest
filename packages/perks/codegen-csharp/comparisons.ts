/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { Expression, ExpressionOrLiteral, toExpression, valueOf } from './expression';
import { TypeDeclaration } from './type-declaration';

export function IsNotNull(expression: ExpressionOrLiteral) {
  return toExpression(`null != ${valueOf(expression)}`);
}

export function IsNull(expression: ExpressionOrLiteral) {
  return toExpression(`null == ${valueOf(expression)}`);
}

export function Cast(expression: ExpressionOrLiteral, targetType: TypeDeclaration): Expression {
  return toExpression(`(${targetType.declaration})${expression}`);
}