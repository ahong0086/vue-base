<template>
    <div id="app">
        <router-view/>
        <loading/>
    </div>
</template>

<script>
    import Loading from "./components/Loading";
    import "./style/reset.scss";
    import "./style/style.scss";

    export default {
        name: "app",
        created() {
        },
        components: {Loading},
    };
</script>

<style lang="scss">
    @import url("./style/flex.css");
    @import "style/colors";

    #app {
        font-family: "Avenir", Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: $white;
        width: 100%;
        height: 100%;
        min-height: 740px;
        overflow: auto;
        min-width: 1200px;

        .num-win {
            color: $win;
        }

        .num-lose {
            color: $lose;
        }

        .sys-msg {
            font-size: 12px;
            text-align: center;

            .txt {
                background: rgba(0, 0, 0, .05);
                padding: 0 10px;
                line-height: 18px;
                border-radius: 4px;
                color: #333333;
                display: inline-block;
                margin-top: 10px;
            }
        }


        .msg-blue {
            color: #528ded;
        }

        .msg-red {
            color: $win;
        }

        .msg-green {
            color: $lose
        }

        .icon-pin {
            color: #ab7351;

            &:after {
                content: '';
                display: inline-block;
                vertical-align: middle;
                width: 12px;
                height: 12px;
                background: url("./assets/img/pc/redbag/message-redbag.png") no-repeat center center;
                background-size: contain;
                margin-top: -2px;
            }
        }
    }

    .redenp {
        display: inline-block;
        background-image: url('./assets/img/pc/redbag/sprites.png');
        background-size: 19.48em 14.56em;
    }

    .redenp-head0 {
        width: 4.72em;
        height: 4.72em;
        background-position: -4.92em 0em;
    }

    .redenp-head1 {
        width: 4.72em;
        height: 4.72em;
        background-position: -9.84em -4.92em;
    }

    .redenp-head2 {
        width: 4.72em;
        height: 4.72em;
        background-position: 0em -4.92em;
    }

    .redenp-head3 {
        width: 4.72em;
        height: 4.72em;
        background-position: -4.92em -4.92em;
    }

    .redenp-head4 {
        width: 4.72em;
        height: 4.72em;
        background-position: -9.84em 0em;
    }

    .redenp-head5 {
        width: 4.72em;
        height: 4.72em;
        background-position: 0em 0em;
    }

    .redenp-head6 {
        width: 4.72em;
        height: 4.72em;
        background-position: 0em -9.84em;
    }

    .redenp-head7 {
        width: 4.72em;
        height: 4.72em;
        background-position: -4.92em -9.84em;
    }

    .redenp-head8 {
        width: 4.72em;
        height: 4.72em;
        background-position: -9.84em -9.84em;
    }

    .redenp-head9 {
        width: 4.72em;
        height: 4.72em;
        background-position: -14.76em 0em;
    }

    .redenp-head99 {
        width: 4.72em;
        height: 4.72em;
        background-position: -14.76em -4.92em;
    }

    .robot {
        position: relative;

        &:before {
            content: '';
            display: block;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: url("./assets/img/pc/redbag/robot.png") no-repeat center center;
            background-size: contain;
        }

        & > div {
            position: absolute;
            z-index: 3;
        }
    }

    #nav {
        padding: 30px;

        a {
            font-weight: bold;
            color: #2c3e50;

            &.router-link-exact-active {
                color: #42b983;
            }
        }
    }

    .el-tabs {
        .el-tabs__nav {
            width: 100%;

            .el-tabs__item {
                width: 50%;
                text-align: center;
                background: $white;
                border: none !important;
                font-size: 20px;
                height: 50px;
                line-height: 50px;
                background: url("./assets/img/pc/redbag/tab-selectd-record.png") no-repeat center center;
                color: $white;

                &.is-active {
                    background: #fff;
                    background-size: 100% 100%;
                    color: $theme;
                }
            }
        }
    }

    .el-message-box__wrapper {
        .el-message-box {
            background: url("./assets/img/pc/redbag/hop-m.png") no-repeat center top;
            background-size: 100% 100%;
            width: 630px;
            height: auto;
            border: 0;
            box-shadow: none;
            padding: 120px 80px 60px;

            .el-message-box__header {
                text-align: center;

                .el-message-box__title {
                    color: $theme;
                    font-size: 26px;
                }

                .el-message-box__headerbtn {
                    background: url("./assets/img/pc/redbag/hop-close.png") no-repeat center top;
                    background-size: contain;
                    width: 60px;
                    height: 140px;
                    top: -50px;
                    right: -68px;
                }
            }

            .el-message-box__content {
                font-size: 16px;
                color: #666666;
                text-align: center;
            }

            .el-message-box__btns {
                text-align: center;
                margin-top: 65px;

                button {
                    width: 160px;
                    height: 52px;
                    border-radius: 8px;
                    font-size: 22px;
                    color: $white;
                    background: #808080;
                    border: 0;

                    &:nth-child(2) {
                        margin-left: 70px;
                    }
                }

                .el-button--primary {
                    background: $theme;
                }
            }
        }
    }

    .van-dialog {
        width: 572px !important;
        background: linear-gradient(to bottom, #f99e81, #b02b26);
        border-radius: 8px !important;
        padding: 10px;

        .van-dialog__header {
            font-size: 26px;
            color: $theme;
            background: $white;
            border-top-left-radius: 8px;
            border-top-right-radius: 8px;
            padding: 50px 0;
        }

        .van-dialog__content {
            background: $white;
            padding-bottom: 50px;

            .van-dialog__message {
                padding: 0;
                font-size: 22px;
                line-height: 30px;
            }
        }

        .van-dialog__footer {
            padding-bottom: 50px;
            background: $white;
            border-bottom-left-radius: 8px;
            border-bottom-right-radius: 8px;
            justify-content: space-around;
            text-align: center;

            .van-button {
                width: 150px;
                height: 52px;
                font-size: 18px;
                flex: initial;
                border-radius: 8px;
                color: $white;
                cursor: pointer;
            }

            [class*=van-hairline]::after {
                border: 0;
            }

            .van-dialog__cancel {
                background: $deactive;
            }

            .van-dialog__confirm {
                background: $theme;
            }
        }

        [class*=van-hairline]::after {
            border: 0;
        }
    }

    .el-select-dropdown {
        .el-select-dropdown__item.selected {
            color: $theme;
        }
    }


</style>
