import { useFirestore } from "vuefire";
import {
    DocumentData,
    QuerySnapshot,
    addDoc,
    collection,
    doc,
    getDoc,
    getDocs,
    query,
    updateDoc,
    where,
} from "firebase/firestore";
import { IRegister } from "@/types/authTypes";
import { departmentList } from "@/types/department";

const database = useFirestore();

export const fetchLeavesByUsersId = async (userId: string) => {
    try {
        const response = await getDocs(
            query(collection(database, "leaves"), where("userId", "==", userId))
        );
        return response;
    } catch (e) {
        alert("Error in fetching leaves data!");
    }
};

export const fetchAllPendingLeaves = async () => {
    try {
        const response = await getDocs(
            query(
                collection(database, "leaves"),
                where("status", "==", "pending")
            )
        );
        return response;
    } catch (e) {
        alert("Error in fetching pending leaves!");
    }
};

export const fetchLeavesBalance = async (userId: string) => {
    try {
        const docSnap = await getDoc(doc(database, "users", userId));
        if (docSnap.exists()) return docSnap;
    } catch (e) {
        alert("Error in fetching leaves balance!");
    }
};

export const addLeaveDetail = async (leaveDetail: object) => {
    try {
        const leave = await addDoc(collection(database, "leaves"), {
            ...leaveDetail,
        });
        return leave.id;
    } catch (e) {
        alert("Error in adding leave!");
    }
};

export const updateLeaveDetail = async (
    leaveId: string,
    leaveDetail: object
) => {
    try {
        const leaveReferance = doc(database, "leaves", leaveId);
        await updateDoc(leaveReferance, { ...leaveDetail });
    } catch (error) {
        alert("Error in updating leave!");
    }
};

export const updateUserDetail = async (userId: string, userDetail: object) => {
    try {
        const user = doc(database, "users", userId);
        await updateDoc(user, { ...userDetail });
    } catch (e) {
        alert("Error in updating user detail");
    }
};

export const getUserDetail = async (userId: string) => {
    try {
        const docSnap = await getDoc(doc(database, "users", userId));
        if (docSnap.exists()) return docSnap;
    } catch (e) {
        alert("Error in fetching leaves balance!");
    }
};
export const getAdmins = async (userId: string) => {
    try {
        const queryLoc = query(
            collection(database, "users"),
            where("register.role", "==", "admin")
        );
        const querySnap = await getDocs(queryLoc);
        if (querySnap) return querySnap;
    } catch (e) {
        alert("Error in fetching leaves balance!");
    }
};
export async function getAchievement() {
    const userId = localStorage.getItem("userId");
    try {
        const docSnap = await getDoc(doc(database, "users", userId));
        if (docSnap.exists()) return docSnap;
    } catch (e) {
        alert("Error in fetching Achievement Detail!");
    }
}

export const getUsers = async ():Promise<QuerySnapshot<DocumentData>> => {
    const querySnapshot = await getDocs(collection(database, "users")); 
    return querySnapshot;
}

export const registerUser = async (userData: IRegister) => {
    try {
        const data = await addDoc(collection(database, "users"), {
            register: userData,
        });
        return data.id;
    } catch (error) {  
        alert("Error: User Registration failed!")
    }
}

export const fetchUpdatedEmployee = async (userID:string, departmentList:departmentList) =>{
    try {
        const employeeDataRef = doc(database, "users", userID);
        await updateDoc(employeeDataRef, {
            "register.department":
              departmentList.name.toLowerCase(),
          });
        return employeeDataRef;
    } catch (error) {
        alert("Error in Fetching Updated Employee's Department");
    }
}

export async function fetchTickets(userId?: string) {
    let q;
    const colRef = collection(database, 'tickets');

    if (userId != undefined) {
        q = query(colRef, where('userId', "==", userId));
    }
    else {
        q = query(colRef)
    }

    try {
        return await getDocs(q);
    }
    catch(e) {
        alert("Error in fetching Tickets data!");
        return [];
    }
}