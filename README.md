## bluedolphin
A Node Command Line Tool to auto generate and build a web structure .

## Install

```bash
// local
cd bluedolphin
npm link

// npm
npm install bluedolphin -g
```

## Usage

project init
```bash
dolphin init [project_name] [-G git_url] [-W folder_name]
```
Then

```bash
cd <project name>
npm install
dolphin build
```

Now you can develop your app...

## Options
```bash
Usage: dolphin init [project_name] [-G git_url] [-W folder_name]

Version: 0.2.3

dolphin [ build | watch ]

Options:

  -h, --help                   output usage information
  -V, --version                output the version number
  -W, --without <str | array>  generate project without some folder(value can be `plugins`)
  -G, --git <str>              generate project with git repository
```

## Logs
```bash
@0.2.3 [2017.1.17] add options --without & --git
@0.2.2 [2017.1.14] add dolphin build command
@0.2.1 [2017.1.14] fix not empty folder bug
@0.2.0 [2017.1.13] download vendor files
@0.1.* [2017.1.13] generate web structure
```

## License
Copyright © 2017 [MIT License](https://spdx.org/licenses/MIT.html)
