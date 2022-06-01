const { exec } = require('child_process');
const { stderr } = require('process');

const executePy = (filepath) => new Promise((resolve, reject) => {
  exec(
    `python3 ${filepath}`,
    (error, stdout, stderr) => {
      // error && reject({ error, stderr });
      // stderr && reject(stderr);
      if (error) {
        reject({ error, stderr });
      }
      if (stderr) {
        reject(stderr);
      } resolve(stdout);
      resolve(stdout);
    },

  );
});

module.exports = {
  executePy,
};
