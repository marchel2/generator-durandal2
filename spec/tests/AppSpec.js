var helpers = require('yeoman-test');
var assert = require('yeoman-assert');
var path = require('path');
var utils = require('../utils');
var APP_NAME = 'TestApp';


//TODO Finish Me
xdescribe("durandal2:app ARGS", function () {

    xdescribe("generates a singleton viewmodel & in ", function () {
        utils.makeSubGenerator('viewmodel',{}, [APP_NAME]);

        it('generates a viewmodel file (TypeScript by default)', function () {
            assert.file('app/viewmodels/' + APP_NAME + '.ts');
        });

        it('generates a view file by default', function () {
            assert.file('app/views/' + APP_NAME + '.html');
        });
        
         it('vm has singleton lifecycle', function(){
            return isSingleton('app/viewmodels/' + APP_NAME + '.ts');
        });

    });


    xdescribe("generates a transient viewmodel & view in TypeScript", function () {
        utils.makeSubGenerator('viewmodel', { transient: true }, [APP_NAME, 'TyPeScRiPt']);

        it('generates a viewmodel file in TypeScript', function () {
            assert.file('app/viewmodels/' + APP_NAME + '.ts');
        });

        it('generates a view file by default', function () {
            assert.file('app/views/' + APP_NAME + '.html');
        });
        
        it('vm has transient lifecycle', function(){
            return isTransient('app/viewmodels/' + APP_NAME + '.ts');
        });

    });

    xdescribe("generates TypeScript if invalid transpiler arguments passed", function () {
        utils.makeSubGenerator('viewmodel',{}, [APP_NAME, 'invlaidargumentvalue']);

        it('generates a viewmodel file in TypeScript', function () {
            assert.file('app/viewmodels/' + APP_NAME + '.ts');
        });

    });
    
    xdescribe("generates a singleton viewmodel & view in JavaScript", function () {
        utils.makeSubGenerator('viewmodel',{}, [APP_NAME,'ES5']);

        it('generates a viewmodel file in JavaScript', function () {
            assert.file('app/viewmodels/' + APP_NAME + '.js');
        });

        it('generates a view file by default', function () {
            assert.file('app/views/' + APP_NAME + '.html');
        });
        
        it('vm has singleton lifecycle', function(){
            return isSingleton('app/viewmodels/' + APP_NAME + '.js');
        });

    });



});

xdescribe("durandal2:viewmodel PROMPTS", function () {

    xdescribe("generates a viewmodel & view", function () {
        utils.makeSubGenerator('viewmodel', {}, [], {name:APP_NAME});

        it('generates a viewmodel file (TypeScript by default)', function () {
            assert.file('app/viewmodels/' + APP_NAME + '.ts');
        });

        it('generates a view file by default', function () {
            assert.file('app/views/' + APP_NAME + '.html');
        }); 
    });


    xdescribe("generates a viewmodel & view in TypeScript", function () {
        utils.makeSubGenerator('viewmodel', {}, [], {name: APP_NAME,transpiler:'typescript' });

        it('generates a viewmodel file', function () {
            assert.file('app/viewmodels/' + APP_NAME + '.ts');
        });

        it('generates a view file', function () {
            assert.file('app/views/' + APP_NAME + '.html');
        });
        
    });
    
    xdescribe("generates a viewmodel in TypeScript, without view", function () {
        utils.makeSubGenerator('viewmodel', {}, [], {name: APP_NAME, transpiler: 'typescript', view: false });

        it('generates a viewmodel file', function () {
            assert.file('app/viewmodels/' + APP_NAME + '.ts');
        });

        it('does not generate a view file', function () {
            assert.noFile('app/views/' + APP_NAME + '.html');
        });

    });
    
    xdescribe("generates a viewmodel & view in JavaScript", function () {
        utils.makeSubGenerator('viewmodel', {}, [], {name: APP_NAME, transpiler: 'es5'});

        it('generates a viewmodel file', function () {
            assert.file('app/viewmodels/' + APP_NAME + '.js');
        });

        it('generates a view file', function () {
            assert.file('app/views/' + APP_NAME + '.html');
        });

    });



});