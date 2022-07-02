<template>
    <div class="post-body">
        <h3 style="
    color: rgb(208, 130, 126);
    border-top: 4px solid rgb(44, 140, 155);
    padding-top: 4px;
    ">{{ selectedPost.title }}</h3>
        <div class="text">
            <pre>{{ selectedPost.selftext }}</pre>
        </div>
        <button class="btn-post" @click="toggle()">Close</button> <button @click="openUrl(selectedPost.url)"
            class="btn-post">Read on
            Reddit</button>
    </div>

    <div class="head">
        <h1>Top 15 posts from r/{{ sub }}</h1>
        <div class="desc">
            Choose the subreddit to find top stories.
            <div class="subs">
                <form @submit.prevent>
                    <input list="subs" name="sub" v-model="url">
                    <datalist id="subs">
                        <option value="relationship_advice"></option>
                        <option value="AskReddit"></option>
                        <option value="AmItheAsshole"></option>
                        <option value="tifu"></option>
                    </datalist>
                    <input type="submit" class="btn-post" @click="choose(url)">
                </form>
            </div>
        </div>
    </div>

    <div class="container">
        <div v-if="loading" class="loader"></div>
        <div v-for="(post, i) in trPosts" :key="i">
            <div class="post">
                <h3>{{ post.title }}</h3>
                <div class="info">
                    <div class="score"><strong>Score: </strong>{{ post.score }} </div> |
                    <div class="comments"><strong>Comments: </strong>{{ post.num_comments }}</div>
                </div>
                <button @click="open(i)" class="btn-read">Read post</button>
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
            trPosts: [],
            isStory: false,
            postLoading: false,
            nextPage: null,
            loading: false,
            selectedPost: 0,
            url: '',
            sub: 'relationship_advice',
            postCount: 0

        }

    },
    methods: {

        async getPosts() {
            this.loading = true;
            try {
                this.trPosts = [];
                const { data } = await axios.get('https://www.reddit.com/r/' + this.sub + '/top.json?limit=15');
                //console.log(data)
                const webPosts = data.data.children;
                this.posts = webPosts
                await webPosts.forEach(post => {
                    const toExtract = ['title', 'url', 'score', 'num_comments', 'view_count', 'ups', 'downs', 'selftext'];
                    let newObj = {};
                    toExtract.forEach(e => {
                        newObj[e] = post.data[e]
                        //console.log(`${e}: ${post.data[e]}`)
                    });
                    this.trPosts.push(newObj)
                });

                this.loading = false;

            } catch (e) {
                this.loading = false;
                console.log(e.message)
                alert(`This subreddit doesn't exist`);
                this.sub = 'all';
                this.getPosts();

            }
        },
        toggle() {
            document.querySelector('.post-body').classList.toggle("show")
        },
        open(id) {
            this.selectedPost = this.trPosts[id];
            this.toggle();
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return false;
        },
        openUrl(url) {
            window.open(url, '_blank');
        },
        choose(url) {
            this.sub = url;
            this.getPosts();
            this.url = '';
        }



    },
    created() {


    },
    async mounted() {
        await this.getPosts();
    },
    components: {

    }
}
</script>

<style scoped>
body {
    background-color: rgb(246, 236, 236);
    word-wrap: break-word;
}





button:focus {
    outline: none;

}

input:focus {
    outline: none;

}

input {
    margin-right: 10px;
    border-radius: 10px;
    border: 1px solid #333;
    padding: 2px;
}

.container {
    max-width: 1000px;
    width: 100%;
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    align-content: center;
    padding: 0;
    position: relative;




}

.container {}

.post {
    width: 300px;
    height: 270px;
    padding: 40px 15px;
    background-color: #fff;
    border-radius: 20px;
    margin: 10px 10px;
    align-content: center;
    position: relative;
    text-align: center;




}

.post-body {
    visibility: hidden;
    max-width: 600px;
    width: 100%;
    left: 0;
    right: 0;
    margin-left: auto;
    margin-right: auto;
    color: #333;
    text-align: center;
    border-radius: 6px;
    padding: 40px 40px;
    background-color: #fff;
    position: absolute;
    z-index: 1111;
    box-shadow: 2px 3px 5px rgba(51, 51, 51, 0.436);


}

.text {
    padding: 30px 0;
}

.show {
    visibility: visible;
    -webkit-animation: fadeIn 1s;
    animation: fadeIn 1s;
}

.close {
    visibility: hidden;
    -webkit-animation: fadeOut 1s;
    animation: fadeOut 1s;
}


@-webkit-keyframes fadeIn {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}

@keyframes fadeIn {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }

}

@-webkit-keyframes fadeOut {
    from {
        opacity: 1;
    }

    to {
        opacity: 0;
    }
}

@keyframes fadeOut {
    from {
        opacity: 1;
    }

    to {
        opacity: 0;
    }
}

h3 {
    max-height: 140px;
    overflow: scroll;
    font-size: 1.3rem;
    font-weight: 700;
    text-align: justify;


}

h3::-webkit-scrollbar {
    display: none;
}

h3 {
    -ms-overflow-style: none;
    /* IE and Edge */
    scrollbar-width: none;
    /* Firefox */
}

.info {
    display: flex;
    justify-content: center;
    position: absolute;
    bottom: 60px;
    text-align: center;
}

.info div {
    margin-left: 5px;
    margin-right: 5px;
}

.btn-post {
    border: none;
    border-radius: 10px;
    background-color: rgb(208, 130, 126);
    text-transform: lowercase;
    color: #fff;
    padding: 3px 15px;
}

.btn-post:hover {
    opacity: 0.7;
}

.btn-read {
    position: absolute;
    left: 35%;
    bottom: 20px;
    padding: 5px 20px;
    border: none;
    border-radius: 10px;
    background-color: rgb(208, 130, 126);
    text-transform: lowercase;
    color: #fff;
}

.btn-read:hover {
    opacity: 0.7;
}

.loader {
    margin: 40px auto;
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