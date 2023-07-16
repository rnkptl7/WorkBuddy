import { defineStore } from "pinia";
import moment from 'moment';
import { ref, reactive } from 'vue';
import { useFirestore } from "vuefire";
import { collection, getDocs, query, where } from 'firebase/firestore';

export const useTicketStore = defineStore('ticketStore', () => {
    const openTickets = ref([]);
    const closedTickets = ref([]);
    const raisedTickets = ref([]);

    let ticketsByCategory = ref([]);
    let ticketsByMonth = ref([]);

    const userId = "8myANlkdZmLQ3qccNAeE";
    const db = useFirestore();

    async function fetchTicketsByStatus() {
      const q = query(collection(db, 'tickets'), where('userId', "==", userId));
      const ticketList = await getDocs(q);

      closedTickets.value = [];
      openTickets.value = [];

      ticketList.forEach((ticket) => {
        const data = ticket.data();
        if (data.status === 'Open'){
          openTickets.value.unshift({...data, id: ticket.id.slice(0,5) + "."});
        }
        else {
          closedTickets.value.unshift({...data, id: ticket.id.slice(0,5) + "."});
        }
      });
    }

    fetchTicketsByStatus();

    async function fetchAllTickets() {
        const q = query(collection(db, 'tickets'), where('userId', "==", userId))
        const ticketList = await getDocs(q);
        
        raisedTickets.value = [];

        ticketList.forEach((ticket) => {
          const data = ticket.data();
          raisedTickets.value.unshift({...data, id: ticket.id.slice(0,5) + "."});
        });

        return raisedTickets;
    }

    async function fetchByCategory() {
        const tickets = await fetchAllTickets();
        
        let category = reactive({});

        for (let ticket of tickets.value) {
            category[ticket.category] = category[ticket.category] ? category[ticket.category] + 1 : 1
        }

        ticketsByCategory.value = [category['Hardware'], category['Software'], category['Ontime'], category['HR Queries']]
    }

    async function fetchByMonths() {
        const tickets = await fetchAllTickets();

        let dates = reactive(new Array(12).fill(0));
        
        for (let ticket of tickets.value) {
            const month = moment(ticket.createdOn, 'DD-MM-YYYY').month();

            dates[month] = dates[month] + 1;
        }

        ticketsByMonth.value = dates;
    }
  
    return { raisedTickets, openTickets, closedTickets, userId, fetchAllTickets, ticketsByCategory, fetchByCategory, fetchByMonths, ticketsByMonth, fetchTicketsByStatus }
})