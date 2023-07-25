import { defineStore, storeToRefs } from "pinia";
import { useAuthStore } from "./authStore";
import moment from 'moment';
import { Ref, ref, reactive } from 'vue';
import { useFirestore } from "vuefire";
import { collection, getDocs, query, where } from 'firebase/firestore';
import ticket from "@/types/ticket";

export const useTicketStore = defineStore('ticketStore', () => {
    const openTickets: Ref<ticket[]> = ref([]);
    const closedTickets: Ref<ticket[]> = ref([]);
    const raisedTickets: Ref<ticket[]> = ref([]);
    const ticketsByCategory: Ref<number[]> = ref([]);
    const ticketsByMonth: Ref<number[]> = ref([]);
    const showCloseTicketForm: Ref<boolean> = ref(false);
    const ticketToBeClosed: Ref<Partial<ticket>> = ref({});
    const { userId, fullName, isAdmin } = storeToRefs(useAuthStore());

 
    const db = useFirestore();
    const colRef = collection(db, 'tickets');

    async function fetchTicketsByStatus(): Promise<void> {
      let ticketList;
      
      if (isAdmin.value) {
        ticketList = await getDocs(colRef);
      }
      else {
        const q = query(colRef, where('userId', "==", userId.value));
        ticketList = await getDocs(q);  
      }

      closedTickets.value = [];
      openTickets.value = [];

      ticketList.forEach((ticket) => {
        const data: ticket = ticket.data() as ticket;
        
        if (data.status === 'Open'){
          openTickets.value.push({...data, id: ticket.id});
        }
        else {
          closedTickets.value.push({...data, id: ticket.id.slice(0,5) + ".."});
        }
      });
    }

    fetchTicketsByStatus();

    async function fetchAllTickets() {
        let ticketList;
        if (isAdmin.value) {
          ticketList = await getDocs(colRef);
        }
        else {
          const q = query(colRef, where('userId', "==", userId.value));
          ticketList = await getDocs(q);
        }
        
        raisedTickets.value = [];

        ticketList.forEach((ticket) => {
          const data: any = ticket.data();
          raisedTickets.value.unshift({...data, id: ticket.id.slice(0,5) + ".."});
        });

        return raisedTickets;
    }

    async function fetchByCategory() {
        const tickets = await fetchAllTickets();
        
        let category: any = reactive({});

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
  
    return { raisedTickets, openTickets, closedTickets, userId, fullName, isAdmin, fetchAllTickets, ticketsByCategory, fetchByCategory, fetchByMonths, ticketsByMonth, fetchTicketsByStatus, showCloseTicketForm, ticketToBeClosed };
})