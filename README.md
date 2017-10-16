## MagicTV

![MagicTV](https://gyazo.com/b4520fce76950b75a9dd1e8645fdc69b.png)

MagicTV is a GUI for TV that can control content with only two types of input.
Mainly used with [MagicKnock](http://magicknock.com/)

### MacOS Application

**Download** : [MacOS(.dmg) v0.1.0](https://drive.google.com/open?id=0BzQJNUZ8SSLFQVdibWplUlMxc2M)

**⚠️ Recommend Display resolution : 1920 x 1080 inch**

### Environment & Requires

- Node.js with ES6
- Electron
- React
- gulp

### Install Dependencies

```bash
$ npm install
```

### Electron

Build source codes (gulp must be global installed)
```
$ gulp build
```

Execution electron (premise electron command)
```
$ electron .
```

### Packaging

```bash
$ electron-packager . MagicTV --platform=darwin --arch=x64 --electronVersion=1.4.13 --icon=icon/magictv2.icns
```

```bash
$ electron-installer-dmg ./MagicTV-darwin-x64/MagicTV.app MagicTV
```

### Contributors

- [Kento Sasamoto](https://github.com/kentosasa)
