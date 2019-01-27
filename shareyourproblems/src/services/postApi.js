import api from './api'

export default {
    addPost(post){
        return api().post('posts/addPost', post, {
            headers:{
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        })
    },
    editPost(post){
        return api().post('posts/editPost', post, {
            headers:{
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        })
    },
    deletePost(postId,userId){
        return api().delete(`posts/deletePost/${postId}/${userId}`,
            {
                headers:{
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            }
        )
    },
    deleteReply(replyId,userId){
        return api().delete(`posts/deleteReply/${replyId}/${userId}`,
            {
                headers:{
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            }
        )
    },

    getNotice(){
        return api().get('notice')
    },
    editNotice(notice){
        return api().post('notice', notice, {
            headers:{
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        })
    },

    getPosts(){
        return api().get('posts')
    },
    getUserPosts(userId){
        return api().get('posts/userPosts/'+userId)
    },
    getSinglePost(postId){
        return api().get('posts/' + postId)
    },
    addReply(reply){
        return api().post('posts/addReply', reply, {
            headers:{
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        })
    }
}