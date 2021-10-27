<template>
    <div class="user-item">
        <router-link :to="`/user/${page}/${id}`" class="user-item__name">
            {{ first_name }} {{ last_name }}
        </router-link>
        <a :href="'mailto:' + email" class="user-item__mail">{{ email }}</a>
        <router-link :to="`/user/${page}/${id}`" class="user-item__img-wrap">
            <img :src="avatar" alt="" class="user-item__img">
        </router-link>
        <button type="button" @click="onClickDelete(id)" class="btn btn-danger user-item__delete-btn">Delete user</button>
    </div>
</template>

<script>
    import { useStore } from 'vuex';
    import { useRouter } from 'vue-router'

    export default {
        name: "UserItem",
        props: {
            page: {
                type: String,
                default: null
            },
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
        setup(){
            const store = useStore();
            const router = useRouter();

            function onClickDelete(id) {
                try {
                    store.dispatch('users/deleteUser', id);
                    back();
                } catch (e) {
                    console.error(e);
                }
            }

            function back() {
                router.back()
            }

            return {onClickDelete, back}
        }
    }
</script>

<style lang="scss">
    @import "UserItem";
</style>