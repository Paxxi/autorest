# Default Configuration - Help Configuration

This contains the definitions for the command line help.

#### Help

```yaml $(help)
input-file: dummy # trick "no input file" checks... may wanna refactor at some point

pipeline:
  help:
    scope: help

output-artifact:
  - help

help-content: # type: Help as defined in autorest-core/help.ts
  _autorest-0:
    categoryFriendlyName: Overall Verbosity
    settings:
      # - key: quiet
      #   description: suppress most output information
      - key: verbose
        description: display verbose logging information
      - key: debug
        description: display debug logging information
  _autorest-1:
    categoryFriendlyName: Manage Installation
    settings:
      - key: info # list-installed
        description: display information about the installed version of autorest and its extensions
      - key: list-available
        description: display available AutoRest versions
      - key: reset
        description: removes all autorest extensions and downloads the latest version of the autorest-core extension
      - key: preview
        description: enables using autorest extensions that are not yet released
      - key: latest
        description: installs the latest autorest-core extension
      - key: force
        description: force the re-installation of the autorest-core extension and frameworks
      - key: version
        description: use the specified version of the autorest-core extension
        type: string
      - key: use
        description: "Specify an extension to load and use. Format: `--use=<packagename>[@<version>]` (e.g. `--use=@autorest/modelerfour@~4.19.0`)"
        type: string
  _autorest-core-0:
    categoryFriendlyName: Core Settings and Switches
    settings:
      - key: help
        description: display help (combine with flags like --csharp to get further details about specific functionality)
      - key: input-file
        type: string | string[]
        description: OpenAPI file to use as input (use this setting repeatedly to pass multiple files at once)
      - key: output-folder
        type: string
        description: 'target folder for generated artifacts; default: "<base folder>/generated"'
      - key: clear-output-folder
        description: clear the output folder before writing generated artifacts to disk (use with extreme caution!)
      - key: base-folder
        type: string
        description: "path to resolve relative paths (input/output files/folders) against; default: directory of configuration file, current directory otherwise"
      - key: eol
        type: '"default" | "lf" | "crlf"'
        description: "Configure the line endings for generated files. Options: `default`, `lf`, `crlf`"
      - key: message-format
        type: '"regular" | "json"'
        description: 'format of messages (e.g. from OpenAPI validation); default: "regular"'
      - key: github-auth-token
        type: string
        description: OAuth token to use when pointing AutoRest at files living in a private GitHub repository
      - key: azure-arm
        description: Generate code in Azure flavor.
        type: boolean
      - key: head-as-boolean
        description: When `true`, HEAD calls to non-existent resources (404) will not raise an error. Instead, if the resource exists, we return `true`, else `false`. Forced to be `true` if `--azure-arm` is set, otherwise defaults to `false`.
        type: boolean
      - key: header-text
        description: Text to include as a header comment in generated files (magic strings:MICROSOFT_MIT, MICROSOFT_APACHE, MICROSOFT_MIT_NO_VERSION, MICROSOFT_APACHE_NO_VERSION, MICROSOFT_MIT_NO_CODEGEN)
        type: string
      - key: openapi-type
        description: 'Open API Type: "arm" or "data-plane"'
        type: string
      - key: max-memory-size
        type: string
        description: Increases the maximum memory size in MB used by Node.js when running AutoRest (translates to the Node.js parameter --max-old-space-size)
      - key: output-converted-oai3
        type: string
        description: If enabled and the input-files are `swager 2.0` this will output the resulting OpenAPI3.0 converted files to the `output-folder`
      - key: title
        type: string
        description: Override the service client's name listed in the swagger under `title`.
      - key: override-client-name
        type: string
        description: Name to use for the generated client type. By default, uses the value of the 'Title' field from the input files

  _autorest-core-1:
    categoryFriendlyName: Core Functionality
    description: "> While AutoRest can be extended arbitrarily by 3rd parties (say, with a custom generator),\n> we officially support and maintain the following functionality.\n> More specific help is shown when combining the following switches with `--help` ."
    settings:
      - key: csharp
        description: generate C# client code
      - key: go
        description: generate Go client code
      - key: java
        description: generate Java client code
      - key: python
        description: generate Python client code
      - key: az
        description: generate Azure CLI code
      - key: nodejs
        description: generate NodeJS client code
      - key: typescript
        description: generate TypeScript client code
      - key: ruby
        description: generate Ruby client code
      - key: php
        description: generate PHP client code
      - key: azureresourceschema
        description: generate Azure resource schemas
      - key: model-validator
        description: validates an OpenAPI document against linked examples (see https://github.com/Azure/azure-rest-api-specs/search?q=x-ms-examples )
      # - key: semantic-validator
      #   description: validates an OpenAPI document semantically
      - key: azure-validator
        description: validates an OpenAPI document against guidelines to improve quality (and optionally Azure guidelines)
```

Note: We don't load anything if `--help` is specified.
