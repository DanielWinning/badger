# Badger | JS Badge Generation Package

<!-- Coverage Badge -->
<img src="https://img.shields.io/badge/Coverage-85.10%25-yellow.svg" alt="Coverage 85.10%">

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
npx badger --json /path/to/coverage-final.json --jest
```

This will generate a new badge automatically inside your README file.