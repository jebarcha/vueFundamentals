<template>
    <h2>{{ customTitle }}  {{ start }}</h2>
    <p> {{ counter }} <sup>2</sup>= {{ squareCounted }}</p>
    <div>
        <!-- <button v-on:click="increase">+1</button> -->
        <button @click="increase">+1</button>
        <button @click="decrease">-1</button>
    </div>
</template>

<script>
export default {
    props: {
        title: String,
        start: {
            type: Number,
            default: 100,
            validator: function(value) {
                return (value > 100)
            }
            //required: true
        }
    },
    //props: ['title', 'start'],
    //name: 'loquesea',
    data() {
        return {
            counter: this.start //5
        }
    },
    methods: {
        getSquareValue() {
            console.log('getSquareValue');
            return this.counter * this.counter
        },
        increase() {
            //this.counter++
            this.counter = this.counter + 1
        },
        decrease() {
            this.counter--
        }
    },
    computed: {
        squareCounted() {
            console.log('computed squareCounted')
            return this.counter * this.counter
        },
        customTitle() {
            return this.title || 'Counter'
        }
    }
}
</script>

<style>

button {
    background-color: #64BB87;
    border-radius: 5px;
    border: 1px solid white;
    color: white;
    cursor: pointer;
    margin: 0 5px;
    padding: 5px 15px;
    transition: 0.3s ease-in-out;
}

button:hover {
    background-color: #5aa67b;
    transition: 0.3s ease-in-out;
}

</style>