<template>
    <form class="form-signin" @submit.prevent="onSubmit">
        <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>
        <label class="sr-only">Username</label>
        <input type="text"  v-model="username" class="form-control" placeholder="Username" required autofocus>
        <label for="inputPassword" class="sr-only">Password</label>
        <input type="password" id="inputPassword" v-model='password' class="form-control" placeholder="Password" required>
        <div class="checkbox mb-3">
            <label>
                <input type="checkbox" value="remember-me"> Remember me
            </label>
        </div>
        <button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
    </form>
</template>
<script>
  import authentication from '@/services/authentication'
  export default {
    data() {
      return {
        username: '',
        password:'',
        error:false
      }
    },
    methods: {
      onSubmit () {
        authentication.login({username:this.username,password:this.password})
        .then((res)=>{
          localStorage.setItem('token', res.data.token);
          localStorage.setItem('userId', res.data.userId);
          localStorage.setItem('username', res.data.username);
          localStorage.setItem('isAdmin', res.data.isAdmin);
          localStorage.setItem('expirationDate', res.data.expirationDate);
          this.$store.commit('SET_USER',{username:res.data.username,userId:res.data.userId,email:res.data.email,isAdmin:res.data.isAdmin})
          this.$store.commit('SET_TOKEN',res.data.token)
          this.$store.dispatch('setPosts',res.data.posts)
          
          this.$store.dispatch('setLogoutTimer')
          this.$router.push('/')
        })
        .catch((err)=>{
          if(err.response.status==401){
            this.error= true
          }
          else{//500
            alert('An internal error occured, please try again')
          }
        })
      }
    },
  }
</script>

<style scoped>

.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
  text-align: center;
  min-height: calc(100vh - 5rem);
}
.form-signin .checkbox {
  font-weight: 400;
}
.form-signin .form-control {
  position: relative;
  box-sizing: border-box;
  height: auto;
  padding: 10px;
  font-size: 16px;
}
.form-signin .form-control:focus {
  z-index: 2;
}
.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}

</style>

