/*!
 * ActiveRecord which supports single-loaded-relations (slr).
 * (c) Arjon Jason Castro <ajcastro29@gmail.com>
 * License: MIT
 */
angular.module('ActiveRecord').factory('ActiveRecord.Slr', ['ActiveRecord', function (ActiveRecord) {
    var initialize = ActiveRecord.prototype.$initialize;

    ActiveRecord.prototype.$initialize = function $initialize(properties, options) {
        /*
         * Set the declared relations on the model
         */
        if (properties) {
            var relations = {};
            angular.forEach(_result(this, '$relations'), function (def, relation) {
                var prop = def.prop||relation;
                relations[relation] = angular.isObject(properties[prop]) && !angular.isArray(properties[prop]) ?
                    new def.model(properties[prop]) :
                    [];

                if (angular.isArray(relations[relation])) {
                    angular.forEach(properties[prop], function (object) {
                        relations[relation].push(new def.model(object));
                    });
                }
            });
            angular.extend(properties, relations);
        } // End of setting declared relations
        
        initialize.apply(this, arguments);
    }

    return ActiveRecord;
}]);
