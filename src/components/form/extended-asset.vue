<template>
  <div>
    <find-account />
  </div>
</template>

<script>
import findAccount from 'components/form/find-account'
export default {
  name: 'extendedAsset',
  components:{
    findAccount
  },
  data () {
    return {
      model_contract:'',
      model_symbol: '',
      model_amount: ''
    }
  }
}
</script>

<style>
</style>
