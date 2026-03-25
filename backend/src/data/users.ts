import { User } from "../models/user.model";
export const users : User[] = [
  {
    id : 1,
    phone : '123123123',
    password : '123123123',
    questionary : {
      name : "Дима",
      age : 22,
      gender : 'Парень',
      city : 'Москва',
      interests : ['Путешествия', 'Творчество'] 
    }
  },
  {
    id : 2,
    phone : '321321321',
    password : '123123312',
    questionary : {
      name : "Даня",
      gender : 'Парень',
      city : 'Москва',
      age : 19,
      interests : ['Игры', 'Спорт'] 
    }
  }
]