<template>
    <div class="about_events">
        <h2>Events</h2>

        <v-data-table
            :headers="headers"
            :items="displayedEvents"
            :items-per-page="10"
            class="elevation-1"
            show-expand
            single-expand
            >
            <template v-slot:item.wallet="{ value }">
                <a :href="`https://ropsten.etherscan.io/tx/${value}`" target="_blank">
                    <v-avatar>
                        <blocky :seed="value" :title="value"></blocky>
                    </v-avatar>
                </a>
            </template>
            <template v-slot:item.timestamp="{ value }">
                {{ value | timestamp }}
            </template>
            <template v-slot:expanded-item="{ headers, item }">
                <td :colspan="headers.length">
                    <vue-json-pretty :data="item" class="ml-2"/>
                </td>
            </template>
        </v-data-table>
    </div>
</template>

<script>
import _ from 'lodash';

import { mapGetters } from 'vuex';

import Blocky from '@/components/Blocky.vue';

export default {
    name: 'EventsView',
    data: (() => {
        return {
            headers: [
                {text: 'Wallet', value: 'wallet'},
                {text: 'Event', value: 'eventName'},
                {text: 'Date', value: 'timestamp'},
            ],
        }
    }),
    computed: {
        displayedEvents() {
            const sortedEvents = _.sortBy(_.uniqBy(this.events, x => x.data.timestamp), x => -_.toNumber(x.data.timestamp));
            return _.map(sortedEvents, (x, i) => {
                return {
                    id: i,
                    eventName: x.eventName,
                    ..._.pickBy(x.data, (v, k) => !/[0-9]+/.test(k))
                };
            })
        },
        ...mapGetters('events', [
            'events'
        ])
    },
    filters: {
        timestamp(s) {
            return new Date(_.parseInt(s) * 1000).toLocaleString();
        }
    },
    components: {
        Blocky
    },
}
</script>
