import { RollupOptions } from "rollup";

export interface ScriptConfig {
  scope: string;
  moduleDirectoryName: string;
  inputDirectory: string;
  outputDirectory: string;
}

export interface RollupConfig {
  entry?: string;
  packagePath: string;
  externals?: string[];
}

export type CreateRollupConfig = (config: RollupConfig) => Promise<RollupOptions[]>;
