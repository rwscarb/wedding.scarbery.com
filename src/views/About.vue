<template>
    <div class="about_view">
        <h3>About</h3>
        <p>
            Inspiration and majority of contract from <a href="https://block42.tech" target="_blank">block42</a> with
            their source
            <a href="https://github.com/block42-blockchain-company/smart-wedding-contract" target="_blank">
                here
            </a>
            and website <a href="https://block42.uber.space/smart-wedding-contract" target="_blank">here</a>.
        </p>
        <p>
            Source code for this site and contract can be found
            <a href="https://github.com/rwscarb/wedding.scarbery.com" target="_blank">here</a>
        </p>

        <h3>Events</h3>
        <v-data-table
            :headers="headers"
            :items="displayedEvents"
            :items-per-page="10"
            class="elevation-1"
        >
            <template v-slot:item.timestamp="{ value }">
                {{ value | timestamp }}
            </template>
        </v-data-table>

        <h3>ToDo:</h3>
        <ul>
            <li>Timeline</li>
            <li>Help Stepper</li>
            <li>Transitions</li>
        </ul>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import _ from 'lodash';

export default {
    name: 'AboutView',
    data: (() => {
        return {
            headers: [
                {text: 'Event', value: 'eventName'},
                {text: 'Wallet', value: 'wallet'},
                {text: 'Date', value: 'timestamp'},
            ],
        }
    }),
    computed: {
        displayedEvents() {
            const sortedEvents = _.sortBy(_.uniqBy(this.events, x => x.data.timestamp), x => -_.toNumber(x.data.timestamp));
            return _.map(sortedEvents, x => {
                return {
                    eventName: x.eventName,
                    ...x.data
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
    }
}
</script>