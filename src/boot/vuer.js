import gallery from 'img-vuer'
import croppa from 'vue-croppa'
import Vue from 'vue'
Vue.use(croppa)
Vue.use(gallery, {
  swipeThreshold: 150, // default 100
  isIndexShow: false, // show image index, default true
  useCloseButton: true, // trigger gallery close with close button, default true
  preload: true, // preload images in the same group, default true
  sliderBackgroundColor: 'rgba(0,0,0,255)',
  sliderZIndex: 10000
})
