const fs = require("fs");
const path = require("path");

/**
 * Tiny Package Manager
 */
class PackageManager {
  constructor({ handles = Object.create(null), config = null } = {}) {
    this.handles = handles;
    this.configResolver =
      typeof config === "string"
        ? new DefaultRCResolver(config)
        : new ConfigResolver(config);
  }

  walk(cb) {
    const ROOT_PATH = this.configResolver.get("root");
    const dirs = fs.readdirSync(ROOT_PATH);
    const getResolvePath = (dir) => path.join(ROOT_PATH, dir);

    dirs
      .filter((dir) => Package.isPackage(getResolvePath(dir)))
      .map((dir) => {
        cb(
          new Package({
            name: Package.read(getResolvePath(dir)).name,
            resolvePath: getResolvePath(dir),
            dirName: dir,
          })
        );
      });
  }

  exec(name) {
    if (!this.handles[name]) throw new Error("handle does not exists.");
    return this.handles[name](this);
  }

  load(name, handle) {
    this.handles[name] = handle;
  }
}

/**
 * Package
 */
class Package {
  constructor({ name, resolvePath, dirName }) {
    this.name = name;
    this.resolvePath = resolvePath;
    this.dirName = dirName;
  }
}

Package.isPackage = (dir) => {
  return fs.existsSync(path.resolve(dir, "package.json"));
};

Package.read = (dir) => {
  return fs.readFileSync(path.resolve(dir, "package.json"));
};

class ConfigResolver {
  constructor(config) {
    this._config = config;
  }

  getAll() {
    return this._config;
  }

  get(configKey) {
    if (!this._config[configKey]) throw new Error("Can not find this config.");
    return this._config[configKey];
  }
}

class DefaultRCResolver extends ConfigResolver {
  constructor(_config) {
    super(_config);
    this._config = JSON.parse(fs.readFileSync(_config).toString());
  }
}

module.exports = PackageManager;
