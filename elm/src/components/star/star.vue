<template>
    <div class="star" :class='starType'>
        <span v-for='itemClass in itemClasses' :class='itemClass' class='starItem' track-by='$index'></span>
    </div>
</template>

<script type="text/ecmascript-6">
    const LENGTH = 5;
    const CLS_ON = 'on';
    const CLS_HALF = 'half';
    const CLS_OFF = 'off';

    export default {
        props: {
            size: {
                type: Number
            },
            score: {
                type: Number
            }
        },
        computed: {
            starType() {
                return 'star-' + this.size;
            },
            itemClasses() {
                let result = [];
                // 向下取0.5倍数的值
                let score = Math.floor(this.score * 2) / 2;
                // 判断是否有小数
                let hasDecimal = score % 1 !== 0;
                // 取整
                let integer = Math.floor(score);
                for (let i = 0; i < integer; i++) {
                   result.push(CLS_ON);
                }
                if (hasDecimal) {
                    result.push(CLS_HALF);
                };
                while (result.length < LENGTH) {
                    result.push(CLS_OFF);
                };
                return result;
            }
        }
    };
</script>
<style lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/mixin.styl';
    .star
        font-size:0
        .starItem
            display:inline-block
            background-repeat:no-repeat
        &.star-48
            .starItem
                width:20px
                height:20px
                margin-right:22px
                background-size:20px 20px
                &.last-child
                    margin-right:0
                &.on
                    bgImg('star48_on')
                &.half
                    bgImg('star48_half')
                &.off
                    bgImg('star48_off')
        &.star-36
            .starItem
                width:15px
                height:15px
                margin-right:6px
                background-size:15px 15px
                &.last-child
                    margin-right:0
                &.on
                    bgImg('star36_on')
                &.half
                    bgImg('star36_half')
                &.off
                    bgImg('star36_off')
        &.star-24
            .starItem
                width:10px
                height:10px
                margin-right:3px
                background-size:10px 10px
                &.last-child
                    margin-right:0
                &.on
                    bgImg('star24_on')
                &.half
                    bgImg('star24_half')
                &.off
                    bgImg('star24_off')
</style>
