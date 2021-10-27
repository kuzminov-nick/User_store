export const input = {
    props: {
        type: {
            type: String,
            default: 'text',
        },
        value: {
            type: [Number, String],
            default: null,
        },
        identificator: {
            type: String,
            default: null,
        },
        label: {
            type: String,
            default: '',
        },
        placeholder: {
            type: String,
            default: null,
        },
    },
    methods: {
        onInput(e) {
            this.$emit('input', e);
        }
    }
};
