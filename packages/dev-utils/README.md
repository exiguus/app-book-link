# Development Utils

Development utils for monorepos

```shell
pnpm i @monorepo/dev-utils
```

## tableMocks workflow

Table mocks can be used to mock table data with MSW (Mock Service Worker) for example.

### Usage

Use in `scripts/tableMocks.cjs`

```cjs
const { main } = require('@monorepo/dev-utils/tableMocks')

main()
```

### Create table mocks

To create a new mock run:

```bash
node ./scripts/tableMocks.cjs --pages <pageNumber> --perPage <rowsPerPage> --create <mockName> --path <path>
```

For example:

```bash
node ./scripts/tableMocks.cjs --pages 15 --perPage 5 --create colums --path ./apps/next/mocks/__mocks__/tableColumnsMock.json

node ./scripts/tableMocks.cjs --pages 12 --perPage 6 --create rows --path ./apps/next/mocks/__mocks__/tableRowsMock.json

node ./scripts/tableMocks.cjs --create default --path ./apps/next/mocks/__mocks__/tableMock.json
```

## peerDependencies workflow

### Usage

Use in `scripts/peerDependencies.cjs`

```cjs
const { main } = require('@monorepo/dev-utils/peerDependencies')

main()
```

### Add missing peer dependencies to the package.json

For example from `preset/jest.json`

```json
{
  "description": "Jest, Testing Library with TypeScript",
  "peerDependencies": {
    "@jest/globals": "^29",
    "@testing-library/jest-dom": "^5",
    "@types/jest": "^29",
    "@types/node": "^18",
    "@types/react-dom": "16",
    "@types/react": "16",
    "@types/testing-library__jest-dom": "^5",
    "@types/testing-library__react": "^10",
    "dotenv-cli": "^7",
    "dotenv": "^16",
    "jest-environment-jsdom": "^29",
    "jest-watch-typeahead": "^2",
    "jest": "^29",
    "react-dom": "^18",
    "react": "^18",
    "ts-jest": "^29"
  }
}
```

with

```shell
node scripts/peerDependencies.cjs --add scripts/presets/jest.json --path ./packages/ui/paragraph/
```

### Install the peer dependencies

```shell
node scripts/peerDependencies.cjs --install --path ./packages/ui/paragraph/
```

## Test

Update the tableMock snapshots

```shell
node test/tableMocks.cjs --create rows --path ./packages/dev-utils/test/mocks/tableMock.test.json
```
