# Badger | JS Badge Generation Package

<div>
<!-- Version Badge -->
<img src="https://img.shields.io/badge/Version-0.4.2-blue" alt="Version 0.4.2">
<!-- JS Coverage Badge -->
<img src="https://img.shields.io/badge/JS Coverage-90.17%25-green" alt="JS Coverage 90.17%">
<!-- License Badge -->
<img src="https://img.shields.io/badge/License-GPL--3.0--only-34ad9b" alt="License GPL--3.0--only">
</div>

A package to easily generate badges for your Git repositories (like the ones above).

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
<!-- JS Coverage Badge -->
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

#### License

Accepts a valid `package.json` or `composer.json` filepath.

```html
<!-- License Badge -->
```

```shell
npx badger --license ./path/to/json
```

#### PHPUnit Coverage

```html
<!-- PHP Coverage Badge -->
<img src="https://img.shields.io/badge/PHP Coverage-7.04%25-red" alt="PHP Coverage 7.04%">
```

```shell
npx badger --phpunit ./path/to/coverage.xml
```

### Additional Options

By default, Badger attempts to update `./README.md` - if your README file is located somewhere else you can pass the
`--readme` flag along with any other flags:

```shell
npx badger --jest ./path/to/coverage --readme ./path/to/readme
```