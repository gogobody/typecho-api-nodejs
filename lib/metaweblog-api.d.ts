// / <reference path="./../node_modules/@types/es6-promise/index.d.ts" />

// Type definitions for typpecho-api


declare class Typechoblog {
        constructor(uri: string, username: string , password:string);
        getUsersBlogs(blogid: string): Promise<Typechoblog.BlogInfo[]>;
        getRecentPosts(blogid: string, numberOfPosts: number): Promise<Typechoblog.Post[]>;
        getCategories(blogid: string): Promise<Typechoblog.CategoryInfo[]>;
        getPost(postid: string): Promise<Typechoblog.Post>;
        editPost(postid: string, post: Typechoblog.Post, publish: boolean): Promise<boolean>;
        newPost(blogid: string, post: Typechoblog.Post, publish: boolean): Promise<number>;
        deletePost(blogid: string, postid: string,, publish: boolean): Promise<boolean>;
        newMediaObject(blogid: string, mediaObject: Typechoblog.MediaObject): Promise<Typechoblog.MediaObject>;
    }

declare namespace Typechoblog {
    interface BlogInfo {
        blogid: string;
        url: string;
        blogName: string;
    }

    interface Post {
        description: string;
        title: string;
        categories?: string[];
        dateCreated?: Date;
        link?: string;
        permalink?: string;
        postid?: string;
        source?: Source;
        userid?: string;
    }

    interface CategoryInfo {
        description: string;
        htmlUrl: string;
        rssUrl: string;
        title: string;
        categoryid: string;
    }

    interface MediaObject {
        name: string;
        type: string;
        bytes: Buffer;
    }

    interface Source {
        name?: string;
        url?: string;
    }

    interface Error {
        faultCode: string;
        faultString: string;
    }
}

export = Typechoblog;
