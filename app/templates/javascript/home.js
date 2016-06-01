define(['knockout', 'durandal/system', 'durandal/app'], function (ko, system, app) {
    "use strict";


    var features = ko.observableArray();
    var isLoading = ko.observable();



    var activate = function () {

        isLoading(true);
        return loadFeatures().then(function (data) {
            features(data);
            isLoading(false);
        });
    };

    var viewDetail = function (featureData) {
        return app.showMessage(featureData.details, featureData.title);
    };

    var loadFeatures = function () {
        return system.defer(function (dfd) {
            setTimeout(function () {
                dfd.resolve([
                    {
                        title: "Create A ViewModel",
                        content: "Creating a viewmodel is as easy as calling <strong>yo durandal2:viewmodel.</strong>",
                        arguments: ['{name}', '{typescript|es5}'],
                        options: ['--transient'],
                        details: "Providing the --transient flag will generate a viewmodel with a transient lifecyle."
                    },
                    {
                        title: "Run A Task",
                        content: "Run a preconfigured gulp task like <strong>gulp watch.</strong>",
                        arguments: ['{taskName}'],
                        details: "Tasks are found in the tasks directory under the project root."
                    }
                ]);
            }, 500);
        });
    };

    var HomeVM = {
        features: features,
        isLoading: isLoading,
        activate: activate,
        viewDetail: viewDetail,
        loadFeatures: loadFeatures
    };

    return HomeVM;
});