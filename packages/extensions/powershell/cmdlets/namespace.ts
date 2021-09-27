/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { items, values, keys, Dictionary, length } from "@azure-tools/linq";
import { ImportDirective, Namespace } from "@azure-tools/codegen-csharp";
import { Schema, ClientRuntime } from "../llcsharp/exports";
import { State } from "../internal/state";
import { CmdletClass } from "./class";
import { DeepPartial } from "@azure-tools/codegen";
import { groupBy } from "lodash";

export class CmdletNamespace extends Namespace {
  inputModels = new Array<Schema>();
  public get outputFolder(): string {
    return this.state.project.cmdletFolder;
  }

  constructor(parent: Namespace, private state: State, objectInitializer?: DeepPartial<CmdletNamespace>) {
    super("Cmdlets", parent);
    this.apply(objectInitializer);
  }

  async init() {
    this.add(new ImportDirective(`static ${ClientRuntime.Extensions}`));
    this.add(new ImportDirective(`System`));

    // generate cmdlet classes on top of the SDK
    const groups = groupBy(this.state.model.commands.operations, (op) => `${op.verb}${op.subject}`);
    for (const operations of Object.values(groups)) {
      // skip ViaIdentity for set-* cmdlets.
      // if (
      //   this.state.project.azure &&
      //   operation.details.csharp.verb === "Set" &&
      //   operation.details.csharp.name.indexOf("ViaIdentity") > 0
      // ) {
      //   continue;
      // }
      this.addClass(await new CmdletClass(this, operations, this.state).init());
    }
    return this;
  }
}
