import Vue from 'vue';

Vue.directive('permission', {
    inserted: function (el, binding) {
        if (binding.value && !Vue.prototype.$p(binding.value)) {
            el.remove();
        }
        return el;
    }
});
