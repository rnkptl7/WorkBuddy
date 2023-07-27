export interface Achievement {
    titleDate: Date;
    title: string;
    titleDescription: string;
}

export interface ProfileStoreState {
    openModal: boolean;
    achievements: Achievement[];
}

export interface Employee {
    email: string;
    empID: string;
    department: string;
    reporting: string;
    jdate: Date;
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
    dob: Date;
}

export interface Professional {
    qualification: string;
    cdate: Date;
    totalExp: string;
}

export type ProfileDetails = {
    department: string;
    empID: string;
    role: string;
    totalLeaves: string;
    takenLeaves: string;
    leftLeaves: string;
    carrerStartDate: string;
    joiningDate: string;
    totalExperience: string;
};
