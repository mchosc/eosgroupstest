export async function loggedInRoutine ({ dispatch }, payload) {

  dispatch('fetchAccount', payload.accountname);
  dispatch('fetchIsMember', payload.accountname);//only when on group page !!!!!!!!!!!!!!!!!!

}

export async function loggedOutRoutine ({ dispatch, commit }) {

  commit('setAccount', false);
  commit('setIsMember', false);
}




export async function fetchAccount ({ commit, rootState, rootGetters }, accountname) {
  //let account = rootGetters.getAccountName ||
  if(!accountname) return;
  let res = await this._vm.$eos.rpc.get_account(accountname);
    if(res ){
      console.log('Fetched User Account', res);
      commit('setAccount', res);
    }
}

export async function fetchIsMember ({ commit, rootState, rootGetters }, accountname) {
  let res = await this._vm.$eos.rpc.get_table_rows({
      json: true,
      code:   rootState.group.activeGroup,
      scope:   rootState.group.activeGroup,
      lower_bound: accountname,
      upper_bound: accountname,
      table: "members",
      limit: 1

    });
    if(res && res.rows.length){
      if(res.rows[0].account == accountname){
        console.log('fetched isMember', res.rows[0]);
        commit('setIsMember', res.rows[0]);
      }
    }
}



