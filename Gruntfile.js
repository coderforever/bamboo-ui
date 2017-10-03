module.exports = function (grunt) {
	grunt.initConfig({
		clean: {
			build: ['dist/css'],
		},
		sass: {
			expanded: {
				options: {
					style: 'expanded',
				},
				files: [{
					src: 'components/index.scss',
					dest: 'dist/css/bdp-component.css',
				}],
			},
			compressed: {
				options: {
					style: 'compressed',
				},
				files: [{
					src: 'components/index.scss',
					dest: 'dist/css/bdp-component.min.css',
				}],
			}
		},
	});

	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-sass');

	grunt.registerTask('default', [
		'clean',
		'sass',
	]);
};
