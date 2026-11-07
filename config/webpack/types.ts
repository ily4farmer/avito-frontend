export type BuildMode = 'production' | 'development';

export type BuildPaths = {
  entry: string;
  build: string;
  html: string;
};

export type BuildOptions = {
  analyzer?: boolean;
  port?: number;
  paths: BuildPaths;
  mode: BuildMode;
};
