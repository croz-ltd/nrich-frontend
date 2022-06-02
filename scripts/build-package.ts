import chalk from 'chalk';
import { OutputOptions, rollup, RollupOptions } from 'rollup';
import { findAllPackages, findPackage } from './find-package';
import { logError, logInfo, logSuccess } from './logger';
import createRollupConfig from '../config/create-rollup-config';
import { sequentially } from './util';
import { orderPackages } from './order-package';
import readPackage from './read-package';
import { PackageWithPath } from './api/types';

const bundle = async (config: RollupOptions) => {
  const build = await rollup(config);
  const outputs: OutputOptions[] = Array.isArray(config.output) ? config.output : [config.output];

  return Promise.all(outputs.map((output) => build.write(output)));
};

const build = async (singlePackage: PackageWithPath) => {
  const packageName = singlePackage.name;
  const packagePath = singlePackage.path;

  if (!packagePath) {
    logError(`Module ${chalk.cyan(packageName)} does not exist, or the module is not properly structured`);
    process.exit(1);
  }

  try {
    logInfo(`Building module ${chalk.cyan(packageName)}`);

    const rollupOptions = await createRollupConfig({ packagePath });

    await sequentially(rollupOptions, (rollupOption) => bundle(rollupOption));

    logSuccess(`Module ${chalk.cyan(packageName)} was built successfully`);
  } catch (err) {
    logError(`Failed to build module: ${chalk.cyan(packageName)}`);
    process.stdout.write(`${err.toString('minimal')}\n`);
    process.exit(1);
  }
};

async function orderAndBuild(packagePaths: string[]) {
  const packages = await readPackage(packagePaths);
  const orderedPackages = await orderPackages(packages);

  await sequentially(orderedPackages, (singlePackage) => build(singlePackage));
}

const buildPackage = async (packageName: string | string[]) => {
  const packagePaths = await findPackage(packageName);

  await orderAndBuild(packagePaths);
};

const buildAllPackages = async () => {
  const packagePaths = await findAllPackages();

  await orderAndBuild(packagePaths);
};

export { buildPackage, buildAllPackages };
