import { v4 as uuidv4} from 'uuid'
import { UserRole } from '../enums/UserRole'

export interface CreateUserProps {
    id?: string;
    name: string;
    email: string;
    password: string;
    role?: UserRole;
    isDeleted?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

export class User {
    private readonly _id: string;
    private _name: string;
    private _email: string
    private _password : string;
    private _role: UserRole;
    private _isDeleted: boolean;
    private  readonly _createdAt: Date;
    private _updatedAt: Date ;

    constructor(props: CreateUserProps) {
        this._id = props.id || uuidv4(),
        this._name = props.name , 
        this._email = props.email,
        this._password = props.password,
        this._role = props.role || UserRole.USER;
        this._isDeleted = props.isDeleted || false ;
        this._createdAt = props.createdAt || new Date();
        this._updatedAt = props.updatedAt || new Date();

        this.validate();
    }

    private validate(): void {
        if(!this._name || this._name.trim().length < 2){
          throw new Error("Name must be at least 2 characters");
        }
        if(!this._email || !this._email.includes("@")){
            throw new Error("Valid email is required");
        }
        if(!this._password || this._password.length < 6){
            throw new Error("password must be at least 6 characters");
        }
    }


    public get id(): string { return this._id}
    public get name(): string {return this._name;}
    public get email(): string { return this._email}
    public get password(): string { return this._password}
    public get role(): UserRole {return this._role}
    public get isDeleted(): boolean { return this._isDeleted}
    public get createdAt(): Date { return this._createdAt}
    public get updatedAt(): Date { return this._updatedAt}

    public updatedName (name: string): void {
        if(!name || name.trim().length < 2){
            throw new Error("name must be at least 2 charcters");
        }
        this._name = name 
        this._updatedAt = new Date()
    }

    public updatedPassword (password: string): void {
        if(!password || password.length < 6){
            throw new Error("password must be at least 6 characters")
        }
        this._password = password ;
        this._updatedAt = new Date();
    }

    public markAsDeleted(): void {
        this._isDeleted = true ;
        this._updatedAt = new Date() ;
    }
}