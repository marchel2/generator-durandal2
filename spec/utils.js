var helpers = require('yeoman-test');
var assert = require('yeoman-assert');
var path = require('path');



function makeSubGenerator(generatorName,optionsObj, argumentsArr, promptsObj) {

    beforeEach(function (done) {
        
      
        
        var mock = helpers.run(path.join(__dirname, '../' + generatorName))
        .withOptions(optionsObj)
        .withArguments(argumentsArr)
        .withPrompts(promptsObj)
        .on('ready', function (generator) {
            // This is called right before `generator.run()` is called
        }).on('end', done);
        // if (optionsObj) mock = mock.withOptions(optionsObj);
        // if (optionsObj) mock = mock.withArguments(argumentsArr);
        // if (optionsObj) mock = mock.withPrompts(promptsObj);
        // mock.on('ready', function (generator) {
        //     // This is called right before `generator.run()` is called
        // }).on('end', done);

        return mock;
    });



}

module.exports = { makeSubGenerator: makeSubGenerator };