<template>
    <div class="form__counter">
        <button 
        type="button" 
        aria-label="Убрать один товар"
        @click.prevent="decrementAmount()"
        >
            <svg width="12" height="12" fill="currentColor">
                <use xlink:href="#icon-minus"></use>
            </svg>
        </button>

        <input type="text" v-model.number="productAmount">

        <button 
        type="button" 
        aria-label="Добавить один товар"
        @click.prevent="incrementAmount()"
        >
            <svg width="12" height="12" fill="currentColor">
                <use xlink:href="#icon-plus"></use>
            </svg>
        </button>
    </div>
</template>

<script>
import numberFormat from '@/helpers/numberFormat';

export default {
    props: ['amount'],
    data() {
        return {
            count: 1,
            productAmount: 1
        };
    },
    filters: {
        numberFormat
    },
    model: {
        prop: 'productAmount',
        event: 'changeAmount',
    },
    methods: {
        incrementAmount() {
            this.$emit('changeAmount', (this.productAmount += 1));
        },
        decrementAmount() {
            if (this.productAmount > 1) {
                this.$emit('changeAmount', (this.productAmount -= 1));
            }
        },
    },
};
</script>