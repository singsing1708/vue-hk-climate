<template>
  <v-timeline>
    <v-timeline-item>timeline item</v-timeline-item>
    <v-timeline-item class="text-right">timeline item</v-timeline-item>
    <v-timeline-item>timeline item</v-timeline-item>
  </v-timeline>
</template>
<script>
export default {
  name: "weather-timeline",
  data () {
    return {
      info: null
    }
  },
  mounted () {
    axios
      .get('https://api.coindesk.com/v1/bpi/currentprice.json')
      .then(response => (this.info = response))
  }
};
</script>
<style>
</style>
