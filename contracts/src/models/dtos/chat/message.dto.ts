export default interface MessageDto {
    senderId: string,
    content: string,
    replyTo?: string,
    isForwarded?: boolean,
    forwardedFromUser?: string,
    forwardedFromRoom?: string
}