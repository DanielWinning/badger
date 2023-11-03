# Badger | JS Badge Generation Package

<div>
<!-- Version Badge -->
<img src="https://img.shields.io/badge/Version-0.2.5-blue" alt="Version 0.2.5">
<!-- Coverage Badge -->
<img src="https://img.shields.io/badge/Coverage-75.23%25-red" alt="Coverage 75.23%">
</div>

## Installation

```shell
npm install --save-dev @dannyxcii/badger
```

## Usage

To get started generating badges, add the required comment to the desired location in your projects README file. The 
necessary comment for each badge is listed below.

### Badges

#### Jest Coverage

```html
<!-- Coverage Badge -->
```

```shell
npx badger --jest ./path/to/coverage-final.json
```

#### Version

Accepts a valid `package.json` or `composer.json` filepath.

```html
<!-- Version Badge -->
```

```shell
npx badger --version ./path/to/json
```

### Additional Options

By default, Badger attempts to update `./README.md` - if your README file is located somewhere else you can pass the
`--readme` flag along with any other flags:

```shell
npx badger --jest ./path/to/coverage --readme ./path/to/readme
```