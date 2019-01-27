<template>
    <div class="container-fluid">
        <div class='row'>
            <div class='col-8 offset-2 notice'>
                <h3 class='neon'>
                    {{noticeContent}}
                </h3>
            </div>
            <div class='col-8 offset-2 posts'>
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
import postApi from '../services/postApi'
export default {
    created(){
        postApi.getPosts()
            .then(res=>{
                this.$store.dispatch('setPosts',res.data.reverse())
            })
    },
    methods: {
        postDetail(post) {
            this.$store.commit('CURRENT_POST',post)
            this.$router.replace('/postDetail/'+post._id)
        }
    },
    computed: {
        noticeContent(){
            return this.$store.getters.currentNotice
        },
        posts() {
            return this.$store.getters.posts
        }
    },
}
</script>

<style scoped>
.container-fluid{
    min-height: calc(100vh - 6rem);
}

.notice {
    padding-top: 1rem;
    padding-bottom:0.3rem; 

    background-color: #010a00;
    background-image: url("https://www.transparenttextures.com/patterns/3px-tile.png");
    font-size: 1rem;
}

h3 {
  font-weight: 400;
  text-align: center;
  text-transform: uppercase;
}

.neon {
  color: #fff;
  text-shadow:
    0 0 5px #fff,
    0 0 10px #fff,
    0 0 20px #fff,
    0 0 40px #0ff,
    0 0 80px #0ff,
    0 0 90px #0ff,
    0 0 100px #0ff,
    0 0 150px #0ff;
}
.posts{
    margin-top:1rem;
    width:80%;
    display:flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    background-color:white;
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
    padding-left:1rem;
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
    color:rgba(128, 128, 128, 0.747);
}
.hottopics{
    width:20%;
    padding:1rem;
}

</style>
