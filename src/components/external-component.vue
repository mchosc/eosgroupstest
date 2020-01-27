<template>
  <div>
    {{component}}
    <component :is="" />
  </div>
</template>

<script>
export default {
  // name: 'ComponentName',
  data () {
    return {
      link: "https://raw.githubusercontent.com/CRONEOS/croneos-frontend/master/src/components/main-logo.vue",
      component: ''
    }
  },
  methods:{
    async loadComponent(){
      return await import(this.link); 
    }
  },
  async mounted(){
    this.component = await this.loadComponent();
    console.log(this.component)
  }
}
</script>
