export default interface NotificationDto {
    senderId: string, 
    senderName?: string,
    recipientIds: string[],
    messageId: string, 
    messagePreview: string, 
    roomId: string
}