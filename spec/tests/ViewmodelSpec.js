var helpers = require('yeoman-test');
var assert = require('yeoman-assert');
var path = require('path');
var utils = require('../utils');
var VM_NAME = 'testVM';

function isTransient(fileLoc){
    //transients export/return class/function
    if(new RegExp(/(\.ts)/g).test(fileLoc)){
        return assert.fileContent(fileLoc,'export class VM');  
    }else{
        return assert.fileContent(fileLoc,'/var VM = (function () {');
    }
    
}

function isSingleton(fileLoc){
    //singletons export/return object
    if(new RegExp(/(\.ts)/g).test(fileLoc)){
        return assert.fileContent(fileLoc,'export = vm;');  
    }else{
        return assert.fileContent(fileLoc,'var vm = {};');
    }
    
}

describe("durandal2:viewmodel ARGS", function () {

    describe("generates a singleton viewmodel & view", function () {
        utils.makeSubGenerator('viewmodel',{}, [VM_NAME]);

        it('generates a viewmodel file (TypeScript by default)', function () {
            assert.file('app/viewmodels/' + VM_NAME + '.ts');
        });

        it('generates a view file by default', function () {
            assert.file('app/views/' + VM_NAME + '.html');
        });
        
         it('vm has singleton lifecycle', function(){
            return isSingleton('app/viewmodels/' + VM_NAME + '.ts');
        });

    });


    describe("generates a transient viewmodel & view in TypeScript", function () {
        utils.makeSubGenerator('viewmodel', { transient: true }, [VM_NAME, 'TyPeScRiPt']);

        it('generates a viewmodel file in TypeScript', function () {
            assert.file('app/viewmodels/' + VM_NAME + '.ts');
        });

        it('generates a view file by default', function () {
            assert.file('app/views/' + VM_NAME + '.html');
        });
        
        it('vm has transient lifecycle', function(){
            return isTransient('app/viewmodels/' + VM_NAME + '.ts');
        });

    });

    describe("generates TypeScript if invalid transpiler arguments passed", function () {
        utils.makeSubGenerator('viewmodel',{}, [VM_NAME, 'invlaidargumentvalue']);

        it('generates a viewmodel file in TypeScript', function () {
            assert.file('app/viewmodels/' + VM_NAME + '.ts');
        });

    });
    
    describe("generates a singleton viewmodel & view in JavaScript", function () {
        utils.makeSubGenerator('viewmodel',{}, [VM_NAME,'ES5']);

        it('generates a viewmodel file in JavaScript', function () {
            assert.file('app/viewmodels/' + VM_NAME + '.js');
        });

        it('generates a view file by default', function () {
            assert.file('app/views/' + VM_NAME + '.html');
        });
        
        it('vm has singleton lifecycle', function(){
            return isSingleton('app/viewmodels/' + VM_NAME + '.js');
        });

    });



});

describe("durandal2:viewmodel PROMPTS", function () {

    describe("generates a viewmodel & view", function () {
        utils.makeSubGenerator('viewmodel', {}, [], {name:VM_NAME});

        it('generates a viewmodel file (TypeScript by default)', function () {
            assert.file('app/viewmodels/' + VM_NAME + '.ts');
        });

        it('generates a view file by default', function () {
            assert.file('app/views/' + VM_NAME + '.html');
        }); 
    });


    describe("generates a viewmodel & view in TypeScript", function () {
        utils.makeSubGenerator('viewmodel', {}, [], {name: VM_NAME,transpiler:'typescript' });

        it('generates a viewmodel file', function () {
            assert.file('app/viewmodels/' + VM_NAME + '.ts');
        });

        it('generates a view file', function () {
            assert.file('app/views/' + VM_NAME + '.html');
        });
        
    });
    
    describe("generates a viewmodel in TypeScript, without view", function () {
        utils.makeSubGenerator('viewmodel', {}, [], {name: VM_NAME, transpiler: 'typescript', view: false });

        it('generates a viewmodel file', function () {
            assert.file('app/viewmodels/' + VM_NAME + '.ts');
        });

        it('does not generate a view file', function () {
            assert.noFile('app/views/' + VM_NAME + '.html');
        });

    });
    
    describe("generates a viewmodel & view in JavaScript", function () {
        utils.makeSubGenerator('viewmodel', {}, [], {name: VM_NAME, transpiler: 'es5'});

        it('generates a viewmodel file', function () {
            assert.file('app/viewmodels/' + VM_NAME + '.js');
        });

        it('generates a view file', function () {
            assert.file('app/views/' + VM_NAME + '.html');
        });

    });



});