const cp = require("child_process");

exports.cmd = (command) => (pm) => {
  let hook = null;

  try {
    hook = pm.configResolver.get("hooks")["cmd"]["beforeExec"];
  } catch (error) {
    // pass
  }

  command = hook ? hook(command) : command;

  // command execution plugin
  pm.walk((pkg) => {
    console.log(`[pm] execute [${command}] in [${pkg.resolvePath}]......`);
    cp.execSync(command, {
      cwd: pkg.resolvePath,
      stdio: ["inherit", "inherit", "inherit"],
    });
  });
};

exports.install = exports.cmd("npm i");
exports.clean = exports.cmd("rm -rf node_modules");
exports.test = exports.cmd("npm run test");
exports.build = exports.cmd("npm run build");
exports.publish = exports.cmd("npm run publish");
