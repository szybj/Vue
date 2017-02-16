<template>
    <div class="food" v-show='showFlag' transition='move' v-el:food>
        <div class="foodContent">
            <div class="imageHeader">
                <img :src="food.image">
                <div class="back" @click='back'>
                    <i class='icon-arrow_lift'></i>
                </div>
            </div>
            <div class="content">
                <h1 class='title'>
                    {{food.name}}
                </h1>
                <div class="detail">
                    <span class='sellCount'>
                        月售{{food.sellCount}}份
                    </span>
                    <span class='rating'>
                        好评率{{food.rating}}%
                    </span>
                </div>
                <div class="price">
                    <span class='now'>
                        ￥{{food.price}}
                    </span>
                    <span class='old' v-show='food.oldPrice'>
                        ￥{{food.oldPrice}}
                    </span>
                </div>
                <div class="cartControlWrap">
                    <cartcontrol :food='food'></cartcontrol>
                </div>
                <div @click.stop.prevent="addFirst" class="buy" v-show = "!food.count || food.count===0" transition="fade">加入购物车</div>
            </div>
            <Split v-show='food.info'></Split>
            <div class="info" v-show='food.info'>
                <h2 class='title'>商品介绍</h2>
                <p class='text'>{{food.info}}</p>
            </div>
            <Split></Split>
            <div class="rating">
                <h2 class='title'>商品评价</h2>
                <Ratingselect :select-type='selectType' :only-content='onlyContent' :desc='desc' :ratings='food.ratings'></Ratingselect>
                <div class="ratingsWrap">
                    <ul v-show='food.ratings && food.ratings.length'>
                        <li v-show='needShow(rating.rateType, rating.text)' v-for='rating in food.ratings' class='ratingItem'>
                            <div class="user">
                                <span class='name'>{{rating.username}}</span>
                                <img :src="rating.avatar" class='avatar' width='12' height='12'>
                            </div>
                            <div class="time">
                                {{rating.rateTime | formatDate  }}
                            </div>
                            <p class='text'>
                                <span :class="{'icon-thumb_up':rating.rateType===0,'icon-thumb_down':rating.rateType===1}"></span>{{rating.text}}
                            </p>
                        </li>
                    </ul>
                    <div class="noRating" v-show='!food.ratings || !food.ratings.length'>
                        没有评论
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import BScroll from 'better-scroll';
    import cartcontrol from 'components/cartcontrol/cartcontrol';
    import Split from 'components/split/split';
    import Ratingselect from 'components/ratingselect/ratingselect';
    import Vue from 'vue';
    import {formatDate} from 'common/js/date';

    const all = 2;

    export default {
        props: {
            food: {
                type: Object
            }
        },
        data() {
            return {
                showFlag: false,
                selectType: all,
                onlyContent: true,
                desc: {
                    all: '全部',
                    positive: '推荐',
                    negative: '吐槽'
                }
            };
        },
        methods: {
            show() {
                this.showFlag = true;
                this.selectType = all;
                this.onlyContent = false;
                this.$nextTick(() => {
                    if (!this.scroll) {
                        this.scroll = new BScroll(this.$els.food, {
                            click: true
                        });
                    } else {
                        this.scroll.refresh();
                    }
                });
            },
            back() {
                this.showFlag = false;
            },
            addFirst(event) {
                if (!event._constructed) {
                    return;
                }
                Vue.set(this.food, 'count', 1);
                this.$dispatch('cart.add', event.target);
            },
            needShow(type, text) {
                if (this.onlyContent && !text) {
                    return false;
                }
                if (this.selectType === all) {
                    return true;
                } else {
                    return type === this.selectType;
                }
            }
        },
        events: {
            'ratingtype'(type) {
                this.selectType = type;
                this.$nextTick(() => {
                    this.scroll.refresh();
                });
            },
            'content.toggle'(onlyContent) {
                this.onlyContent = onlyContent;
                this.$nextTick(() => {
                    this.scroll.refresh();
                });
            }
        },
        components: {
            cartcontrol,
            Split,
            Ratingselect
        },
        filters: {
            formatDate(time) {
                let date = new Date(time);
                return formatDate(date, 'yyyy-MM-dd hh:mm');
            }
        }
    };
</script>
<style lang="stylus" rel="stylesheet/stylus">
    @import '../../common/stylus/mixin'
    .food
        position:fixed
        left:0
        top:0
        bottom:48px
        width:100%
        background:#fff
        &.move-transition
            transition:all 0.4s
            transform:translate3d(0,0,0)
        &.move-enter, &.move-leave
            transform:translate3d(100%,0,0)
        .imageHeader
            position:relative
            width:100%
            height:0
            padding-top:100%
            img
                position:absolute
                top:0
                left:0
                width:100
                height:100%
            .back
                position:absolute
                top:10px
                left:10px
                border-radius:20px
                background:rgba(7,17,27,0.5)
                box-shadow:4px 4px 8px 0 rgba(0,0,0,0.4)
                .icon-arrow_lift
                    display:block
                    padding:10px
                    font-size:20px
                    color:#fff
        .content
            position: relative
            padding:18px
            .title
                line-height:14px
                font-size:14px
                margin-bottom:8px
                font-weight:700
                color:rgb(7,17,27)
            .detail
                margin-bottom:18px
                line-height:10px
                font-size:0
                .sellCount, .rating
                    font-size:10px
                    color:rgb(147,153,159)
                .sellCount
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
                right:12px
                bottom:12px
            .buy
                position:absolute
                right:18px
                bottom:18px
                z-index:10
                height:24px
                line-height:24px
                padding:0 12px
                box-sizing:border-box
                font-size:10px
                color:#fff
                border-radius:12px
                background:rgb(0,160,220)
                &.fade-transition
                    transition:all 0.1s
                    opacity:1
                &.fade-enter,&.fade-leave
                    opacity:0
        .info
            padding:18px
            .title
                line-height:14px
                margin-bottom:6px
                font-size:14px
                color:rgb(7,17,27)
            .text
                line-height:24px
                padding:0 18px
                font-size:12px
                color:rgb(77,85,93)
        .rating
            padding-top:18px
            .title
                line-height:14px
                margin-left:18px
                font-size:14px
                color:rgb(7,17,27)
            .ratingsWrap
                padding:0 18px
                .ratingItem
                    position:relative
                    padding:16px 0
                    border1px(rgba(7,17,27,0.1))
                    &.last-child
                        borderNone()
                    .user
                        position:absolute
                        right:0
                        top:16px
                        line-height:12px
                        font-size:0
                        .name
                            display:inline-block
                            margin-right:14px
                            vertical-align:top
                            font-size:10px
                            color:rgb(147,153,159)
                        .avatar
                            border-radius:50%
                    .time
                        margin-bottom:6px
                        line-height:12px
                        font-size:10px
                        color:rgb(147,153,159)
                    .text
                        line-height:16px
                        font-size:12px
                        color:rgb(7,17,27)
                        .icon-thumb_up, .icon-thumb_down
                            margin-right:4px
                            line-height:16px
                        .icon-thumb_up
                            color:rgb(0,160,220)
                        .icon-thumb_down
                            color:rgb(147,153,159)
                .noRating
                    padding:16px 0
                    font-size:12px
                    color:rgb(147,153,159 )

</style>
