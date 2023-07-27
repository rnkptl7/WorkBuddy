export interface draggedItem {
    fullName: string;
    department: string;
    email: string;
    gender: string;
    userID: string;
}

export interface displayUserData extends draggedItem {
    role: string;
    id: number;
}

export interface departmentList {
    id: number;
    name: string;
    class: string;
}
export interface startDrag {
    draggedItem: { value: number | null };
    dataTransfer: { value: number | null };
}
