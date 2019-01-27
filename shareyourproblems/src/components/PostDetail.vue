<template>
    <div class="container-fluid main">
        <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-body">
                        <form>
                            <div class="form-group">
                                <label for="message-text" class="col-form-label">Reply message:</label>
                                <textarea class="form-control" id="message-text" v-model='replyMessage'></textarea>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-sm btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-sm btn-primary" @click="addReply('author')">Send reply</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- above is modal box for adding reply ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->
        <!-- above is modal box for adding reply ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

        <div class='header'>
            <div style="width:80%; padding-left:0.5rem;">{{replies.length}} replies, 1 page in total</div>
            <div style='width:10%;'>
                <button type="button" class="btn btn-secondary btn-sm" data-toggle="modal" data-target="#exampleModal">Reply</button>
            </div>
        </div>
        <div class='title'>
            {{title}}
        </div>
        <div class='replies'>
            <div class='reply'>
                <div class='reply-left'>
                    <div class='author_icon'>
                        <img :src="imageSrc(username)" alt="Image" class='image'>
                    </div>
                    <div class='authorname'>{{username}}</div>                
                </div>
                <div class='reply-right'>
                    <div class='reply_content' v-html="contents"></div>
                    <div class='reply_tail'>
                        <div>Floor 1, {{date}} 
                            <a v-if="!isLoggedIn || currentUserId!=userId" data-toggle="modal" href="#exampleModal">Reply</a>
                            <a v-if="postOwner" href="#" @click='deletePost'>Delete</a>
                            <router-link v-if="postOwner" to='/editPost'>Edit</router-link>
                        </div>
                    </div>
                </div>
            </div>
            <div class='reply' v-for='(reply,index) in replies' v-if='replies.length>0'>
                <div class='reply-left'>
                    <div class='author_icon'>
                        <img :src="imageSrc(reply.username)" alt="Image" class='image'>
                    </div>
                    <div class='authorname'>{{reply.username}}</div> 
                </div>
                <div class='reply-right'>
                    <div class='reply_content'>{{reply.replyContent}}</div>
                    <div class='reply_tail'>
                        <div>Floor {{index+2}}, {{reply.date}} 
                            <a v-if="!isLoggedIn || currentUserId!=reply.userId" @click="replyWhom(reply.username)" data-toggle="modal" href="#exampleModal">Reply</a>
                            <a v-if='currentUserId==reply.userId' href="#" @click='deleteReply(reply._id,index)'>Delete</a>
                         </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import postApi from '../services/postApi';
export default {
    created(){
        postApi.getSinglePost(this.$route.params.postId)
            .then((post)=>{               
                this.postId = post.data._id,
                this.title = post.data.title,
                this.brief = post.data.brief,
                this.contents = post.data.contents,
                this.date = post.data.postDate,
                this.replies = post.data.replies,
                this.username = post.data.username,
                this.userId = post.data.userId,
                this.likes = post.data.likes,
                this.dislikes = post.data.dislikes
            })
            .catch(err=>{
                if(err.response.status==404){
                    alert('Could not find this blog!')
                    this.$router.push('/blog')
                }
                else{//500
                    alert('Internal error occured, please try again')
                }
            })
    },
    data() {
        return {
            isModalVisible: false,
            replyMessage:'',
            replyTo:'',

            postId:null,
            title:null,
            brief: null,
            contents:null,
            date: null,
            replies: [],
            username: null,
            userId: null,
            likes:0,
            dislikes:0,
            currentUserId: this.$store.getters.isLoggedIn?this.$store.getters.currentUser.userId:null,
            //currentUserIsAdmin: this.$store.getters.isLoggedIn?this.$store.getters.currentUser.isAdmin:false
        }
    },
    computed: {
        postDetail(){
            return '#/postDetail/'+this.postId
        },
        isLoggedIn(){
            return this.$store.getters.isLoggedIn
        },
        postOwner(){
            if(this.isLoggedIn){
                return this.$store.getters.currentUser.isAdmin || this.userId == this.currentUserId
            }
            return false
        },
        time() {
          let d = new Date();
          let year = d.getFullYear()
          let month = d.getMonth()+1
          let day = d.getDate()
          let h = d.getHours();
          let m = d.getMinutes();
          return h + ":" + m + ", " + month +"/"+day +"/"+year
        },
    },
    methods: {
        replyWhom(username,index){
            this.replyMessage +='@' + username+': '
        },
        imageSrc(name) {
            return `https://robohash.org/` + name +  `.png?bgset=bg2&size=200x200&set=set4`
        },
        goToEditPost(postId){
            this.$router.replace('/editPost/'+postId)
        },
        deletePost(){
            if(confirm('Delete this post?')){
                postApi.deletePost(this.postId, this.currentUserId)
                    .then(()=>{
                        this.$router.replace('/')
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
            else{
                return
            }
        },
        deleteReply(replyId,index){
            postApi.deleteReply(replyId, this.currentUserId)
                .then(()=>{
                    this.replies.splice(index,1)
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
        },
        addReply(type){
            if(!this.isLoggedIn){
                if(confirm('You are not signed in, login now?')){
                    $('#exampleModal').modal('hide')
                    return this.$router.replace('/login')
                }
                else{
                    return
                }
            }
            const reply = {
                postId: this.postId,
                userId: this.$store.getters.currentUser.userId,
                username: this.$store.getters.currentUser.username,
                replyContent: this.replyMessage,
                date: this.time,
                likes:0,
                dislikes:0
            }
            postApi.addReply(reply)
                .then(res=>{
                    $('#exampleModal').modal('hide')
                    this.replies.push(res.data.reply)
                    this.replyMessage=''
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
}
</script>

<style scoped>
.modal-header{
    padding:0.5rem 1rem;
}
.modal-body{
    padding:0.5rem 1rem 0;
}
.main{
    min-height: calc(100vh - 6rem);
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
}
.header{
    width:70%;
    text-align: left;
    background-color:rgb(192, 215, 238);
    padding:0.2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.title{
    width:70%;
    background-color:white;
    font-size: 1.2rem;
    text-align: left;
    padding:0.2rem;
    padding-left:0.5rem;
    font-weight: bold;
}
.title:first-letter {
  text-transform: uppercase;
}

.replies{
    width:70%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    background-color:white;
}
.reply{
    min-height: 8rem;
    width:100%;
    display: flex;
    justify-content: flex-start;
    /* align-items: center; */
    border:1px solid lightgray;
}
.reply-left{
    width:20%;
    background-color:rgb(243, 237, 237);
    min-height:6rem;
    padding: 0.5rem;
}
.author_icon{
    text-align: center;
    width:100%;
    margin:0.5rem auto;
}
.authorname{
    text-align: center;
    width:100%;
    margin:0.5rem auto;
}
.reply-right{
    width:80%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding:0.5rem;
}
.reply_content{
    width:100%;
    padding:0.5rem;
    text-align: left;
}
.reply_tail{
    width:100%;
    text-align: right;
    padding:0.5rem;
    font-size:0.9rem;
}
.reply_tail div{
    display: inline-block;
    padding-right:0.1rem;
    margin:0;
    color:rgba(126, 122, 122, 0.671);
    font-size:0.8rem;
}
/* .author_icon{
    max-width: 100px;
    max-height:100px;
} */
.image{
    max-width: 80px;
    max-height:80px;
}
</style>
