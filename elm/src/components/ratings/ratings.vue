<template>
    <div class="ratings" v-el:ratings>
        <div class="ratingsContent">
            <div class="overView">
                <div class="overViewLeft">
                    <h2 class='score'>{{seller.score}}</h2>
                    <div class="title">综合评分</div>
                    <div class="rank">高于周边商家{{seller.rankRate}}%</div>
                </div>
                <div class="overViewRight">
                    <div class="scoreWrap">
                        <span class='title'>服务态度</span>
                        <Star :size='36' :score='seller.serviceScore'></Star>
                        <span class='score'>{{seller.serviceScore}}</span>
                    </div>
                    <div class="scoreWrap">
                        <span class='title'>商品评分</span>
                        <Star :size='36' :score='seller.foodScore'></Star>
                        <span class='score'>{{seller.foodScore}}</span>
                    </div>
                    <div class="deliveryWrap">
                        <span class='title'>送达时间</span>
                        <span class='delivery'>{{seller.deliveryTime}}分钟</span>
                    </div>
                </div>
            </div>
            <Split></Split>
            <Ratingselect :select-type='selectType' :only-content='onlyContent' :desc='desc' :ratings='ratings' ></Ratingselect>
            <div class="ratingWrap">
                <ul>
                    <li v-for='rating in ratings' v-show='needShow(rating.rateType, rating.text)' class='ratingItem'>
                        <div class="avatar">
                            <img width='28' height='28' :src="rating.avatar">
                        </div>
                        <div class="content">
                            <h1 class='name'>{{rating.username}}</h1>
                            <div class="starWrap">
                                <Star :size='24' :score='rating.score'></Star>
                                <span class='delivery' v-show='rating.deliveryTime'>{{rating.deliveryTime}}分钟</span>
                            </div>
                            <p class='text'>{{rating.text}}</p>
                            <div class="recommend" v-show='rating.recommend && rating.recommend.length'>
                                <span class='icon-thumb_up'></span>
                                <span v-for='item in rating.recommend' class='item'>{{item}}</span>
                            </div>
                            <div class="time">
                                {{rating.rateTime | formatDate  }}
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import BScroll from 'better-scroll';
    import Star from 'components/star/star';
    import Split from 'components/split/split';
    import Ratingselect from 'components/ratingselect/ratingselect';
    import {formatDate} from 'common/js/date';
    // const positive = 0;
    // const negative = 1;
    const all = 2;
    const ERR_OK = 0;
    export default {
        props: {
            seller: {
                type: Object
            }
        },
        data() {
            return {
                ratings: [],
                selectType: all,
                onlyContent: true
            };
        },
        created() {
                this.$http.get('/api/ratings').then((response) => {
                response = response.body;
            if (response.errno === ERR_OK) {
                    this.ratings = response.data;
                    this.$nextTick(() => {
                        // if (!this.scroll) {
                            this.scroll = new BScroll(this.$els.ratings, {
                                click: true
                            });
                        // } else {
                        //     this.scroll.refresh();
                        // }
                    });
                }
            });
        },
        components: {
            Star,
            Split,
            Ratingselect
        },
        filters: {
            formatDate(time) {
                let date = new Date(time);
                return formatDate(date, 'yyyy-MM-dd hh:mm');
            }
        },
        methods: {
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
        }
    };
</script>
<style lang="stylus" rel="stylesheet/stylus">
    @import '../../common/stylus/mixin'
    .ratings
        position:absolute
        top:174px
        bottom:0
        left:0
        width:100%
        overflow:hidden
        .overView
            display:flex
            padding:18px 0
            .overViewLeft
                flex:0 0 137px
                padding:6px 0
                width:137px
                border-right:1px solid rgba(7,17,27,0.1)
                text-align:center
                @media screen and (max-width:360px)
                    flex:0 0 120px
                    width:120px
                .score
                    margin-bottom:6px
                    line-height:28px
                    font-size:24px
                    color:rgb(255,153,0)
                .title
                    margin-bottom:8px
                    line-height:12px
                    font-size:12px
                    color:rgb(7,17,27)
                .rank
                    line-height:10px
                    font-size:10px
                    color:rgb(147,153,159)
            .overViewRight
                flex:1
                padding:6px 0 6px 24px
                @media screen and (max-width:360px)
                    padding:6px 0 6px 14px
                .scoreWrap
                    margin-bottom:8px
                    line-height:18px
                    font-size；0
                    .title
                        display:inline-block
                        font-size:12px
                        line-height:18px
                        vertical-align:top
                        color:rgb(7,17,27)4
                    .star
                        display:inline-block
                        margin:0 12px
                        vertical-align:top
                        @media screen and (max-width:360px)
                            margin:0
                    .score
                        display:inline-block
                        vertical-align:top
                        font-size:12px
                        color:rgb(255,153,0)
                .deliveryWrap
                    font-size:0
                    .title
                        line-height:18px
                        font-size:12px
                        color:rgb(7,17,27)
                    .delivery
                        margin-left:12px
                        font-size:12px
                        color:rgb(147,153,159)
        .ratingWrap
            padding:0 18px
            .ratingItem
                display:flex
                padding:18px 0
                border1px(rgba(7,17,27,0.1))
                .avatar
                    flex:0 0 28px
                    width:28px
                    margin-right:12px
                    img
                        border-radius:50%
                .content
                    position:relative
                    flex:1
                    .name
                        margin-bottom:4px
                        line-height:12px
                        font-size:10px
                        color:rgb(7,17,27)
                    .starWrap
                        margin-bottom:6px
                        font-size:0
                        .star
                            display:inline-block
                            margin-right:6px
                            vertical-align:top
                        .delivery
                            display:inline-block
                            vertical-align:top
                            line-height:12px
                            font-size:10px
                            color:rgb(147,153,159)
                    .text
                        margin-bottom:8px
                        line-height:18px
                        color:rgb(7,17,27)
                        font-size:12px
                    .recommend
                        line-height:16px
                        font-size:0
                        .icon-thumb_up, .item
                            display:inline-block
                            margin:0 8px 4px 0
                            font-size:9px
                        .icon-thumb_up
                            color:rgb(0,160,220)
                        .item
                            padding:0 6px
                            border:1px solid rgba(7,17,27,0.1)
                            color:rgb(147,153,159)
                            border-radius:2px
                            background:#ffff
                    .time
                        position:absolute
                        top:0
                        right:0
                        line-height:12px
                        font-size:10px
                        color:rgb(147,153,159)
</style>
