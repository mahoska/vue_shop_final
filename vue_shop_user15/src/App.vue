<template>
  <div id="app">
	<nav class="navbar navbar-inverse">
	  <div class="container-fluid">
		<div class="navbar-header">
			<router-link  :to="'/'">
				<img alt="Brand" src="./assets/logo.png" class="img-responsive navbar-brand">
			</router-link>
			<p class="navbar-text">
				<router-link  :to="'/bag'" class="btn btn-default" aria-label="Left Align">
					<span class="glyphicon glyphicon-shopping-cart" aria-hidden="true" >{{bag_product_count}}</span>
				</router-link>
			</p>

		</div>
	  </div>	
	</nav>
    <router-view @bagCount="setBagCount"></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
   data(){
	  return{
	   bag_product_count:0
	  }
  },
  methods:{
  setBagCount: function(count){
		this.bag_product_count = count
	}
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 30px;
}
</style>
