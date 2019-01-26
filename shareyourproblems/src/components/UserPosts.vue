<template>
    <div class="container-fluid main">
        <div class='row'>
            <div class='col-10 offset-2'>
                <h3>My Posts</h3>
            </div>
            <div class='col-8 offset-2'>
                <div class='single-post' v-for='post in posts' @click='postDetail(post)'>
                    <div class="post-left"><span class="badge badge-pill badge-warning">{{post.replies.length}}</span></div>
                    <div class="post-right">
                        <div class="post">
                            <div class='post-title'>{{post.title}}</div>
                            <div class='post-author'><i class="material-icons">person</i> {{post.username}}</div>
                        </div>
                        <div class="post">
                            <div class='post-brief'>{{post.brief}}</div>
                            <div class='post-date'>{{post.postDate}}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import postsApi from '../services/postApi'
export default {
    created(){
        postsApi.getUserPosts(this.$route.params.userId)
            .then(res=>{
                this.posts = res.data
            })
            .catch()
    },
    methods: {
        postDetail(post) {
            this.$store.commit('CURRENT_POST',post)
            this.$router.replace('/postDetail/'+post._id)
        }
    },
    data() {
        return {
            posts: []
        }
    },
}
</script>
<style scoped>
.main{
    min-height: calc(100vh - 5rem);   
    padding-top:1rem;
}
.single-post{
    width:100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom:1px solid lightgray;
    border-radius: 0.5rem;
}
.single-post:hover{
    background-color: lightsalmon !important;
}
.post-left{
    width:10%;
    padding:0.2rem;
}
.post-right{
    width:90%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    padding:0.2rem;
}
.post{
    width:100%;
    display:flex;
    justify-content: space-between;
    align-items: center;
}
.post-title{
    color:rgb(20, 93, 202);
    width:80%;
    overflow: hidden;
    font-size:1.1rem;
}
.post-brief{
    width:80%;
    overflow: hidden;
    font-size:0.8rem;
}
.post-author, .post-date{
    text-align: center;
    width:20%;
    font-size:0.8rem;
    display:flex;
    align-items: center;
}
.hottopics{
    width:20%;
    padding:1rem;
}
</style>
