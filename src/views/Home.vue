<template>
    <div class="home">
        <UsersList></UsersList>
    </div>
</template>

<script>
// @ is an alias to /src
import UsersList from '@/components/UsersList/UsersList.vue';

export default {
    name: 'Home',
    components: {
        UsersList
    }
}
</script>

<style lang="scss">
    .home {
        width: 100%;
        max-width: 1200px;
        margin: 0 auto;
        padding: 50px 20px;
    }
</style>
