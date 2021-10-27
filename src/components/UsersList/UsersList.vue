<template>
    <div class="users-list-wrap">
        <h1><slot></slot></h1>
        <div class="users-list">
            <UserItem
                    v-for="(user, index) in users"
                    :key="index"
                    :page="page"
                    v-bind="user"
                    class="users-list__item">
            </UserItem>
        </div>
        <router-link :to="`/add`" class="btn btn-primary add-user-btn">Add user</router-link>
    </div>
</template>

<script>
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
}
</script>

<style lang="scss">
    @import "UsersList";
</style>