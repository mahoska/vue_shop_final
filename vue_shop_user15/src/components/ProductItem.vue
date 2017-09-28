<template>
<div class="container">
	<div class="row add_bag_page ">
		<gallery :images="product.img"></gallery>
		<div  class=" col-sm-3 col-md-4  productDesc">
			<div></div>
			<div id="description">{{product.description}}</div>
			<div id = "price">{{min_price}} EUR</div>
			<form class="form add_bag" role="form">
			  <div class="form-group">
				<select id="size" v-model="size" class="form-control">
					<option value="">Choose size</option>
					<option v-bind:key="size"
							v-for="sizeel in product.size"
							:value="sizeel">
						{{sizeel}}
					</option>
				</select>
			  </div>
			  <button type="button" class="btn" id="add_bag_btn" @click="addBag">{{ butAdd }}</button>
			  <p class="bg-danger" id="err">{{err}}</p>
			</form>
			
			<router-link  :to="'/'" class="black" >continue shopping...</router-link>
		</div>
		<div  class=" col-sm-3 col-md-4"></div>
  </div>
  </div>
</template>



<script>
import Gallery from './Gallery.vue'
function  getMinPrice(some_product){
     return Math.min.apply(null, some_product.price)
}
export default {
  name: 'product_item',
  data () {
    return {
		product:{},
		size: '',
		err: '',
		selected_price: '',
		min_price:'',
		butAdd : 'Add to bag'
    }
  }, 
  watch: {
	size: function(newSize){
		var len = this.product.size.length;
		var i;
		for (i=0; i<len; i++){
			if (this.product.size[i] == newSize) break;
		};
		this.selected_price = this.product.price[i];
		this.min_price  = this.selected_price
	  }
  },
  components: {
	    'gallery': Gallery
  },
  created(){
    var id = this.$route.params.id
    this.product = Products.find(function(el){
        if (el.id == id)
		    return el;
	    return null;
    })	
	
	this.min_price = getMinPrice(this.product)
  },
  computed:{
    count_bag_product : function(){
		var bag = [];							
		if (localStorage['bag']) {
			bag = JSON.parse(localStorage['bag']);
		}
		 var count = 0;
		 bag.forEach(function(el){
			count += el.count
		 })
		 return count;
	}
  },
  methods:{
    addBag(){
        if(!this.size) {
			this.err = "Selected size"
			setTimeout("this.err.innerHTML=''", 1500)
			return
		}
	
		if(this.butAdd == "Proceed to checkout"){
			this.$router.push({path:'/bag'})
			return;
		}
	
		var bag = [];							
		if (localStorage['bag']) {
			bag = JSON.parse(localStorage['bag']);
		}
		
		var product_buy = {}
		var index = null
		var len = bag.length
		if(len >= 1 ){
			var _size = this.size, _id = this.product.id
			for(var i=0 ; i<len; i++){
				if (bag[i].id == _id && bag[i].size == _size){
					index = i
					break;
				}
			}
		}	
		if(index != null) {
			product_buy = bag[index]
			product_buy.count++
			bag.splice(index,1)
		}
		else{
			 product_buy = {
				id : this.product.id,
				img : this.product.img[0], 
				name : this.product.name, 
				price : this.selected_price,
				category : this.product.category,
				size : this.size,
				color : this.product.color, 
				description : null,
				count: 1
			}
		}
		bag.push(product_buy);
		localStorage['bag'] = JSON.stringify(bag);
		this.$emit('bagCount', this.count_bag_product )
		this.butAdd  = "Proceed to checkout"
    }
	
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.centr{
	text-align:center;
}
.add_bag_page{
	margin-top:20px;
}

#add_bag_btn{
	width: 100%;
	background-color : black;
	color: white;
}

.productDesc{
	margin-top:50px;
	margin-left:20px;
}

#title{
	font-size:17px;
	font-weight:bold;
	margin-bottom:30px;
}

#description{
	font-size:13px;
}

#price{
	font-size:19px;
	font-weight:bold;
	margin:30px 0;
	text-align:center;
}

a.black{
	color:black;
	text-decoration:none;
	display:block;
	margin-top: 50px;
	font-size: 14px;
	font-weight:bold;
}

#err{
	margin-top: 10px;
	text-align:center;
	color: red;
}
</style>
