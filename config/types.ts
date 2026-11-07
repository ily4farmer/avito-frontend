export type BuildMode = 'production' | 'development';

export type BuildPaths = {
  entry: string;
  build: string;
};

export type BuildOptions = {
  paths: BuildPaths;
  mode: BuildMode;
};
