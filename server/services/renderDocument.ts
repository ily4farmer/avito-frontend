import { readFile } from 'node:fs/promises';

import type { DehydratedState } from '@tanstack/react-query';

import { clientManifestPath, isDevelopment } from '../config/clientAssets';

type ManifestEntry = {
  imports: string[];
};

type ManifestAsset = {
  file: string;
};

type AssetsManifest = {
  entrypoints: Record<string, ManifestEntry>;
  assets: Record<string, ManifestAsset>;
};

type RenderDocumentOptions = {
  markup: string;
  dehydratedState: DehydratedState;
};

let cachedManifest: AssetsManifest | undefined;

const loadManifest = async (): Promise<AssetsManifest> => {
  // В production используем кэш.
  if (!isDevelopment && cachedManifest) {
    return cachedManifest;
  }

  const content = await readFile(clientManifestPath, 'utf8');

  const manifest = JSON.parse(content) as AssetsManifest;

  if (!Array.isArray(manifest.entrypoints?.app?.imports)) {
    throw new Error('Invalid client manifest: app entrypoint not found');
  }

  if (!manifest.assets || typeof manifest.assets !== 'object') {
    throw new Error('Invalid client manifest: assets not found');
  }

  // В development перечитываем manifest после изменений.
  if (!isDevelopment) {
    cachedManifest = manifest;
  }

  return manifest;
};

const escapeHtmlAttribute = (value: string): string => {
  const entities: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  };

  return value.replace(/[&<>"']/g, character => entities[character]);
};

const serializeState = (state: DehydratedState): string => {
  return JSON.stringify(state).replace(/</g, '\\u003c');
};

export const renderDocument = async ({
  markup,
  dehydratedState,
}: RenderDocumentOptions): Promise<string> => {
  const manifest = await loadManifest();

  const entrypoint = manifest.entrypoints.app;

  const scripts: string[] = [];
  const stylesheets: string[] = [];

  for (const assetName of entrypoint.imports) {
    const assetUrl = manifest.assets[assetName]?.file;

    if (typeof assetUrl !== 'string' || !assetUrl.startsWith('/') || assetUrl.startsWith('//')) {
      throw new Error(`Invalid client asset: ${assetName}`);
    }

    const url = escapeHtmlAttribute(assetUrl);

    if (assetName.endsWith('.js')) {
      scripts.push(`<script defer src="${url}"></script>`);
    }

    if (assetName.endsWith('.css')) {
      stylesheets.push(`<link rel="stylesheet" href="${url}">`);
    }
  }

  if (scripts.length === 0) {
    throw new Error('Client manifest does not contain a JavaScript entrypoint');
  }

  const serializedState = serializeState(dehydratedState);

  return `<!doctype html>
<html lang="ru">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Application</title>
    ${stylesheets.join('\n    ')}
    ${scripts.join('\n    ')}
  </head>
  <body>
    <div id="root">${markup}</div>
    <script id="__REACT_QUERY_STATE__" type="application/json">${serializedState}</script>
  </body>
</html>`;
};
