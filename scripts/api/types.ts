export interface Package {
  readonly private: boolean;
  readonly name: string;
  readonly main: string;
  readonly peerDependencies?: Record<string, string>;
  readonly dependencies?: Record<string, string>;
  readonly devDependencies?: Record<string, string>;
}

export type PackageWithPath = Package & {
  readonly path: string;
};
