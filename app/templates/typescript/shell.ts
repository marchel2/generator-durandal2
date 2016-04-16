import * as router from 'plugins/router';
import * as app from 'durandal/app';


let activate = function() {
    router.map([{ route: '', moduleId: 'viewmodels/home', title: "Home", nav: true }]).buildNavigationModel();
    return router.activate();

};

export = { router, activate };