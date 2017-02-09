<template>
  <div id="app">
    <v-header></v-header>
    <div class="tab">tab</div>
    <div class="content">content</div>
  </div>
</template>

<script>
  import Header from './components/header/header.vue';
  export default {
    components: {
     'v-header': Header
    }
  };
</script>

<style>

</style>
