// auth.js
import { Client, Account, ID } from 'appwrite';
import config from '../config/config.js';

const client = new Client()
    .setEndpoint(config.appwriteUrl)
    .setProject(config.appwriteprojectid);

// Account is now a function that returns API methods
const account = new Account(client);

export class AuthService {
    async createAccount({ email, password, name }) {
        // eslint-disable-next-line no-useless-catch
        try {
            const userAccount = await account.create(ID.unique(), email, password, name);
            if (userAccount) {
                return await this.login({ email, password });
            } else {
                return userAccount;
            }
        } catch (error) {
            throw error;
        }
    }

    async login({ email, password }) {
        // eslint-disable-next-line no-useless-catch
        try {
            account.createEmailPasswordSession(email, password );
 // v18+ uses an object
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser() {
        try {
            return await account.get();
        } catch (error) {
            console.error("Appwrite getCurrentUser error:", error);
            return null;
        }
    }

    async logout() {
        try {
            await account.deleteSessions();
        } catch (error) {
            console.error("Appwrite logout error:", error);
        }
    }
}

const authService = new AuthService();
export default authService;
