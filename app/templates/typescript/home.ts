import * as ko from 'knockout';
import * as system from 'durandal/system';
import * as app from 'durandal/app';
import {IFeature} from 'interfaces';

/**
 * Home VM
 */



class Home {
    public features = ko.observableArray();
    public isLoading = ko.observable();

    private messageTitle = "Application Message";
    private message = "Hello from your application";

    activate() {
        this.isLoading(true);

        return this.loadFeatures().then((data) => {
            this.features(data);
            this.isLoading(false);
        });

    }
    
    viewDetail(featureData:IFeature) {
        return app.showMessage(featureData.details,featureData.title);
    }

    loadFeatures(): JQueryDeferred<IFeature[]> {
        return system.defer(function(dfd) {
            setTimeout(function() {
                dfd.resolve([
                    {
                        title: "Create A ViewModel",
                        content: "Creating a viewmodel is as easy as calling <strong>yo durandal2:viewmodel.</strong>",
                        arguments:['{name}','{typescript|es5}'],
                        options:['--transient'],
                        details:"Providing the --transient flag will generate a viewmodel with a transient lifecyle."
                    },
                    {
                        title: "Run A Task",
                        content: "Run a preconfigured gulp task like <strong>gulp watch.</strong>",
                        arguments:['{taskName}'],
                        details:"Tasks are found in the tasks directory under the project root."
                    }
                ]);
            }, 500);
        });
    }
}



export = Home;