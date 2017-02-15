<template>
    <div class="goods">
        <div class="menuWrap" v-el:menu-wrap>
            <ul>
                <li v-for="item in goods" class='menuItem' :class="{'current':currentIndex===$index}" @click="selectMenu($index, $event)">
                    <span class='text' class='border1px'>
                        <span v-show='item.type>0' class='icon' :class='classMap[item.type]'></span>{{item.name}}</span>
                </li>
            </ul>
        </div>
        <div class="foodsWrap" v-el:food-wrap>
            <ul>
                <li v-for='item in goods' class='foodList foodListHook'>
                    <h1 class='title'>{{item.name}}</h1>
                    <ul>
                        <li @click='selectFood(food,$event)' v-for='food in item.foods' class='foodItem border1px'>
                            <div class="icon">
                                <img wdth='58' height='57' :src="food.icon">
                            </div>
                            <div class="content">
                                <h2 class='name'>{{food.name}}</h2>
                                <p class='desc'>{{food.description}}</p>
                                <div class="extra">
                                    <span class='count'>月售{{food.sellCount}}份</span><span>好评率{{food.rating}}%</span>
                                </div>
                                <div class="price">
                                    <span class='now'>￥{{food.price}}</span>
                                    <span class='old' v-show='food.oldPrice'>￥{{food.oldPrice}}</span>
                                </div>
                                <div class="cartControlWrap">
                                    <cartcontrol :food='food'></cartcontrol>
                                </div>
                            </div>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
        <Shopcart v-ref:shopcart :select-foods='selectFoods' :delivery-price='seller.deliveryPrice' :min-price='seller.minPrice'></Shopcart>
    </div>
    <food :food='selectedFood' v-ref:food></food>
</template>

<script type="text/ecmascript-6">
    import BScroll from 'better-scroll';
    import Shopcart from 'components/shopcart/shopcart';
    import Cartcontrol from 'components/cartcontrol/cartcontrol';
    import Food from 'components/food/food';
    const ERR_OK = 0;

    export default {
        props: {
            seller: {
                type: Object
            }
        },
        data() {
            return {
                goods: [],
                listHeight: [],
                scrollY: 0,
                selectedFood: {}
            };
        },
        computed: {
            currentIndex() {
                for (let i = 0; i < this.listHeight.length; i++) {
                    let height1 = this.listHeight[i];
                    let height2 = this.listHeight[i + 1];
                    if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
                        return i;
                    }
                }
                return 0;
            },
            selectFoods() {
                let foods = [];
                this.goods.forEach((good) => {
                    good.foods.forEach((food) => {
                        if (food.count) {
                            foods.push(food);
                        }
                    });
                });
                return foods;
            }
        },
        created() {
                this.classMap = ['decrease', 'discount', 'guarantee', 'invoice', 'special'];
            this.$http.get('/api/goods').then((response) => {
                response = response.body;
                if (response.errno === ERR_OK) {
                    this.goods = response.data;
                    // 调用原生DOM必须用这个函数
                    this.$nextTick(() => {
                        this._initScroll();
                        this._calculateHeiight();
                    });
                }
            });
        },
        components: {
            Shopcart,
            Cartcontrol,
            Food
        },
        methods: {
            selectMenu (index, event) {
                if (!event._constructed) {
                    return;
                };
                console.log(index);
                let foodList = this.$els.foodWrap.getElementsByClassName('foodListHook');
                let el = foodList[index];
                this.foodScroll.scrollToElement(el, 300);
            },
            _drop(target) {
                this.$nextTick(() => {
                    this.$refs.shopcart.drop(target);
                });
            },
            _initScroll() {
                this.menuScroll = new BScroll(this.$els.menuWrap, {
                    click: true
                });
                this.foodScroll = new BScroll(this.$els.foodWrap, {
                    click: true,
                    probeType: 3
                });
                this.foodScroll.on('scroll', (pos) => {
                    this.scrollY = Math.abs(Math.round(pos.y));
                });
            },
            _calculateHeiight() {
                let foodList = this.$els.foodWrap.getElementsByClassName('foodListHook');
                let height = 0;
                this.listHeight.push(height);
                for (let i = 0; i < foodList.length; i++) {
                    let item = foodList[i];
                    height += item.clientHeight;
                    this.listHeight.push(height);
                }
            },
            selectFood(food, event) {
                if (!event._constructed) {
                    return;
                }
                this.selectedFood = food;
                this.$refs.food.show();
            }
        },
        events: {
            'cart.add'(target) {
                this._drop(target);
            }
        }
    };
</script>
<style lang="stylus" rel="stylesheet/stylus">
    @import '../../common/stylus/mixin'
    .goods
        position:absolute
        display:flex
        top:174px
        bottom:46px
        width:100%
        overflow:hidden
        .menuWrap
            flex:0 0 80px
            width:80px
            background:#f3f5f7
            .menuItem
                display:table
                height:54px
                width:56px
                line-height:14px
                padding:0 12px
                text-align: center;
                &.current
                    position:relative
                    z-index:10
                    margin-top:-1px
                    background:#fff
                    font-weight:700
                    .text
                        borderNone()
                .icon
                    display:inline-block
                    vertical-align:top
                    width:12px
                    height:12px
                    margin-right:2px
                    background-size:12px 12px
                    background-repeat:no-repeat
                    &.decrease
                        bgImg('decrease_3')
                    &.discount
                        bgImg('discount_3')
                    &.guarantee
                        bgImg('guarantee_3')
                    &.invoice
                        bgImg('invoice_3')
                    &.special
                        bgImg('special_3')
                .text
                    display:table-cell
                    width:56px
                    vertical-align:middle
                    border1px(rgba(7,17,27,0.1))
                    font-size:12px
        .foodsWrap
            flex:1
            .title
                padding-left:14px
                height:26px
                line-height:26px
                border-left:2px solid #d9dde1
                font-size:12px
                background-color:#f3f5f7
                color:rgb(147,153,159)
            .foodItem
                display:flex
                margin:18px
                padding-bottom:18px
                border1px(rgba(7,17,27,0.1))
                &:last-child
                    borderNone()
                    margin-bottom:0
                .icon
                    flex:0 0 57px
                    margin-right:10px
                .content
                    flex:1
                    .name
                        margin:2px 0 8px 0
                        height:14px
                        line-height:14px
                        font-size:14px
                        color:rgb(7,17,27)
                    .desc, .extra
                        line-height:10px
                        font-size:10px
                        color:rgb(147,153,159)
                    .desc
                        margin-bottom:8px
                        line-height:12px
                    .extra
                        .count
                            margin-right:12px
                    .price
                        font-weight:700
                        line-height:24px
                        .now
                            margin-right:8px
                            font-size:14px
                            color:rgb(240,20,20)
                        .old
                            text-decoration:line-through
                            font-size:10px
                            color:rgb(147,153,159)
                    .cartControlWrap
                        position:absolute
                        right:0
                        bottom:12px

</style>
