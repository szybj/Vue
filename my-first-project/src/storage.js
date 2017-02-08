/*
* @Author: szy
* @Date:   2017-02-07 17:03:33
* @Last Modified by:   szy
* @Last Modified time: 2017-02-07 20:17:00
*/

'use strict';
const storageKey = 'item';
export default{
    getStorage(){
        return JSON.parse(window.localStorage.getItem(storageKey) || '[]');
    },
    setStorage(obj){
        window.localStorage.setItem(storageKey,JSON.stringify(obj));
    }
}