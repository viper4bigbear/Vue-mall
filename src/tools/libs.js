import Vue from 'vue'

// import ElementUI from 'element-ui'
import {
  Carousel,
  CarouselItem,
  InputNumber,
  Switch,
  Button,
  Form,
  FormItem,
  Input,
  Radio,
  RadioGroup,
  Loading,
  Pagination
} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// import iView from 'iview'
import {
  LoadingBar,
  Modal,
  Icon,
  Message,
  Notice,
  Page,
  Affix,
  BackTop
} from 'iview'
import 'iview/dist/styles/iview.css'

import ProductZoomer from 'vue-product-zoomer'
import VueLazyload from 'vue-lazyload'

// Vue.use(ElementUI)
Vue.use(Carousel)
Vue.use(CarouselItem)
Vue.use(InputNumber)
Vue.use(Switch)
Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(Loading)
Vue.use(Pagination)
// Vue.use(iView)
Vue.component('Modal', Modal)
Vue.component('Icon', Icon)
Vue.component('Page', Page)
Vue.component('Affix', Affix)
Vue.component('BackTop', BackTop)
Vue.prototype.$Loading = LoadingBar
Vue.prototype.$Message = Message
Vue.prototype.$Notice = Notice

Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: 'dist/error.png',
  loading: require('../assets/statics/886859.jpg'),
  attempt: 1
})
Vue.use(ProductZoomer)
