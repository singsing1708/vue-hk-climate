import DashboardLayout from "@/layout/dashboard/DashboardLayout.vue";
// GeneralViews
import NotFound from "@/pages/NotFoundPage.vue";

// Admin pages
const WeatherForecast = () => import(/* webpackChunkName: "dashboard" */"@/pages/WeatherForecast.vue");
const Dashboard = () => import(/* webpackChunkName: "dashboard" */"@/pages/Dashboard.vue");
const TempatureForecast = () => import(/* webpackChunkName: "common" */ "@/pages/TempatureForecast.vue");
const Profile = () => import(/* webpackChunkName: "common" */ "@/pages/Profile.vue");
const Notifications = () => import(/* webpackChunkName: "common" */"@/pages/Notifications.vue");
const Icons = () => import(/* webpackChunkName: "common" */ "@/pages/Icons.vue");
const Maps = () => import(/* webpackChunkName: "common" */ "@/pages/Maps.vue");
const Typography = () => import(/* webpackChunkName: "common" */ "@/pages/Typography.vue");
const TableList = () => import(/* webpackChunkName: "common" */ "@/pages/TableList.vue");

const routes = [
  {
    path: "/",
    component: DashboardLayout,
    redirect: "/weather-forecast",
    children: [
      {
        path: "weather-forecast",
        name: "weather forecast",
        component: WeatherForecast
      },
      {
        path: "tempature-forecast",
        name: "Tempature forecast",
        component: TempatureForecast
      },
      {
        path: "dashboard",
        name: "dashboard",
        component: Dashboard
      },
      {
        path: "profile",
        name: "profile",
        component: Profile
      },
      {
        path: "notifications",
        name: "notifications",
        component: Notifications
      },
      {
        path: "icons",
        name: "icons",
        component: Icons
      },
      {
        path: "maps",
        name: "maps",
        component: Maps
      },
      {
        path: "typography",
        name: "typography",
        component: Typography
      },
      {
        path: "table-list",
        name: "table-list",
        component: TableList
      }
    ]
  },
  { path: "*", component: NotFound },
];

/**
 * Asynchronously load view (Webpack Lazy loading compatible)
 * The specified component must be inside the Views folder
 * @param  {string} name  the filename (basename) of the view to load.
function view(name) {
   var res= require('../components/Dashboard/Views/' + name + '.vue');
   return res;
};**/

export default routes;
