export default interface UserLoginRegisterDto {
    phoneNumber: string
    verificationCode?: string
    lang: string | undefined
}
