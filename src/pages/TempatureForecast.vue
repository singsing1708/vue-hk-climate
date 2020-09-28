<template>
  <div>

    <div class="row">
      <div class="col-12">
        <card type="chart">
          <template slot="header">
            <div class="row">
              <div class="col-sm-6" :class="isRTL ? 'text-right' : 'text-left'">
                <h5 class="card-category">{{bigLineChartCategories[bigLineChart.activeIndex]}}</h5>
                <h2 class="card-title">{{$t('tempatureForecast.title')}}</h2>
              </div>
              <div class="col-sm-6">
                <div class="btn-group btn-group-toggle"
                     :class="isRTL ? 'float-left' : 'float-right'"
                     data-toggle="buttons">
                  <label v-for="(option, index) in bigLineChartCategories"
                         :key="option"
                         class="btn btn-sm btn-primary btn-simple"
                         :class="{active: bigLineChart.activeIndex === index}"
                         :id="index">
                    <input type="radio"
                           @click="initBigChart(index)"
                           name="options" autocomplete="off"
                           :checked="bigLineChart.activeIndex === index">
                    {{option}}
                  </label>
                </div>
              </div>
            </div>
          </template>
          <div class="chart-area">
            <line-chart style="height: 100%"
                        ref="bigChart"
                        chart-id="big-line-chart"
                        :chart-data="bigLineChart.chartData"
                        :gradient-colors="bigLineChart.gradientColors"
                        :gradient-stops="bigLineChart.gradientStops"
                        :extra-options="bigLineChart.extraOptions">
            </line-chart>
          </div>
        </card>
      </div>
    </div>

  </div>
</template>
<script>
  import LineChart from '@/components/Charts/LineChart';
  import { axios } from '@/plugins/axios'
  import moment from 'moment'
  import * as chartConfigs from '@/components/Charts/config';
  import config from '@/config';

  export default {
    components: {
      LineChart
    },
    data() {
      return {
        bigLineChart: {
          allData: [
          ],
          activeIndex: 0,
          chartData: {
            datasets: [{ }],
            labels: [],
          },
          extraOptions: chartConfigs.purpleChartOptions,
          gradientColors: config.colors.primaryGradient,
          gradientStops: [1, 0.4, 0],
          categories: []
        },
      }
    },
    computed: {
      enableRTL() {
        return this.$route.query.enableRTL;
      },
      isRTL() {
        return this.$rtl.isRTL;
      },
      bigLineChartCategories() {
        return this.$t('tempatureForecast.chartCategories');
      }
    },
    methods: {
      initBigChart(index) {
        let chartData = {
          datasets: [{
            fill: true,
            borderColor: config.colors.primary,
            borderWidth: 2,
            borderDash: [],
            borderDashOffset: 0.0,
            pointBackgroundColor: config.colors.primary,
            pointBorderColor: 'rgba(255,255,255,0)',
            pointHoverBackgroundColor: config.colors.primary,
            pointBorderWidth: 20,
            pointHoverRadius: 4,
            pointHoverBorderWidth: 15,
            pointRadius: 4,
            data: this.bigLineChart.allData[index]
          }],
          labels: this.bigLineChart.chartData.labels,
        }
        this.$refs.bigChart.updateGradients(chartData);
        this.bigLineChart.chartData = chartData;
        this.bigLineChart.activeIndex = index;
      },
      setupChartData(weatherForecasts) {
        console.log(weatherForecasts)
        let maxTempatures = []
        let minTempatures = []
        weatherForecasts.forEach(forcastData => {
          maxTempatures.push(forcastData.forecastMaxtemp.value)
          minTempatures.push(forcastData.forecastMintemp.value)
          this.bigLineChart.chartData.labels.push(moment(forcastData.forecastDate, "YYYYMMDD").format("DD-MMM"))
        })
        this.bigLineChart.allData.push(maxTempatures)
        this.bigLineChart.allData.push(minTempatures)
        this.bigLineChart.extraOptions.scales.yAxes[0].ticks.suggestedMin = 10
      }
    },
    mounted() {
      this.i18n = this.$i18n;
      if (this.enableRTL) {
        this.i18n.locale = 'ar';
        this.$rtl.enableRTL();
      }
      axios
        .get('https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=fnd&lang=en')
        .then(response => {
          this.setupChartData(response.data.weatherForecast)
          this.initBigChart(0);
        })
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
