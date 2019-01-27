<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="modal fade" id="noticeModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-body">
                        <textarea class="form-control" id="message-text" v-model='notice'></textarea>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-sm btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-sm btn-primary" @click="editNotice">Update</button>
                    </div>
                </div>
            </div>
        </div>

        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item active">
                    <router-link to="/" class="navbar-brand hover-effect">Home</router-link>
                    <!-- <a class="nav-link" href="/home"><span><i class="material-icons">home</i></span> <span class="sr-only">(current)</span></a> -->
                </li>
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle hover-effect" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        &#9752;More Fun
                    </a>
                    <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                        <router-link class="dropdown-item" to='/morefun/cat'>Cat</router-link>
                        <router-link class="dropdown-item" to='/morefun/dog'>Dog</router-link>
                        <router-link class="dropdown-item" to='/morefun/cnnews'>China News</router-link>
                        <router-link class="dropdown-item" to='/morefun/usnews'>US News</router-link>
                        <!-- <div class="dropdown-divider"></div>
                        <a class="dropdown-item" href="#">Something else here</a> -->
                    </div>
                </li>
            </ul>
            <ul class="navbar-nav">
                <li class="nav-item dropdown" v-if="isLoggedIn">
                    <a class="nav-link dropdown-toggle hover-effect" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        {{user.username}}
                    </a>
                    <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                        <router-link :to="{name:'UserPosts',params:{userId:user.userId}}" class="dropdown-item">My Posts</router-link>
                        <a class="dropdown-item" href="#" @click='logout'>Log Out</a>
                        <div class="dropdown-divider"></div>
                        <router-link :to="{name:'UserPosts',params:{userId:user.userId}}" class="dropdown-item">My Profile</router-link>

                        <!-- <a class="dropdown-item" href="/">My Profile</a> -->
                    </div>
                </li>
                <li class="nav-item" v-if="isLoggedIn">
                    <router-link to="/addPost" class="nav-link hover-effect"> New Post &#9997;</router-link>
                </li>
                <li class="nav-item" v-if="isAdmin">
                    <button class='btn btn-default' data-toggle="modal" data-target="#noticeModal">Notice</button>
                </li>
                <li class="nav-item" v-if="!isLoggedIn">
                    <router-link to="/login" class="nav-link hover-effect"><a>Login</a></router-link>
                </li>
                <li class="nav-item" v-if="!isLoggedIn">
                    <router-link to="/register" class="nav-link hover-effect">Register</router-link>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script>
import postApi from '../services/postApi'
export default {
    beforeCreate(){

        postApi.getNotice()
            .then(res=>{
                this.$store.commit('UPDATE_NOTICE',res.data.content)
            })
    },
    data() {
        return {
            notice: this.$store.getters.currentNotice
        }
    },
    methods: {
        logout() {
            this.$store.commit('SET_USER',null)
            this.$store.commit('SET_TOKEN',null)
            this.$router.push('/login')   
        },
        editNotice(){
            const noticeObj = {
                content: this.notice
            }
            postApi.editNotice(noticeObj)
                .then(res=>{
                    $('#noticeModal').modal('hide')
                    this.$store.commit('UPDATE_NOTICE',res.data.content)
                })
                .catch(err=>{
                    if(err.response.status==401){
                        $('#exampleModal').modal('hide')
                        alert('Your authentication expired, plz login')
                        console.log('log: Not authenticated operation, plz login')
                        this.$router.replace('/login')
                    }else if(err.response.status==403){
                        alert('You have no authorization')
                    }
                    else{ //500
                        alert('Internal error occured, please try again')
                    }
                })
        }
    },
    computed: {
        user() {
            return this.$store.getters.currentUser
        },
        isLoggedIn(){
            return this.$store.getters.isLoggedIn
        },
        isAdmin(){
            if(this.$store.getters.currentUser){
                return this.$store.getters.currentUser.isAdmin
            }
            return false
        },
        isLoggedInAdmin(){
            if(!this.$store.getters.isLoggedIn){
                return false
            }
            else{
                return this.$store.getters.currentUser.isAdmin
            }
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
.hover-effect:hover{
    color:blue !important;
    transform: scale(1.2);
}
#navbarSupportedContent{
    padding-left:0.5rem;
}
</style>
