<template>
    <div class="container-fluid main">
        <div class="container-fluid">
            <div class="random-btn">
                <button @click="randomCat" class="btn btn-success">Show Random Cat!</button>
            </div>          
        </div>
        <div class="container-fluid">
            <div class="img-box">
                <div class="frame">
                    <img :src="cat" alt="this is a cat">
                </div>                   
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    // https://dog.ceo/dog-api/documentation/random
    beforeCreate(){
        axios.get('https://aws.random.cat/meow')
            .then((cat)=>{
                const catUrl = cat.data.file
                this.$store.dispatch('setCat',catUrl)
            })
            .catch(err=>{
                alert('Internal error occured, plz try again!')
            })
    },
    data() {
        return {
        }
    },
    methods: {
        randomCat() {
            axios.get('https://aws.random.cat/meow')
                .then((cat)=>{
                const catUrl = cat.data.file
                this.$store.dispatch('setCat',catUrl)
                })
                .catch(err=>{
                    alert('Internal error occured, plz try again!')
                }) 
        }
    },
    computed: {
        cat() {
            return this.$store.getters.cat
        },
    },

}
</script>

<style scoped>
.main{
    padding-top:1rem;   
    min-height: calc(100vh - 6rem);
}

.random-btn{
    display: flex;
    justify-content: center;
}
@media (max-width: 576px)  {
    .random-btn{
        margin-top:0.5rem;
    }
}
.img-box{
    display: flex;
    justify-content: center;
    align-items: center;
    margin:1rem auto;
}

img {
  border: solid 2px;
  border-bottom-color: #ffe;
  border-left-color: #eed;
  border-right-color: #eed;
  border-top-color: #ccb;
  max-height: 100%;
  max-width: 100%;
}

.frame {
  background-color: #ddc;
  border: solid 5vmin #eee;
  border-bottom-color: #fff;
  border-left-color: #eee;
  border-radius: 2px;
  border-right-color: #eee;
  border-top-color: #ddd;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.25) inset, 0 5px 10px 5px rgba(0, 0, 0, 0.25);
  box-sizing: border-box;
  display: inline-block;

  position: relative;
  text-align: center;
    max-height: 80%;
  max-width: 80%;
}
.frame:before {
  border-radius: 2px;
  bottom: -2vmin;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.25) inset;
  content: "";
  left: -2vmin;
  position: absolute;
  right: -2vmin;
  top: -2vmin;
}
.frame:after {
  border-radius: 2px;
  bottom: -2.5vmin;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.25);
  content: "";
  left: -2.5vmin;
  position: absolute;
  right: -2.5vmin;
  top: -2.5vmin;
}

</style>
