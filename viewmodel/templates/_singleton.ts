import * as ko from 'knockout';
import * as app from 'durandal/app';
import * as system from 'durandal/system';
import * as router from 'plugins/router';

let vm: any = {};
vm.deactivate = function() {return true; };
vm.activate = function() {return true; };

export = vm;