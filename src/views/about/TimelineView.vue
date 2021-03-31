<template>
    <div class="about_timeline">
        <h2>Timeline</h2>
        <v-timeline align-top>
            <v-timeline-item
                v-for="(item, i) in timelineItems"
                :key="i"
                :color="item.color"
                :icon="item.icon"
                fill-dot
                >
                <v-card
                    :color="item.color"
                    dark
                    >
                    <v-card-title class="title">
                        {{ item.title }}
                    </v-card-title>
                    <v-card-text class="white text--primary pt-2">
                        <template v-if="item.html">
                            <div v-html="item.html"></div>
                        </template>
                        <p v-else>{{ item.text }}</p>
                    </v-card-text>
                </v-card>
            </v-timeline-item>
        </v-timeline>
    </div>
</template>

<script>
export default {
    name: 'TimelineView',
    data: (() => {
        return {
            timelineItems: [
                {
                    color: 'purple darken-1',
                    icon: 'mdi-school',
                    title: 'Missed Encounters (1990)',
                    text: 'Both attended the same elementary school without ever meeting.',
                },
                {
                    color: 'green lighten-1',
                    icon: 'mdi-firework',
                    title: 'Protests (2017)',
                    text: 'First in-person meet on the 5th of November, Portland protestors storm the police station with flares.',
                },
                {
                    color: 'red lighten-1',
                    icon: 'mdi-heart',
                    title: 'Engaged! (2021)',
                    text: 'Proposed while watching Amadeus.'
                },
                {
                    color: 'teal',
                    icon: 'mdi-github',
                    title: 'Developed Site (2021)',
                    html: `
                        <p>
                            The inspiration and majority of Solidity contract came from
                            <a href="https://block42.tech" target="_blank">block42</a> with their source
                            <a href="https://github.com/block42-blockchain-company/smart-wedding-contract" target="_blank">
                                here
                            </a>
                            and website <a href="https://block42.uber.space/smart-wedding-contract" target="_blank">here</a>.
                        </p>
                        <p>
                            Source code for this site and contract can be found
                            <a href="https://github.com/rwscarb/wedding.scarbery.com" target="_blank">here</a>.
                        </p>
                    `
                },
            ]
        }
    }),
}
</script>

<style lang="less" scoped>
.v-timeline-item:not(:last-child) {
    margin-bottom: 900px;
}
</style>