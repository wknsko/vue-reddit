<template>

    <div class="container">
        <h1>Random <strong>TIFU</strong> Story</h1>
        <div class="desc">Get a random story from people just like you that makes mistakes and want to tell their story
            to
            us to learn to be positive in any situation. Shit happens all the time! (Stories are from r/TIFU)</div>
        <button @click="getRandomPost" class="btn-random">Get {{ isStory ? 'Another' : '' }} Story</button>
        <div v-if="isStory">
            <div class="post" v-cloak>
                <div v-if="loading" class="loader"></div>
                <h3>{{ post.title }}</h3>
                <div class=" post-body">
                    <pre>{{ post.selftext }}</pre>
                </div>
                <div v-if="!loading" class="buttons">
                    <button @click="isStory = false" class="button-down">Close</button>
                    <button @click="getRandomPost" class="button-down">Another Story</button>
                </div>
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
            posts: [],
            post: [],
            isStory: false,
            postLoading: false,
            nextPage: null,
            loading: false
        }

    },
    methods: {
        async getRandomPost() {
            this.loading = true;
            this.isStory = true;
            this.post = [];
            try {
                const { data } = await axios.get('https://www.reddit.com/r/tifu/random.json');
                this.post = data[0].data.children[0].data;
                this.loading = false;
            } catch (e) {
                console.log(e.message)
                this.loading = false;
            }

        }

    },

}
</script>

<style scoped>
.container {
    max-width: 650px;
    width: 100%;
    text-align: left;
}

h1 {
    font-size: 3rem;
    text-decoration: underline;
    text-decoration-thickness: 4px;
    text-align: center;
    color: #7c7131;
    margin-bottom: 50px;
}

h3 {
    margin-top: 10px;
    font-size: 2rem;
    color: #7c3b31;
    border-left: 5px solid #2c3e50;
    padding-left: 15px;


}

.btn-random {
    min-width: 250px;
    margin: 0;
    margin-top: 70px;
    color: #2c3e50;
    background-color: rgba(255, 255, 255, 0.869);
    border: 1px dashed #2c3e50;
    border-radius: 20px;
    position: relative;
    left: 50%;
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    padding: 10px 60px;
}

.btn-random:hover {
    color: #2c3e50d2;
    background-color: rgba(255, 255, 255, 0.767);
    border: 1px dashed #2c3e50c1;
}

.btn-random:active {
    color: #2c3e50d7;
    background-color: rgba(238, 250, 252, 0.89);
    border: 1px dashed #154b81c1;
}

.btn-random:focus {
    outline: none;
}

.buttons {
    display: flex;
    justify-content: center;
    margin: 50px 0;
}

.button-down {
    padding: 4px 15px;
    color: #7c3b31;
    background-color: white;
    border: 1px solid #7c7131;
    border-radius: 20px;
    margin: 0 10px;
}

.button-down:active {
    color: #7c7131;
    background-color: white;
    border: 1px solid #7c3b31;
}

.button-down:hover {
    opacity: 0.67;
}

.button-down:focus {
    outline: none;
}

.loader {
    left: 45%;
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
</style>