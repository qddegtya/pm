const fs = require("fs");
const path = require("path");
const Walk = require("@root/walk");

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

    Walk.walk(ROOT_PATH, (err, pathname, dirent) => {
      if (err) throw err;

      // ignore node_modules
      if (dirent.isDirectory() && dirent.name.includes("node_modules")) {
        return Promise.resolve(false);
      }

      // if is valid package
      if (Package.isPackage(pathname)) {
        cb(
          new Package({
            name: Package.read(pathname).name,
            resolvePath: pathname,
            dirName: pathname.slice(0, -(dirent.name.length + 1)),
          })
        );

        return Promise.resolve();
      }

      return Promise.resolve();
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
