<template>
    <div class="sellerWrap" v-el:seller>
        <div class="sellerContent">
            <div class="overView">
                <h1 class='title'>{{seller.name}}</h1>
                <div class="desc border1px">
                    <Star :size='36' :score='seller.score'></Star>
                    <span class='text'>({{seller.ratingCount}})</span>
                    <span class='text'>月售{{seller.sellCount}}单</span>
                </div>
                <ul class='remark'>
                    <li class='block'>
                        <h2>起送价</h2>
                        <div class="content">
                            <span class='stress'>{{seller.minPrice}}</span>元
                        </div>
                    </li>
                    <li class='block'>
                        <h2>商家配送</h2>
                        <div class="content">
                            <span class='stress'>{{seller.deliveryPrice}}</span>元
                        </div>
                    </li>
                    <li class='block'>
                        <h2>平均配送时间</h2>
                        <div class="content">
                            <span class='stress'>{{seller.deliveryTime}}</span>分钟
                         </div>
                    </li>
                </ul>
                <div class="favorite" @click='toggleFavorite'>
                    <span class='icon-favorite' :class="{'active':favorite}" ></span>
                    <span class='text'>{{favoriteText}}</span>
                </div>
            </div>
            <Split></Split>
            <div class="bulletin">
                <h1 class='title'>公告与活动</h1>
                <div class="contentWrap">
                    <p class='content'>{{seller.bulletin}}</p>
                </div>
                <ul v-if='seller.supports' class='supports'>
                    <li class='supportsItem border1px' v-for='item in seller.supports'>
                        <span class='icon' :class='classMap[seller.supports[$index].type]'></span>
                        <span class='text'>{{seller.supports[$index].description}}</span>
                    </li>
                </ul>
            </div>
            <Split></Split>
            <div class="pics">
                <h2 class='title'>商家实景</h2>
                <div class="picWrap" v-el:pic-wrap>
                    <ul class='picList' v-el:pic-list>
                        <li class='picItem' v-for='pic in seller.pics'>
                            <img :src="pic" width='120' height='90'>
                        </li>
                    </ul>
                </div>
            </div>
            <Split></Split>
            <div class="info">
                <h2 class='title'>商家信息</h2>
                <ul>
                    <li class='infoItem' v-for='info in seller.infos'>{{info}}</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import BScroll from 'better-scroll';
    import Star from 'components/star/star';
    import Split from 'components/split/split';
    import {saveToLocal, loadFromLocal} from 'common/js/store';

    export default {
        props: {
            seller: {
                type: Object
            }
        },
        components: {
            Star,
            Split
        },
        data() {
            return {
                favorite: (() => {
                    return loadFromLocal(this.seller.id, 'favorite', false);
                })()
            };
        },
        computed: {
            favoriteText() {
                return this.favorite ? '已收藏' : '收藏';
            }
        },
        watch: {
            'seller'() {
                this._initScroll();
                this._initPics();
            }
        },
        ready() {
            this._initScroll();
            this._initPics();
        },
        methods: {
            _initScroll() {
                if (!this.scroll) {
                    this.scroll = new BScroll(this.$els.seller, {
                        click: true
                    });
                } else {
                    this.scroll.refresh();
                }
            },
            _initPics() {
                if (this.seller.pics) {
                    let picWidth = 120;
                    let marginRight = 6;
                    let width = (picWidth + marginRight) * this.seller.pics.length - marginRight;
                    this.$els.picList.style.width = width + 'px';
                    this.$nextTick(() => {
                        if (!this.picScroll) {
                            this.picScroll = new BScroll(this.$els.picWrap, {
                                scrollX: true,
                                eventPassthrough: 'vertical'
                            });
                        } else {
                            this.picScroll.refresh();
                        }
                    });
                }
            },
            toggleFavorite(event) {
                if (!event._constructed) {
                    return;
                }
                this.favorite = !this.favorite;
                saveToLocal(this.seller.id, 'favorite', this.favorite);
            }
        },
        created() {
            this.classMap = ['decrease', 'discount', 'guarantee', 'invoice', 'special'];
        }
    };
</script>
<style lang="stylus" rel="stylesheet/stylus">
    @import '../../common/stylus/mixin'
    .sellerWrap
        position:absolute
        top:174px
        bottom:0
        left:0
        width:100%
        overflow:hidden
        .overView
            position:relative
            padding:18px
            .title
                margin-bottom:8px
                line-height:14px
                color:rgb(7,17,27)
                font-size:14px
            .desc
                padding-bottom:18px
                border1px(rgba(7,17,27,0.1))
                font-size:0
                .star
                    display:inline-block
                    margin-right:8px
                    vertical-align:top
                .text
                    margin-right:12px
                    line-height:18px
                    display:inline-block
                    vertical-align:top
                    font-size:10px
                    color:rgb(77,85,93)
            .remark
                display:flex
                padding-top:18px
                .block
                    flex:1
                    text-align:center
                    border-right:1px solid rgba(7,17,27,0.1)
                    &:last-child
                        border:none
                    h2
                        margin-bottom:4px
                        line-height:10px
                        font-size:10px
                        color:rgb(147,153,159)
                    .content
                        line-height:24px
                        font-size:10px
                        color:rgb(7,17,27)
                        .stress
                            font-size: 24px
            .favorite
                position:absolute
                width:40px
                right:18px
                top:18px
                text-align:center
                .icon-favorite
                    display:block
                    margin-bottom:4px
                    line-height:24px
                    font-size:24px
                    color:#d4d6d9
                    &.active
                        color:rgb(240,20,20)
                .text
                    line-height:10px
                    font-size:10px
                    color:rgb(77,85,93)
        .bulletin
            padding:18px 18px 0 18px
            .title
                margin-bottom:8px
                line-height:14px
                color:rgb(7,17,27)
                font-size:14px
            .contentWrap
                padding:0 12px 16px 12px
                border1px(rgba(7,17,27,0.1))
                .content
                    line-height:24px
                    font-size:12px
                    color:rgb(240,20,20)
            .supports
                .supportsItem
                    padding:16px 12px
                    border1px(rgba(7,17,27,0.1))
                    font-size:0
                    &:last-child
                        borderNone()
                .icon
                    display:inline-block
                    width:16px
                    height:16px
                    vertical-align:top
                    margin-right:6px
                    background-size:16px 16px
                    background-repeat:no-repeat
                    &.decrease
                        bgImg('decrease_4')
                    &.discount
                        bgImg('discount_4')
                    &.guarantee
                        bgImg('guarantee_4')
                    &.invoice
                        bgImg('invoice_4')
                    &.special
                        bgImg('special_4')
                .text
                    line-height:16px
                    font-size:14px
                    color:rgb(7,17,27)
        .pics
            padding:18px
            .title
                margin-bottom:12px
                line-height:14px
                color:rgb(7,17,27)
                font-size: 14px
            .picWrap
                width:100%
                overflow:hidden
                white-space:nowrap
                .picList
                    font-size:0
                    .picItem
                        display:inline-block
                        margin-right:6px
                        width:120px
                        height:90px
                        &:last-child
                            margin:0
        .info
            padding:18px 18px 0 18px
            .title
                padding-bottom:12px
                line-height:14px
                font-size:14px
                color:rgb(7,17,27)
                border1px(rgba(7,17,27,0.1))
            .infoItem
                padding:16px 12px
                line-height:16px
                border1px(rgba(7,17,27,0.1))
                font-size:12px
                &:last-child
                    borderNone()
</style>
