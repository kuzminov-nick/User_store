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
import { ref, computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router'

export default {
    props: ['id'],

    setup(props) {
        const store = useStore();
        const router = useRouter();

        if(props.id) {
            store.dispatch('users/getUsersData');
        }

        const firstName = ref('');
        const lastName = ref('');
        const email = ref('');

        const firstInput = ref(null);

        const user = computed(() => store.getters['users/user']);
        const userData = computed(() => user.value(+props.id));

        const fullName = computed(() => `${userData.value.first_name} ${userData.value.last_name}`);

        onMounted(() => {
            if(props.id) {
                firstName.value = userData.value.first_name;
                lastName.value = userData.value.last_name;
                email.value = userData.value.email;
            }

            firstInput.value.focus();
        });

        function onClickUpdate() {
            try {
                store.dispatch('users/updateUser',
                    {
                        "id": props.id,
                        "userObject": {
                            "first_name": firstName.value,
                            "last_name": lastName.value,
                            "email": email.value
                        }
                    });
            } catch (e) {
                console.error(e);
            }
        }

        function onClickCreate() {
            try {
                store.dispatch('users/addUser',
                    {
                    "first_name": firstName.value,
                    "last_name": lastName.value,
                    "email": email.value
                });
                router.push({name: 'Home'});
            } catch (e) {
                console.error(e);
            }
        }

        function onClickDelete(id) {
            try {
                store.dispatch('users/deleteUser', id);
                router.push({name: 'Home'});
            } catch (e) {
                console.error(e);
            }
        }

        return {
            firstName,
            lastName,
            email,
            firstInput,
            user,
            userData,
            fullName,
            onClickUpdate,
            onClickCreate,
            onClickDelete
        };
    },
}
</script>

<style lang="scss">
    @import "User";
</style>