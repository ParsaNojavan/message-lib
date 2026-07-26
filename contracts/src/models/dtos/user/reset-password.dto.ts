import IDto from "../../abstract/iDto";

export default interface ResetPasswordDto extends IDto {
    password: string
    confirmPassword: string
}