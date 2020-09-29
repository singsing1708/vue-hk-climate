<template>
  <v-timeline class="weather-timeline">
    <v-timeline-item
      v-for="(weatherForecast, key) in weatherForecasts"
      :key="key"
      color="purple lighten-2"
      fill-dot
      small
    >
      <template v-slot:opposite>
        <div class="text-center">{{formatDate(weatherForecast.forecastDate)}}</div>
      </template>
      <v-card class="elevation-2">
        <v-card-title class="headline">
          {{weatherForecast.week}}
        </v-card-title>
        <v-card-text>
          <div>{{tempatureDisplay(weatherForecast)}}</div>
          <div>{{weatherForecast.forecastWeather}}</div>
          <br/>
          <div>{{$t('weatherTimeline.windForce')}} {{weatherForecast.forecastWind}}</div>
        </v-card-text>
      </v-card>
    </v-timeline-item>
  </v-timeline>

  </v-timeline>
</template>
<script>
import { axios } from '@/plugins/axios'
import moment from 'moment'

export default {
  name: "weather-timeline",
  data () {
    return {
      weatherForecasts: null
    }
  },
  methods: {
    formatDate(dateString){
      return moment(dateString, "YYYYMMDD").format("DD-MMM-YYYY")
    },
    tempatureDisplay(weatherForecast){
      return `${weatherForecast.forecastMintemp.value}${weatherForecast.forecastMintemp.unit}~${weatherForecast.forecastMaxtemp.value}${weatherForecast.forecastMaxtemp.unit}`
    }
  },
  mounted () {
    axios
      .get(`https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=fnd&lang=${this.$i18n.locale}`)
      .then(response => {
        console.log(response.data.weatherForecast);
        this.weatherForecasts = response.data.weatherForecast
      })
  },
  beforeMount(){
    console.log(123);
 },
};
</script>
<style>
</style>
