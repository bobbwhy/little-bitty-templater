
var fs = require('fs');
var path = require('path');
var rimraf = require('rimraf');
var compressor = require('node-minify');

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

const transformSrc =()=>{ 
  const srcPath = path.resolve(__dirname, '../src/index.js');
  const libPath = path.resolve(__dirname, '../lib/index.js');
  console.log(srcPath);
  console.log(libPath);
  compressor.minify({
    compressor: 'uglifyjs',
    input: srcPath,
    output: libPath,
    callback: function (err, min) {}
  });
}

async function build() { 
  await cleanLib();
  console.log('Cleaned old lib!');
  transformSrc();
}

build();