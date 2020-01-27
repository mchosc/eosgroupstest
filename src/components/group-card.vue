<template>
  <div>
    <q-card
      v-if="group.state"
      class="full-height"
      :style="{ backgroundColor: group.ui.hexcolor }"
    >
      <!-- <clap-for-group class="absolute"/> -->
      <q-tab-panels v-model="view_mode"/>
      <q-tab-panel name="main" class="no-padding full-height">
      <div class="column justify-between full-height overflow-hidden">
        <div
          class="row text-uppercase justify-center items-center text-white text-weight-light"
          style="min-height:115px"
        >
          <q-img
            contain
            v-if="group.ui.logo"
            :src="group.ui.logo"
            style=" max-width:70%; filter: brightness(0) invert(1); max-height:70px"
            spinner-color="white"
          >
            <q-tooltip content-class="bg-secondary" :delay="500">
              account: {{ group.groupname }}
            </q-tooltip>
          </q-img>

          <div v-else>{{ group.groupname }}</div>
        </div>
        <group-tags :tags="group.tags" class="text-white q-mb-xs" />

        <div
          style="background: rgba(0,0,0,0.1); height:60px"
          class="full-width row justify-between items-center"
        >
          <div>
            <q-btn
              round
              :color="group.is_fav ? 'yellow' : 'white'"
              flat
              icon="star"
              size="md"
              @click="
                $store.commit('user/setFavouriteGroups', group.groupname);
                group.is_fav = !group.is_fav;
              "
            />
          </div>
          <div>
            <q-btn
              label="Visit Group"
              :to="`./manage/${group.groupname}`"
              flat
              size="sm"
              text-color="white"
              :style="{ backgroundColor: group.ui.hexcolor }"
            />
          </div>
        </div>
      </div>
      </q-tab-panel>
      </q-tab-panels>

      <!-- {{group}} -->
    </q-card>
  </div>
</template>

<script>
import clapForGroup from "components/clap-for-group";
import groupTags from "components/group-tags";
export default {
  // name: 'ComponentName',
  components: {
    clapForGroup,
    groupTags
  },
  props: {
    group: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  data() {
    return {
      view_mode: 'main'
    };
  }
};
</script>
