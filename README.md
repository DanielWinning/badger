# Badger | JS Badge Generation Package

<!-- Coverage Badge -->
<img src="https://img.shields.io/badge/Coverage-75.00%25-red.svg" alt="Coverage 75.00%">

### Installation

```shell
npm install @dannyxcii/badger
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

#### Issues

This is a very basic package with a single use case at present.

It is worth deleting the generated image tag prior to running the command so that more than one is 
not generated 🤷