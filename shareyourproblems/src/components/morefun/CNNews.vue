<template>
    <div class="container-fluid main">
        <div class="container"><a href="https://newsapi.org" target="_blank">Powered by News API</a></div>
        <div class="newsblock" v-for="item in news">
            <div class="container-fluid title">
                <h3>{{item.title}}</h3>
                <!-- <h6>news FROM VOA</h6> -->
            </div>
            <div class="container-fluid" v-if="item.urlToImage!=null">
                <div class="img-box">
                    <img :src="item.urlToImage" alt="image">
                </div>
            </div>
            <div class="container-fluid brief">
                <p>{{item.description}}<span><a :href="item.url" target="_blank">Read More</a></span></p>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import news_key from '@/api-key'
export default {
    beforeCreate(){
        axios.get('https://newsapi.org/v2/top-headlines?country=cn&apiKey=' + news_key)
            .then(result=>{
                const newsList = result.data.articles
                this.$store.dispatch('setUsnews',newsList)
            })
            .catch(err=>{
                alert('Internal error occured, plz try again!')
            })
    },
    computed: {
        news() {
            return this.$store.getters.usnews
        }
    },
}
</script>

<style scoped>
.main{
    min-height: calc(100vh - 6rem);
}
.container{
    padding:1rem;
}
.newsblock{
    width:100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    padding: 1rem;
}
.title, .brief{
    text-align: center;
}

/* .img-box{
    display: flex;
    justify-content: center;
} */
.img-box img{
    max-width: 30%;
    max-height:30%;
    display: block;
    margin: 0 auto;
}

</style>
