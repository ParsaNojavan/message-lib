export default interface UserLoginRegisterDto {
    email: string
    verificationCode?: string
    password?: string
    lang: string | undefined
}
