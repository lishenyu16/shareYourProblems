import Vue from 'vue'
import Vuex from 'vuex'
import postsModule from './modules/posts'
import usersModule from './modules/users'
Vue.use(Vuex)

export default new Vuex.Store({
    modules:{
        postsModule,
        usersModule
    },
    state:{

    },
    mutations:{

    },
    actions:{
    },
    getters:{
        
    }
})

