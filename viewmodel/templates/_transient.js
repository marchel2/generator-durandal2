define(["knockout", "durandal/app", "durandal/system", "plugins/router"], function (ko, app, system, router) {
    var VM = (function () {
            function VM() {}
            VM.prototype.activate = function () {
                return true;
            };
            VM.prototype.deactivate = function () {
                return true;
            };
    });
    return VM;
});