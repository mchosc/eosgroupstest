<template>
      <q-list class="primary-hover-list bg-grey-3" :style="`border-right: 1px solid #D1D1D1 `" separator>

        <q-item clickable :to="`/members/${getActiveGroup}/dashboard`">
          <q-item-section avatar>
            <q-icon name="mdi-view-dashboard" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Dashboard</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable :to="`/members/${getActiveGroup}/register`">
          <q-item-section avatar>
            <q-icon name="mdi-account-plus" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Register</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable :to="`/members/${getActiveGroup}/vote`">
          <q-item-section avatar>
            <q-icon name="mdi-vote" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Vote</q-item-label>
            <!-- <q-item-label caption>mining stats</q-item-label> -->
          </q-item-section>
        </q-item>

    
      </q-list>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: 'managementmenu',
  data () {
    return {}
  },
  computed: {
    ...mapGetters({
      getActiveGroup: "group/getActiveGroup",
    })
  },

}
</script>
