<template>
    <div id="navigation">
        <div class="button" @click='setPage("show")'>Bonsais</div>
        <div class="button" @click='setPage("create")'>Add Bonsai Tree</div>
        <div id="divider"></div>
        <div class="button" @click='setGrid("card")'>Grid</div>
        <div class="button" @click='setGrid("list")'>List</div>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class Navigation extends Vue {
    setGrid(s:string){
        this.$emit('setgrid', s)
    }

    setPage(s:string){
        this.$emit("setpage", s)
    }
}
</script>

<style scoped>

#navigation {
    background-color:#95BED8;
    margin-bottom:10px;
    font-size:1.2em;
    display: flex;
    align-items: stretch;
    justify-content: center;
}
#navigation div {
    padding:10px;
}
.button {
    cursor: pointer;
}
.button:hover {
    background-color: white;
    color:darkslategrey;
}
#divider {
    flex:1 1 auto;
    cursor: default;
}
.disabled {
    pointer-events: none;
    opacity: 0.4;
}
</style>
