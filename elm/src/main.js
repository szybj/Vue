import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import App from './App';
import Goods from 'components/goods/goods';
import Seller from 'components/seller/seller';
import Ratings from 'components/ratings/ratings';

import 'common/stylus/index.styl';

Vue.use(VueRouter);
Vue.use(VueResource);

let app = Vue.extend(App);

let router = new VueRouter({
    linkActiveClass: 'active'
});

router.map({
    '/goods': {
       component: Goods
    },
    '/seller': {
        component: Seller
    },
    '/ratings': {
        component: Ratings
    }
});
router.start(app, '#app');
// router.go('/goods');
