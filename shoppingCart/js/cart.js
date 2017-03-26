var vm = new Vue({
    el: '#app',
    data: {
        //vue的模型
        productList:[],
        selectAll: false,
        delFlag:false
    },
    filters: {
        formatMoney: function(value) {
            return "￥ " + value.toFixed(2);
        }
    },
    mounted: function() {
        //生命周期的一部分，实例化编译完成后，默认需要查询某一个方法
        //使用mounted钩子，并不能保证这个实例已经插入文档，所以还应该在钩子函数中包含Vue.nextTick/vm.$nextTick
        var _this = this;
        this.$nextTick(function(){
            _this.cartView();
        })

    },
   computed: {
        totalMoneys:function () {
            let result = 0;
            this.productList.forEach( item => {
                if (item.checked) {
                    result += item.productPrice * item.productQuentity;
                }
            });
            return result;
        }
    },
    methods: {
        cartView:function(){
            //从后台获取数据
            this.$http.get("data/cart.json").then((response) => {
                let res = response.body;
                if (res.status == 1) {
                    this.productList = res.result.productList;
                    // this.totalMoney = res.result.totalMoney;
                }


            })
        },
        //改变商品数量
        changeMoney:function(product,way) {
            if (way > 0) {
                product.productQuentity++;
            } else {
                product.productQuentity--;
                if ( product.productQuentity < 1) {
                    product.productQuentity = 1;
                }
            }
        },
        //单选
        selectedProduct: function(item){
            if (typeof item.checked == 'undefined') {
                //全局注册
                // Vue.set(item, 'checked', true);
                // 局部注册
                this.$set(item, 'checked', true)
            } else {

                item.checked = !item.checked;
            }
        },
        //全选
        selectAllFn: function(flag) {
            this.selectAll = flag;
            //遍历所有商品，改变状态
            this.productList.forEach((item,index) => {
                if (typeof item.checked == 'undefined') {
                    this.$set(item, 'checked', this.selectAll);
                } else {
                    item.checked = this.selectAll;
                }
            })
        },
        delProduct() {
            this.delFlag = false;
            this.productList.splice(this.delIndex,1);

        }
    }
});
//全局过滤器
Vue.filter("money",function(value,type){
    return "￥ " + value.toFixed(2) + type;
})