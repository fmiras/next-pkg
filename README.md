![img](https://fmiras.com/img/oss/next-pkg.png)
[![NPM version](https://img.shields.io/npm/v/next-pkg.svg)](https://www.npmjs.com/package/next-pkg)
[![Build Status](https://travis-ci.org/onready/next-pkg.svg?branch=master)](https://travis-ci.org/onready/next-pkg)
[![Standard - JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://github.com/standard/standard)
[![Slack Channel](http://zeit-slackin.now.sh/badge.svg)](https://zeit.chat/)

Next-Pkg is a package for compiling your [next.js](https://github.com/zeit/next.js) project with [pkg](https://github.com/zeit/pkg). This is how you can deploy your Next.js apps on enviroments without node installed! (And take advantage of all the other pkg features)

## Usage

```bash
cd my-next-js-project/
npm install --save next-pkg pkg
```

and add a script to your package.json like this:

```json
{
  "scripts": {
    "dev": "next",
    "build": "next build",
    "start": "next start",
    "dist":"next-pkg"
  }
}
```

then just run `npm run dist` and you will find on `dist` folder your next.js binary compiled project.

## Contributing

1. [Fork](https://help.github.com/articles/fork-a-repo/) this repository to your own GitHub account and then [clone](https://help.github.com/articles/cloning-a-repository/) it to your local device
2. Link the package to the global module directory: `npm link`
3. Within the module you want to test your local development instance of next-pkg, just link it to the dependencies: `npm link next-pkg`. Instead of the default one from npm, node will now use your clone of Next-Pkg!

## Credits

Thanks to [ZEIT](https://zeit.co) Team for giving us this two amazing tools to make our life easier!
