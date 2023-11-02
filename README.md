# Badger | JS Badge Generation Package

<!-- Coverage Badge -->
<img src="https://img.shields.io/badge/Coverage-90.25%25-green" alt="Coverage 90.25%">

## Installation

```shell
npm install --save-dev @dannyxcii/badger
```

## Usage

To get started generating badges, add the required comment to the desired location in your projects README file. The 
necessary comment for each badge is listed below.

### Badges

#### Jest Coverage

**README Comment:**

```html
<!-- Coverage Badge -->
```

**Command:**

```shell
npx badger --jest ./path/to/coverage-final.json
```

### Additional Options

By default, Badger attempts to update `./README.md` - if your README file is located somewhere else you can pass the
`--readme` flag along with any other flags:

```shell
npx badger --jest ./path/to/coverage --readme ./path/to/readme
```