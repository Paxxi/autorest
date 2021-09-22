/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { DictionarySchema, ObjectSchema, Schema as NewSchema, SchemaType } from '@autorest/codemodel';
import { items, values, keys, Dictionary, length } from '@azure-tools/linq';
import { Catch, Try, Else, ElseIf, If, Interface, Attribute, Parameter, Modifier, dotnet, Class, LambdaMethod, LiteralExpression, Method, Namespace, System, Return, LocalVariable, Local, PartialMethod, Constructor, IsAssignableFrom, ImportDirective, Property, Access, InterfaceProperty, ParameterModifier } from '@azure-tools/codegen-csharp';
import { Schema, ClientRuntime, ObjectImplementation, SchemaDefinitionResolver } from '../llcsharp/exports';
import { State } from '../internal/state';
import { PSObject, PSTypeConverter, TypeConverterAttribute } from '../internal/powershell-declarations';
import { join } from 'path';
import { DeepPartial } from '@azure-tools/codegen';


class ApiVersionModelExtensionsNamespace extends Namespace {
  public get outputFolder(): string {
    return `${this.baseFolder}/${this.apiVersion.replace(/.*\./g, '')}`;
  }
  constructor(private baseFolder: string, private readonly apiVersion: string, objectInitializer?: DeepPartial<ModelExtensionsNamespace>) {
    super(apiVersion);
    this.apply(objectInitializer);
    this.add(new ImportDirective(`${ClientRuntime.name}.PowerShell`));
  }
}

export class ModelExtensionsNamespace extends Namespace {
  CreateReferenceType(): Class {
    const rt = new Class(this, 'ReferenceType');
    rt.add(new Property('Id', dotnet.String, { setAccess: Access.Internal }));
    return rt;
  }
  private subNamespaces = new Dictionary<Namespace>();

  public get outputFolder(): string {
    return join(this.state.project.apiFolder, 'Models');
  }
  resolver = new SchemaDefinitionResolver();

  constructor(parent: Namespace, private schemas: Dictionary<Array<NewSchema>>, private state: State, objectInitializer?: DeepPartial<ModelExtensionsNamespace>) {
    super('Models', parent);
    this.apply(objectInitializer);
    this.add(new ImportDirective(`${ClientRuntime.name}.PowerShell`));
    this.subNamespaces[this.fullName] = this;


    const $this = this;
    const resolver = (s: NewSchema, req: boolean) => this.resolver.resolveTypeDeclaration(s, req, state);

    // Add typeconverters to model classes (partial)
    for (const schemaGroup of values(schemas)) {
      for (const schema of values(schemaGroup)) {
        if (!schema || (schema.language.csharp && schema.language.csharp.skip)) {
          continue;
        }

        const td = this.resolver.resolveTypeDeclaration(schema, true, state);
        if (td instanceof ObjectImplementation) {

          // it's a class object.
          const className = td.schema.language.csharp?.name || '';
          const interfaceName = td.schema.language.csharp?.interfaceName || '';
          const converterClass = `${className}TypeConverter`;

          if (this.findClassByName(className).length > 0) {
            continue;
          }

          // get the actual full namespace for the schema
          const fullname = schema.language.csharp?.namespace || this.fullName;
          const ns = this.subNamespaces[fullname] || this.add(new ApiVersionModelExtensionsNamespace(this.outputFolder, fullname));

          ns.header = this.state.project.license;
          // create the model extensions for each object model
          // 2. A partial interface with the type converter attribute

          // // 1. A partial class with the type converter attribute
          // const model = new Class(ns, className, undefined, {
          //   partial: true,
          //   description: td.schema.language.csharp?.description,
          //   fileName: `${className}.PowerShell`
          // });

          // if the model is supposed to be use 'by-reference' we should create an I*Reference interface for that
          // and add that interface to the extension class
          // if (schema.language.csharp?.byReference) {
          //   const refInterface = `${interfaceName}_Reference`;
          //   schema.language.csharp.referenceInterface = `${ns.fullName}.${refInterface}`;

          //   const referenceInterface = new Interface(ns, refInterface, {
          //     partial: true,
          //     description: `Reference for model ${fullname}`,
          //     fileName: `${interfaceName}.PowerShell` // make sure that the interface ends up in the same file as the class.
          //   });
          //   referenceInterface.add(new Attribute(TypeConverterAttribute, { parameters: [new LiteralExpression(`typeof(${converterClass})`)] }));
          //   referenceInterface.add(new InterfaceProperty('Id', dotnet.String, { setAccess: Access.Internal }));
          //   model.interfaces.push(referenceInterface);

          //   // add it to the generic reference type.
          //   // referenceType = referenceType || this.CreateReferenceType();
          //   // referenceType.interfaces.push(referenceInterface);
          // }


          if (this.state.project.addToString) {
            // add partial OverrideToString method
            const returnNow = new Parameter('returnNow', dotnet.Bool, { modifier: ParameterModifier.Ref, description: '/// set returnNow to true if you provide a customized OverrideToString function' });
            const stringResult = new Parameter('stringResult', dotnet.String, { modifier: ParameterModifier.Ref, description: '/// instance serialized to a string, normally it is a Json' });
            const overrideToStringMethod = new PartialMethod('OverrideToString', dotnet.Void, {
              parameters: [stringResult, returnNow],
              description: '<c>OverrideToString</c> will be called if it is implemented. Implement this method in a partial class to enable this behavior'
            });
            // model.add(overrideToStringMethod);
            // // add ToString method
            // const toStringMethod = new Method('ToString', dotnet.String, {
            //   override: Modifier.Override,
            //   access: Access.Public
            // });

            // toStringMethod.add(function* () {
            //   const skip = Local('returnNow', `${dotnet.False}`);
            //   const result = Local('result', 'global::System.String.Empty');
            //   yield skip.declarationStatement;
            //   yield result.declarationStatement;
            //   yield `${overrideToStringMethod.invoke(`ref ${result.value}`, `ref ${skip.value}`)};`;
            //   yield If(`${skip}`, Return(`${result}`));
            //   yield 'return ToJsonString();';
            // });
            // model.add(toStringMethod);
          }

          // + static <interfaceType> FromJsonString(string json);
          // + string ToJsonString()

          // 3. A TypeConverter class
        }
      }
    }
  }
}