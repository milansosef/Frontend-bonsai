<template>
    <div class="cart">
        <div>
            <h2>Cart</h2>
            <p>Items in your cart</p>
            <p>Total price : {{getTotalPrice}}</p>
        </div>
        <div class="cartitem" v-for="(b,index) in cartItems" :key="b.episode_id">
            <h4>{{b.title}}</h4>
            <p>{{b.price}}</p>
            <p @click="remove(index)">Remove</p>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator"

@Component
export default class Cart extends Vue {
    @Prop() cartItems: Bonsai[]
    totalPrice:number

    remove(i:number){
        this.$emit('listitemclicked', i)
    }

    get TotalPrice():number {
        this.cartItems.forEach(item => {
            this.totalPrice += item.price
        })

        return this.totalPrice
    }
}
</script>

<style scoped>
.cart {
    display: flex;
    flex-direction: column;
    width:25vw; padding:10px; margin-right:1vw;
    background-color:rgba(255,255,255,0.5);
    box-shadow: 0px 0px 10px rgba(0,0,0,0.4);
}

.cartitem {
    background-color:white;
    width:90%;
    padding:10px; margin:5px auto;
    cursor:pointer;
}
</style>