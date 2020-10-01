<template>
  <div class="wrapper">
    <side-bar>
      <template slot="links">
        <sidebar-link to="/weather-forecast" :name="$t('sidebar.weatherForecast')" icon="fas fa-sun"/>
        <sidebar-link to="/tempature-forecast" :name="$t('sidebar.tempatureForecast')" icon="fa fa-thermometer-three-quarters"/>
        <!-- <sidebar-link to="/dashboard" :name="$t('sidebar.dashboard')" icon="fas fa-sun"/>
        <sidebar-link to="/icons" :name="$t('sidebar.icons')" icon="tim-icons icon-atom"/>
        <sidebar-link to="/maps" :name="$t('sidebar.maps')" icon="tim-icons icon-pin"/>
        <sidebar-link to="/notifications" :name="$t('sidebar.notifications')" icon="tim-icons icon-bell-55"/> -->
        <!-- <sidebar-link to="/profile" :name="$t('sidebar.userProfile')" icon="tim-icons icon-single-02"/>
        <sidebar-link to="/table-list" :name="$t('sidebar.tableList')" icon="tim-icons icon-puzzle-10"/>
        <sidebar-link to="/typography" :name="$t('sidebar.typography')" icon="tim-icons icon-align-center"/> -->
        <sidebar-link to="/#" :name="$t('sidebar.changeLanguage')" :clickFunction="changeLanguage" icon="tim-icons icon-world"/>
      </template>
    </side-bar>
    <div class="main-panel">
      <top-navbar></top-navbar>

      <dashboard-content @click.native="toggleSidebar">

      </dashboard-content>

      <content-footer></content-footer>
    </div>
  </div>
</template>
<style lang="scss">
</style>
<script>
import TopNavbar from "./TopNavbar.vue";
import ContentFooter from "./ContentFooter.vue";
import DashboardContent from "./Content.vue";
import MobileMenu from "./MobileMenu";
export default {
  components: {
    TopNavbar,
    ContentFooter,
    DashboardContent,
    MobileMenu
  },
  methods: {
    toggleSidebar() {
      if (this.$sidebar.showSidebar) {
        this.$sidebar.displaySidebar(false);
      }
    },
    changeLanguage() {
      if (this.$i18n.locale == 'en') {
        this.$i18n.locale = 'tc'
      } else {
        this.$i18n.locale = 'en'
      }
    }
  }
};
</script>
