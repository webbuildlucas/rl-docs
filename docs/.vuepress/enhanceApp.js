import Hero from './components/Home/Hero'
import Contest from './components/Home/Contest'
import Contest2 from './components/Home/Contest2'
import Socials from './components/Home/Socials'
import Footer from './components/Footer'
import FlowChart from './components/FlowChart'

import KismetNodeList from './components/Kismet/NodeList.vue';
import KismetNodeSearch from './components/Kismet/NodeSearch.vue';
import KismetNodeProperty from './components/Kismet/NodeProperty.vue';
import KismetNode from './components/Kismet/Node.vue';

export default ({
  Vue, // the version of Vue being used in the VuePress app
  options, // the options for the root Vue instance
  router, // the router instance for the app
  siteData // site metadata
}) => {

  Vue.component('HeroComponent', Hero)
  Vue.component('Contest2Component', Contest2)
  Vue.component('ContestComponent', Contest)
  Vue.component('SocialsComponent', Socials)

  Vue.component('FooterComponent', Footer)

  Vue.component('FlowChartComponent', FlowChart)

  Vue.component('KismetNodeProperty', KismetNodeProperty);
  Vue.component('KismetNode', KismetNode);
  Vue.component('KismetNodeList', KismetNodeList);
  Vue.component('KismetNodeSearch', KismetNodeSearch);


}