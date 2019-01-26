<template>
    <div class="main">
        <div class="title">
            <input type="text" v-model='title' class='input-title'>
        </div>
        <div class="editor">
            <!-- quill-editor -->
            <quill-editor ref="myTextEditor"
                        v-model="contents"
                        :options="editorOption"
                        @change="onEditorChange($event)">
            </quill-editor>
        </div>
        <div class='submit'>
            <button class='btn btn-secondary' @click='$router.go(-1)'>Cancel</button>
            <button class='btn btn-success' @click='submit'>Submit</button>
        </div>
    </div>
</template>

<script>
    import postApi from '../services/postApi'
    import hljs from 'highlight.js'
    import Quill from 'quill'
  
  export default {
    data() {
      return {
            title: this.$store.getters.currentPost.title,
            contents: this.$store.getters.currentPost.contents,
            brief:this.$store.getters.currentPost.brief,
            editorOption: {
                modules: {
                    toolbar: [
                    ['bold', 'italic', 'underline', 'strike'],
                    ['blockquote', 'code-block'],
                    [{ 'header': 1 }, { 'header': 2 }],
                    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                    [{ 'script': 'sub' }, { 'script': 'super' }],
                    [{ 'indent': '-1' }, { 'indent': '+1' }],
                    [{ 'direction': 'rtl' }],
                    [{ 'size': ['small', false, 'large', 'huge'] }],
                    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                    [{ 'font': [] }],
                    [{ 'color': [] }, { 'background': [] }],
                    [{ 'align': [] }],
                    ['clean'],
                    ['link', 'image', 'video']
                    ],
                    syntax: {
                        highlight: text => hljs.highlightAuto(text).value
                    }
                }
            }
      }
    },
    methods: {
        onEditorChange({ quill, html, text }) {
            if(text.length<100){
                this.brief = text
            }
            else{
                const arr = text.split('')
                const arr2 = []
                for(let i=0;i<100;i++){
                    arr2.push(arr[i])
                }
                this.brief = arr2.join('')
            }
        },
        submit(){
            //userId,title,content,date
            const post = {
                postId:this.$store.getters.currentPost._id,
                userId: this.$store.getters.currentUser.userId,
                username: this.$store.getters.currentUser.username,
                title: this.title,
                brief: this.brief,
                contents: this.contents,
                date: this.time,
            }

            postApi.editPost(post)
                .then((res)=>{
                    this.$store.commit('CURRENT_POST',res.data.post)
                    this.$router.replace('/postDetail/'+post.postId)
                })
                .catch(err=>{
                    if(err.response.status==401){
                        alert('Your authentication expired, plz login')
                        console.log('Not authenticated operation, plz login')
                        this.$router.replace('/login')
                    }else if(err.response.status==403){
                        alert('You have no authorization')
                    }
                    else{ //500
                        alert('Internal error occured, please try again')
                    }
                })
        },
        cancel(){
            this.$router.replace('/postDetail/'+post.postId)
        }

    },
    computed: {
        time() {
          let d = new Date();
          let year = d.getFullYear()
          let month = d.getMonth()+1
          let day = d.getDate()
          let h = d.getHours();
          let m = d.getMinutes();
          return h + ":" + m + " " + month +"/"+day +"/"+year
        },
        editor() {
            return this.$refs.myTextEditor.quill
        },
        contentCode() {
            return hljs.highlightAuto(this.content).value
        }
    },
    mounted() {
      console.log('this is current quill instance object', this.editor)
    }
  }
</script>

<style scoped>
.main{
    width:100%;
    min-height: calc(100vh - 5rem);
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
}
.title{
    width:80%;
    margin:1rem auto 0.5rem;
}
.input-title{
    width:100%;
    margin:0;

}
.editor{
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    width:80%;
    height:25rem;
    overflow: auto;
    border:1px solid lightgray;
}
.quill-editor{
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    width:100%;
    height:100%;
    overflow: hidden;
    /* overflow: auto; */
}
.ql-editor{
    overflow: auto;
}
.submit{
    margin-top:1rem;
}
</style>
