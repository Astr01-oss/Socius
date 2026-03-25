import AuthService from "./auth.service";
import { users } from "../data/users";

type Questionary = {
    name : string
    age : number
    gender : string
    city : string
    bio? : string
    interests? : string[]
    photos? : string
};

class CardService {
    async createCard(token: string, questionaryData: Questionary) {
        const payload = await AuthService.verifyToken(token);
        if (!payload) throw new Error('Неверный токен');

        const existingUser = users.find(u => u.id === payload.id);
        if (!existingUser) throw new Error('Пользователь не найден');

        existingUser.questionary = {
            name: questionaryData.name,
            age: questionaryData.age,
            bio: questionaryData.bio,
            interests: questionaryData.interests,
            photos: questionaryData.photos,
            gender: questionaryData.gender,
            city: questionaryData.city,
        };

        return existingUser;
    }

    async getCard(token: string) {
        const payload = await AuthService.verifyToken(token);
        if (!payload) throw new Error('Неверный токен');

        const existingUser = users.find(u => u.id === payload.id);
        if (!existingUser) throw new Error('Пользователь не найден');
        return existingUser.questionary;
    }
}

export default new CardService()