import { v4 as uuidv4} from 'uuid'

export interface CreateRestaurantProps {
    id?: string;
    name: string;
    address: string;
    phone: string;
    email?: string;
    description?: string;
    imageUrl?: string;
    createdBy: string;
    isDeleted?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

export class Restaurant {
    private readonly _id : string;
    private _name : string;
    private _address: string;
    private _phone: string;
    private _email: string | null;
    private _description : string | null;
    private _imageUrl: string | null;
    private _createdBy: string;
    private _isDeleted: boolean;
    private readonly _createdAt: Date;
    private _updatedAt: Date;

    constructor(props: CreateRestaurantProps){
        this._id = props.id || uuidv4();
        this._name = props.name;
        this._address = props.address;
        this._phone = props.phone;
        this._email = props.email || null;
        this._description = props.description || null;
        this._imageUrl = props.imageUrl || null;
        this._createdBy = props.createdBy;
        this._isDeleted = props.isDeleted || false ;
        this._createdAt = props.createdAt || new Date();
        this._updatedAt = props.updatedAt || new Date();

        this.validate()
    }

    private validate(): void {
        if(!this._name || this._name.length < 2){
            throw new Error('Restaurant name must be at least 2 charcters');
        }
        if(!this._address || this._address.trim().length < 5){
            throw new Error("Address must be at least 5 characters");
        }
        if(!this._phone || this._phone.trim().length < 7){
            throw new Error('Phone must be at least 7 charcters');
        }
        if(!this._createdBy){
            throw new Error("Created By is Required ")
        }
    }

    public get id(): string { return this._id}
    public get name(): string { return this._name}
    public get address(): string { return this._address}
    public get phone(): string { return this._phone}
    public get email(): string | null { return this._email}
    public get description(): string | null { return this._description}
    public get imageUrl(): string | null { return this._imageUrl}
    public get createdBy(): string { return this._createdBy}
    public get isDeleted(): boolean { return this._isDeleted}
    public get createdAt(): Date { return this._createdAt}
    public get updatedAt(): Date { return this._updatedAt}


    public updateName(name: string): void {
        if(!name || name.trim().length < 2){
            throw new Error("Restaurant name must be at least 2 characters");
        }
        this._name = name ;
        this._updatedAt = new Date()
    }
    public updateAddress(address: string): void {
       if(!address || address.trim().length < 5 ){
        throw new Error("Address must be at least 5 characters ")
       }
    }
    public updatePhone(phone: string): void {
        if(!phone || phone.trim().length < 7){
            throw new Error("Phone must be at least 7 charcters ")
        }
        this._phone = phone 
        this._updatedAt = new Date()
    }
    public updateEmail(email : string | null ): void {
        this._email = email ;
        this._updatedAt = new Date()

    }
    public updateDescription(description : string | null): void {
        this._description = description;
        this._updatedAt = new Date()
    }
    public updateImageUrl(imageUrl : string | null): void {
        this._imageUrl = imageUrl;
        this._updatedAt = new Date()
    }
    public markAsDeleted(): void {
        this._isDeleted = true;
        this._updatedAt = new Date();
    }
}