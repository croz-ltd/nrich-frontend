import path from "path";

import fs from "fs-extra";
import del from "rollup-plugin-delete";
import dts from "rollup-plugin-dts";
import esbuild from "rollup-plugin-esbuild";

import { Package } from "../scripts/api/types";
import { CreateRollupConfig, RollupConfig } from "./api/types";
import scriptConfig from "./script-config";

const createRollupConfig: CreateRollupConfig = async (config: RollupConfig) => {
  const file = await fs.readFile(config.packagePath);
  const basePackagePath = config.packagePath.replace("/package.json", "");

  const packageJson: Package = JSON.parse(file.toString("utf-8"));

  const externals = [
    ...(config?.externals || []),
    ...Object.keys({
      ...packageJson.peerDependencies,
      ...packageJson.dependencies,
    }),
  ];

  return [
    {
      input: config?.entry || path.resolve(basePackagePath, scriptConfig.inputDirectory, "index.ts"),
      external: externals,
      plugins: [
        esbuild(),
        del({
          targets: path.resolve(basePackagePath, scriptConfig.outputDirectory),
        }),
      ],
      output: [
        {
          file: path.resolve(basePackagePath, scriptConfig.outputDirectory, "index.js"),
          format: "cjs",

          sourcemap: true,
        },
        {
          file: path.resolve(basePackagePath, scriptConfig.outputDirectory, "index.mjs"),
          format: "es",
          sourcemap: true,
        },
      ],
    },
    {
      input: config?.entry || path.resolve(basePackagePath, scriptConfig.inputDirectory, "index.ts"),
      external: externals,
      plugins: [dts()],
      output: {
        file: path.resolve(basePackagePath, scriptConfig.outputDirectory, "index.d.ts"),
        format: "es",
      },
    },
  ];
};

export default createRollupConfig;
