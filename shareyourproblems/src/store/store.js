import Vue from 'vue'
import Vuex from 'vuex'
import postsModule from './modules/posts'
import usersModule from './modules/users'
import morefunModule from './modules/morefun'
Vue.use(Vuex)

export default new Vuex.Store({
    modules:{
        postsModule,
        usersModule,
        morefunModule
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

