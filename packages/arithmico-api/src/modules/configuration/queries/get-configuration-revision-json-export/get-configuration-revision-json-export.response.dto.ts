export class GetConfigurationRevisionJsonExportResponseDto {
  filename: string;
  data: {
    types: string[];
    functions: string[];
    constants: string[];
    operators: string[];
    methods: string[];
  };
}
