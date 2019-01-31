<template>
  <div id="app">
    <app-header></app-header>
    <router-view/>
    <app-footer></app-footer>
    <notifications group="foo" />
  </div>
</template>

<script>
import Header from './components/Header'
import Footer from './components/Footer'
export default {
  name: 'App',
  components:{
    appHeader: Header,
    appFooter: Footer
  },    
  created(){
      this.$store.dispatch('tryAutoLogin')
  },

}
</script>

<style>


</style>
