const { init, run, prepareArgs, getName } = require("./cliOptions");

async function gitConfigCli() {
  let args = prepareArgs(process.argv);
  let name = getName(process.argv);
  if (name === 'ls') {
    name = '';
    args.push('ls');
  }
  init();
  await run(args, name);
}

module.exports = gitConfigCli;

