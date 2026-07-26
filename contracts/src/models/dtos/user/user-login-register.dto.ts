export default interface UserLoginRegisterDto {
    phoneNumber: string
    verificationCode?: string
    password?: string
    lang: string | undefined
}
