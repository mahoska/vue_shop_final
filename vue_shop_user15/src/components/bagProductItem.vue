<template> 
	<div class="bag_product_item">
		<div class="line"></div>
		<div class="row">
			<div class="col-sm-6 col-md-6">
				<div class="title">{{product.name}}</div>
				<div class="row">
					<div class="col-sm-6 col-md-4">
						<div class="grey">Size</div>
						<div><strong>{{product.size}}</strong></div>
					</div>
					<div class="col-sm-6 col-md-8">
						<div><strong>{{product.price}} EUR</strong></div>
					</div>
				</div>
				<div class="row">
					<div class="col-sm-6 col-md-4">
						<div class="grey">Color</div>
						<div><strong>{{product.color}}</strong></div>
					</div>
					<div class="col-sm-6 col-md-8">
						<div class="btn min_balck_btn inline" id="minus" @click="changeCount(false)">-</div>
						<div class="count inline">{{count}}</div>
						<div class="btn min_balck_btn inline" id="plus" @click="changeCount(true)">+</div>
					</div>
				</div>
			</div>
			<div class="col-sm-2 col-md-2">
				<button class="btn min_balck_btn" id="del_btm" @click="delProduct">x</button>
			</div>
			<div class="col-sm-4 col-md-4">
				<img :src="product.img" class="img-responsive"/>
			</div>
		</div>
	</div>
</template>


<script>
export default {
  name: 'bagProductItem',
  props: ['product'],
  data(){
	return{
		count : 0
	}
  },
  created() {
    this.count = this.product.count
  },
  methods:{
	changeCount(flag){
		if(flag){
			this.product.count++
			this.count++
		}
	 else{
		if(this.product.count >= 2){
			this.product.count--
			this.count --
		}
	}
	this.$emit('changeCountTotal', this.product.id,this.product.count )
	},
	delProduct(){
		this.$emit('delProduct', this.product.id )
	}
  }
}


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.min_balck_btn{
background-color:black;
	color: white;
}

.inline{
	display:inline-block;
}

.count{
padding: 20px;
}

.title{
	font-size:25px;
	font-weight:bold;
	margin-bottom: 30px;
}

.row{
margin-bottom:50px;
}

strong{
	font-size:17px;
}

.grey{
	color:lightgrey;
	font-weight:bold;
}

.line{
	height:2px;
	background-color:lightgrey;
	margin: 20px 0;
}
</style>
