export default interface ticket {
    id: string,
    category: string,
    title: string,
    description: string,
    priority: string,
    createdOn: string,
    status: string,
    userId: string,
    userName: string,
    closedBy?: string
}