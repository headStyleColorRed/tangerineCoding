<template>
  <v-app class="appp">
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  components: {
  },
  data () {
    return {
      //
    }
  }
}
</script>

<style>
html, body{  
  background-color: #f5f5f5;
}

  
</style>