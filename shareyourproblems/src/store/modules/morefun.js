
const state = {
    cat:null,
    dogs:[],
    cnnews:[],
    usnews:[]
}
const mutations = {
}
const actions = {
    setCat({state,commit},payload){
        state.cat = payload
    },
    setDogs({state,commit},payload){
        state.dogs = payload
    },
    setCnnews({state,commit},payload){
        state.cnnews = payload
    },
    setUsnews({state,commit},payload){
        state.usnews = payload
    }
}
const getters = {
    cat(){
        return state.cat
    },
    dogs(){
        return state.dogs
    },
    cnnews(){
        return state.cnnews
    },
    usnews(){
        return state.usnews
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}