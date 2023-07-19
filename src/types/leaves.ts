export interface leaves {
    approvedBy: string;
    createdBy: string;
    description: string;
    endDate: string;
    startDate: string;
    leaveCategory: "Planned" | "Unplanned";
    leaveMessage: string;
    requestingToEmail: string;
    status: "Approved" | "rejected" | "pending";
    toatlDays: number;
    userId: string;
}

export interface leavesDates {
    status: string;
    start: string;
    end: string;
}
