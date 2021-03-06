<template>
    <div class="shopcart">
        <div class="content" @click='toggleList'>
            <div class="contentLeft">
                <div class="logoWrap">
                    <div class="logo" :class="{'highLight':totalCount>0}">
                        <i class='icon-shopping_cart' :class="{'highLight':totalCount>0}"></i>
                    </div>
                    <div class="num" v-show='totalCount>0'>{{totalCount}}</div>
                </div>
                <div class="price" :class="{'highLight':totalCount>0}">￥{{totalPrice}}</div>
                <div class="desc">另需要配送费￥{{deliveryPrice}}元</div>
            </div>
            <div class="contentRight" @click.stop.prevent='pay'>
                <div class="pay" :class='payClass'>
                    {{payDesc}}
                </div>
            </div>
        </div>
        <div class="ballContainer">
            <div class='ball' transition='drop' v-for='ball in balls' v-show='ball.show'>
                <div class="inner innerHook"></div>
            </div>
        </div>
        <div class="shopCartList" v-show='listShow' transition='fold'>
            <div class="listHeader">
                <h1 class='title'>购物车</h1>
                <span class='empty' @click='empty'>清空购物车</span>
            </div>
            <div class="listContent" v-el:list-content>
                <ul>
                    <li class='food' v-for='food in selectFoods'>
                        <span class='name'>{{food.name}}</span>
                        <div class="price">
                            <span>￥{{food.price*food.count}}</span>
                        </div>
                        <div class="cartControlWrap">
                            <cartcontrol :food='food'></cartcontrol>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    <!-- 遮罩层 -->
    <div class="listMask" v-show='listShow' transition='fade' @click='closeMask'>

    </div>
</template>

<script type="text/ecmascript-6">
    import BScroll from 'better-scroll';
    import cartcontrol from 'components/cartcontrol/cartcontrol';
    export default {
        props: {
            selectFoods: {
                    type: Array,
                    default() {
                        return [];
                    }
            },
            deliveryPrice: {
                type: Number,
                default: 0
            },
            minPrice: {
                type: Number,
                default: 0
            }
        },
        data() {
            return {
                balls: [
                    {
                        show: false
                    },
                    {
                        show: false
                    },
                    {
                        show: false
                    },
                    {
                        show: false
                    },
                    {
                        show: false
                    }
                ],
                dropBalls: [],
                fold: true
            };
        },
        methods: {
            drop(el) {
                for (let i = 0; i < this.balls.length; i++) {
                    let ball = this.balls[i];
                    if (!ball.show) {
                        ball.show = true;
                        ball.el = el;
                        this.dropBalls.push(ball);
                        return;
                    }
                }
            },
            toggleList() {
                if (!this.totalCount) {
                    return;
                }
                this.fold = !this.fold;
            },
            empty() {
                this.selectFoods.forEach((food) => {
                    food.count = 0;
                });
            },
            closeMask() {
                this.fold = true;
            },
            pay() {
                if (this.totalPrice < this.minPrice) {
                    return;
                } else {
                    window.alert(`支付金额${this.totalPrice}元`);
                };
            }
        },
        transitions: {
            drop: {
                beforeEnter(el) {
                    let len = this.balls.length;
                    while (len--) {
                        let ball = this.balls[len];
                        if (ball.show) {
                            let rect = ball.el.getBoundingClientRect();
                            let x = rect.left - 32;
                            let y = -(window.innerHeight - rect.top - 22);
                            el.style.display = '';
                            el.style.webkitTransform = `translate3D(0,${y}px,0)`;
                            el.style.transform = `translate3D(0,${y}px,0)`;
                            let inner = el.getElementsByClassName('innerHook')[0];
                            inner.style.webkitTransform = `translate3D(${x}px,0,0)`;
                            inner.style.transform = `translate3D(${x}px,0,0)`;
                        }
                    }
                },
                enter(el) {
                    /* eslint-disable no-unused-vars */
                    let rf = el.offsetHeight;
                    this.$nextTick(() => {
                        el.style.webkitTransform = 'translate3D(0,0,0)';
                        el.style.transform = 'translate3D(0,0,0)';
                        let inner = el.getElementsByClassName('innerHook')[0];
                        inner.style.webkitTransform = 'translate3D(0,0,0)';
                        inner.style.transform = 'translate3D(0,0,0)';
                    });
                },
                afterEnter(el) {
                    let ball = this.dropBalls.shift();
                    if (ball) {
                        ball.show = false;
                        el.style.display = 'none';
                    }
                }
            }
        },
        computed: {
            totalPrice() {
                let total = 0;
                this.selectFoods.forEach((food) => {
                    total += food.price * food.count;
                });
                return total;
            },
            totalCount() {
                let count = 0;
                this.selectFoods.forEach((food) => {
                    count += food.count;
                });
                return count;
            },
            payDesc() {
                if (this.totaPrice === 0) {
                    return `￥${this.minPrice}起送`;
                } else if (this.totalPrice < this.minPrice) {
                    let diff = this.minPrice - this.totalPrice;
                    return `还差￥${diff}元起送`;
                } else {
                    return '去结算';
                }
            },
            payClass() {
                if (this.totalPrice < this.minPrice) {
                    return 'noPay';
                } else {
                    return 'goPay';
                }
            },
            listShow() {
                if (!this.totalCount) {
                    this.fold = true;
                    return false;
                }
                let show = !this.fold;
                if (show) {
                    this.$nextTick(() => {
                        if (!this.scroll) {
                            this.scroll = new BScroll(this.$els.listContent, {
                                    click: true
                                });
                        } else {
                            this.scroll.refresh();
                        }
                    });
                }
                return show;
            }
        },
        components: {
            cartcontrol
        }
    };
</script>
<style lang="stylus" rel="stylesheet/stylus">
    @import "../../common/stylus/mixin"
    .shopcart
        position:fixed
        left:0
        bottom:0
        z-index:50
        width:100%
        height:48px
        .content
            display:flex
            background:#141d27
            color:rgba(255,255,255,0.4)
            font-size:0
            .contentLeft
                flex:1
                .logoWrap
                    display:inline-block
                    vertical-align:top
                    position:relative
                    top:-10px
                    margin:0 12px
                    padding:6px
                    width:56px
                    height:56px
                    box-sizing:border-box
                    border-radius:50%
                    background:#141d27
                    .logo
                        width:100%
                        height:100%
                        border-radius:50%
                        background:rgba(255,255,255,0.2)
                        text-align:center
                        &.highLight
                            background:rgb(0,160,220)
                        .icon-shopping_cart
                            line-height:44px
                            font-size:24px
                            color:#80858a
                            &.highLight
                                color:#fff
                .num
                    position:absolute
                    top:0
                    right:0
                    width:24px
                    height:16px
                    line-height:16px
                    border-radius:16px
                    font-size:9px
                    text-align:center
                    color:#fff
                    background:rgb(240,20,20)
                    box-shadow:0 4px 8px 0 rgba(0,0,0,0.4)
                .price
                    display:inline-block
                    vertical-align:top
                    margin-top:12px
                    line-height:24px
                    padding-right:12px
                    box-sizing:border-box
                    font-size:16px
                    font-weight:700
                    border-right:1px solid rgba(255,255,255,0.1)
                    &.highLight
                        color:#fff

                .desc
                    display:inline-block
                    vertical-align:top
                    margin:12px 0 0 12px
                    line-height:24px
                    font-size:10px
            .contentRight
                flex:0 0 105px
                width:105px
                .pay
                    height:48px
                    line-height:48px
                    font-size:12px
                    font-weight:700
                    text-align:center
                    &.noPay
                        background:#2b333b
                    &.goPay
                        background:#00b43c
                        color:#fff
        .ballContainer
            .ball
                position:fixed
                left:32px
                bottom:22px
                z-index:100
                &.drop-transition
                    transition:all 0.4s cubic-bezier(0.49,-0.29,0.75,0.41);
                    .inner
                        width:16px
                        height:16px
                        border-radius:50%
                        background:rgb(0,160,220)
                        transition:all 0.4s linear
        .shopCartList
            position:absolute
            left:0
            top:0
            z-index:-1
            width:100%
            &.fold-transition
                transition:all 0.5s
                transform:translate3d(0, -100%, 0)
            &.fold-enter, &.fold-leave
                transform:translate3d(0, 0, 0)
            .listHeader
                height:40px
                line-height:40px
                padding:0 18px
                background:#f3f5f7
                border-bottom:1px solid rgba(7,17,27,0.1)
                .title
                    float:left
                    font-size:14px
                    color:rgb(7,17,27)
                .empty
                    float:right
                    font-size:12px
                    color:rgb(0,160,220)
            .listContent
                padding:0 18px
                max-height:217px
                overflow:hidden
                background:#fff
                .food
                    position:relative
                    padding:12px 0
                    box-sizing:border-box
                    border1px(rgba(7,17,27,0.1))
                    .name
                        line-height:24px
                        font-size:14px
                        color:rgb(7,17,27)
                    .price
                        position:absolute
                        right:90px
                        bottom:12px
                        line-height:24px
                        font-size:14px
                        font-weight:700
                        color:rgb(240,20,20)
                    .cartControlWrap
                        position:absolute
                        right:0
                        bottom:6px
    .listMask
        position:fixed
        top:0
        left:0
        width:100%
        height:100%
        z-index:40
        transition:all 0.4s
        backgrop-filter:blur(10px)
        &.fade-transition
            opacity:1
            background:rgba(7,17,27,0.6)
        &.fade-enter, &.fade-leave
            opacity:0
            background:rgba(7,17,27,0)

</style>
