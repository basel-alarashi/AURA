import { Account, Avatars, Client, Databases, ID, Query } from 'react-native-appwrite';

export const config = {
    platform: 'com.brn.aura',
    endpoint: 'https://cloud.appwrite.io/v1',
    projectId: '66d2597d0015ea27a62d',
    databaseId: '66d25e0a003dffbaa9a1',
    userCollectionId: '66d25e4a003bd15119f5',
    videoCollectionId: '66d25e96003c542d7e59',
    thumbsStorageId: '66d39369001ea8932c23',
    videosStorageId: '66d261d3003c2e830ca9'
};

const client = new Client();

client.setEndpoint(config.endpoint).setProject(config.projectId).setPlatform(config.platform);

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

// Register User
export const createUser = async (email: string, password: string, username: string) => {
    try {
        const newAccount = await account.create(ID.unique(), email, password, username);

        if (!newAccount) throw new Error('Creating account failed!.');

        const avatarUrl = avatars.getInitials(username);
        await signIn(email, password);
        const newUser = await databases.createDocument(config.databaseId, config.userCollectionId,
            ID.unique(), {
                accountId: newAccount.$id,
                email: email,
                username: username,
                avatar: avatarUrl
            }
        );
        return newUser;
    } catch (error: any) {
        console.log(error);
        throw new Error(error);
    }
};

// Log In User
export const signIn = async (email: string, password: string) => {
    try {
        const session = await account.createEmailPasswordSession(email, password);
        return session;
    } catch (error: any) {
        throw new Error(error);
    }
};

export const getCurrentUser = async () => {
    try {
        const currentAccount = await account.get();

        if (!currentAccount) throw Error('There is no logged in user.');

        const currentUser = await databases.listDocuments(
            config.databaseId,
            config.userCollectionId,
            [Query.equal('accountId', currentAccount.$id)]
        );

        if (!currentUser) throw Error('Error in fetching user information.');

        return currentUser.documents[0];
    } catch (error: any) {
        console.log(error);
        throw new Error(error);
    }
};

export const getAllPosts = async () => {
    try {
        const posts = await databases.listDocuments(config.databaseId, config.videoCollectionId);

        return posts.documents;
    } catch (error: any) {
        console.log(error);
        throw new Error(error);
    }
};

export const getLatestPosts = async () => {
    try {
        const posts = await databases.listDocuments(
            config.databaseId,
            config.videoCollectionId,
            [Query.orderDesc('$createdAt'), Query.limit(7)]
        );

        return posts.documents;
    } catch (error: any) {
        console.log(error);
        throw new Error(error);
    }
};