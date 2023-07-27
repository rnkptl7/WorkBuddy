export interface authState {
    isLoggedIn: boolean;
    isAdmin: boolean;
    fullName: string | null;
    userId: string | null;
}

export interface commonStoreState {
    mobileView: boolean;
    showPassword: boolean;
    showRegisterPassword: boolean;
    showConfirmPassword: boolean;
    overlay: boolean;
}

export interface Ilogin {
    email: string;
    password: string;
}

export interface IRegister extends Ilogin {
    department: string;
    gender: string;
    role: string;
    empID?: string;
    fullName?: string;
}
