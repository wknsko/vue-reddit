<template>

  <div class="container">
    <h1>Random Story to feel good</h1>
    <div class="desc">Get a random story from people just like you that makes mistakes and want to tell their story to
      us to learn to be positive in any situation. Shit happens all the time! (Stories are from r/TIFU)</div>
    <button @click="getRandomPost" class="btn-random">Get {{isStory? 'Another' : '' }}Story</button>
    <div v-if="isStory" class="post" v-cloak>
      <div v-if="loading" class="loader"></div>
      <h3>{{post.title}}</h3>
      <div class=" post-body">
        <pre>{{post.selftext}}</pre>
      </div>
      <div class="button">
        <button class="button-close">Close</button>
        <button class="button-close">Another Story</button>
      </div>
    </div>

  </div>

</template>

<script>
import axios from 'axios';
export default {
  
  name: 'App',
  data() {
    return {
      posts:[],
      post: [],
      isStory: false,
      postLoading: false,
      nextPage: null,
      loading: false
    }

  },
  methods: {
    
    async getPosts(){
     
      try {
        const { data } = await axios.get('https://www.reddit.com/r/tifu/random.json');
        console.log(data)
        const webPosts = data[0].data.children;
        this.posts = webPosts
         await webPosts.forEach(post => {
           const toExtract = ['title', 'url', 'score', 'num_comments', 'view_count', 'ups', 'downs', 'selftext'];
           toExtract.forEach(e => {
             console.log(`${e}: ${post.data[e]}`)
             
           })
         });
        
       
    
      } catch(e) {
        console.log(e.message)
       
      }
    },
    async getRandomPost() {
      this.loading = true;
      this.isStory = true;
      this.post = [];
      try {
      const { data } = await axios.get('https://www.reddit.com/r/tifu/random.json');
      this.post = data[0].data.children[0].data;
      this.loading = false;
      } catch(e){
        console.log(e.message)
        this.loading = false;
      }
      
    }

  },
  created() {
   

  },
  async mounted() {
     

  },
  components: {
    
  }
}
</script>

<style>
pre {
  white-space: pre-wrap;
  overflow-y: hidden;
}

.container {
  max-width: 600px;
  width: 100%;
  text-align: left;
}
.loader {
  height: 48px;
  width: 48px;
  color: #5a5a5a;
  position: relative;
  display: inline-block;
  border: 5px solid;
  border-radius: 50%;
  border-top-color: transparent;
  animation: rotate 1s linear infinite;
}

@keyframes rotate {
  0% {
    transform: rotate(0);
  }

  100% {
    transform: rotate(360deg);
  }
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
