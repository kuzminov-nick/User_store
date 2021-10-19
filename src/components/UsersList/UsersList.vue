<template>
    <div class="users-list-wrap">
        <div class="users-list">
            <div v-for="(item, index) in users" :key="index" class="user-item users-list__item">
                <router-link :to="`/user/${item.id}`" class="user-item__name">
                    {{ item.first_name }} {{ item.last_name }}
                </router-link>
                <a :href="'mailto:' + item.email" class="user-item__mail">{{ item.email }}</a>
                <router-link :to="`/user/${item.id}`" class="user-item__img-wrap">
                    <img :src="item.avatar" alt="" class="user-item__img">
                </router-link>
                <button type="button" @click="onClickDelete(item.id)" class="btn btn-danger">Delete user</button>
            </div>
        </div>
        <router-link :to="`/add`" class="btn btn-primary add-user-btn">Add user</router-link>
    </div>
</template>

<script>

import { computed } from 'vue';
import { useStore } from 'vuex';

export default {
    name: "UsersList",
    setup(){
        const store = useStore();

        store.dispatch('users/getUsersData');

        const usersData = computed(() => store.getters['users/usersData']);
        const users = computed(() => usersData.value.data);

        function onClickDelete(id) {
            try {
                store.dispatch('users/deleteUser', id);
            } catch (e) {
                console.error(e);
            }
        }

        return {
            usersData,
            users,
            onClickDelete
        };
    },
}
</script>

<style lang="scss">
    @import "UsersList";
</style>