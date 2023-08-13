# Development

## Standard Version

Update changelog and version.

````bash
pnpm release:[major|minor|patch]
git push --follow-tags origin main
```W

```json
// package.json
  "scripts": {
    "release": "standard-version",
    "release:minor": "standard-version --release-as minor",
    "release:patch": "standard-version --release-as patch",
    "release:major": "standard-version --release-as major",
  },
````

## Dependency Managment

Automatically install (peer) dependencies with presets.

```bash
 WARN  Issues with peer dependencies found
packages/storybook
├─┬ @storybook/addon-actions 6.5.15
│ └─┬ react-inspector 5.1.1
│   └── ✕ unmet peer react@"^16.8.4 || ^17.0.0": found 18.2.0
├─┬ @storybook/addon-essentials 6.5.15
│ └─┬ @storybook/addon-docs 6.5.15
│   └─┬ @mdx-js/react 1.6.22
│     └── ✕ unmet peer react@"^16.13.1 || ^17.0.0": found 18.2.0
└─┬ @storybook/react 6.5.15
  └─┬ react-element-to-jsx-string 14.3.4
    ├── ✕ unmet peer react@"^0.14.8 || ^15.0.1 || ^16.0.0 || ^17.0.1": found 18.2.0
    └── ✕ unmet peer react-dom@"^0.14.8 || ^15.0.1 || ^16.0.0 || ^17.0.1": found 18.2.0
```

## pnpm

use workspaces and strict (peer) dependencies

```yaml
// pnpm-workspace.yaml
packages:
  - "packages/*"
  - "apps/*"

```

```text
// .npmrc
strict-peer-dependencies=false
auto-install-peers=false
auto-install-peer-dependencies=true
shamefully-hoist=true
```

### auto install peer dependencies

workflow to document and install peer dependencies

#### 1. while `pnpm i` a peer dependency is missing

```bash
# pnpm i
 WARN  Issues with peer dependencies found
packages/storybook
├─┬ @storybook/addon-essentials 6.5.13
│ ├── ✕ missing peer webpack@"*"
│ └─┬ @storybook/addon-docs 6.5.13
│   └─┬ babel-loader 8.2.5
│     └── ✕ missing peer webpack@>=2
└─┬ @storybook/preset-create-react-app 3.2.0
  ├─┬ @pmmmwh/react-refresh-webpack-plugin 0.4.3
  │ └── ✕ missing peer webpack@">=4.43.0 <6.0.0"
  └─┬ react-docgen-typescript-plugin 1.0.2
    └── ✕ missing peer webpack@">= 4"
Peer dependencies that should be installed:
  webpack@">=4.43.0 <6.0.0"
```

#### 2. add the missing peer dependencies to the package.json

For example from `preset/package.json`

```json
{
  "description": "A simple example of a package",
  "peerDependencies": {
    "@jest/globals": "^29.6.2",
    "@types/jest": "^29.5.3",
    "@types/node": "^18.17.3",
    "dotenv": "^16.3.1",
    "dotenv-cli": "^7.2.1",
    "jest": "^29.6.2",
    "jest-watch-typeahead": "^2.2.2",
    "ts-jest": "^29.1.1",
    "typescript": "^5.1.6",
    "typescript-plugin-css-modules": "^5.0.1"
  }
}
```

with

```bash
node scripts/peerDependencies.cjs --add scripts/presets/package.json --path ./packages/dev-utils/
```

#### 3. install the peer dependencies

```bash
node scripts/peerDependencies.cjs --install --path ./packages/dev-utils/
```

## turborepo

```json
// package.json
  "scripts": {
    "dev": "turbo run dev --parallel --no-cache",
    "test": "turbo run test",
    "check": "turbo run check --parallel",
    "build": "turbo run lint test build check",
    "build:packages": "turbo run lint test build check --filter=./packages/*",
    "build:book-search": "turbo run lint test build check --filter=book-search",
    "clean": "turbo run clean --force --parallel",
    "format": "pnpm format:fix",
    "format:fix": "prettier --write . --plugin-search-dir=.",
    "lint": "pnpm lint:fix",
    "lint:fix": "eslint . --fix --ext .ts,.vue,.js,.mjs,.cjs",
    "docs:build:packages": "node scripts/packages.mjs",
    "docs:build": "pnpm docs:build:packages",
    "release": "standard-version",
    "release:minor": "standard-version --release-as minor",
    "release:patch": "standard-version --release-as patch",
    "release:major": "standard-version --release-as major",
    "prepare": "pnpm husky install"
  },
```

```json
// turbo.json
{
  "$schema": "https://turborepo.org/schema.json",
  "pipeline": {
    "clean": {
      "dependsOn": ["^clean"],
      "inputs": ["dist/**", ".next/**"]
    },
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**", "!.next/cache/**", ".next/**"]
    },
    "test": {
      "dependsOn": ["^test", "lint"],
      "inputs": [
        "src/*.vue",
        "src/*.ts",
        "src/**/*.vue",
        "src/**/*.ts",
        "test/*.vue",
        "test/*.ts",
        "test/**/*.vue",
        "test/**/*.ts",
        "types/*.ts",
        "mocks/*.ts"
      ]
    },
    "check": {
      "dependsOn": ["^check", "build"]
    },
    "lint": {
      "dependsOn": ["^lint"],
      "inputs": [
        "*.vue",
        "*.ts",
        "**/*.vue",
        "**/*.ts",
        "*.jsx",
        "*.js",
        "**/*.jsx",
        "**/*.js",
        "*.mjs",
        "**/*.mjs",
        "*.cjs",
        "**/*.cjs",
        "*.css",
        "**/*.css",
        "*.scss",
        "**/*.scss"
      ]
    },
    "format": {
      "dependsOn": ["^format"],
      "inputs": ["*.vue", "*.ts", "*.js", "*.jsx", "*.mjs", "*.cjs", "*.html", "*.css", "*.scss"]
    },
    "dev": {
      "cache": false
    }
  },
  "globalDependencies": [".env", "package.json", "tsconfig.json", "tsconfig.global.json"],
  "globalEnv": ["API_ACCESS_TOKEN"]
}
```

### link project

```bash
pnpx turbo login
pnpx turbo link
```

## eslint

```javascript
// .eslintrc.cjs
module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    '@nuxtjs/eslint-config-typescript',
    'plugin:vue/vue3-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:sonarjs/recommended',
    'plugin:prettier/recommended',
    'prettier',
    'turbo'
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 'latest',
    ecmaFeatures: {
      jsx: true
    },
    parser: '@typescript-eslint/parser',
    sourceType: 'module'
  },
  plugins: ['vue', '@typescript-eslint', 'sonarjs', 'prettier'],
  rules: {}
}
```

```bash
pnpx eslint --fix --ext .ts,.vue,.js,.jsx, .
```

## prettier

```json
// .prettierrc.json
{
  "$schema": "https://json.schemastore.org/prettierrc",
  "semi": false,
  "tabWidth": 2,
  "singleQuote": true,
  "printWidth": 100,
  "trailingComma": "none"
}
```

```text
// .prettierignore
dist
coverage
node_modules
```

```bash
pnpx prettier --write .
```

## husky and lint-staged

```bash
pnpm i -D husky lint-staged
pnpx husky install
pnpx husky add .husky/pre-commit "lint-staged"
pnpx husky add .husky/pre-push "pnpm check"
pnpx husky add .husky/commit-msg "commitlint -E HUSKY_GIT_PARAMS"
```

## MSW

Use `msw` to mock api requests.

Currently `apps/nuxt` uses `msw` to mock table api requests in development and production.

### Mocks

Mocks are stored in `apps/nuxt/mocks/__mocks__`.

To create a new mock run:

```bash
node ./scripts/bookMocks.cjs --create <mockName> --path <path>
```

For example:

```bash
node ./scripts/tableMocks.cjs --create isbn --path ./apps/nuxt/mocks/__mocks__/book.[isbn].json
```
