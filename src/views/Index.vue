<template>
    <div class="content">
        <div class="info">
            <div class="left" flex="dir:top box:first">
                <div class="user">
                    <user-head class="imgbox" :id="uid" :url="user.iconUrl"></user-head>
                    <h3>昵称: {{nickName}}</h3>
                    <p>
                        <label>{{user.balance}}</label>
                    </p>
                </div>
                <ul class="plays" flex-box="1">
                    <li
                        v-for="(game, index) in tthb.playRooms"
                        :key="game.type"
                        @click="onTab(game, index)"
                        :class="[game.type, activeType === game.type ? 'active': '']"
                    ><span>{{game.name}}</span>
                    </li>
                </ul>
            </div>
            <div v-if="this.tthb.playType <= 4" class="right">
                <div v-if="this.tthb.playType < 4" class="room-container" v-loading="loading">
                    <Card
                        v-for="(room, index) in list"
                        :key="index"
                        :roomInfo="room"
                        class="room-card"
                        :type="activeType"
                        @resetList="onLoad"
                    ></Card>
                    <button class="enter" @click="onClick"></button>
                </div>
                <MyRoom v-else-if="this.tthb.playType == 4"/>
            </div>
            <PromoteMine v-else-if="this.tthb.playType == 5"/>
        </div>
    </div>
</template>

<script>
    import MyRoom from "@/components/MyRoom";
    import Card from "@/components/Card";
    import TTHB from "@/service/tthb";
    import User from "@/service/user";
    import {mapKeys} from "@/common/util";
    import PromoteMine from '@/components/PromoteMine'

    export default {
        name: "index",
        components: {
            Card,
            MyRoom,
            PromoteMine,
        },
        data() {
            return {
                ...mapKeys(["uid", "nickName", "balance"], User),
                activeType: "boom",
                loading: false,
                finished: false,
                list: [],
                tthb: TTHB,
                user: User
            };
        },
        methods: {
            ...mapKeys(["enterRoom", "getRooms"], TTHB),
            onTab(game, index) {
                this.activeType = game.type;
                this.tthb.playType = game.playType;
                sessionStorage.setItem("playType", this.tthb.playType);
                if (game.playType != 4) {
                    this.onLoad();
                }
            },
            onClick() {
                this.enterRoom().then(() => {
                    this.$router.push('/tthb/room')
                });
            },
            // 加载房间
            onLoad() {
                this.loading = true;
                this.list = [];
                // 经确认房间数一般不会超过20，50很保险了，不翻页
                this.getRooms({page: 1, pageSize: 50}).then(({data}) => {
                    this.loading = false;
                    this.list = data.rows;
                })
            },
            getPlayType(counter) {
                if (TTHB.playRooms.length) {
                    this.activeType = TTHB.playRooms.find(item => item.playType == TTHB.playType).type;
                    this.onLoad()
                } else {
                    const timer = setTimeout(() => {
                        counter++
                        if (counter < 10) {
                            this.getPlayType(counter)
                            clearTimeout(timer)
                        }
                    }, 300)
                }
            }
        },
        mounted() {
            this.getPlayType(0)
        },
    };
</script>

<style scoped lang="scss">
    @import "../style/colors";

    .content {
        width: 1200px;
        height: 100%;
        margin: 0 auto;
        overflow: hidden;
        padding-top: 100px;
        min-height: 710px;

        &:before {
            content: "";
            display: block;
            width: 100%;
            height: 100px;
            background: url("../assets/img/pc/redbag/top-logo.png") no-repeat center center;
            background-size: contain;
            position: absolute;
            top: 0;
            left: 0;
        }

        .info {
            width: 100%;
            height: 100%;
            background: $white;
            border: 1px solid $theme;
            border-top-width: 0;

            .left {
                width: 248px;
                height: 100%;
                border-top: 1px solid $theme;
                border-right: 1px solid $theme;
                float: left;
                padding: 0 19px;

                .user {
                    width: 100%;
                    height: 370px;
                    background: url("../assets/img/pc/redbag/bg-information.png") no-repeat center top;
                    background-size: contain;
                    padding: 96px 0 50px;
                    text-align: center;

                    .imgbox {
                        display: block;
                        width: 116px;
                        height: 116px;
                        border: 1px solid $theme;
                        background: #e73327;
                        margin: 0 auto;
                        border-radius: 8px;
                        font-size: 1.53em;
                    }

                    h3 {
                        font-size: 20px;
                        line-height: 1em;
                        margin: 10px 0 5px;
                    }

                    p {
                        height: 63px;
                        font-size: 20px;

                        label {
                            display: block;
                            width: 100%;
                            height: 55px;
                            line-height: 55px;
                            background: url("../assets/img/pc/redbag/frame-gold.png") no-repeat center center;
                            background-size: contain;
                            margin: 0 auto;
                            text-align: left;
                            padding-left: 80px;
                            box-sizing: border-box;
                        }
                    }
                }

                .plays {
                    margin-top: 10px;
                    overflow-y: auto;

                    li {
                        width: 100%;
                        height: 56px;
                        margin-bottom: 20px;
                        font-size: 18px;
                        text-align: left;
                        line-height: 56px;
                        padding-left: 75px;
                        cursor: pointer;
                        position: relative;

                        span {
                            position: absolute;
                            z-index: 1;
                        }

                        &:before {
                            content: '';
                            position: absolute;
                            width: 100%;
                            height: 100%;
                            top: 0;
                            left: 0;
                        }

                        &.boom {
                            background: url("../assets/img/pc/redbag/tab-boom-normal.png") no-repeat left center;
                            background-size: auto 100%;
                        }

                        &.boom.active {
                            &:before {
                                background: url("../assets/img/pc/redbag/tab-boom-selected.png") no-repeat left center;
                                background-size: auto 100%;
                            }
                        }

                        &.ban {
                            background: url("../assets/img/pc/redbag/tab-jq-normal.png") no-repeat left center;
                            background-size: auto 100%;
                        }

                        &.ban.active {
                            &:before {
                                background: url("../assets/img/pc/redbag/tab-jq-selected.png") no-repeat left center;
                                background-size: auto 100%;
                            }
                        }

                        &.cow {
                            background: url("../assets/img/pc/redbag/tab-cow-normal.png") no-repeat left center;
                            background-size: auto 100%;
                        }

                        &.cow.active {
                            &:before {
                                background: url("../assets/img/pc/redbag/tab-cow-selected.png") no-repeat left center;
                                background-size: auto 100%;
                            }
                        }

                        &.mine {
                            background: url("../assets/img/pc/redbag/tab-mine-normal.png") no-repeat left center;
                            background-size: auto 100%;
                        }

                        &.mine.active {
                            &:before {
                                background: url("../assets/img/pc/redbag/tab-mine-selected.png") no-repeat left center;
                                background-size: auto 100%;
                            }
                        }

                        &.promote {
                            background: url("../assets/img/pc/redbag/tab-promote-normal.png") no-repeat left center;
                            background-size: auto 100%;
                        }

                        &.promote.active {
                            &:before {
                                background: url("../assets/img/pc/redbag/tab-promote-selected.png") no-repeat left center;
                                background-size: auto 100%;
                            }
                        }
                    }
                }
            }

            .right {
                float: right;
                width: 950px;
                height: 100%;
                padding: 30px;
                background: url("../assets/img/pc/redbag/img-bg-min.png") no-repeat center center $background;
                overflow: auto;
                position: relative;
                border-top: 1px solid $theme;

                .room-container {
                    overflow: auto;
                    position: relative;
                    padding-bottom: 120px;
                    min-height: 100%;

                    .room-card {
                        float: left;
                        margin-bottom: 30px;
                        margin-right: 30px;

                        &:nth-child(4n) {
                            margin-right: 0;
                        }
                    }

                    .enter {
                        display: block;
                        width: 228px;
                        height: 98px;
                        background: url("../assets/img/pc/redbag/btn-enter.png") no-repeat center center;
                        outline: none;
                        border: none;
                        cursor: pointer;
                        position: absolute;
                        bottom: 10px;
                        left: 50%;
                        margin-left: -114px;
                    }
                }
            }
        }
    }
</style>