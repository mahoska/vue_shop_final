<template> 
   <div class="product col-sm-4 col-md-3">
  
	<div class="thumbnail product_tabl_el">
	   <img :src="product.img[0]" alt="" class="product-img" />
	   <div class="caption">
	       <h4> <router-link  :to="'/productItem/'+product.id">{{ product.name }}</router-link></h4>
		   <p><strong></strong>{{ product.price[0]}} EUR</p>
	   </div>
	</div>
	
   </div>
</template>

<script>
export default {
  name: 'productSection',
  props: ['product']
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.product_tabl_el{
	min-height: 380px;
	max-height: 380px;
}

.product_tabl_el img{
	height: 250px;
}
</style>
