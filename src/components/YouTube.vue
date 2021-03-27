<template>
    <div class="you_tube_embed">
        <iframe :src="`https://www.youtube.com/embed/${videoId}?controls=0&rel=0&autoplay=1`"
            frameborder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen>
        </iframe>
    </div>
</template>

<script>
export default {
    name: 'YouTube',
    props: ['videoId'],
};
</script>

<style lang="less" scoped>
.video-container {
    overflow: hidden;
    position: relative;
    width: 100%;
}

.video-container::after {
    //padding-top: 56.25%;
    padding-top: 75%;
    display: block;
    content: '';
}

.video-container iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}
</style>