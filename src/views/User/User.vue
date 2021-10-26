<template>
    <div class="user">
        <h1>{{ id ? fullName : 'Enter data' }}</h1>
        <img v-if="id" :src="userData.avatar" alt="" class="user-img">
        <div class="user-fields">
            <Input
                    v-for="(input, name, index) in inputs"
                    :key="index"
                    :value="input.value"
                    :identificator="input.id"
                    :label="input.label"
                    :placeholder="input.placeholder"
                    @input="onInput($event, name)"
                    class="user-field__input"
            >
            </Input>
        </div>
        <div class="user-btns">
            <button v-if="id" type="button" @click="onClickDelete(userData.id)" class="btn btn-danger user-btns__item">Delete user</button>
            <button type="button" @click="id ? onClickUpdate() : onClickCreate()" class="btn btn-success user-btns__item" :class="{'user-btns__item_full': !id}">
                {{id ? 'Update' : 'Add' }} user
            </button>
            <div class="btn btn-primary user-btns__item user-btns__item_full" @click="back">Back</div>
        </div>
    </div>
</template>

<script>
import { reactive, computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router'

import Input from '@/components/Input/Input.vue';

export default {
    props: ['page', 'id'],
    emits: {input: null},
    components: {
        Input
    },
    setup(props) {
        const store = useStore();
        const router = useRouter();

        const inputs = reactive({
            firstName: {
                type: 'text',
                value: '',
                id: 'input1',
                label: 'First Name',
                placeholder: 'First name'
            },
            lastName: {
                type: 'text',
                value: '',
                id: 'input2',
                label: 'Last Name',
                placeholder: 'Last name'
            },
            email: {
                type: 'text',
                value: '',
                id: 'input3',
                label: 'Email',
                placeholder: 'Email'
            }
        });

        if(props.id) {
            store.dispatch('users/getUserAfterUserList', {
                isFullUsersList: Object.keys(store.getters['users/usersData']).length,
                page: props.page,
                userId: props.id,
            }).then(() => {
                if(props.id) {
                    inputs.firstName.value = userData.value.first_name;
                    inputs.lastName.value = userData.value.last_name;
                    inputs.email.value = userData.value.email;
                }
            });
        }

        const user = computed(() => store.getters['users/singleUser']);
        const userData = computed(() => user.value);

        const fullName = computed(() => `${userData.value.first_name} ${userData.value.last_name}`);

        function onClickUpdate() {
            try {
                store.dispatch('users/updateUserListAndSingleUser',
                    {
                        "id": props.id,
                        "userObject": {
                            "first_name": inputs.firstName.value,
                            "last_name": inputs.lastName.value,
                            "email": inputs.email.value
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
                    "avatar": '',
                    "first_name": inputs.firstName.value,
                    "last_name": inputs.lastName.value,
                    "email": inputs.email.value
                });
                back();
            } catch (e) {
                console.error(e);
            }
        }

        function onClickDelete(id) {
            try {
                store.dispatch('users/deleteUser', id);
                back();
            } catch (e) {
                console.error(e);
            }
        }

        function onInput(event, name) {
            inputs[name].value = event.target.value;
        }

        function back() {
            router.back()
        }

        return {
            user,
            userData,
            fullName,
            inputs,
            onClickUpdate,
            onClickCreate,
            onClickDelete,
            onInput,
            back
        };
    },
}
</script>

<style lang="scss">
    @import "User";
</style>