export default interface Notification {
    senderId: string, 
    senderName?: string,
    recipientIds: string[],
    messageId: string, 
    messagePreview: string, 
    roomId: string
}