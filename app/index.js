'use strict';
var util = require('util');
var path = require('path');
var chalk = require('chalk');
var yosay = require('yosay');
var generators = require('yeoman-generator').Base;
var mkdirp = require('mkdirp');


var contentDir = 'content/';
var taskDir = 'tasks/';
var jsDir = 'javascript/';
var tsDir = 'typescript/';
var viewDir = 'view/';
var rootDir = '';

var transpilers = ['typescript', 'es5'];
var DEF_TRANSPILER = transpilers[0];


var DurandalGenerator = generators.extend({
    // note: arguments and options should be defined in the constructor.
    constructor: function() {
        generators.apply(this, arguments);

        this.argument('applicationName', { type: String, required: false, desc: 'the name of the application' });
        this.argument('transpiler', { type: String, required: false, store: true, defaults: DEF_TRANSPILER, desc: 'ES5 or TypeScript' });
        this.transpiler = this.transpiler.toLowerCase();

        //Make sure the provided transpiler string is valid, if not use default
        if (transpilers.indexOf(this.transpiler) === -1) {
            this.transpiler = DEF_TRANSPILER;
        }

    },
    initializing: function () {
        this.log(yosay(chalk.cyan('Generate a SPA with Durandal,TypeScript and Gulp!')));
    },
    prompting: function askFor() {
        var done = this.async();
        var prompts = [
            {
                name: 'applicationName',
                message: 'What is your application name?',
                default: this.applicationName
            },
            {
                name: 'author',
                message: 'What is your application author\'s name?'
            },
            {
                type: 'list',
                name: 'transpiler',
                message: 'Select language features:es5 or typescript?',
                default: this.transpiler,
                choices: [
                    {
                        name: 'ES5',
                        value: 'es5'
                    },
                    {
                        name: 'TypeScript',
                        value: 'typescript'
                    }
                ]
            },
            {
                type: 'checkbox',
                name: 'features',
                message: 'Which features do you want to include in your application?',
                choices: [
                    {
                        name: 'Bootstrap',
                        value: 'bootstrap',
                        checked: true
                    },
                    {
                        name: 'Material Design',
                        value: 'materialdesign',
                        checked: true
                    },
                    {
                        name: 'Font Awesome',
                        value: 'fontawesome',
                        checked: true
                    },
                    {
                        name: 'Normalize',
                        value: 'normalize',
                        checked: true
                    }
                ]
            }
        ];

        this.prompt(prompts, function(props) {
            this.applicationName = props.applicationName;
            this.author = props.author;
            this.transpiler = props.transpiler.toLowerCase();

            this.features = {
                bootstrap: props.features.indexOf('bootstrap') !== -1,
                materialdesign: props.features.indexOf('materialdesign') !== -1,
                fontawesome: props.features.indexOf('fontawesome') !== -1,
                normalize: props.features.indexOf('normalize') !== -1
            };
            done();
        }.bind(this));
    },
    status: function() {
        this.log('Creating "%s" project', chalk.cyan(this.applicationName));
        this.log('Language Features "%s"', chalk.cyan(this.transpiler));
    },
    app: function app() {
        mkdirp('app');
        mkdirp('app/viewmodels');
        mkdirp('app/views');
        mkdirp('app/services');
        mkdirp('app/widgets');
        mkdirp('scripts');
        mkdirp('css');

        this.template('_README.md', 'README.md');
    },
    starter: function starter() {
        //Copy views
        this.fs.copyTpl(this.templatePath(viewDir + '_index.html'), 'index.html', this);
        this.fs.copyTpl(this.templatePath(viewDir + '_shell.html'), 'app/views/shell.html', this);
        this.fs.copyTpl(this.templatePath(viewDir + '_home.html'), 'app/views/home.html', this);

        //copy typescript/javascript
        if (this.transpiler === 'typescript') {
            this._typescript();
        } else {
            this._javascript();
        }

        //copy package manifest
        this.fs.copyTpl(this.templatePath(rootDir + '_package.json'), 'package.json', this);

        //copy css
        this.fs.copy(this.templatePath(contentDir + 'app.css'), this.destinationPath('css/app.css'));

    },
    _typescript: function _typescript() {

        //TODO: convert remaining starter files to ts.
        this.fs.copyTpl(this.templatePath(jsDir + '_main.js'), 'app/main.js', this);
        this.fs.copy(this.templatePath(tsDir + 'shell.ts'), 'app/viewmodels/shell.ts');
        this.fs.copy(this.templatePath(tsDir + 'home.ts'), 'app/viewmodels/home.ts');
        this.fs.copy(this.templatePath(tsDir + 'interfaces.ts'), 'app/interfaces.ts');
        this._tsconfig();
        this._typings();

    },
    _javascript: function _javascript() {
        this.fs.copyTpl(this.templatePath(jsDir + '_main.js'), 'app/main.js', this);
        this.fs.copy(this.templatePath(jsDir + 'shell.js'), 'app/viewmodels/shell.js');
        this.fs.copy(this.templatePath(jsDir + 'home.js'), 'app/viewmodels/home.js');
    },
    gulpfile: function gulpfile() {
        mkdirp('tasks');
        this.fs.copyTpl(this.templatePath('_gulpfile.js'), 'gulpfile.js');
    },
    gulpTasks: function gulpTasks() {
        this.fs.copyTpl(this.templatePath(taskDir + '_build.js'), 'tasks/build.js', this);
        this.fs.copyTpl(this.templatePath(taskDir + '_clean.js'), 'tasks/clean.js', this);
        this.fs.copyTpl(this.templatePath(taskDir + '_lint.js'), 'tasks/lint.js', this);
        this.fs.copyTpl(this.templatePath(taskDir + '_paths.js'), 'tasks/paths.js', this);
        this.fs.copyTpl(this.templatePath(taskDir + '_serve.js'), 'tasks/serve.js', this);
        this.fs.copyTpl(this.templatePath(taskDir + '_watch.js'), 'tasks/watch.js', this);
    },

    tfignore: function tfignore() {
        this.fs.copy(this.templatePath('tfignore.txt'), '.tfignore');
    },

    gitignore: function gitignore() {
        this.fs.copy(this.templatePath('gitignore.txt'), '.gitignore');
    },

    _tsconfig: function _tsconfig() {
        this.fs.copy(this.templatePath(tsDir + 'tsconfig.json'), 'tsconfig.json');
    },

    //copy the typings.json file for 'typings'
    _typings: function _typings() {
        this.fs.copy(this.templatePath(tsDir + 'typings.json'), 'typings.json');
        mkdirp('typings_local');
        this.fs.copy(this.templatePath(tsDir + 'typings_local/**/*'), 'typings_local');
    },

    executeNPMInstall: function() {
        if (!this.options['skip-install']) {
            this.installDependencies({
                bower: false,
                npm: true
            });
        } else {
            this.log(chalk.cyan('NPM install skipped'));
        }
    }
});

module.exports = DurandalGenerator;