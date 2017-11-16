const path = require('path');
const fse = require('fs-extra');
const execSync = require('child_process').execSync;

const exec = (command, extraEnv) => (
	execSync(command, {
		stdio: 'inherit',
		env: Object.assign({}, process.env, extraEnv),
	})
);

console.log('[Bamboo UI] Clean up...');
fse.emptyDirSync(path.join(__dirname, '../dist'));

console.log('[Bamboo UI] Build CSS...');
exec('webpack --config css.webpack.config.js', {
	NODE_ENV: 'development',
});

console.log('[Bamboo UI] Build min CSS...');
exec('webpack --config css.webpack.config.js', {
	NODE_ENV: 'production',
});

fse.removeSync(path.join(__dirname, '../dist/css/css.js'));
fse.removeSync(path.join(__dirname, '../dist/css/css.js.map'));

console.log('\n[Bamboo UI] Build CJS...');
exec('babel ./components -d ./dist/cjs --ignore __tests__', {
	BABEL_ENV: 'cjs',
});

console.log('\n[Bamboo UI] Build ES...');
exec('babel ./components -d ./dist/es --ignore __tests__', {
	BABEL_ENV: 'es',
});

console.log('\n[Bamboo UI] Build UMD...');
exec('rollup -c -f umd -o ./dist/umd/bamboo-ui.js', {
	NODE_ENV: 'development',
	BABEL_ENV: 'umd',
});

console.log('\n[Bamboo UI] Build min UMD...');
exec('rollup -c -f umd -o ./dist/umd/bamboo-ui.min.js', {
	NODE_ENV: 'production',
	BABEL_ENV: 'umd',
});
