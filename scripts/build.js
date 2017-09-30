
import fs from 'fs';
import path from 'path';
import jsonfile from 'jsonfile';
import transform from 'babel-transform-dir';
import rimraf from 'rimraf';

const cleanLib =()=>new Promise((resolve, reject) => {
  rimraf('./lib', { force: true }, (err, result)=>err ? reject(err) : resolve(result))
});

const getPackageConfig =()=>{ 
  const pkgFileName = path.resolve(__dirname, '../package.json');
  const pkg = require(pkgFileName);
  return [pkg, pkgFileName];
}

const switchMainToLib =(pkg)=>{ 
  pkg.main = "./lib/index.js";
  return pkg;
};

const syncSrcVersionReferences =(version)=>{ 
  const versionedSrcFiles = ['class-o-mat/class-o-mat.js', 'plugins/plugin.js'];
  const versionText = `VERSION = '${version}'`;
  const versionRegex = /VERSION?\s=?\s('|")[0-9\.A-Za-z]{3,}('|")/g;

  versionedSrcFiles.forEach((file)=>{ 
    const fileName = path.resolve(__dirname, '../src/'+file);
    const fileText = fs.readFileSync(fileName, 'utf8');
    const resultText = fileText.replace(versionRegex, versionText);
    fs.writeFileSync(fileName, resultText, 'utf8');
  });
}

const syncDocVersionRefeneces =(version)=>{ 
  const readmeFile = path.resolve(__dirname, '../README.md');
  const readmeRegex = /VERSION\s[0-9\.A-Za-z]{3,}\s/g;
  const readmeText = fs.readFileSync(readmeFile, 'utf8');
  const resultText = readmeText.replace(readmeRegex, `VERSION ${version} `);
  fs.writeFileSync(readmeFile, resultText, 'utf8');
}

const syncVersionReferences =(pkg)=>{ 
  const version = pkg.version;
  syncSrcVersionReferences(version);
  syncDocVersionRefeneces(version);
  return pkg;
}

const transformSrc =()=>{ 
  const srcDir = path.resolve(__dirname, '../src');
  const libDir = path.resolve(__dirname, '../lib');
  const babelrcFileName = path.resolve(__dirname, '../.babelrc');
  const babelrc = jsonfile.readFileSync(babelrcFileName);
  transform(srcDir, libDir, {babel: babelrc, onFile:(file)=>console.log(`src/${file} -> lib/${file}`)});
}

async function build() { 
  await cleanLib();
  console.log('Cleaned old lib!');
  let [pkg, pkgFileName] = getPackageConfig();
  syncVersionReferences(pkg);
  console.log('synced versions');
  pkg = switchMainToLib(pkg);
  fs.writeFileSync(pkgFileName, JSON.stringify(pkg, null, 2));
  console.log('Main main correct');
  transformSrc();
}
build();