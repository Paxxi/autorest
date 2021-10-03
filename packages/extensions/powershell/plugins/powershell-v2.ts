/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

//import { codemodel } from '@azure-tools/codemodel-v3';
import { deserialize, applyOverrides, copyResources, copyBinaryResources, safeEval } from '@azure-tools/codegen';
import { Host } from '@autorest/extension-base';
import { join } from 'path';
import { Project } from '../internal/project';
import { generatePsm1 } from '../generators/psm1';
import { generateCsproj } from '../generators/csproj';
import { generatePsm1Custom } from '../generators/psm1.custom';
import { generatePsm1Internal } from '../generators/psm1.internal';
import { generateNuspec } from '../generators/nuspec';
import { generateGitIgnore } from '../generators/gitignore';
import { generateGitAttributes } from '../generators/gitattributes';
import { generateReadme } from '../generators/readme';
import { generateScriptCmdlets } from '../generators/script-cmdlet';

const sourceFileCSharp = 'source-file-csharp';
const resources = `${__dirname}/../../resources`;




export async function powershellV2(service: Host) {
  const debug = await service.GetValue('debug') || false;

  try {
    const project = await new Project(service).init();

    await project.writeFiles(async (filename, content) => project.state.writeFile(filename, applyOverrides(content, project.overrides), undefined, sourceFileCSharp));

    // await service.ProtectFiles(project.psd1);
    // await service.ProtectFiles(project.readme);
    // await service.ProtectFiles(project.customFolder);
    // await service.ProtectFiles(project.testFolder);
    // await service.ProtectFiles(project.docsFolder);
    // await service.ProtectFiles(project.examplesFolder);
    // await service.ProtectFiles(project.resourcesFolder);

    // wait for all the generation to be done
    // await copyRequiredFiles(project);
    // await generateCsproj(project);
    // await generatePsm1(project);
    // await generatePsm1Custom(project);
    // await generatePsm1Internal(project);
    // await generateNuspec(project);
    // await generateGitIgnore(project);
    // await generateGitAttributes(project);
    // await generateReadme(project);

    // await generateScriptCmdlets(project);

  } catch (E: any) {
    if (debug) {
      console.error(`${__filename} - FAILURE  ${JSON.stringify(E)} ${E.stack}`);
    }
    throw E;
  }
}

