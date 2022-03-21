<h1 align="center">
  <br>
	<img width="500" src="https://github.com/qddegtya/pm/raw/master/media/preview.png" alt="pm">
  <br>
  <br>
  <br>
</h1>

<p align="center">
<em>💡 Monorepo Tiny Package Manager = Packages + Handles.</em>
<br>
<br>
<em>You may not need lerna.</em>
<br>
<br>
<br>
</p>

# About

📦 a tiny package manager.

# Quick Start

### Step 1

```
$ npm install -D @atools/pm
```

### Step 2

```
"scripts": {
  "pm_install": "./node_modules/.bin/pm run install"
}
```

### Advanced Usage

> .pmrc.js

```javascript
const path = require("path");
module.exports = {
  root: path.join(__dirname, "./_fixtures/packages"),
  hooks: {
    cmd: {
      beforeExec: function (cmd) {
        if (cmd === "npm i") {
          return "cnpm ii";
        } else if (cmd === "npm uninstall") {
          return "cnpm uninstall";
        }
      },
    },
  },
};
```

# Internal Handles

* cmd / install
* cmd / uninstall
