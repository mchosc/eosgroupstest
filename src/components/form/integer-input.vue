<template>
        <div class="row  fit  no-wrap overflow-hidden non-selectable" v-touch-swipe.mouse.up.down="handleSwipe">
          <div class=" column fit relative-position " >
            
            <div class="value-container fit column justify-center items-center text-weight-bold inset-shadow" >
              <transition :enter-active-class="enter_active" :leave-active-class="leave_active" mode="out-in">
                <div v-if="!too_high_warning && !too_low_warning" :key="model_value">{{model_value}}</div>
                <div v-if="too_high_warning" class="text-negative" key="too_high">{{model_value+1}}</div>
                <div v-if="too_low_warning"  class="text-negative" key="too_low">{{model_value-1}}</div>
              </transition>
            </div>
            <div class="absolute-top-left text-caption q-pl-xs bg-secondary q-pr-xs " style="border-bottom-right-radius:4px">{{label}}</div>
          </div>
          <div class="column bg-secondary rounded-borders-right items-center justify-center" style="width:60px" >
            <q-btn  icon="ion-arrow-dropup" dense round flat color="white"   @click="increment" />
            <q-btn  icon="ion-arrow-dropdown" dense round flat color="white" @click="decrement"/>
          </div> 
      </div>
</template>

<script>
export default {
  name: 'integerInput',
  props:{
    value:0,
    min:{
      type: Number,
      default:0
    },
    max:{
      type: Number,
      default:0
    },
    label:{
      type: String,
      default: 'label'
    }
  },
  data () {
    return {
      model_value: this.value,
      enter_active:'',
      leave_active:'',
      too_high_warning: false,
      too_low_warning: false
    }
  },
  methods:{
    increment(){
      if(this.max==0 || this.model_value < this.max){
        this.too_low_warning =false;
        this.enter_active='animated fadeInUp';
        this.leave_active='animated fadeOutUp';
        this.model_value++;
        this.$emit('input', this.model_value);
      }
      else{
        this.enter_active='animated fadeInUp';
        this.leave_active='animated fadeOutUp';
        this.too_high_warning =true;
        setTimeout(()=>{
        this.enter_active='animated fadeInDown';
        this.leave_active='animated fadeOutDown';
          this.too_high_warning = false;
        },700)
      }
      
    },
    decrement(){
      if(this.model_value > this.min){
        this.too_high_warning =false;
        this.enter_active='animated fadeInDown';
        this.leave_active='animated fadeOutDown';
        this.model_value--;
        this.$emit('input', this.model_value)
      }
      else{
        this.enter_active='animated fadeInDown';
        this.leave_active='animated fadeOutDown';

        this.too_low_warning =true
        setTimeout(()=>{
        this.enter_active='animated fadeInUp';
        this.leave_active='animated fadeOutUp';
          this.too_low_warning = false;
        },700)
      }
  
    },
    handleSwipe({ evt, ...info }){
      console.log(info)
      if(info.duration < 500){
        if(info.direction =="up"){
          this.increment()
        }
        else{
          this.decrement();
        }
      }
      
    }


  },
  watch:{
      max:{
        handler: function(newmax){
          if(newmax < this.model_value){
            console.log('auto set to new max', newmax, this.model_value)
            this.model_value = newmax;
            this.$emit('input', this.model_value);
          }
        },
        immediate: true
      },
      min:{
        handler: function(newmin){
          
          if(newmin > this.model_value){
            console.log('auto set to new min', newmin, this.model_value)
            this.model_value = newmin;
            this.$emit('input', this.model_value);
          }
        },
        immediate: true
      }
  }
}
</script>

<style>

.value-container{
 
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  border-left:1px solid  var(--q-color-secondary);
  border-top:1px solid  var(--q-color-secondary);
  border-bottom:1px solid  var(--q-color-secondary);
}
</style>
