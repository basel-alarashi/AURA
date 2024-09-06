import { Account, Avatars, Client, Databases, ID, Query, QueryTypes, Storage } from 'react-native-appwrite';

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
const storage = new Storage(client);


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
        throw new Error(error);
    }
};

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
        throw new Error(error);
    }
};

export const getAllPosts = async () => {
    try {
        const posts = await databases.listDocuments(
            config.databaseId,
            config.videoCollectionId,
            [Query.orderDesc('$createdAt')]
        );

        return posts.documents;
    } catch (error: any) {
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
        throw new Error(error);
    }
};

export const searchPosts = async (query: any) => {
    try {
        const posts = await databases.listDocuments(
            config.databaseId,
            config.videoCollectionId,
            [Query.contains('title', query), Query.orderDesc('$createdAt')]
        );

        return posts.documents;
    } catch (error: any) {
        throw new Error(error);
    }
};

export const getUserPosts = async (userId: QueryTypes) => {
    try {
        const posts = await databases.listDocuments(
            config.databaseId,
            config.videoCollectionId,
            [Query.equal('creator', userId), Query.orderDesc('$createdAt')]
        );

        return posts.documents;
    } catch (error: any) {
        throw new Error(error);
    }
};

export const signOut = async () => {
    try {
        const session = await account.deleteSession('current');

        return session;
    } catch (error: any) {
        throw new Error(error);
    }
};

const getFilePreview = async (fileId: string, type: string) => {
    try {
        const fileURL = type === 'video'
            ? storage.getFileView(config.videosStorageId, fileId)
            : type === 'image'
                ? storage.getFilePreview(config.thumbsStorageId, fileId)
                : null;
        if (!fileURL) throw new Error('Invalid file type');
        return fileURL;
    } catch (error: any) {
        throw new Error('[Get File URL ' + type + ']: ' + error.message);
    }
};

const uploadFile = async (file: any, type: string) => {
    if (!file) return;

    /* UPLOAD FROM FILE EXPLORER */
    // const { mimeType, ...rest } = file;
    // const asset = { type: mimeType, ...rest };

    /* UPLOAD FROM GALLERY */
    const asset = {
        name: file.fileName,
        size: file.fileSize,
        type: file.mimeType,
        uri: file.uri
    };

    try {
        const uploadedFile = await storage.createFile(
            type === 'video' ? config.videosStorageId : config.thumbsStorageId,
            ID.unique(),
            asset
        );
        const fileURL = await getFilePreview(uploadedFile.$id, type);
        return fileURL;
    } catch (error: any) {
        throw new Error('[Upload File ' + type + ']: ' + error.message);
    }
};

export const createVideo = async (form: any) => {
    try {
        const [thumbnailURL, videoURL] = await Promise.all([
            uploadFile(form.thumbnail, 'image'),
            uploadFile(form.video, 'video')
        ]);

        const newPost = await databases.createDocument(
            config.databaseId,
            config.videoCollectionId,
            ID.unique(),
            { title: form.title, prompt: form.prompt, thumbnail: thumbnailURL,
                video_link: videoURL, creator: form.userId }
        );
        return newPost;
    } catch (error: any) {
        throw new Error('[Create Video]: ' + error.message);
    }
};