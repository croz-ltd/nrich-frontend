import fs from "fs-extra";

import { Package, PackageWithPath } from "./api/types";

const readPackage = async (packagePaths: string[]) => {
  const packages: PackageWithPath[] = [];

  // eslint-disable-next-line no-restricted-syntax
  for (const packagePath of packagePaths) {
    // eslint-disable-next-line no-await-in-loop
    const singlePackage: Package = await fs.readJSON(packagePath);
    packages.push({
      ...singlePackage,
      path: packagePath,
    });
  }

  return packages;
};

export default readPackage;
