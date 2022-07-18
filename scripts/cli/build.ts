import { hideBin } from "yargs/helpers";
import yargs from "yargs/yargs";

import { buildAllPackages, buildPackage } from "../build-package";

const { argv }: { argv: any } = yargs(hideBin(process.argv))
  .option("all", {
    type: "boolean",
    default: false,
    description: "Build all packages",
  })
  .option("package", {
    type: "string",
    description: "Build a specific package with the provided name",
  })
  .example([
    ["$0 all", "Build all packages"],
    ["$0 @nrich/notification-core", "Build notification-core package"],
    ["$0 @nrich/notification-core @nrich/notification-mui", "Build notification-core and notification-mui package"],
  ]);

(async () => {
  const args: string[] = argv._;

  if (args[0] === "all" || argv.all) {
    await buildAllPackages();
    return;
  }

  if (argv.project) {
    await buildPackage(argv.project);
    return;
  }

  if (args.length) {
    await buildPackage(args);
  }
})();
