const path = require("path");
module.exports = {
  root: path.join(__dirname, "./_fixtures/packages"),
  handles: {
    cmd: {
      beforeExec: function (cmd) {
        if (cmd === "npm i") {
          return "tnpm ii";
        } else if (cmd === "npm uninstall") {
          return "tnpm uninstall";
        }
      },
    },
  },
};
