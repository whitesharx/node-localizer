node-localizer
================

## Installation

Npm
```javascript
npm install node-localizer
```

Yarn
```javascript
yarn add node-localizer
```

# Support

This library is quite fresh, and maybe has bugs. Write me an **email** to *natashkinsash@gmail.com* and I will fix the bug in a few working days.

# Quick start

```javascript
const Localizer = require('node-localizer');

const localizer = new Localizer('localization.json', {local: 'en', default: 'en'});

let test = localizer.get({key: 'test'}); //test

localizer.setLocal('cz');

test = localizer.get({key: 'test'}); //kvíz

test = localizer.get({key: 'test', local: 'ru'}); //тест
```