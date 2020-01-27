<template>
  <q-page padding class="constrain-page-width">
   <page-header title="Vote"/>

  </q-page>
</template>

<script>
import { mapGetters } from "vuex";

import pageHeader from "components/page-header";

export default {
  name: "vote",
  components: {
    pageHeader
  },
  data() {
    return {

    };
  },
  computed: {
    ...mapGetters({
      getAccountName: "ual/getAccountName",
      // getActiveGroup: "group/getActiveGroup",
      // getActiveGroupConfig: "group/getActiveGroupConfig",
      // getNumberCustodians: "group/getNumberCustodians"
    })
  },
  methods: {

  }

};
</script>
