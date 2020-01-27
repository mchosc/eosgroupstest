import {colors} from "quasar";
const {getBrand} = colors;

let CLOCK_TIMER = null;

export async function initRoutine ({ dispatch }) {

    //dispatch('fetchGroups');


    // dispatch('fetchAllowedFeeTokens');
    // dispatch('fetchCronjobsByScope');
    // dispatch('fetchBlacklist');
    
}

export async function fetchGroups ({ state, commit, rootGetters }) {
    let res = await this._vm.$eos.rpc.get_table_rows({
        json: true,
        code: state.config.groups_contract,
        scope: state.config.groups_contract,
        table: "groups",
        limit: -1
      });
      if(res && res){
        console.log('fetched groups',res.rows);

        res = res.rows;
        res.map(g =>{
          g.is_fav = rootGetters["user/getIsFavouriteGroup"](g.groupname);
          g.ui.hexcolor = g.ui.hexcolor || getBrand('primary');
          return g;
        })

        commit('setGroups', res);
      }
      else{
          console.log('fetching groups failed');
      }
}

export function startClock ({commit}) {
    if(!CLOCK_TIMER){
      console.log('clock started')
      commit("setCLOCK", Date.now() );
      this.CLOCK_TIMER = setInterval(() => {
          commit("setCLOCK", Date.now() );
      }, 1000);
    }
}

export function stopClock () {
    console.log('clock stopped')
    clearInterval( CLOCK_TIMER );
    CLOCK_TIMER = null;
}

