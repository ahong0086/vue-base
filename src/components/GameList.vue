<template>
    <div class="game-list">
        <van-grid :gutter="10" :column-num='2' icon-size="80px">
            <van-grid-item
                v-for="(item, index) in gamesList"
                :key="index"
                @click="gotoGame(item)"
                :icon="item.url"
                :text="item.name"
            />
        </van-grid>
    </div>
</template>

<script>
import Vue from 'vue';
import { Grid, GridItem } from 'vant';
Vue.use(Grid).use(GridItem);
import User from "@/service/user";
import { mapKeys } from '@/common/util';
export default {
    name: "gamelist",
    data(){
        return {
            ...mapKeys(['gamesList'], User)
        }
    },
    created(){
    },
    methods:{
        gotoGame(game){
            User.game = game
            this.$router.push(game.path)
        }
    }
};
</script>

<style scoped lang="scss">
.game-list{
    max-width: 650px;
    margin:  0 auto;
}
</style>
