<template> 
	<div class="container bag">
	<h2 style='text-align:left'>Checkout</h2>
	<div class="row">
		<div  class="col-sm-6 col-md-8 clearfix product_bag">
			<bagProductItem v-for="product in createBag" :product="product"  @changeCountTotal="changeTotal" @delProduct="delProductItem"></bagProductItem>
		</div>
		<div  class="col-sm-6 col-md-4 clearfix info_bag">
		<form>
		 <div class="form-group">
			<label for="voucher">Voucher Code</label>
			<input type="text" class="form-control" id="voucher" placeholder="input voucher code" v-model="voucher_code"/>
		 </div> 
		 <button class="btn add_bag_btn" @click="setVaucherCode">Submit</button>
		</form>
		<div class="line"></div>
		<table class="table">
			<tr>
				<td>Basket:</td>
				<td>{{primary_price}}</td>
			</tr>
			<tr>
				<td>Voucher reduction</td>
				<td>-{{voucher}} EUR</td>
			</tr>
			<tr>
				<td>&nbsp;</td>
				<td>&nbsp;</td>
			</tr>
			<tr class="total">
				<td>Grand Total</td>
				<td>{{total_price}} EUR</td>
			</tr>
		</table>
		<div class="line"></div>
		<form>
		<label>Select Payment Method</label>
		 <div class="form-group payment">
			<div class="radio">
				<input type="radio" id="creditcard" name="payment_method" v-model="payment_method"  value="creditcard"   />
				 <label for="creditcard" class="small_check">Credit Card</label>
			</div>
			<div class="radio">
				<input type="radio" id="paypal" name="payment_method" v-model="payment_method"  value="paypal">
				<label for="paypal" class="small_check">PayPal</label>
			</div>
		 </div> 
		</form>

		<form>
		<label>Your Detall</label>
		<p class="bg-danger" id="err">{{err}}</p>
			<div  class="form-group">
				<input type="text" class="form-control"  placeholder="First Name" v-model.trim="first_name">
			</div>
			<div  class="form-group">
				<input type="text" class="form-control"  placeholder="Last Name" v-model.trim="last_name">
			</div>
			<div  class="form-group">
				<input type="email" class="form-control"  placeholder="Email" v-model.trim="email" @blur="check_email">
			</div>
			<div  class="form-group">
				<input type="text" class="form-control"  placeholder="Telephone" v-model.trim="phone" @blur="check_phone">
			</div>
			<div  class="form-group">
				<input type="text" class="form-control"  placeholder="Address" v-model.trim="address">
			</div>
			<div  class="form-group">
				<input type="text" class="form-control"  placeholder="Postcode" v-model.trim="postcode">
			</div>
			<div  class="form-group">
				<input type="text" class="form-control"  placeholder="City" v-model.trim="city">
			</div>
			<div class="checkbox">
		     <label class="small_check">
			  <input type="checkbox" v-model="send_mail">
			  Tick this box I agree to receive the newsletter of the store
		     </label>
		    </div>
		    <div class="checkbox">
		     <label class="small_check">
			   <input type="checkbox" v-model="rules">
			   I accept the agreement with the Rules and Confidentiality
		    </label>
			</div>
			<button class="btn add_bag_btn large" @click="sendDetalls">Complete Purchase</button>
		</form>
		</div>
		 </div> 
		</form>
		</div>
	</div>
   </div>
</template>


<script>
import bagProductItem from './bagProductItem.vue'
export default {
  name: 'bag',
  data(){
  return{
		bag: [],
		del_el_id: null,
		voucher_code : "",
		voucher: 0,
		payment_method: "creditcard",
		err: "",
		first_name: "",
		last_name: "",
		email: "",
		phone: "",
		address: "",
		postcode: "",
		city: "",
		send_mail: true,
		rules: false,
		total_sum: 0
	}
  },
  components: {
		'bagProductItem': bagProductItem
  },
  created(){
		if(localStorage['bag']){
			this.bag = JSON.parse(localStorage['bag']);
		}
  },
   computed:{
		createBag(){
			if(this.del_el_id == null){
				this.$emit('bagCount', this.count_bag_product )
				return this.bag
			}
			else{
				localStorage['bag'] = JSON.stringify(this.bag);
				this.$emit('bagCount', this.count_bag_product )
				return this.bag
			}
		},
		primary_price:  function(){
			var _primary_price = 0;
			this.bag.forEach(function(el){
				_primary_price +=  el.price * el.count
			})
			
			if(this.voucher_code.toLowerCase() == "disk10"){
				this.voucher = _primary_price/10;
				this.voucher = parseFloat(this.voucher.toFixed(2))
			}
			else if(this.voucher_code.toLowerCase() == "disk5eur")
				this.voucher =  5;	
			else this.voucher = 0	

			return parseFloat(_primary_price.toFixed(1))
		},
		 total_price : function(){
			var  sum = this.primary_price - this.voucher
			this.total_sum = sum
			return parseFloat(sum.toFixed(2)) 
		 },
	 
		count_bag_product : function(){
			var count = 0;
			this.bag.forEach(function(el){
				count += el.count
			})
			return count;
		}
	 
   },
  methods:{
	changeTotal: function (id, count){
		var len = this.bag.length
		 for(var i=0 ; i<len; i++){
			  if (this.bag[i].id == id){
			    this.bag[i].count = count
				localStorage['bag'] = JSON.stringify(this.bag)
			    break;
			}
		}
		this.setVaucherCode()
	},
	delProductItem: function(id){
		this.del_el_id = id
		var len = this.bag.length
			for(var i=0 ; i<len; i++){
				 if (this.bag[i].id == this.del_el_id){
					this.bag.splice(i,1);
				}
			}
	},
	setVaucherCode(){
		if(this.voucher_code.toLowerCase() == "disk10"){
			this.voucher = this.primary_price/10;
			this.voucher = parseFloat(this.voucher.toFixed(2))
		}
		else if(this.voucher_code.toLowerCase() == "disk5eur")
			this.voucher =  5;	
		else this.voucher = 0	
	},
	check_phone(){
		var re = /^[\d]{10}$/;
		if (isNaN(this.phone) || re.test(this.phone) != true) {
			this.err = "wrong phone format"
		}
		else {
			this.err = ""
			return true
		}
	},
	check_email() {
		var re = /^[\.\-_A-Za-z0-9]+?@[\.\-A-Za-z0-9]+?(\.)[A-Za-z0-9]{2,3}$/;
		if (re.test(this.email) != true) {
			this.err = "wrong email format"
		}
		else {
			this.err = ""
			return true
		}
	},
	sendDetalls(){
		if (this.check_phone()  && this.check_email()) {
			if (this.first_name == "" || this.last_name == "" || this.address == "" || this.city == "") {
				this.err = "not all fields are filled";
			}else{
				if(!this.rules){
					this.err = "you must accept the agreement";
				}
				else {
					this.err = ""
					var client = {
					'first_name': this.first_name,
					'last_name': this.last_name,
					'phone': this.phone,
					'address': this.address,
					'city': this.city,
					'email': this.email,
					'postcode': this.postcode,
					'send_mail': this.send_mail,
					'payment_method': this.payment_method,
					'total_sum': this.total_sum
					}
					console.log(client)

					var order = {
						'products' : this.bag,
						'client': client
					};
					localStorage['order'] = JSON.stringify(order);
					localStorage['bag'] = JSON.stringify([])
					this.$emit('bagCount',0 )
					this.$router.push({path:'/infoOrder'})
				}
			}
		}
		else
        this.err = "check the correctness of the fields";
	}
  }
}


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.info_bag{
	text-align:left;
}

.add_bag_btn{
	background-color : black;
	color: white;
}

.large{
	width:100%;
	margin-bottom:20px;
}

.line{
	height:2px;
	background-color:lightgrey;
	margin: 20px 0;
}

.total{
	font-size:17px;
	font-weight:bold;
}

.payment{
	margin-left:30px;
}

.small_check{
	font-size:12px;
	font-weight:bold;
}

#err{
	margin-top: 10px;
	text-align:center;
	color: red;
}
</style>
