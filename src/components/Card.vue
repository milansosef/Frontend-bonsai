<template>
    <div :class="display">
    <!-- <div :class="display" @click='myFunction'> -->
        <div :style="{backgroundImage:headerImage}"></div>
        <div>
            <h3>{{bonsai.title}}</h3>

            <button @click='showDiv'>Show details</button>
            <button @click='showForm'>Edit</button>
            <button @click='deleteItem'>Delete</button>

            <div v-if="divVisible">
                <p>{{bonsai.species}}, {{bonsai.age}}</p>

                <button @click='addToCart'>Add to cart</button>
            </div>

            <div v-if="formVisible">
                <form @submit="editItem">
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
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator"
import DataLoader from "../services/DataLoader"

@Component
export default class Card extends Vue {
    
    @Prop() bonsai: Bonsai
    @Prop() display: string
    headerImage:string = ""
    divVisible:boolean = false
    formVisible:boolean = false
    data(){
        return {
            form: {
                title: this.bonsai.title,
                species: this.bonsai.species,
                age: this.bonsai.age,
                price: this.bonsai.price
            }
        }
    }
    created(){
        DataLoader.loadImage(this.bonsai.species).then(gifurl => { 
            this.headerImage = `url('${gifurl}')`
        })
    }
    addToCart(){
        this.$emit('bonsaiClicked')
    }
    editItem(){
        this.$emit('updateBonsai', this.bonsai._id, this.$data.form)
    }
    deleteItem(){
        this.$emit('deleteBonsai', this.bonsai._id)
    }
    showDiv() {
       this.divVisible = !this.divVisible
    }
    showForm() {
        this.formVisible = !this.formVisible
    }
    get shortIntro():string {
        return this.bonsai.title.substring(0,60) + "...<br>Add to cart"
    }
}
</script>

<style scoped>
.card {
    background-color:white;
    margin:2vw;
    width:20vw; height:400px;
    overflow: hidden;
    box-shadow: 0px 0px 15px rgba(0,0,0,0.4);
    transition: all 0.3s ease-in-out;
    cursor: pointer;
}
.card:hover {
	transform:scale(1.05);
	box-shadow: 0px 0px 45px rgba(0,0,0,0.8);
}
.card div:nth-child(1){
    background-color:slategray;
    background-size:cover;
    background-position: center;
    height:230px;
}

.card div:nth-child(2){
    padding:12px; 
    height:170px;
}

.list {
    background-color:white;
    display:flex;
    margin:2vw;
    width:80vw; height:200px;
    overflow: hidden;
    box-shadow: 0px 0px 15px rgba(0,0,0,0.4);
    transition: all 0.3s ease-in-out;
    cursor: pointer;
}
.list:hover {
	transform:scale(1.05);
	box-shadow: 0px 0px 45px rgba(0,0,0,0.8);
}
.list div:nth-child(1){
    background-color:slategray;
    background-size:cover;
    background-position: center;
    width:200px;
    height:200px;
}

.list div:nth-child(2){
    padding:12px; 
    height:200px;
}
</style>