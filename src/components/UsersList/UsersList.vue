<template>
    <div class="users-list-wrap">
        <div class="users-list">
            <UserItem
                    v-for="(user, index) in users"
                    :key="index"
                    v-bind="user"
                    @on-click-delete="onClickDelete"
                    class="users-list__item">
            </UserItem>
        </div>
        <router-link :to="`/add`" class="btn btn-primary add-user-btn">Add user</router-link>
    </div>
</template>

<script>

import { computed } from 'vue';
import { useStore } from 'vuex';

import UserItem from '@/components/UserItem/UserItem.vue'

export default {
    name: "UsersList",
    components: {
        UserItem
    },
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