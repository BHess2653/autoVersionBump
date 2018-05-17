const gulp = require('gulp');
const argv = require('yargs').argv
const git = require('gulp-git');
const fs = require('fs');

gulp.task('bump', () => {
  const { version } = require('./package.json'); // version from package.json
  const pkg = require('./package.json'); // pakcage.json
  const parseVersion = pkg.version.split('.');
  const type = process.argv[3];

  switch (type) {
    case '--major':
      // Major
      parseVersion[0] = parseInt(parseVersion[0], 10) + 1;
      parseVersion[1] = 0;
      parseVersion[2] = 0;
      break;
    case '--minor':
      // Minor
      parseVersion[1] = parseInt(parseVersion[1], 10) + 1;
      parseVersion[2] = 0;
      break;
    case '--patch':
      // Patch
      parseVersion[2] = parseInt(parseVersion[2], 10) + 1;
      break;
    default:
      throw 'error';
  };

  pkg.version = parseVersion.join('.');
  // Overwrites the version number in package.json
  fs.writeFile('./package.json', JSON.stringify(pkg), (err) => {
    if (err) throw err;
  });
  console.log(version + ' has been updated to ' + pkg.version);
});
