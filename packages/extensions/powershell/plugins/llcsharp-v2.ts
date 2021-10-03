/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { Host } from '@autorest/extension-base';
import { applyOverrides, copyResources, } from '@azure-tools/codegen';
import { join } from 'path';
import { Project } from '../llcsharp/project';

const resources = `${__dirname}/../../resources`;

export async function llcsharpV2(service: Host) {
  try {
    const project = await new Project(service).init();

    await project.writeFiles(async (fname, content) => {
      try {
        service.WriteFile(join(project.basefolder, fname), applyOverrides(content, project.overrides), undefined, 'source-file-csharp');
      } catch (E: any) {
        console.error(`${__filename} - ${E.stack}/${E.message}`);
        throw E;
      }
    });

  } catch (E: any) {
    console.error(`${__filename} - ${E.stack}/${E.message}`);
    throw E;
  }
}
