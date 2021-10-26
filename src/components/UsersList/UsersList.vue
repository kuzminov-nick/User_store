<template>
    <div class="users-list-wrap">
        <div class="users-list">
            <UserItem
                    v-for="(user, index) in users"
                    :key="index"
                    :page="page"
                    v-bind="user"
                    @on-click-delete="onClickDelete"
                    class="users-list__item">
            </UserItem>
        </div>
        <router-link :to="`/add`" class="btn btn-primary add-user-btn">Add user</router-link>
    </div>
</template>

<script>

import { useStore } from 'vuex';

import UserItem from '@/components/UserItem/UserItem.vue'

export default {
    name: "UsersList",
    props: {
        page: {
            type: String,
            default: '',
        },
        users: {
            type: Object,
            default: () => {}
        }
    },
    components: {
        UserItem
    },
    setup(){
        const store = useStore();

        function onClickDelete(id) {
            try {
                store.dispatch('users/deleteUser', id);
            } catch (e) {
                console.error(e);
            }
        }

        return {
            onClickDelete
        };
    },
}
</script>

<style lang="scss">
    @import "UsersList";
</style>