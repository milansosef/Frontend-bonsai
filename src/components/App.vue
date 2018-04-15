<template>
    <div>
        <navigation v-on:setgrid="setGrid" v-on:setpage="setPage"></navigation>
        <div v-if="currentPage == 'show'" class="columns">
            <!-- DIT IS HET GRID -->
            <div class="cards">
                <card v-for="(b,index) in bonsais" :key="index" :bonsai="b" :display="gridstyle" v-on:bonsaiClicked="addToList(index)" 
                v-on:updateBonsai="putData" v-on:deleteBonsai="deleteData"></card>
            </div>
            <ShoppingCart v-if="cartItems.length > 0" :cartItems="cartItems" v-on:listitemclicked="removeFromList"></ShoppingCart>
        </div>
        <div v-if="currentPage == 'create'">
            <!-- DIT IS EEN FORMULIER -->
              <form @submit="postData">
                <label>
                    Title:
                    <input type="text" v-model="form.title"/>
                </label>
                <label>
                    Species:
                    <input type="text" v-model="form.species"/>
                </label>
                <label>
                    Age:
                    <input type="text" v-model="form.age"/>
                </label>
                <label>
                    Price:
                    <input type="text" v-model="form.price"/>
                </label>
                <button type="submit">Submit</button>
            </form>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator"
// import VueRouter from 'vue-router'
import Card from "./card.vue"
import Navigation from "./navigation.vue"
import ShoppingCart from "./ShoppingCart.vue"
import DataLoader from "../services/DataLoader"

// Vue.use(VueRouter)

@Component({
    components: {Card, Navigation, ShoppingCart}
})

export default class App extends Vue {
    bonsais: Bonsai[] = []
    cartItems :Bonsai[] = []
    gridstyle:string = "card"
    currentPage:string = "show"
    data(){
        return {
            form: {
                title: '',
                species: '',
                age: '',
                price: ''
            }
        }
    }
    created(){
        this.loadData()
    }
    async loadData(){
        this.bonsais = (await DataLoader.loadJSON(`http://188.226.186.131/api/bonsais`)).items
    }
    async postData(data:object){
        data = this.$data.form
        console.log("postData executed")
        await DataLoader.postJSON(`http://188.226.186.131/api/bonsais`, data)
        location.reload()
    }
    async putData(item:string, data:object){
        console.log("putData executed")
        await DataLoader.putJSON(`http://188.226.186.131/api/bonsais/` + item, data)
        location.reload()
    }
    async deleteData(item:string){
        await DataLoader.delete(`http://188.226.186.131/api/bonsais/` + item)
        location.reload()
    }
    addToList(i:number){
        console.log(i)
        this.cartItems.push(this.bonsais[i])
    }
    removeFromList(i:number){
        this.cartItems.splice(i,1)
    }
    setPage(s:string){
        this.currentPage = s
    }
    setGrid(s:string){
        this.gridstyle = s
    }
}
</script>

<style>
body {
    font-family: sans-serif;
    background: linear-gradient(#E64B8C, #95BFD8);
    margin:0px; padding:0px;
}

html {
    min-height: 100%;
}

h1, h2, h3, h4 {
    margin-top:0px;
	font-family: 'Audiowide', cursive;
}

div {
    box-sizing: border-box;
}

.cards {
    width:100vw;
    display:flex;
    flex-wrap: wrap;  /*cards can go to the next line*/
}
.columns {
    display:flex;
}
</style>
