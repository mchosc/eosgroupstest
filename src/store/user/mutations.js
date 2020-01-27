

export function setFavouriteGroups(state, payload) {

    payload = typeof payload == "string" ? [payload] : payload;
    for(let i = 0; i < payload.length; ++i){

        let is_already_fav_index = state.favouriteGroups.findIndex(fg => fg==payload[i]);

        if(is_already_fav_index <= -1){
            console.log(`add ${payload[i]} to favourites`);
            state.favouriteGroups.push(payload[i]);
        }
        else{
            console.log(`remove ${payload[i]} from favourites`);
            state.favouriteGroups.splice(is_already_fav_index, 1);
        }
            
    } 
}

export function setAccount (state, payload) {
    state.account = payload
}

export function setResourceWarningLevels(state, payload){
    state.resourceWarningLevels = Object.assign(state.resourceWarningLevels, payload);
}

export function setMinifyCustodians(state, payload){
    state.minifyCustodians = payload;
}

export function setIsDark(state, payload){
    state.isDark = payload;
}

export function setIsMember(state, payload){
    state.isMember = payload;
}

