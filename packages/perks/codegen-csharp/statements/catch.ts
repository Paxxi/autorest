/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { indent, DeepPartial } from '@azure-tools/codegen';
import { Expression } from '../expression';
import { Parameter } from '../parameter';
import { StatementPossibilities, Statements } from './statement';

export class CatchStatement extends Statements {
  public when?: Expression;

  constructor(protected parameter: Parameter | undefined, body: StatementPossibilities, objectInitializer?: DeepPartial<CatchStatement>) {
    super(body);
    this.apply(objectInitializer);
  }
  public get implementation(): string {
    const when = this.when ? ` when (${this.when})` : '';
    const p = this.parameter ? ` (${this.parameter.declaration})` : '';
    return `
catch${p}${when}
{
${indent(super.implementation)}
}`.trim();
  }
}


export function Catch(parameter: Parameter | undefined, body: StatementPossibilities, objectInitializer?: DeepPartial<CatchStatement>): CatchStatement {
  return new CatchStatement(parameter, body, objectInitializer);
}