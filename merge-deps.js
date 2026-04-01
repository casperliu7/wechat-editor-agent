const fs = require('fs');
const path = require('path');

const rootDir = __dirname;
const skillsDir = path.join(rootDir, 'skills');
const rootPackagePath = path.join(rootDir, 'package.json');

if (!fs.existsSync(rootPackagePath)) {
  console.error('Root package.json not found!');
  process.exit(1);
}

const rootPackage = JSON.parse(fs.readFileSync(rootPackagePath, 'utf-8'));
rootPackage.dependencies = rootPackage.dependencies || {};
rootPackage.devDependencies = rootPackage.devDependencies || {};

const subDirs = fs.readdirSync(skillsDir, { withFileTypes: true })
  .filter(dirent => dirent.isDirectory())
  .map(dirent => dirent.name);

let mergedDeps = 0;

for (const dir of subDirs) {
  const pkgPath = path.join(skillsDir, dir, 'package.json');
  if (fs.existsSync(pkgPath)) {
    try {
      const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
      
      if (pkg.dependencies) {
        for (const [key, value] of Object.entries(pkg.dependencies)) {
          rootPackage.dependencies[key] = value;
          mergedDeps++;
        }
      }
      
      if (pkg.devDependencies) {
        for (const [key, value] of Object.entries(pkg.devDependencies)) {
          rootPackage.devDependencies[key] = value;
          mergedDeps++;
        }
      }
      console.log(`Merged dependencies from ${dir}`);
    } catch (e) {
      console.error(`Error reading ${pkgPath}:`, e.message);
    }
  }
}

// Sort dependencies for neatness
const sortObject = (obj) => {
  return Object.keys(obj).sort().reduce((result, key) => {
    result[key] = obj[key];
    return result;
  }, {});
};

if (Object.keys(rootPackage.dependencies).length > 0) {
  rootPackage.dependencies = sortObject(rootPackage.dependencies);
} else {
  delete rootPackage.dependencies;
}

if (Object.keys(rootPackage.devDependencies).length > 0) {
  rootPackage.devDependencies = sortObject(rootPackage.devDependencies);
} else {
  delete rootPackage.devDependencies;
}

fs.writeFileSync(rootPackagePath, JSON.stringify(rootPackage, null, 2) + '\n');
console.log(`\nSuccessfully merged ${mergedDeps} dependencies into root package.json!`);
