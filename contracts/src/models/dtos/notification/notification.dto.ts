export default interface Notification {
    senderId: string, 
    senderName?: string,
    recipientIds: string, 
    messagePreview: string, 
    roomId: string
}