import Vue from "vue";
const crypto = require('crypto');

export function randomName () {
  let name = ''
  let possible = 'abcdefghijklmnopqrstuvwxyz12345.'
  for (let i = 0; i < 12; i++) {
    name += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return name
}

export function sha256(content){
  return crypto.createHash(`sha256`).update(content).digest(`hex`)
}

export function secondsToDhms(seconds) {
  seconds = Number(seconds);
  if(seconds < 0) return "";
  var d = Math.floor(seconds / (3600*24));
  var h = Math.floor(seconds % (3600*24) / 3600);
  var m = Math.floor(seconds % 3600 / 60);
  var s = Math.floor(seconds % 60);
  var dDisplay = d > 0 ? `${d}` + (d == 1 ? " day" : " days") : "";
  var hDisplay = h > 0 ? `, ${h}` + (h == 1 ? " hour" : " hours") : "";
  var mDisplay = m > 0 ? `, ${m}` + (m == 1 ? " minute" : " minutes") : "";
  var sDisplay = s > 0 ? `, ${s}` + (s == 1 ? " second" : " seconds") : "";
  return dDisplay + hDisplay + mDisplay + sDisplay;
}

export function chunkArray(arr, chunksize) {
  let R = [];
  for (var i = 0; i < arr.length; i += chunksize) {
    R.push(arr.slice(i, i + chunksize));
  }
  return R;
}

export async function getSystemMsig(proposer, proposal_name) {
  let contract = "eosio.msig";
  let res = await Vue.prototype.$eos.rpc
    .get_table_rows({
      json: true,
      code: contract,
      scope: proposer,
      table: "proposal",
      ower_bound: proposal_name,
      limit: 1
    })
    .catch(e => false);
  if (res && res.rows.length && res.rows[0].proposal_name == proposal_name) {
    console.log(res.rows)
    //hash code 
    let r = {
      hash_code: crypto.createHash(`sha256`).update(res.rows[0].packed_transaction).digest(`hex`),
    }
    return res.rows[0];
    
  } else {
    
  }
}

export async function serializeActionData(action ) {
  try {
    let account = action.account;
    let name = action.name;
    let data = action.data;
    const contract = await Vue.prototype.$eos.getContract(account);
    let hex = Vue.prototype.$eos.Serialize.serializeActionData(
      contract,
      account,
      name,
      data,
      new TextEncoder(),
      new TextDecoder()
    );
    return hex;
  } catch (e) {
    console.log(e);
    return false;
  }
}




