# Badger | JS Badge Generation Package

<!-- Coverage Badge -->
<img src="https://img.shields.io/badge/Coverage-84.10%25-yellow" alt="Coverage 84.10%">

### Installation

```shell
npm install --save-dev @dannyxcii/badger
```

### How to use

Currently only works to generate a badge for Jest coverage. Here's how it works:

In your README file insert the following comment:

```html
<!-- Coverage Badge -->
```

Run the command (it might be a good idea to chain this along with your test command):

```shell
npx badger --jest ./path/to/coverage-final.json
```

This will generate a new badge automatically inside your README file.

By default Badger looks for the file at `./README.md`, relative to where the command is run. To specify
a different path to your README file you can pass the optional `--readme` flag:

```shell
npx badger --jest ./path/to/coverage --readme ./path/to/readme
```