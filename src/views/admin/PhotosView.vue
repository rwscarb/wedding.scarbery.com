<template>
    <div class="photos_view">
        <h1>Photos</h1>
        <v-divider class="mb-4"/>
        <v-carousel>
            <v-carousel-item
                src="@/assets/images/wedding/portland-snow.jpg"
                reverse-transition="fade-transition"
                transition="fade-transition"
            ></v-carousel-item>
        </v-carousel>
    </div>
</template>

<script>
export default {
    name: 'PhotosView',
}
</script>

<style scoped>

</style>