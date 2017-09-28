<template>
	<div  class="gallery col-sm-6 col-md-4 clearfix">
			<div id = "main_pic" class="clearfix">
				<div id="main_img">
							<img :src="images[currentNumber % images.length]"
								 class="img-responsive"
								 v-on:mouseover="stopRotation"
								 v-on:mouseout="startRotation"
							/>
				</div>
				<div id="cursors">
					<a id="left_cur" @click="prev">
						<span class="glyphicon glyphicon-chevron-left"></span>
					</a>
					<a id="right_cur" @click="next">
						<span class="glyphicon glyphicon-chevron-right"></span>
					</a>
				</div>
			</div>

			<div class="mini clearfix">
				<div class="miniature thumbnail" v-for="image,i in images" :image="image"  @click='changeImage(i)'>
					<img :src="image" 
						  class="img-responsive"
						  v-on:mouseover="stopRotation"
						  v-on:mouseout="startRotation" 
					/>
				</div>
			</div>
		</div>
</template>

<script>
export default {
  name: 'gallery',
  props: ['images'],
  data () {
    return {
	    currentNumber: 0,
	    timer: null,
	    show:true,
	    isActive: true,
	    isNotActive: false
    }
  }, 
  created(){
		this.startRotation()
  },
  methods:{
	changeImage(i){
		this.currentNumber = i
	},
	
	startRotation: function() {
            this.timer = setInterval(this.next, 2000);
    },

    stopRotation: function() {
        clearTimeout(this.timer);
        this.timer = null;
    },
	
    next: function() {
        this.currentNumber += 1
    },
	
	prev: function() {
        this.currentNumber -= 1
    }
  }
}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#main_img{
	margin-top:30px;
}

#main_img img{
	max-height:300px;
	min-height:300px;
}

.miniature {
	float:left;
	margin-right:20px;
	margin-bottom:5px;	
}

.miniature img{
	height:100px;
	max-width:100px;
}

.none{
	display:none;
}

.block{
	display:block;
}

.active{
  display:block;
  margin:0 auto;
}

#left_cur, #right_cur
{
	color:red;
	cursor:pointer;
}

#left_cur{
	position:relative;
	top: -170px;
	float:left;
}

#right_cur{
	position:relative;
	top: -170px;
	float:right;
}

#cursors{
	height:30px;
}
</style>