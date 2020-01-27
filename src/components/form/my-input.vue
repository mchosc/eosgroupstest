<template>
  <div class="overflow-hidden">
    <q-input
      autocomplete="off"
      ref="my_input"
      :type="type"
      :dark="dark"
      :color="color"
      outlined
      noErrorIcon
      bottom-slots
      :value="value"
      :label="label"
      :counter="counter"
      :maxlength="maxlength"
      :dense="dense"
      @input="handleInput"
      @blur="onBlur"
      :rules="[ ...rules ]"
      :debounce="debounce"
      :hide-hint="false"
      :items-aligned="false"
      :mask="mask"


      class="q-mb-md overflow-hidden q-input-bg"

    >
      <template v-if="iconLeft" v-slot:prepend>
        <q-icon :name="iconLeft" @click="$emit('clicked_left_icon')"/>
      </template>
      <template  v-slot:append v-if="isMounted">
        <transition enter-active-class="animated fadeInRight" leave-active-class="animated fadeOutRight" mode="out-in">
          <q-icon v-if="!!$refs.my_input && $refs.my_input.isDirty && !$refs.my_input.hasError && validationSuccess()" name="check" color="positive" key="ok" />
          <q-icon v-else-if="!!$refs.my_input && $refs.my_input.hasError && validationError()" name="close" color="negative" key="error"/>
        </transition>
      </template>

      <template v-slot:hint><div v-if="showhint">{{hint}}</div></template>


    </q-input>

  </div>
</template>

<script>
export default {
inheritAttrs: false,
  // name: 'ComponentName',
  props: {
    value:'',
    color: {
      type: String,
      default: "primary"
    },
    type: {
      type: String,
      default: "text"
    },
    label: {
      type: String,
      default: "Accountname"
    },
    dark: {
      type: Boolean,
      default: true
    },
    counter: {
      type: Boolean,
      default: true
    },
    maxlength:{
      type:String,
      default:''
    },
    hint:{
      type: String,
      default: "this is a input hint"  
    },
    dense: {
      type: Boolean,
      default: false
    },
    iconLeft: {
      type: String,
      default: ""
    },
    iconRight: {
      type: String,
      default: ""
    },
    rules:{
      type: Array,
      default: () => []
    },
    mask:{
      type: String,
      default:''
    },
    validateOnMounted:{
      type: Boolean,
      default: true
    },
    debounce:{
      type: Number,
      default: 500
    },
    // min: {
    //   type: Number,
    //   default: 0
    // },
    // step: {
    //   type: Number,
    //   default: 0
    // },
  },
  data() {
    return {
     showhint:true,
     isMounted:false
    };
  },
  methods:{
    handleInput(v){
      //todo only emit if validated
      // this.$refs.my_input.validate();
      if(this.type =="number"){
        v = Number(v);
      }
      console.log(this.$refs.my_input);
      this.$emit('input', v);
      
    },

    validationSuccess(){
      this.showhint=false;
      this.$emit('statusChange', {value: this.value, error: false});
      return true;
    },
  
    validationError(){
      this.showhint=true;
      this.$emit('statusChange', {value: this.value, error: true});
      return true;
    },

    onBlur(){
      if(this.value == '' ){
        setTimeout(()=>{
          this.$refs.my_input.resetValidation();
        },2000)
      }
    }

  },
  mounted(){
    if(this.value !='' && this.validateOnMounted){
      console.log('validation on mounted triggered')

      this.$refs.my_input.validate();
      
      
      

    }
    this.isMounted=true;
  }

};
</script>

<style>
</style>
