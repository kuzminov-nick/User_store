<template>
    <div class="user">
        <h1>{{ id ? fullName : 'Enter data' }}</h1>
        <img v-if="id" :src="userData.avatar" alt="" class="user-img">
        <div class="user-fields">
            <div class="user-field">
                <label for="firstName">First name</label>
                <input type="text" id="firstName" placeholder="First name" v-model="firstName" ref="firstInput" class="user-field__input">
            </div>
            <div class="user-field">
                <label for="lastName">Last name</label>
                <input type="text" id="lastName" placeholder="Last name" v-model="lastName" class="user-field__input">
            </div>
            <div class="user-field">
                <label for="email">Email</label>
                <input type="text" id="email" placeholder="Email" v-model="email" class="user-field__input">
            </div>
        </div>
        <div class="user-btns">
            <button v-if="id" type="button" @click="onClickDelete(userData.id)" class="btn btn-danger user-btns__item">Delete user</button>
            <button type="button" @click="id ? onClickUpdate() : onClickCreate()" class="btn btn-success user-btns__item" :class="{'user-btns__item_full': !id}">
                {{id ? 'Update' : 'Add' }} user
            </button>
            <router-link :to="`/`" class="btn btn-primary user-btns__item user-btns__item_full">go back</router-link>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
    props: ['id'],
    data:() => ({
        firstName: '',
        lastName: '',
        email: '',
    }),
    async created() {
        await this.getUsersData();
    },
    mounted() {
        if(this.id) {
            this.firstName = this.userData.first_name;
            this.lastName = this.userData.last_name;
            this.email = this.userData.email;
        }
        this.$refs.firstInput.focus();
    },
    computed: {
        ...mapGetters('users', ['user']),
        userData() {
            return this.user(+this.id);
        },
        fullName() {
            return `${this.userData.first_name} ${this.userData.last_name}`
        }
    },
    methods: {
        ...mapActions('users', ['getUsersData', 'addUser', 'updateUser', 'deleteUser']),
        async onClickUpdate() {
            try {
                await this.updateUser(
                    {
                        "id": this.id,
                        "userObject": {
                            "first_name": this.firstName,
                            "last_name": this.lastName,
                            "email": this.email
                        }
                    });
            } catch (e) {
                console.error(e);
            }
        },
        async onClickCreate() {
            try {
                await this.addUser({
                    "first_name": this.firstName,
                    "last_name": this.lastName,
                    "email": this.email
                });
            } catch (e) {
                console.error(e);
            }
        },
        async onClickDelete(id) {
            try {
                await this.deleteUser(id);
                this.$router.push({name: 'Home'});
            } catch (e) {
                console.error(e);
            }
        },
    }
}
</script>

<style lang="scss">
    @import "User";
</style>