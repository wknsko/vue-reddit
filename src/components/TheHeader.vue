<template>
    <div class="header">
        <ul>
            
                <router-link to="/random">
            <li>Random Story</li>
            </router-link>

            <li>
                <router-link to="/top">Top Stories</router-link>
            </li>
        </ul><br />
        <img src="../assets/reddit.png" />
    </div>
</template>

<script>
export default {

}
</script>

<style>
img {
    width: 200px;
}

ul {
    list-style: none;
    display: inline-flex;
}

li {
    margin-left: 10px;
    margin-right: 10px;
    font-size: 1.3rem;
    text-transform: uppercase;
    cursor: pointer;
}

li:hover {
    text-decoration: underline;
    text-decoration-thickness: 10px;
}
a {
    color: inherit !important;
    text-decoration: inherit !important;
}
.router-link-active {
    color:brown !important;
}

</style>