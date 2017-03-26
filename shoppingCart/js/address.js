/*
* @Author: szy
* @Date:   2017-03-17 20:41:23
* @Last Modified by:   szy
* @Last Modified time: 2017-03-17 22:06:42
*/

'use strict';

new Vue({
    el:'.container',
    data:{
        currentIndex: 0,
        limitNumber: 3,
        shippingMethod:1,
        addressList: []
    },
    mounted(){
        this.$nextTick(function(){
            this.getAddressList();
        })
    },
    methods:{
       getAddressList(){
        this.$http.get('data/address.json').then(response => {
            let res = response.data;
            if (res.status == 1) {
                this.addressList = res.result;
            }

        })
       },
       setDefault(addressId) {
        this.addressList.forEach((item,index) => {
            if (item.addressId == addressId) {
                item.isDefault = true;
            } else {
                item.isDefault = false;
            }
        })
       }
    },
    computed:{
        filterAddressList() {
            return this.addressList.slice(0,this.limitNumber);
        }
    }
})