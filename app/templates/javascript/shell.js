define(['plugins/router', "durandal/app"], function (router, app) {
    return {
        router: router,

        activate: function () {
            router.map([{ route: '', moduleId: 'viewmodels/home', title: "Home", nav: true }]).buildNavigationModel();
            
            return router.activate();
        }
    };
});