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
