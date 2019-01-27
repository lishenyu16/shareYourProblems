const state = {
    posts:[],
    post:{},
    notice:''
}
const mutations = {
    UPDATE_NOTICE(state,payload){
        state.notice = payload
    },
    UPDATE_POSTS(state,payload){
        state.posts.push(payload)
    },
    CURRENT_POST(state,payload){
        state.post = payload
    },
    // UPDATE_COMMENTS(state,payload){ 

    // },
    // EDIT_BLOG(state,payload){

    // }
}
const actions = {
    addPost({state,commit},payload){
        alert('New Post has been posted!')
        commit('UPDATE_POSTS',payload)
    },
    setPosts({state,commit},payload){
        state.posts = payload
    }
}
const getters = {
    posts(){
        return state.posts
    },
    currentPost(){
        return state.post
    },
    currentNotice(){
        return state.notice
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}