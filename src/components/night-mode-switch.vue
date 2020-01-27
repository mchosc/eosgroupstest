<template>
  <div>
    <q-btn icon="" color="primary"  @click="toggleNightMode" >
      <q-icon name="mdi-theme-light-dark" :class="{'rotate-180': getIsDark }" />
    </q-btn>
  </div>
</template>



<script>
import { mapGetters } from "vuex";
export default {
  // name: 'ComponentName',
  data () {
    return {}
  },
  computed: {
    ...mapGetters({
      getIsDark: "user/getIsDark",

    })

  },
  methods:{
    toggleNightMode(){
      this.$q.dark.toggle();
      this.$store.commit('user/setIsDark', !this.getIsDark );
      
    }
  }

}
</script>
