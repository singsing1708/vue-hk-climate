<template>
  <div>
    <div class="row">
      <div class="col-12">
        <weather-timeline></weather-timeline>
      </div>
    </div>
  </div>
</template>
<script>
  import WeatherTimeline from '@/components/WeatherTimeline';

  export default {
    components: {
      WeatherTimeline,
    },
    data() {
      return {
      }
    },
    mounted() {
      this.i18n = this.$i18n;
      if (this.enableRTL) {
        this.i18n.locale = 'ar';
        this.$rtl.enableRTL();
      }
    },
    beforeDestroy() {
      if (this.$rtl.isRTL) {
        this.i18n.locale = 'en';
        this.$rtl.disableRTL();
      }
    }
  };
</script>
<style>
</style>
