# Standiart

This project was generated using [Nx](https://nx.dev).

<p style="text-align: center;"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="450"></p>

🔎 **Smart, Fast and Extensible Build System**

# package manager

use npm

# state management

use GraphQL and Applo

# tailwind & UI Library Mantine

# directory structure

this project adopt Atomic Design

component/{pagename}/{AtomicDesignBase}/Component

# to create new component

use hygen command
"fc:new": "hygen fc new",
"hook:new": "hygen hook new"

# husky

please fix errors before commit because husky run eslint & prettier before do it.

# storybook

# Hardhat

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a script that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.ts
```

## Adding capabilities to your workspace

Nx supports many plugins which add capabilities for developing different types of applications and different tools.

These capabilities include generating applications, libraries, etc as well as the devtools to test, and build projects as well.

There are also many [community plugins](https://nx.dev/community) you could add.

## Generate an application

Run `nx g @nrwl/react:app my-app` to generate an application.

> You can use any of the plugins above to generate applications as well.

When using Nx, you can create multiple applications and libraries in the same workspace.

## Generate a library

Run `nx g @nrwl/react:lib my-lib` to generate a library.

> You can also use any of the plugins above to generate libraries as well.

Libraries are shareable across libraries and applications. They can be imported from `@standiart/mylib`.

## Development server

Run `nx serve my-app` for a dev server. Navigate to http://localhost:4200/. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `nx g @nrwl/react:component my-component --project=my-app` to generate a new component.

## Build

Run `nx build my-app` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `nx test my-app` to execute the unit tests via [Jest](https://jestjs.io).

Run `nx affected:test` to execute the unit tests affected by a change.

## Running end-to-end tests

Run `nx e2e my-app` to execute the end-to-end tests via [Cypress](https://www.cypress.io).

Run `nx affected:e2e` to execute the end-to-end tests affected by a change.

## Understand your workspace

Run `nx graph` to see a diagram of the dependencies of your projects.

## Further help

Visit the [Nx Documentation](https://nx.dev) to learn more.

## nestJS

$ nx g @nrwl/nest:module --name=XXX --project=backend --directory=components
service の作成

$ nx g @nrwl/nest:service --name=XXX --project=backend --directory=components
controller の作成

$ nx g @nrwl/nest:controller --name=XXX --project=backend --directory=components

## The Graph

npm install -g @graphprotocol/graph-cli
graph init --from-contract 0xf3E6DbBE461C6fa492CeA7Cb1f5C5eA660EB1B47 \ --contract-name Token --index-events

## commitlint

- build: ビルドに関すること
- chore: カテゴライズできない雑事
- ci: ci に関すること
- docs: ドキュメント編集など
- feat: 新機能開発
- fix: バグフィックス
- perf: パフォーマンス向上
- refactor: リファクタリング
- revert: コミット取り消し
- style: コードスタイルに関すること
- test: テストに関すること
