<template>
  <div>
    
    <q-btn-dropdown
      split
      flat 
      color="white"
      dark
      @click="handleLoginClick"
      :loading="getShouldRenderLoginModal"
      dropdown-icon="keyboard_arrow_down"
    >

      <template v-slot:label>
        <div class="row items-center justify-between no-wrap">
          
          <q-btn flat  class="bg-secondary q-mr-sm networkbuttonhover" round :icon="`img:statics/images/networks/${getActiveNetwork}.png`" size="sm">
            <q-tooltip content-class="bg-secondary" :delay="500">
              <div v-if="getAccountName">
                {{`You are connected to ${getActiveNetwork} with ${getSESSION.authenticatorName}`}}
              </div>
              <div v-else>
                {{`Connect to ${getActiveNetwork}`}}
              </div>
            </q-tooltip>
          </q-btn>
          
          <profile-pic v-if="getAccountName" :size="28"  :icon="getIsCustodian(getAccountName)?'mdi-star':''" iconColor="primary"  account="" class="q-mr-xs"/>
          <div class="text-center">{{getAccountName ? getAccountName : 'login'}}</div>
          
        </div>
      </template>


      <q-list dark class="bg-secondary" separator >

        <q-item v-if="getAccountName" clickable v-close-popup @click="$store.dispatch('ual/logout')" class="bg-primary">
          <q-item-section avatar>
            <q-icon name="mdi-account-off" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Logout </q-item-label>
            <q-item-label caption>network {{getActiveNetwork}}</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable v-close-popup @click="handleNetworkClick(network.key)" v-for="network in networks" :key="network.label">
          <q-item-section avatar>
            <q-icon :name="network.icon" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{network.label}}</q-item-label>
            <q-item-label caption v-if="network.msg">{{network.msg}}</q-item-label>
          </q-item-section>
          <!-- <q-item-section side>
            <q-icon name="info" color="amber" />
          </q-item-section>-->
        </q-item>
      </q-list>
    </q-btn-dropdown>
    
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import {notifyError} from '../../imports/notifications.js';
import profilePic from "components/profile-pic";
export default {
  // name: 'ComponentName',
  components:{
    profilePic
  },
  data() {
    return {
      selected_network: null,
      networks: [
        {
          label: "Jungle",
          key: "jungle",
          icon: "img:statics/images/networks/jungle.png",
          msg: "active: beta version"
        },
        {
          label: "Mainnet",
          key: "mainnet",
          icon: "img:statics/images/networks/mainnet.png",
          msg: "coming soon"
        },
        {
          label: "Kylin",
          key:"kylin",
          icon: "img:statics/images/networks/kylin.png",
          msg: "coming soon"
        },

      ]
    };
  },
  computed: {
    ...mapGetters({
      getAccountName: "ual/getAccountName",
      getShouldRenderLoginModal: "ual/getShouldRenderLoginModal",
      getActiveNetwork: "ual/getActiveNetwork",
      getSESSION: "ual/getSESSION",
      getIsCustodian: "group/getIsCustodian",
    })
  },
  methods:{
    handleLoginClick(){
      if(!!!this.getAccountName){
        this.$store.dispatch('ual/renderLoginModal')
      }
      
    },
    async handleNetworkClick(network_key){
      if(network_key == this.getActiveNetwork && !!this.getAccountName){
        notifyError({message:`You are already connected to ${network_key}`});
        return;
      }
      if(!!this.getAccountName){
        await this.$store.dispatch('ual/logout');
      };
      this.$store.commit("ual/setActiveNetwork", network_key);
      await this.$store.dispatch("ual/initUAL");
      this.$store.dispatch('ual/renderLoginModal');
    }
  },
};
</script>

<style>

.networkbuttonhover:hover {
  background-color: black!important;
}
  
</style>
