import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        barIndex: null,
        role: null,
        index: [],
    },

    mutations: {

        SET_BAR_INDEX: (state, barIndex) => {
            state.barIndex = barIndex;
            if (!state.barIndex) {
                localStorage.removeItem('mis_element_demo_bar_index');
                return;
            }
            localStorage.setItem('mis_element_demo_bar_index', state.barIndex);
        },

        SET_ROLE: (state, role) => {
            state.role = role;
            if (!state.role) {
                localStorage.removeItem('mis_element_demo_role');
                return;
            }
            localStorage.setItem('mis_element_demo_role', JSON.stringify(state.role));
        },

        SET_INDEX: (state, index) => {
            state.index = index;
            if (!state.index) {
                localStorage.removeItem('mis_element_demo_index');
                return;
            }
            localStorage.setItem('mis_element_demo_index', JSON.stringify(state.index));
        }
    },

    getters: {

        GET_BAR_INDEX: (state) => {
            if (state.barIndex) {
                return state.barIndex;
            }
            const barIndex = localStorage.getItem('mis_element_demo_bar_index');
            if (!barIndex) {
                return null;
            }
            return barIndex.toString();
        },

        GET_ROLE: (state) => {
            if (state.role) {
                return state.role;
            }
            const role = localStorage.getItem('mis_element_demo_role');
            if (!role) {
                return null;
            }
            return JSON.parse(role);
        },

        GET_INDEX: (state) => {
            if (state.index && state.index.length > 0) {
                return state.index;
            }
            let index = localStorage.getItem('mis_element_demo_index');
            if (!index) {
                return [];
            }
            return JSON.parse(index);
        }
    }
});
