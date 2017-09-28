import Vue from 'vue'
import Router from 'vue-router'
import ProductList from '@/components/ProductList'
import ProductItem from '@/components/ProductItem'
import Bag from '@/components/Bag'
import infoOrder from '@/components/infoOrder'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'ProductList',
      component: ProductList
    },
    {
      path: '/productItem/:id',
      name: 'ProductItem',
      component: ProductItem
    },
    {
      path: '/bag',
      name: 'Bag',
      component: Bag
    },
	{
      path: '/infoOrder',
      name: 'infoOrder',
      component: infoOrder
    }
  ]
})
