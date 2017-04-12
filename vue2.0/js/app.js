/*
* @Author: szy
* @Date:   2017-04-01 14:31:07
* @Last Modified by:   szy
* @Last Modified time: 2017-04-03 22:13:24
*/

'use strict';
var storage = {
    save(key,value){
        localStorage.setItem(key,JSON.stringify(value));
    },
    fetch(key){
        return JSON.parse(localStorage.getItem(key)) || [];
    }
}
/*let list = [
    {
        'title': 'aaaaaaaa',
        'isChecked': false
    },
    {
        'title': 'bbbbbbbb',
        'isChecked': false
    },
    {
        'title': 'cccccccc',
        'isChecked': true
    },
     {
        'title': 'dddddddd',
        'isChecked': true
    }
];
*/
let list = storage.fetch("todo");
 var filter = {
                all:function(list){
                    return list;
                },
                unfinished:function(list){
                    return list.filter(function(item){
                        return !item.isChecked;
                    })
                },
                finished:function(list){
                    return list.filter(function(item){
                        return item.isChecked;
                    })
                }
            }
let vm = new Vue({
    el: '.main',
    data: {
        list:list,
        addTodoText: '',
        edit: -1,//当前编辑的索引
        beforTitle:'',//编辑之前的title
        visibility: 'all',
        isActive:1

    },
    computed:{
        noCheckedLength(){
            return this.list.filter(function(item){
                return !item.isChecked
            }).length
        },
        filterList(){

            return filter[this.visibility]?filter[this.visibility](this.list):this.list;
        }

    },
    watch:{
        //浅监控
        //监控list这个属性，当list这个属性对应的值发生变化的时候就执行函数
       /* list:function(){

             storage.save("todo",this.list)
        }*/


        //深监控
       list:{
            handler:function(){
                storage.save("todo",this.list)
            },
            deep:true
       }
    },
    methods: {
        //添加
        addTodo(data,ev){//第一个参数是传进来的参数，第二个是传进来的事件
            if(this.addTodoText!='') {
                this.list.unshift({
                    'title': this.addTodoText,
                    'isChecked': false
                })
                this.addTodoText = '';
            } else {
                alert('不能为空')
            }

        },
        //删除
        /*delTodo(index){
            console.log(index)
            this.list.splice(index,1)
        }*/
        delTodo(item){
            var index = this.list.indexOf(item);
            console.log(index)
            this.list.splice(index,1)
        },
        //编辑
        edtorTodo(item,index){
          if(!item.isChecked){
            this.edit = index;
            //记录编辑之前的数据
            this.beforTitle = item.title;
          }

        },
        //按下回车键编辑完成
       /* endEdit(){
            this.edit = -1;
        }*/
        //取消编辑
        cancelTodo(item){
            item.title = this.beforTitle;
            this.edit = -1;
            this.beforTitle = '';
        }
    },
    //自定义指令
    directives:{
        'focus':{
            update(el,binding){
                //console.log(el)
                //console.log(binding)
               el.focus();
            }
        }
    }
});

window.addEventListener('hashchange',watchHashChange);
function watchHashChange(){
    let hash = window.location.hash.slice(1);
    vm.visibility = hash;
}