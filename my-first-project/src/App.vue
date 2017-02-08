<template>
  <div id="app">
    <p>{{title}}</p>
    <p v-text='title'></p>
    <p v-html='title'></p>
    <input v-model='newItem' v-on:keyup.enter = 'addNewItem'>
    <ul>
        <li v-for='item in items'  v-bind:class = '{finished:item.isFinished}' :class='[liClass]' v-on:click = 'toggleFinish(item)' >
            <span>{{item.label}}</span>
        </li>
    </ul>
      <p>child tell me:{{childWords}}</p>
      <Components fathermsg='父组件' v-on:child-tell-me-something='listenToMyBoy'></Components>
  </div>

</template>

<script>
import Storage from './storage';
import Components from './components/components';
export default{
    data:function(){
        return{
            title:'<span>?</span>this is a todo list',
            items:Storage.getStorage(),
            newItem:'',
            childWords:'',
            liClass:'thisLiClass'
        }
    },
    components:{ Components },
    //$dispatch
    events:{//组件里就不必写 'child-tell-me-something’了
        'child-tell-me-something':function(msg){
            this.childWords = msg;
        }
    },
    watch:{
        items:{
            handler:function(items){
                Storage.setStorage(items)
            },
            deep:true
        }
    },
    methods:{
        toggleFinish:function(obj){
            console.log(obj);
            obj.isFinished = !obj.isFinished;
        },
        addNewItem:function(){
            this.items.push({
                label:this.newItem,
                isFinished:false
            })
             this.newItem = '';
             this.$broadcast('onAddnew',this.items);
        },
        //$emit
        listenToMyBoy:function(msg){
            this.childWords = msg;
        }
    }
}
</script>

<style>
.finished{
    text-decoration:line-through;
}
html {
  height: 100%;
}

body {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

#app {
  color: #2c3e50;
  margin-top: -100px;
  max-width: 600px;
  font-family: Source Sans Pro, Helvetica, sans-serif;
  text-align: center;
}

#app a {
  color: #42b983;
  text-decoration: none;
}

.logo {
  width: 100px;
  height: 100px;
}
</style>
