module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);  
  
  let config = grunt.file.readJSON('config.json');
	let latestBackup = 'backups/' + grunt.template.today('yyyy/mm/dd/HH_MM_ss_sss') + '.sql';

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    sass: {
			dist: {
				files: [{
          cwd: 'src/sass',
          dest: 'dist/css',
          expand: true,
          ext: '.css',
          src: ['style.scss', 'admin.scss', 'dashboard.scss', 'login.scss']
        }]
			}
		},
		watch: {
			js: {
				files: ['src/js/**/*.js', 'src/js/app/templates/*.html'],
				options: {
					atBegin: true
				},
				tasks: ['copy:scripts', 'replace:scripts', 'replace:templates', 'copy:templates', 'concat:scripts', 'concat:admin', 'clean:scripts', 'uglify:scripts']
			},
			sass: {
				files: ['src/sass/**/*.scss'],
				options: {
					atBegin: true
				},
				tasks: ['sass', 'cssmin', 'copy:css']
			},
			ui: {
				files: ['**/*.php','*.min.css','dist/**/*.js'],
				options: {
					livereload: 4201
				}
			}
    },
		concurrent: {
			dev: {
				options: {logConcurrentOutput: true},
				tasks: ['watch']
			}
		},
    copy: {
			fonts: {
				files: [
					{
						cwd: 'src/fonts',
						dest: 'dist/fonts',
						expand: true,
						src: ['**']
					}
				]
			},
			images: {
				files: [
					{
						cwd: 'src/images',
						dest: 'dist/images',
						expand: true,
						src: ['**']
					}
				]
			},
			scripts: {
				files: [
					{
						cwd: 'src/js/app',
						dest: 'src/js/replace',
						expand: true,
						src: ['**']
					}
				]
			},
			css: {
				files: [
					{
						cwd: 'dist/css/',
						dest: '.',
						expand: true,
						src: ['**']
					}
				]
			},
			templates: {
				files: [
					{
						cwd: 'src/js/replace/templates',
						dest: 'dist/templates',
						expand: true,
						src: ['**']
					}
				]
			},
			db: {
				src: latestBackup,
				dest: 'latest.sql'
			}
		},
    replace: {
			scripts: {
				overwrite: true,
				replacements: [
					{
						from: /\{host\}/g,
						to: config.host
					},
					{
						from: /\{appid\}/g,
						to: config.appid
					},
					{
						from: /\{build\}/g,
						to: "<%= grunt.template.today('dd/mm/yyyy') %>"
					},
					{
						from: /\{config\}/g,
						to: JSON.stringify(config.public)
					}
				],
				src: ['src/js/replace/**/**.js']
			},
			templates: {
				overwrite: true,
				replacements: [
					{
						from: /<img\ssrc="([^.]+.svg)">/g,
						to: (matchedWord, index, fullText, regexMatches) => "<%= grunt.file.read('./src/"+regexMatches[0]+"') %>"
					}
				],
				src: ['src/js/replace/templates/*.html']
			},
			db: {
				overwrite: true,
				replacements: [
					{
						from: config.host,
						to: config.production
					},
					{
						from: 'mysqldump: [Warning] Using a password on the command line interface can be insecure.',
						to: ''
					}
				],
				src: ['backups/**/*.sql']
			}
    },
    eslint: { scripts: ['src/js/app/**/*.js'] },
    concat: {
      options: {
        stripBanners: true,
        banner: '/* <%= pkg.name %> - v<%= pkg.version %> - ' + '<%= grunt.template.today("yyyy-mm-dd") %>*/\n',
      },
      lib: {
				dest: 'dist/js/lib.min.js',
				src: ['bower_components/angular/angular.min.js']
			},
			scripts: {
				dest: 'dist/js/app.js',
				src: ['src/js/replace/*.js', 'src/js/replace/components/**/*.js']
			},
			admin: {
				dest: 'dist/js/admin.js',
				src: ['src/js/replace/admin/*.js', 'src/js/replace/admin/components/**/*.js']
			}
    },
    clean: { scripts: ['src/js/replace/**'] },
		uglify: {
			scripts: {
				files: {
					'dist/js/app.min.js': ['dist/js/app.js']
				}
			}
		},
		cssmin: {
			dist: {
				files: [
					{
						cwd: 'dist/css',
						dest: '.',
						expand: true,
						ext: '.min.css',
						src: ['*.css', '!*.min.css']
					}
				]
			}
		},
		db_dump: {
			local: {
				options: {
					title: 'Local DB',
					database: config.db.local.name,
					user: config.db.local.username,
					pass: config.db.local.password,
					host: config.db.local.host,
					backup_to: latestBackup
				}
			}
		}
  });

  grunt.registerTask('default', ['concurrent:dev']);
	grunt.registerTask('styles', ['sass']);
	grunt.registerTask('db:local', ['db_dump:local', 'replace:db', 'copy:db']);
	
  grunt.registerTask('scripts', ['eslint:scripts', 'copy:scripts', 'replace:scripts', 'replace:templates', 'copy:templates', 'concat', 'clean:scripts', 'uglify']);
  grunt.registerTask('build', ['styles', 'scripts', 'copy:images', 'copy:fonts']);
};
