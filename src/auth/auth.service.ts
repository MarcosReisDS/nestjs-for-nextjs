import { Injectable } from "@nestjs/common";

@Injectable()
export class AuthService {
    login() {
        return "Olá AuthService";
    }
 }