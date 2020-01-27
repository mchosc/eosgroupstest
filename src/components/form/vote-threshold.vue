<template>
  <div>
    
    <div class=" row q-col-gutter-md ">

      <div class=" col-xs-4">
        <integer-input v-model="thresholdHigh" label="High" :max="4"/>
      </div>

      <div class=" col-xs-4">
        <integer-input v-model="thresholdMed" label="Med"/>
      </div>

      <div class=" col-xs-4">
        <integer-input v-model="thresholdLow" label="Low" />
      </div>

    </div>

    
  </div>
</template>

<script>
import integerInput from 'components/form/integer-input'
export default {
  // name: 'ComponentName',
  components:{
    integerInput
  },
  data () {
    return {
      thresholdHigh:5,
      thresholdMed:0,
      thresholdLow:0,
    }
  },
  methods:{
    handleKeyDown($event){
      let keycode = ($event.keyCode ? $event.keyCode : $event.which);
      console.log(keycode)
      if(keycode == 190 || keycode ==110 || keycode == 229){
        $event.preventDefault();
      }
    },
    handleInput(e){
      // thresholdHigh = $refs.test.$refs.input.valueAsNumber  = parseInt($event)
      valueAsNumber
      console.log(this.$refs.test.$refs)
      console.log(e)
    }

  }
}
</script>

<style>
</style>
