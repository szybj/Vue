<template>
    <div class="header">
        <div class="contentWrap">
            <div class="avatar">
                <img width='64' height='64' :src="seller.avatar" alt="">
            </div>
            <div class="content">
                <div class="title">
                    <span class="brand"></span>
                    <span class='name'>{{seller.name}}</span>
                </div>
                <div class="description">
                    {{seller.description}}/{{seller.deliveryTime}}分钟送达
                </div>
                <div v-if='seller.supports' class="supports">
                    <span class='icon' :class='classMap[seller.supports[0].type]'></span>
                    <span class='text'>{{seller.supports[0].description}}</span>
                </div>
            </div>
            <div v-if='seller.supports' class="supportCount" @click='showDetail'>
                <span class='count' >{{seller.supports.length}}个</span>
                <i class='icon-keyboard_arrow_right'></i>
            </div>
        </div>
        <div class="bulletinWrap" v-on:click='showDetail'>
            <span class='bulletinTitle'></span>
            <span class='bulletinText'>{{seller.bulletin}}</span>
            <i class='icon-keyboard_arrow_right'></i>
        </div>
        <div class="background" >
            <img :src="seller.avatar" width='100%' height='100%'>
        </div>
        <!-- 浮层显示隐藏 -->
        <div v-show='detailShow' class="detail" transition='fade'>
            <div class="detailWrap clearfix">
                <div class="detailMain">
                    <h1 class='name'>{{seller.name}}</h1>
                    <div class="starWrap">
                        <Star :size='48' :score='seller.score'></Star>
                    </div>
                    <div class="title">
                        <div class="line"></div>
                        <div class="titleName">优惠信息</div>
                        <div class="line"></div>
                    </div>
                    <ul v-if='seller.supports' class='supports'>
                        <li class='supportsItem' v-for='item in seller.supports'>
                            <span class='icon' :class='classMap[seller.supports[$index].type]'></span>
                            <span class='text'>{{seller.supports[$index].description}}</span>
                        </li>
                    </ul>
                    <div class="title">
                        <div class="line"></div>
                        <div class="titleName">商家公告</div>
                        <div class="line"></div>
                    </div>
                    <div class="bulletin">
                        <p class='content'>{{seller.bulletin}}</p>
                    </div>
                </div>
            </div>
            <div class="detailClose" @click='closeDetaile'>
                <i class='icon-close'></i>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import Star from 'components/star/star';
    export default {
        props: {
            seller: {
                type: Object
            }
        },
        data() {
            return {
                detailShow: false
            };
        },
        methods: {
            showDetail() {
                this.detailShow = true;
            },
            closeDetaile() {
                this.detailShow = false;
            }
        },
        created() {
            this.classMap = ['decrease', 'discount', 'guarantee', 'invoice', 'special'];
        },
        components: {
            Star
        }

    };
</script>
<style lang="stylus" rel="stylesheet/stylus">
    @import '../../common/stylus/mixin'
    .header
        position:relative
        overflow:hidden
        color:#fff
        background:rgba(7,17,27,0.5)
        .contentWrap
            position:relative
            padding:24px 12px 18px 24px
            font-size:0
            .avatar
                vertical-align:top
                display:inline-block
                img
                    border-radius:5px
            .content
                display:inline-block
                margin-left:16px
                font-size:14px
                .title
                    margin:2px 0 8px 0
                    .brand
                        display:inline-block
                        vertical-align:top
                        width:30px
                        height:18px
                        bgImg('brand')
                        background-size:30px 18px
                        background-repeat:no-repeat
                    .name
                        margin-left:6px
                        font-size:16px
                        line-height:18px
                        font-weight:bold
                .description
                    margin-bottom:8px
                    font-size:12px
                    line-height:12px
                .supports
                    font-size:0
                    .icon
                        display:inline-block
                        vertical-align:top
                        width:12px
                        height:12px
                        margin-right:4px
                        background-size:12px 12px
                        background-repeat:no-repeat
                        &.decrease
                            bgImg('decrease_1')
                        &.discount
                            bgImg('discount_1')
                        &.guarantee
                            bgImg('guarantee_1')
                        &.invoice
                            bgImg('invoice_1')
                        &.special
                            bgImg('special_1')
                    .text
                        display:inline-block
                        font-size:12px
                        line-height:12px
            .supportCount
                position:absolute
                right:12px
                bottom:14px
                padding:0 9px
                height:24px
                line-height:24px
                border-radius:14px
                background:rgba(0,0,0,0.2)
                text-align:center
                font-size:0
                .count
                    line-height:24px
                    font-size:10px
                .icon-keyboard_arrow_right
                    vertical-align:top
                    line-height:24px
                    font-size:10px
        .bulletinWrap
            position:relative
            height:28px
            line-height:28px
            padding:0 26px 0 12px
            white-space:nowrap
            overflow:hidden
            text-overflow:ellipsis
            background:rgba(7,17,27,0.2)
            .bulletinTitle
                display:inline-block
                vertical-align:top
                width:22px
                height:12px
                margin-top:8px
                background-repeat:none
                background-size:22px 12px
                bgImg('bulletin')
            .bulletinText
                vertical-align:top
                font-size:12px
                margin:0 4px
            .icon-keyboard_arrow_right
                position:absolute
                right:12px
                top:8px
                font-size:10px
        .background
            position:absolute
            left:0
            top:0
            width:100%
            height:100%
            z-index:-1
            filter:blur(10px)
        .detail
            position:fixed
            width:100%
            height:100%
            overflow:auto
            top:0
            left:0
            z-index:100
            transition:all 0.5s
            backdrop-filter: brightness(1.5) blur(4px)
            &.fade-transition
                opacity:1
                background:rgba(7,17,27,0.8)
            &.fade-enter,&.fade-leave
                opacity:0
                background:rgba(7,17,27,0)
            .detailWrap
                width:100%
                min-height:100%
                .detailMain
                    margin-top:64px
                    padding-bottom:64px
                    .name
                        line-height:16px
                        font-size:16px
                        text-align:center
                        font-weight:700
                    .starWrap
                        margin-top:18px
                        padding:2px 0
                        text-align:center
                    .title
                        display:flex
                        width:80%
                        margin:30px auto 24px auto
                        .line
                            flex:1
                            position:relative
                            top:-6px
                            border-bottom:1px solid rgba(255,255,255,0.2)
                        .titleName
                            padding:0 12px
                            font-size:14px
                            font-weight:700
                    .supports
                        width:80%
                        margin:0 auto
                        .supportsItem
                            padding:0 12px
                            margin-bottom:12px
                            font-size:0
                            &.last-child
                                margin-bottom:0
                            .icon
                                display:inline-block
                                width:16px
                                height:16px
                                vertical-align:top
                                margin-right:6px
                                background-size:16px 16px
                                background-repeat:no-repeat
                                &.decrease
                                    bgImg('decrease_2')
                                &.discount
                                    bgImg('discount_2')
                                &.guarantee
                                    bgImg('guarantee_2')
                                &.invoice
                                    bgImg('invoice_2')
                                &.special
                                    bgImg('special_2')
                            .text
                                font-size:12px
                                line-height:16px
                    .bulletin
                        width:80%
                        margin:0 auto
                        .content
                            padding: 0 12px
                            line-height:24px
                            font-size:12px
            .detailClose
                position:relative
                width:32px
                height:32px
                font-size:32px
                line-height:32px
                margin:-64px auto 0 auto
                clear:both

</style>
