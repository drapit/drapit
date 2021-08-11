# Building and Testing Drapit

This document describes how to set up your development environment and run Drapit test cases (@TODO).

* [Prerequisite Software](#prerequisite-software)
* [Getting the Sources](#getting-the-sources)
* [Installing NPM Modules](#installing-npm-modules)
* [Compiling](#compiling)
* [Linting](#linting)
* [Building](#building)
* [Testing](#testing)
* [Running for development](#running-for-development)
* [Running for production](#running-for-production)
* [About testing](#about-testing)

See the [contribution guidelines](https://github.com/drapit/drapit/blob/main/CONTRIBUTING.md)
if you'd like to contribute to Drapit.

## Prerequisite Software

Before you can build and test Drapit, you must install and configure the
following products on your development machine:

* [Git](http://git-scm.com) and/or the **GitHub app** (for [Mac](http://mac.github.com) or
  [Windows](http://windows.github.com)); [GitHub's Guide to Installing
  Git](https://help.github.com/articles/set-up-git) is a good source of information.
* [Node.js](http://nodejs.org), (better to install latest version) which is used to run a development web server,
  run tests, and generate distributable files.
  Depending on your system, you can install Node either from source or as a pre-packaged bundle.

## Getting the Sources

Fork and clone the repository:

1. Login to your GitHub account or create one by following the instructions given [here](https://github.com/signup/free).
2. [Fork](http://help.github.com/forking) the [main Drapit repository](https://github.com/drapit/drapit).
3. Clone your fork of the Drapit repository and define an `upstream` remote pointing back to
   the Drapit repository that you forked in the first place.

```shell
# Clone your GitHub repository:
git clone git@github.com:<github username>/drapit.git

# Go to the Drapit directory:
cd drapit

# Add the main Drapit repository as an upstream remote to your repository:
git remote add upstream https://github.com/drapit/drapit.git
```
## Installing NPM Modules

Install all Drapit dependencies by running this command:

```shell
npm install
```

## Compiling

```shell
npm run compile
```

This command will generate you all needed files to run in production in the `dist/` directory.

## Linting

```shell
npm run lint
```

This command will run eslint rules and let you know about any violation.

## Building

```shell
npm run build
```

This command will run both compile and lint commands.

## Testing

```shell
npm test
```

This command will run test suites.

## Running for development

```shell
npm run watch
```

This command will run the api watching the files and automatically reloading when you make a change.

## Running for production

```shell
npm run start
```

This command will run the api for production.

## About testing

It would be greatly appreciated if PRs that change code come with appropriate tests.

To create a test for a specific issue opened on github, create a file: `tests/github-issues/<num>/issue-<num>.ts` where
`<num>` is the corresponding github issue. For example, if you were creating a PR to fix github issue #363, you'd
create `tests/github-issues/363/issue-363.ts`.

Most tests will benefit from using this template as a starting point:

```ts
import "reflect-metadata";
import { expect } from "chai";

describe("github issues > #<issue number> <issue title>", () => {
  it("should <put a detailed description of what it should do here>", () => {
    // test go here
  });
  
  // you can add additional tests if needed
});

```

You should execute test suites before submitting a PR to github.
All the tests are executed on our Continuous Integration infrastructure and a PR could only be merged once the tests pass.
