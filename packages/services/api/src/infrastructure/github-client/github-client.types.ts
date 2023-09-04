export interface FeatureList {
  types: string[];
  constants: string[];
  functions: string[];
  methods: string[];
  operators: string[];
}

export interface GitRefDto {
  ref: string;
  node_id: string;
  url: string;
  object: {
    sha: string;
    type: string;
    url: string;
  };
}
