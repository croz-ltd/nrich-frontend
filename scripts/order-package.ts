import { Package, PackageWithPath } from './api/types';
import scriptConfig from '../config/script-config';
import { sequentially } from './util';

/* eslint-disable no-param-reassign */
const orderPackage = async (
  packages: PackageWithPath[],
  pkg: Package,
  order: Record<string, number> = {},
) => {
  const { name: packageName } = pkg;

  if (packageName in order) return;
  if (pkg.private) {
    order[packageName] = -1;
    return;
  }

  packages = packages || [];

  const dependencies = Object.keys({
    ...pkg.peerDependencies,
    ...pkg.dependencies,
  })
    .filter((dependency) => dependency.includes(`${scriptConfig.scope}/`))
    .map((dependency) => packages.find((singlePackage) => singlePackage.name === dependency));

  if (dependencies.length === 0) {
    order[packageName] = 0;
    return;
  }

  await Promise.all(
    dependencies.map((dependency) => orderPackage(packages, dependency, order)),
  );

  order[packageName] = 1 + Math.max(...dependencies.map((dependency) => order[dependency.name]));
};

export const orderPackages = async (
  packages: PackageWithPath[],
  order: Record<string, number> = {},
) => {
  if (packages.length === 1) {
    return packages;
  }
  await sequentially(packages, (singlePackage) => orderPackage(packages, singlePackage, order));

  return Object.keys(order)
    .filter((packageName) => order[packageName] !== -1)
    .sort((firstPackage, secondPackage) => order[firstPackage] - order[secondPackage])
    .map((packageName) => packages.find((singlePackage) => singlePackage.name === packageName));
};
