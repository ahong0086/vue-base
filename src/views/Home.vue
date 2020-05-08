<template>
    <div class="home">
        <img alt="Vue logo" src="../assets/logo.png" />
        <GameList msg="Welcome to Your Vue.js App" />
    </div>
</template>

<script>
// @ is an alias to /src
import GameList from "@/components/GameList.vue";

export default {
    name: "home",
    components: {
        GameList
    }
};
</script>


<style lang="scss" scoped>
    img{
        margin: 20px auto;
        display: block;
    }
</style>
