<template>
    <div class="field">
        <label :for="id">{{ label }}</label>
        <input :type="type" :id="identificator" :placeholder="placeholder" :value="value" @input="onInput" class="field__input">
    </div>
</template>

<script>
import { input } from '@/components/mixins/input'
export default {
    name: "input",
    mixins: [input],
    methods: {
        onInput(e) {
            this.$emit('input', e);
        }
    }
}
</script>

<style lang="scss">
    .field {
        display: flex;
        flex-direction: column;
        align-items: baseline;
        &__input {
             width: 100%;
        }
    }
</style>