'use strict';
var util = require('util');
var generators = require('yeoman-generator').Base;
var path = require("path");



var ViewmodelGenerator = generators.extend({
    // note: arguments and options should be defined in the constructor.
    constructor: function() {
        generators.apply(this, arguments);
        var transpilers = ['typescript', 'es5'];

        this.option('transient', {
            type: Boolean,
            defaults: false,
            desc: 'Generate a viewmodel that returns a class/function (transient lifecycle).'
        });

        this.argument('name', { type: String, required: false, desc: 'the name of the viewmodel' });
        this.argument('transpiler', { type: String, required: false, store: true, defaults: transpilers[0], desc: 'ES5 or TypeScript' });
        this.transpiler = this.transpiler.toLowerCase();


        if (transpilers.indexOf(this.transpiler) === -1) {
            this.transpiler = transpilers[0];
        }

    },


    prompting: function() {

        var done = this.async();

        var prompts = [
            {
                name: "name",
                message: "What is the name of the viewmodel?",
                default: this.name
            },
            {
                type: 'list',
                name: 'transpiler',
                message: 'Select language features:ES5 or TypeScript?',
                default: this.transpiler,
                choices: [
                    {
                        name: 'ES5',
                        value: 'es5'
                    },
                    {
                        name: 'TypeScript (1.8.2)',
                        value: 'typescript'
                    }
                ]
            },
            {
                type: "confirm",
                name: "view",
                message: "Would you like to create an associated view?",
                default: true
            }

        ];

        this.prompt(prompts, function(props) {
            this.view = props.view;
            this.title = props.title;
            this.transpiler = props.transpiler.toLowerCase();
            this.name = props.name;
            this.viewmodel = "viewmodels/" + this.name;

            done();
        }.bind(this));
    },
    files: function() {
        if (this.transpiler === 'typescript') {
            if (this.options.transient) {
                this.fs.copyTpl(this.templatePath('_transient.ts'), "app/".concat(this.viewmodel, ".ts"), this);
            } else {
                this.fs.copyTpl(this.templatePath('_singleton.ts'), "app/".concat(this.viewmodel, ".ts"), this);
            }

        } else {
            if (this.options.transient) {
                this.fs.copyTpl(this.templatePath('_transient.js'), "app/".concat(this.viewmodel, ".js"), this);
            }
            else {
                this.fs.copyTpl(this.templatePath('_singleton.js'), "app/".concat(this.viewmodel, ".js"), this);
            }
        }

        if (this.view)
            this.fs.copyTpl(this.templatePath('_view.html'), "app/views/".concat(this.name, ".html"), this);
    }


});

module.exports = ViewmodelGenerator;