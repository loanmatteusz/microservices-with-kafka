import { Perfil } from "./perfil.entity";

export class User {
    id: string;
    name: string;
    email: string;
    password: string;
    perfil?: Perfil;
    created_at: Date;
    updated_at: Date;
}
