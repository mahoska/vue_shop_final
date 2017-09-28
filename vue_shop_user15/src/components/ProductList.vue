<template>
 <div class="container centr">
	<h3>Shop</h3>
	<h4>Sustainable Streetwear from DEDICATED, Organic and Fairtrade-certified cotton, browse and filter below</h4>
    <form class="filter_selection form-inline filter-form">
		<div class="form-group">
			<select id="category" v-model="category" class="form-control">
				<option value="">Categories</option>
				<option v-bind:key="category"
						v-for="category in options.categories"
						:value="category.value">
					{{category.title}}
				</option>
			</select>
	  </div>
	  
	 <div class="form-group">
		  <select id="color" v-model="color" class="form-control">
			<option value="">Colors</option>
			<option v-bind:key="color"
			  v-for="color in options.colors"
			  :value="color">
				{{color}}
			</option>
		  </select>
	 </div> 
	 
	   <div class="form-group">
		  <select id="size" v-model="size" class="form-control">
			<option value="">Sizes</option>
			<option v-bind:key="category"
			  v-for="size in options.sizes"
			  :value="size">
				{{size}}
			</option>
		  </select>
	 </div>
	 
	  <div class="form-group">
		  <select id="sort" v-model="sort" class="form-control">
			<option value="">Sort</option>
			<option v-bind:key="category"
			  v-for="sort in options.sorts"
			  :value="sort.value">
				{{sort.title}}
			</option>
		  </select>
	 </div>
	 
	 <button type="reset" class="btn btn-success" id="cear_filter"  @click="clearFilters">
		<span class="glyphicon glyphicon-remove"></span> Clear Filter
	 </button>
	</form>
	
	 <div class="product_selection product_table">
	     <product-section v-for="product in filteredProducts" :product="product"></product-section>
	 </div>
  </div>
</template>

<script>
import Product from './Product.vue'
export default {
  name: 'product_list',
  data () {
    return {
		category: '',
		size: '',
		color: '',
		sort: '',
		options: {
			categories: [
			{
				value: 't-short',
				title: 't-short'
			},
            {
				value: 'leggines',
				title: 'leggines'
			},
			{
				value: 'belts',
				title: 'belts'
			}
			],
        colors: [
			'black',
			'green',
			'white',
			'yellow'
        ],
        sizes: ['S', 'M', 'XL', 'XXL'],
        sorts: [
		{
			value: 'low',
			title: 'Lowest price first'
		},
		{
            value: 'hight',
            title: 'Highest price first'
        }
		]
      },
	  products : []
	  
    }
  },
  components: {
		'product-section': Product
  },
  created(){
		this.products = Products
  },
  computed:{
	  filteredProducts(){
		var self = this
		var checkSize = (el)=> {
			if(self.size=="" || el.size.indexOf(self.size) != -1){
				return true
			}
			return false
		}
		  
		var checkColor = (el)=> {
			if(self.color=="" || el.color.indexOf(self.color) != -1){
				return true
			}
			return false
		}
		 
		var checkCategory = (el)=> {
			if(self.category=="" || el.category == self.category){
				return true
			}
			return false
		}
		  
		var filter_products =  this.products.filter((el)=>{
			return checkSize(el) && checkCategory(el) && checkColor(el)
		})
		  
		if(self.sort != '' && self.sort=="low"){
			filter_products.sort(function(a,b){
				if (a.price[0] < b.price[0] ) {
				return -1;
			}
			if (a.price[0] > b.price[0] ) {
				return 1;
			}
			return 0;
			})
		}
		if(self.sort != '' && self.sort=="hight"){
		    filter_products.sort(function(a,b){
				if (a.price[0] > b.price[0] ) {
				return -1;
			}
			if (a.price[0] < b.price[0] ) {
				return 1;
			}
			return 0;
			})
		}
		return filter_products 
	  }
	  
  },
   methods: {
	    clearFilters: function () {
			this.color = ""
			this.size = ""
			this.sort = ""
			this.category = ""
		}
   }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.filter-form{
	margin-bottom:20px;
}

.centr{
	text-align:center;
}

</style>
