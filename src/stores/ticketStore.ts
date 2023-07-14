import { defineStore } from "pinia";
import moment from 'moment';
import { ref, reactive } from 'vue';
import { useFirestore } from "vuefire";
import { collection, getDocs, query, where } from 'firebase/firestore';

export const useTicketStore = defineStore('ticketStore', () => {
    const tickets = ref([]);
    let ticketsByCategory = ref([]);
    const userId = "8myANlkdZmLQ3qccNAeE";
    const db = useFirestore();

    async function fetchTickets() {
        const q = query(collection(db, 'tickets'), where('userId', "==", userId))
        const ticketList = await getDocs(q)
        
        tickets.value = [];
        ticketList.forEach((ticket) => {
          const data = ticket.data();
          tickets.value.unshift({...data, id: ticket.id.slice(0,5) + ".", createdOn: formatDate(data), closedBy: "-"});
        });

        return tickets;
    }

    function formatDate(data) {
        const seconds = data.createdOn.seconds;
        const nanoseconds = data.createdOn.nanoseconds;
        const date = moment.unix(seconds).add(nanoseconds / 1000000, 'milliseconds');
        return date.format('DD-MM-YYYY');
    }

    async function fetchByCategory() {
        const tickets = await fetchTickets();
        
        let category = reactive({});
        // for (const prop of Object.getOwnPropertyNames(ticketsByCategory)) {
        //     delete ticketsByCategory[prop];
        // }

        for (let ticket of tickets.value) {
            category[ticket.category] = category[ticket.category] ? category[ticket.category] + 1 : 1
        }

        ticketsByCategory.value = [category['Hardware'], category['Software'], category['Ontime'], category['HR Queries']]

        console.log(ticketsByCategory.value)
    }
  
    return { tickets, userId, fetchTickets, ticketsByCategory, fetchByCategory }
})