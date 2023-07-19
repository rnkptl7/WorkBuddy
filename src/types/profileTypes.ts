export interface Achievement {
    titleDate: any;
    title: string;
    titleDescription: string;
}

export interface ProfileStoreState {
    openModal: boolean;
    userId: string;
    achievements: Achievement[];
}

export interface Employee {
    email: string;
    empID: string;
    department: string;
    reporting: string;
    jdate: string;
}

export interface Other {
    aadhaar: string;
    pan: string;
    nationality: string;
}

export interface Personal {
    fullName: string;
    gender: string;
    address: string;
    mobile: number;
    dob: string;
}

export interface Professional {
    qualification: string;
    cdate: string;
    totalExp: string;
}