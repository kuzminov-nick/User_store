<template>
    <div class="user-item">
        <router-link :to="`/user/${id}`" class="user-item__name">
            {{ first_name }} {{ last_name }}
        </router-link>
        <a :href="'mailto:' + email" class="user-item__mail">{{ email }}</a>
        <router-link :to="`/user/${id}`" class="user-item__img-wrap">
            <img :src="avatar" alt="" class="user-item__img">
        </router-link>
        <button type="button" @click="onClickDelete(id)" class="btn btn-danger user-item__delete-btn">Delete user</button>
    </div>
</template>

<script>
    export default {
        name: "UserItem",
        props: {
            id: {
                type: Number,
                default: null
            },
            first_name: {
                type: String,
                default: ''
            },
            last_name: {
                type: String,
                default: ''
            },
            email: {
                type: String,
                default: ''
            },
            avatar: {
                type: String,
                default: ''
            },
        },
        methods: {
            onClickDelete(id) {
                this.$emit('on-click-delete', id);
            }
        }
    }
</script>

<style lang="scss">
    @import "UserItem";
</style>