<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item active">
                    <router-link to="/" class="navbar-brand">Home</router-link>
                    <!-- <a class="nav-link" href="/home"><span><i class="material-icons">home</i></span> <span class="sr-only">(current)</span></a> -->
                </li>
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        More Fun
                    </a>
                    <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                        <a class="dropdown-item" href="#">Cat</a>
                        <a class="dropdown-item" href="#">Dog</a>
                        <div class="dropdown-divider"></div>
                        <a class="dropdown-item" href="#">Something else here</a>
                    </div>
                </li>
            </ul>
            <ul class="navbar-nav">
                <li class="nav-item dropdown" v-if="isLoggedIn">
                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        {{user.username}}
                    </a>
                    <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                        <router-link :to="{name:'UserPosts',params:{userId:user.userId}}" class="dropdown-item">My Posts</router-link>
                        <a class="dropdown-item" href="#" @click='logout'>Log Out</a>
                        <div class="dropdown-divider"></div>
                        <a class="dropdown-item" href="#">Something else here</a>
                    </div>
                </li>
                <li class="nav-item" v-if="isLoggedIn">
                    <router-link to="/addPost" class="nav-link"> New Post</router-link>
                </li>
                <li class="nav-item" v-if="!isLoggedIn">
                    <router-link to="/login" class="nav-link"><a>Login</a></router-link>
                </li>
                <li class="nav-item" v-if="!isLoggedIn">
                    <router-link to="/register" class="nav-link">Register</router-link>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script>
export default {
    methods: {
        logout() {
            this.$store.commit('SET_USER',null)
            this.$store.commit('SET_TOKEN',null)
            this.$router.push('/login')
        }
    },
    computed: {
        user() {
            return this.$store.getters.currentUser
        },
        isLoggedIn(){
            return this.$store.getters.isLoggedIn
        }
    },
}
</script>

<style scoped>
/* .material-icons{
    display: inline-block;
} */
.navbar{
  padding:0 0.5rem;
  border-bottom:1px solid lightgray; 
}
</style>
