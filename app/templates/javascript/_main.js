requirejs.config({
    paths: {
        'text': '../node_modules/requirejs-text/text',
        'durandal': '../node_modules/durandal/js',
        'plugins': '../node_modules/durandal/js/plugins',
        'transitions': '../node_modules/durandal/js/transitions',
        'knockout': '../node_modules/knockout/build/output/knockout-latest.debug',
        'jquery': '../node_modules/jquery/dist/jquery',
        <% if (features.bootstrap) { %>'bootstrap': '../node_modules/bootstrap/dist/js/bootstrap',<% } %>
    },
  <% if (features.bootstrap) { %>shim: {
    <% if (features.bootstrap) { %>bootstrap: {
            deps: ['jquery'],
            exports: 'jQuery'
        }<% } %>
    }<% } %>
});

define(['durandal/system', 'durandal/app', 'durandal/viewLocator'<% if (features.bootstrap) { %>, 'bootstrap'<% } %>],  function (system, app, viewLocator) {

    system.debug(true);


    app.title = "<%= applicationName %>";

    app.configurePlugins({
        router:true,
        dialog: true,
        widget: true
    });

    app.start().then(function() {
        // Replace 'viewmodels' in the moduleId with 'views' to locate the view.
        // Look for partial views in a 'views' folder in the root.
        viewLocator.useConvention();

        // Show the app by setting the root view model for our application with a transition.
        app.setRoot('viewmodels/shell');
    });
});