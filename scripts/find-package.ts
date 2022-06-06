import fg from "fast-glob";
import scriptConfig from "../config/script-config";
import { logError } from "./logger";

const normalizePackageDirectoryName = (packageName: string) => packageName.replace(`${scriptConfig.scope}/`, "").replace("-", "/");

const find = async (packageName: string) => {
  const packageDirectoryName = normalizePackageDirectoryName(packageName);

  return fg(`${scriptConfig.moduleDirectoryName}/${packageDirectoryName}/package.json`);
};

const findPackage = async (packageName: string | string[]) => {
  if (!packageName) {
    logError("Package name cannot be empty");
  }

  if (typeof packageName === "string") {
    return find(packageName);
  }
  return (await Promise.all(packageName.map((name) => find(name)))).flat();
};

const findAllPackages = async () => fg(`${scriptConfig.moduleDirectoryName}/**/package.json`);

export { findPackage, findAllPackages };
