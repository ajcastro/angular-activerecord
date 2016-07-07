/*!
 * ActiveRecord which supports single-loaded-relations (slr).
 * (c) Arjon Jason Castro <ajcastro29@gmail.com>
 * License: MIT
 */
angular.module('ActiveRecord').factory('ActiveRecord.Slr', ['ActiveRecord', function (ActiveRecord) {
    var initialize = ActiveRecord.prototype.$initialize;

    ActiveRecord.prototype.$initialize = function $initialize(properties, options) {
        initialize.apply(this, arguments);

        /*
         * Set the declared relations on the model
         */
        var $this = this;
        var relations = {};
        angular.forEach(_result(this, '$relations'), function (def, relation) {
            var prop = def.prop||relation;
            relations[relation] = angular.isObject($this[prop]) && !angular.isArray($this[prop]) ?
                new def.model($this[prop]) :
                [];

            if (angular.isArray(relations[relation])) {
                angular.forEach($this[prop], function (object) {
                    relations[relation].push(new def.model(object));
                });
            }
        });

        angular.extend(this, relations);
    }

    return ActiveRecord;
}]);