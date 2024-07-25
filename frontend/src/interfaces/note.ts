export interface Note {
    id: string | undefined;
    title: string;
    content: string;
    created_at: string;
    updated_at: string;
    status: "ACTIVE"| "INACTIVE";
    archived: boolean;
    categories: Category[];
}

export interface Category{
    id:string 
    name:string
}
