export interface draggedItem {
    fullName:string;
    department:string;
    email:string;
    gender:string;
    userID:string;
}

export interface displayUserData extends draggedItem {
    role:string;
}