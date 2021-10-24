import axios from 'axios';

const url = 'https://reqres.in/api/users';
export default {
    namespaced: true,
    state: {
        usersData: {},
        // singleUser: null
    },
    getters: {
        usersData: state => state.usersData,
        user(state){
            return function(id){
                return state.usersData.data.find(user => +user.id === id);
            }
        },
        // singleUser: state => state.singleUser,
    },
    mutations: {
        putUsersData(state, payload) {
            state.usersData = payload;
        },
        addUser(state, payload) {
            state.usersData.data.push(payload);
        },
        updateUser(state, payload) {
            //Находим элемент по payload.id
            const currentUser = state.usersData.data.find((item) => {
                return item.id === +payload.id;
            });
            //Перезаписываем его ключи
            Object.keys(payload.data).forEach(key => {
                currentUser[key] = payload.data[key];
            });
        },
        deleteUser(state, payload) {
            const currentUserIndex = state.usersData.data.findIndex((item) => {
                return item.id === +payload.id;
            });

            state.usersData.data.splice(currentUserIndex, 1);
        },
        // putUserById(state, payload) {
        //     state.singleUser = payload.data;
        // },
    },
    actions: {
        async getUsersData({ commit }, page) {
            await axios
                .get(`${url}?page=${page}`)
                .then(({ data }) => commit('putUsersData', data));
        },
        async addUser({ commit }, userData) {
            await axios
                .post(url, userData)
                .then(({ data }) => commit('addUser', data));
        },
        async updateUser({ commit }, userData) {
            const id = userData.id;
            await axios
                .put(`${url}/${id}`, userData.userObject)
                .then(({ data }) => commit('updateUser', {id, data}));
        },
        async deleteUser({ commit }, id) {
            await axios
                .delete(`${url}/${id}`)
                .then(() => commit('deleteUser', {id}));
        },
        // async getUserById({ commit }, id) {
        //     await axios
        //         .get(`${url}/${id}`)
        //         .then(({ data }) => commit('putUserById', data));
        // },
    }
}