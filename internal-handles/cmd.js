const cp = require('child_process')

exports.cmd = command => pm => {
  // command execution plugin
  pm.walk(pkg => {
    console.log(`[pm] execute [${command}] in [${pkg.resolvePath}]......`)

    cp.execSync(command, {
      cwd: pkg.resolvePath,
      stdio: [
        'inherit',
        'inherit',
        'inherit'
      ]
    })
  })
}

exports.install = exports.cmd('npm i')
