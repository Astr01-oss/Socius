export interface User {
  id : number
  phone : string
  password : string
  questionary? : {
    name : string
    age : number
    gender : string
    city : string
    bio? : string
    interests? : string[]
    photos? : string
  }
}