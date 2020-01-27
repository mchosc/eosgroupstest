
import {getLogoForToken} from "../../imports/tokens.js";
import {notifyError, notifySuccess} from '../../imports/notifications.js';
import { colors } from 'quasar';
// destructuring to keep only what is needed
const { setBrand } = colors;

import {
  Loading
} from 'quasar'

// // default options
// Loading.show()

// // fully customizable
// Loading.show({
//   spinner: QSpinnerGears,
//   // other props
// })

// Loading.hide()


export async function loadGroupRoutine ({ dispatch, commit, rootGetters }, payload) {
    // Loading.show({
    //   spinnerColor: 'white',
    //   messageColor: 'white',
    //   customClass: 'bg-black',
    //   message: 'Updated message'
    // })
    const groupname = payload.groupname;
    let groupconfig = await dispatch("fetchGroupConfig", groupname);
    if(!groupconfig){
      console.log(`group ${groupname} doesn't exist.`)
      this.$router.push({path: '/create'});
      return;
    }
    const c = groupconfig.ui.hexcolor[0]=='#' ? groupconfig.ui.hexcolor : `#${groupconfig.ui.hexcolor}`;
    setBrand('primary', c);

    // Loading.show({
    //   spinnerColor: 'white',
    //   messageColor: 'white',
    //   customClass: 'bg-primary',
    //   message: 'Updated message'
    // })
    // Loading.hide();
    
    
    commit('setActiveGroupConfig', groupconfig);
    commit('setActiveGroup', groupname);

    dispatch('fetchCoreConfig', groupname);

    dispatch('fetchAccount', groupname);
    dispatch('fetchCustodians', groupname);

    dispatch('fetchProposals', {groupname: groupname, scope: groupname});
    dispatch('fetchProposals', {groupname: groupname, scope: "cancelled"});
    dispatch('fetchProposals', {groupname: groupname, scope: "executed"});

    dispatch('fetchThresholds', groupname);
    dispatch('fetchThresholdLinks', groupname);
    dispatch('fetchTokensOwnedByScope', {groupname: groupname, scope: groupname});
    dispatch('fetchCoreState', groupname);
    
}

export async function fetchCoreConfig ({ commit, rootState, rootGetters }, groupname) {
  let res = await this._vm.$eos.rpc.get_table_rows({
    json: true,
    code: groupname,
    scope: groupname,
    table: "coreconf",
    limit: 1
  });

  if(res && res.rows[0]){
    console.log(`fetched CoreConfig ${groupname}`, res.rows[0] );
    commit('setCoreConfig', res.rows[0]);
    let clone = JSON.parse(JSON.stringify(res.rows[0]));
    commit('setNewCoreConfig', clone);
    
  }
}

export async function fetchCoreState ({ commit, rootState, rootGetters }, groupname) {
  let res = await this._vm.$eos.rpc.get_table_rows({
    json: true,
    code: groupname,
    scope: groupname,
    table: "corestate",
    limit: 1
  });

  if(res && res.rows[0]){
    console.log(`fetched CoreState ${groupname}`, res.rows[0] );
    commit('setCoreState', res.rows[0]);
  }

}

export async function fetchGroupConfig ({ commit, rootState, rootGetters }, groupname) {
  let res = await this._vm.$eos.rpc.get_table_rows({
    json: true,
    code: rootState.app.config.groups_contract,
    scope: rootState.app.config.groups_contract,
    lower_bound: groupname,
    upper_bound: groupname,
    table: "groups",
    limit: -1
  });
  if(res && res.rows[0] && res.rows[0].groupname == groupname){
    return res.rows[0];
  }
  else{
    console.log(`fetching group config ${groupname} failed`);
    return false;
  }
}

export async function fetchChildAccounts ({ commit, rootState, rootGetters }, groupname) {
  let res = await this._vm.$eos.rpc.get_table_rows({
    json: true,
    code: groupname,
    scope: groupname,
    table: "childaccount",
    limit: -1
  });
  if(res && res.rows.length){
    commit('setChildAccounts', res.rows);
    return res.rows;
  }
  else{
    console.log(`fetching group config ${groupname} failed`);
    return false;
  }
}


export async function fetchAccount ({ commit, rootState, rootGetters }, groupname) {
  //let account = rootGetters.getAccountName ||
  if(!groupname) return;
  let res = await this._vm.$eos.rpc.get_account(groupname);
    if(res ){
      console.log(res)
      commit('setGroupAccount', res);
    }
}

export async function fetchCustodians ({ state, commit }, groupname) {
    let res = await this._vm.$eos.rpc.get_table_rows({
        json: true,
        code: groupname,
        scope: groupname,
        table: "custodians",
        limit: -1
      });
      if(res && res.rows){
        console.log(`fetched custodians for group ${groupname}`, res.rows);
        commit('setCustodians', res.rows);
      }
      else{
        console.log(`fetching custodians for group ${groupname} failed`);
      }
}

export async function fetchProposals ({ state, commit }, payload ) {
  let res = await this._vm.$eos.rpc.get_table_rows({
      json: true,
      code: payload.groupname,
      scope: payload.scope || payload.groupname,
      table: "proposals",
      reverse: true,
      limit: -1
    });
    if(res && res.rows){
      console.log(`fetched proposals for group ${payload.groupname}`, res.rows);
      res = res.rows;
      commit('setProposals', {scope: payload.scope, data:res});
    }
    else{
      console.log(`fetching proposals for group ${payload.groupname} failed`);
    }
}

export async function fetchThresholds ({ state, commit }, groupname) {

  let res = await this._vm.$eos.rpc.get_table_rows({
      json: true,
      code: groupname,
      scope: groupname,
      table: "thresholds",
      limit: -1
    });
    if(res && res.rows){
      console.log(`fetched thresholds for group ${groupname}`, res.rows);
      res = res.rows;
      commit('setThresholds', res);
    }
    else{
      console.log(`fetching thresholds for group ${groupname} failed`);
    }
}

export async function fetchThresholdLinks ({ state, commit }, groupname) {

  let res = await this._vm.$eos.rpc.get_table_rows({
      json: true,
      code: groupname,
      scope: groupname,
      table: "threshlinks",
      limit: -1
    });

    if(res && res.rows){
      console.log(`fetched thresholdlinks for ${groupname}`, res.rows);
      commit('setThresholdLinks', res.rows);
    }
    else{
      console.log(`fetched thresholdlinks for ${groupname} failed`);
    }
}

export async function fetchThresholdLinksForScope ({ state, commit }, payload) {
  let groupname = payload.groupname;
  let scope = payload.scope;
  let res = await this._vm.$eos.rpc.get_table_rows({
      json: true,
      code: groupname,
      scope: scope,
      table: "actionslinks",
      limit: -1
    });
    if(res && res.rows){
      console.log(`fetched actionslinks for ${scope} for group ${groupname}`, res.rows);
      res = res.rows;
      // commit('setThresholds', res);
    }
    else{
      console.log(`fetching actionlinks for ${scope} for group ${groupname} failed`);
    }
}


export async function fetchTokensOwnedByScope ({ state, commit }, payload) {

  let groupname = payload.groupname;
  let scope = payload.scope;

  let res = await this._vm.$eos.rpc.get_table_rows({
    json: true,
    code: groupname,
    scope: scope,
    table: "balances",
    limit: -1
    });

    if(res && res.rows){
      console.log(`fetched tokens owned by ${scope} for group ${groupname}`, res.rows);
      //for each token get the icon
      res.rows = res.rows.map(t =>{
        let[amount, symbol] = t.balance.quantity.split(" ");
        t = t.balance;
        t.amount = amount;
        t.symbol = symbol;
        t.precision = amount.includes('.') ? amount.split('.')[1].length : 0;
        t.logo = getLogoForToken(t.contract, t.symbol);
        t.loading = false;
        return t;
      })
      commit('setGroupWallet', res.rows);
    }
    else{
      console.log(`fetched tokens owned by ${scope} for group ${groupname} faild`);
    }
}


export async function propose({ state, rootState, dispatch, commit }, payload) {
  // return_action: false
  // description:"",
  // title:"",
  // expiration:",
  // actions: []

  let active_period = (60*60*24*7)*1000;
  let default_expiration = new Date(Date.now()+active_period).toISOString().split('.')[0]; //"2019-12-03T00:28:24.215Z"

  let propose_action = {
    account: state.activeGroup,
    name: "propose",
    data:{
      proposer: rootState.ual.accountName,
      title: payload.title,
      description: payload.description,
      actions:[],
      expiration: payload.expiration || default_expiration
    }
  };

  for(let i = 0; i < payload.actions.length; ++i){
    let action = payload.actions[i];
    if(!action.authorization){
      action.authorization = [{actor: state.activeGroup, permission: "owner"}];
    }
    if(action.hex != undefined){
      action.data = action.hex;
      delete action.hex;
    }
    if(typeof action.data == 'object'){
      const contract = await this._vm.$eos.getContract(action.account);
      action = this._vm.$eos.Serialize.serializeAction(contract, action.account, action.name, action.authorization, action.data);
    }
    propose_action.data.actions.push(action);
  }

  if(payload.return_action === true){
    return propose_action;
  }

  const propose_payload = {
    disable_signing_overlay: true,
    actions: [propose_action]
  }

  let res = await dispatch('ual/transact', propose_payload, {root:true});
  
  if(res && res.transactionId && res.status == "executed"){

    let block_time = res.transaction.processed.block_time.split('.')[0];
    commit('setCustodianLastActive', {custodian: rootState.ual.accountName, block_time: block_time});

    if(propose_payload.actions[0].account==state.activeGroup){
      let action_name = propose_payload.actions[0].name;
      switch (action_name) {
        case 'propose':
          setTimeout(()=>{
            dispatch('fetchProposals', {groupname: state.activeGroup, scope: state.activeGroup} );
          },1000);
          break;

        default:
          break;
      }   
    }

  } 
  return res;

}


