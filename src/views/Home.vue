<template>
    <div class="home">
        <UsersList :users="users" :page="page">
            List of users
        </UsersList>
        <div class="pagination home__pagination">
            <div class="btn btn-outline-primary pagination__item" v-for="(item, index) in totalPages" :key="index" @click="goToPage(index + 1)" :class="{'pagination__item_active': index + 1 == page}">
                {{ index + 1 }}
            </div>
        </div>
    </div>
</template>

<script>
// @ is an alias to /src
import { computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router'

import UsersList from '@/components/UsersList/UsersList.vue';

export default {
    name: 'Home',
    components: {
        UsersList
    },
    props: ['page'],
    setup(props){
        const store = useStore();
        const router = useRouter();

        if(!Object.keys(store.getters['users/usersData']).length) {
            store.dispatch('users/getUsersData', props.page);
        }

        const usersData = computed(() => store.getters['users/usersData']);
        const users = computed(() => usersData.value.data);
        const totalPages = computed(() => usersData.value.total_pages);

        function goToPage(page) {
            router.push({name: 'Home', params: { page: page }});
            store.dispatch('users/getUsersData', page);
        }

        return {
            usersData,
            users,
            totalPages,
            goToPage
        }
    }
}
</script>

<style lang="scss">
    .home {
        width: 100%;
        max-width: 1200px;
        margin: 0 auto;
        padding: 50px 20px;
        &__pagination {
            margin-top: 20px;
        }
    }
    .add-user-btn {
        display: block;
        text-transform: uppercase;
    }
    .pagination {
        display: inline-flex;
        &__item {
            margin: 0 5px;
            &_active {
                color: #fff;
                background-color: #0d6efd;
                border-color: #0d6efd;
            }
        }
    }
</style>
