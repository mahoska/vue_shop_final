<template> 
<div class="order">
	<h2>Thank you for your order</h2>
	<p  class="bg-info"><i>Our manager will contact you in the near future</i></p>
	<p>
		<h3><u>Ordering information:</u></h3>
		<div class="row">
			<div class="col-md-2"></div>
			<div class="col-sm-12 col-md-8">
				<table class="table table-striped order-table">
				 <tr>
					 <th>Product</th>
					 <th>Name</th>
					 <th>Size</th>
					 <th>Count</th>
					 <th>Color</th>
				 </tr>
				 <tr v-for="product in order['products']" >
					 <td><img :src="product.img" class="img-responsive mini_img"/></td>
					 <td>{{product.name}}</td>
					 <td>{{product.size}}</td>
					 <td>{{product.count}}</td>
					 <td>{{product.color}}</td>
				 </tr>
				</table>
			</div>
			<div class="col-md-2"></div>
			</div>

		<div class="row">
			<div class="col-md-4"></div>
			<div class="col-sm-12 col-md-4">
			<div class="panel panel-default">
			  <div class="panel-heading">Detalls client info:</div>
			  <table class="table order-table" style="margin:10px;">
				<tr>
				  <td class="lbl">Client: </td>
				  <td>{{order['client'].first_name}} {{order['client'].last_name}}</td>
				</tr>
				<tr>
				  <td class="lbl">Address: </td>
				  <td>{{order['client'].postcode}}, {{order['client'].city}}, {{order['client'].address}}</td>
				</tr>
				<tr>
				  <td class="lbl">Phone: </td>
				  <td>{{order['client'].phone}}</td>
				</tr>
				<tr>
				  <td class="lbl">Email: </td>
				  <td>{{order['client'].email}}</td>
				</tr>
				<tr>
				  <td class="lbl">Payment method: </td>
				  <td>{{order['client'].payment_method}}</td>
				</tr>
			  </table>
			</div>
			</div>
		</div>
	</p>
</div>
</template>



<script>
export default {
  name: 'infoOrder',
  data(){
  return{
		order: []
	}
  },
  created(){
	if(localStorage['order']){
		this.order = JSON.parse(localStorage['order']);
		console.log(this.order)
	}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.mini_img{
  max-height:50px;
}
.order-table{
	text-align:left;
	margin-top:30px;
}

.no-active{
	text-align:left;
}

.lbl{
	font-weight:bold;
}

.panel-heading{
	font-weight:bold;
	text-decoration:underline;
}
</style>
