const { exec } = require('child_process');

function print(error, stdout) {
  if (error) {
    return console.error(error);
  }
  console.log(stdout);
}

exec('npm run build', function(error, stdout) {
  print(error, stdout);
  exec('git add commonjs', print);
});
