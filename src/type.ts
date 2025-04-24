export  interface UserType{
    id:string
    username:string
    email:string
    password:string
}

export  interface BlogType{
    id:string
    title:string
    content:string
    image:string
    auther:string
    isFavorite?:boolean
    date:string
}

export interface CommentType{
    id:string
    blogid:string
    username:string
    content:string
    date:string
}

export interface FavoriteType{
    id:string
    blogid:string
    username:string
    image:string
    title:string
    content:string
    auther:string
    date:string
}