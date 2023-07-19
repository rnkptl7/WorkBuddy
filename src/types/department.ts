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

export interface frontendDept extends displayUserData{
}

export interface backendDept extends displayUserData{
}

export interface devopsDept extends displayUserData{
}

export interface uiuxDept extends displayUserData{
}