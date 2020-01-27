<template>
<div>
  <div v-if="getGroupWallet.length">
    <q-item clickable @click.native="toggleTokenSelector" id="tokendisplay">
      <q-item-section avatar>
        <q-img
          contain
          :src="getGroupWallet[selected_token_index].logo"
          spinner-color="white"
          style="height: 60px; width: 60px"
        />
      </q-item-section>

      <q-item-section>
        <q-item-label class="text-weight-light text-h6">
          <span>{{ getGroupWallet[selected_token_index].amount }}</span>
          <span class="text-weight-bold">
            {{ getGroupWallet[selected_token_index].symbol }}</span
          >
        </q-item-label>
        <q-item-label caption>Group Balance</q-item-label>
      </q-item-section>
      <q-item-section> </q-item-section>
    </q-item>

    <div class="q-mb-md">
      <q-select
        hide-dropdown-icon
        ref="token_selector"
        v-model="selected_token_index"
        :options="tokenoptions"
        filter
        hide-selected
        emit-value
        use-input
        @filter="filterFn"
        placeholder="Find token"
        for="tokendisplay"
        @popup-show="token_selector_popup = true"
        @popup-hide="token_selector_popup = false"
        autocomplete="off"
      >
        <template v-slot:prepend>
          <q-icon name="search" class="q-ml-md" />
        </template>
        <template v-slot:selected>
          {{ getGroupWallet[selected_token_index].symbol }}
        </template>

        <template v-slot:option="scope">
          <q-item v-bind="scope.itemProps" v-on="scope.itemEvents">
            <q-item-section avatar>
              <q-icon :name="scope.opt.icon" />
            </q-item-section>
            <q-item-section>
              <q-item-label v-html="scope.opt.label" />
              <q-item-label caption>{{ scope.opt.description }}</q-item-label>
            </q-item-section>
          </q-item>
        </template>
        <template v-slot:no-option>
          <q-item>
            <q-item-section class="text-italic text-grey">
              No Tokens
            </q-item-section>
          </q-item>
        </template>
      </q-select>
    </div>

    <!-- <pre>{{ transfer_action }}</pre> -->

    <div class="column q-gutter-md">
      <q-input
        outlined
        label="From"
        readonly
        v-model="transfer_action.data.from"
        placeholder="Receiver"
      />
      <q-input
        outlined
        label="To"
        v-model="transfer_action.data.to"
        placeholder="Receiver"
      />
      <q-input
        type="number"
        outlined
        label="Quantity"
        v-model="transfer_action.data.quantity"
        placeholder="Amount"
      >
        <template v-slot:append>
          <div>{{ getGroupWallet[selected_token_index].symbol }}</div>
        </template>
      </q-input>
      <q-input
        label="Memo"
        v-model="transfer_action.data.memo"
        outlined
        type="textarea"
        placeholder="Memo"
      />
      <div class="row justify-end">
        <div style="height:40px">
        <propose-bucket-btn
          @click-propose="emitPropose"
          @click-bucket="emitBucket"
          label="transfer"
          :disabled="false"
        />
        </div>
  
      </div>
    </div>
  </div>
  <div v-else class="text-grey-7 text-weight-light">
    Group doesn't own any tokens. Transfer to "<b>{{getActiveGroup}}</b>" to fund the group.
  </div>
  </div>
  <!-- {{ getGroupWallet }} -->
</template>

<script>
import { mapGetters } from "vuex";
import proposeBucketBtn from "components/actions/propose-bucket-btn";
export default {
  name: "groupWallet",
  components: {
    proposeBucketBtn,

  },
  data() {
    return {
      token_selector_popup: false,
      tokenoptions: [],
      needle: "",
      selected_token_index: 0,
      view: "transfer",
      transfer_action: {
        account: "",
        name: "transfer",
        data: {
          from: this.$store.state.group.activeGroup,
          to: "",
          quantity: "",
          memo: ""
        }
      },
      description: "",
      title: ""
    };
  },
  computed: {
    ...mapGetters({
      getAccountName: "ual/getAccountName",
      getGroupWallet: "group/getGroupWallet",
      getActiveGroup: "group/getActiveGroup",
      getThresholdLinks: "group/getThresholdLinks"
    }),
    getTokenSelectOptions() {
      if (this.getGroupWallet.length) {
        let options = this.getGroupWallet.map((t, i) => {
          // console.log(t, i);
          let option = {
            label: t.symbol,
            value: i,
            description: t.quantity,
            icon: `img:${t.logo}`
          };
          return option;
        });

        return options;
      }
    }
  },
  methods: {
    toggleTokenSelector() {
      if (!this.token_selector_popup) {
        this.$refs.token_selector.showPopup();
      }
    },

    emitPropose(){
      // this.$refs.quant.validate()
      // if(this.$refs.quant.hasError){
      //   return;
      // }
      let action = JSON.parse(JSON.stringify(this.transfer_action))
      let token = this.getGroupWallet[this.selected_token_index];
      action.account = token.contract;
      action.data.from = this.getActiveGroup;
      action.data.quantity =
        Number(action.data.quantity).toFixed(token.precision) +
        " " +
        token.symbol;

      const payload = {
        actions: [action],
        description: `This is a default description`,
        title: `Transfer ${action.data.quantity}`    
      }
      this.$emit('propose', payload);
    },
    emitBucket(){
      // this.$refs.quant.validate()
      // if(this.$refs.quant.hasError){
      //   return;
      // }
      let action = JSON.parse(JSON.stringify(this.transfer_action))
      let token = this.getGroupWallet[this.selected_token_index];
      action.account = token.contract;
      action.data.from = this.getActiveGroup;
      action.data.quantity =
        Number(action.data.quantity).toFixed(token.precision) +
        " " +
        token.symbol;

      this.$emit('addtobucket', action);  
    },


    filterFn(val, update) {
      if (val === "") {
        update(() => {
          this.tokenoptions = this.getTokenSelectOptions;
        });
        return;
      }
      // console.log(val);
      update(() => {
        this.tokenoptions = this.getTokenSelectOptions.filter(v =>
          v.label.includes(val.toUpperCase())
        );
      });
    }
  },

  watch: {}
};
</script>
