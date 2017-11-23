const fs = require('fs');
const child_process = require('child_process');

console.info('Running postinstall script...');

const submodules = [
  {
    name: 'KSCrash',
    url: 'https://github.com/kstenerud/KSCrash',
    hash: '0dee9865010e8ce05d697d68882f825fe9229262'
  },
  {
    name: 'Sentry',
    url: 'https://github.com/getsentry/sentry-cocoa',
    hash: 'd4a154ef8157c8abfe7adab7b762e9e7c342458b'
  }
];

try {
  process.chdir('ios');

  submodules.forEach(submodule => {
    console.info(`Cloning ${submodule.name}...`);
    child_process.execSync(`git clone ${submodule.url} ${submodule.name}`);

    console.info(`Checking ${submodule.hash} commit`);
    process.chdir(submodule.name);
    child_process.execSync(`git reset --hard ${submodule.hash}`);
    console.info(`${submodule.name} done`);
    process.chdir('..');
  });
} catch (error) {
  console.error('[Failed] Could not complete the postinstall script.');
}
