Object.byString = function(o, s) {
    s = s.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
    s = s.replace(/^\./, '');           // strip a leading dot
    var a = s.split('.');
    for (var i = 0, n = a.length; i < n; ++i) {
        var k = a[i];
        if (k in o) {
            o = o[k];
        } else {
            return;
        }
    }
    return o;
}


export function setCustodians(state, payload){
    state.custodians = payload;
}

export function setCustodianLastActive(state, payload){
    let {custodian, block_time} = payload;
    let found_cust = state.custodians.find(c => c.account == custodian)
    if(found_cust){
        found_cust.last_active = block_time.split('.')[0]
    }
}

export function setActiveGroup(state, payload){
    state.activeGroup = payload;
}

export function setProposals(state, payload){
    let scope = payload.scope;
    let data = payload.data;
    if(scope == state.activeGroup){
        scope='active';
    }
    switch (scope) {
        case "active":
            state.proposals.active = data;
            break;
        case "executed":
            state.proposals.executed = data;
            break;
        case "cancelled":
            state.proposals.cancelled = data;
            break;
    
        default:
            break;
    }

}

export function deleteProposalById(state, id){
    let index = state.proposals.active.findIndex(p => p.id == id );
    if(index >= 0){
        state.proposals.active.splice(index, 1);
    } 
}

export function addProposal(state, proposal){
    proposal.submitted = "";
    state.proposals.active.push(proposal);
}

export function setThresholds(state, payload){
    state.thresholds = payload;
}

export function addThreshold(state, payload){
    state.thresholds.push(payload);
}

export function remThreshold(state, payload){
    state.thresholds = state.thresholds.filter(t => t.threshold_name == payload);
}

export function setThresholdLinks(state, payload){
    state.thresholdLinks = payload;
}

export function setGroupWallet(state, payload){
    state.groupWallet = payload;
}

export function setGroupAccount(state, payload){
    state.groupAccount = payload;
}

export function setActiveGroupConfig(state, payload){
    state.activeGroupConfig = payload;
}

export function setCoreConfig(state, payload){
    state.coreConfig = payload;
}

export function setCoreState(state, payload){
    state.coreState = payload;
}

export function setNewCoreConfig(state, payload){
    state.newCoreConfig = payload;
}

function index(obj, path, value) {
    if (typeof path == 'string')
        return index(obj,path.split('.'), value);
    else if (path.length==1 && value!==undefined)
        return obj[path[0]] = value;
    else if (path.length==0)
        return obj;
    else
        return index(obj[path[0]],path.slice(1), value);
}

export function setNewCoreConfigPath(state, payload){
    let path = payload.path;
    let value = payload.value;
    index(state.newCoreConfig, path, value);

}

export function setChildAccounts(state, payload){
    state.childAccounts = payload;
}



