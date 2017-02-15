<template>
    <div>
        <v-header :seller='seller'></v-header>
        <div class="tab border1px">
            <div class="tabItem">
                <!-- 使用v-link指令进行导航 -->
                <a v-link="{path:'/goods'}">商品</a>
            </div>
            <div class="tabItem">
                <a v-link="{path:'/ratings'}">评论</a>
            </div>
            <div class="tabItem">
                <a v-link="{path:'/seller'}">商家</a>
            </div>
        </div>
        <!-- 路由外链 -->
        <router-view :seller="seller" keep-alive></router-view>
    </div>
</template>

<script type='text/ecmascript-6'>
    import {urlParse} from 'common/js/util';
    import Header from 'components/header/header';
    const ERR_OK = 0;
    export default {
        data() {
            return {
                seller: {
                    id: (() => {
                        let queryParam = urlParse();
                        console.log(queryParam);
                        return queryParam.id;
                    })()
                }
            };
        },
        // 获取数据
        created() {
            this.$http.get('/api/seller?id=' + this.seller.id).then((response) => {
                response = response.body;
                if (response.errno === ERR_OK) {
                    this.seller = Object.assign({}, this.seller, response.data);
                }
            });
        },
        components: {
            'v-header': Header
        }
    };
</script>

<style lang='stylus' rel='stylesheet/stylus'>
@import './common/stylus/mixin.styl';
    .tab
        display:flex
        width:100%
        height:40px
        line-height:40px
        border1px(rgba(7,17,21,0.1))
        .tabItem
            flex:1
            text-align:center
            & > a
                display:block
                font-size:14px
                color:rgb(77,85,93)
                &.active
                    color:rgb(240,20,20)
</style>
