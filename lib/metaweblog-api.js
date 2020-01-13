/**
 * @file Typechoblog API Documentation
 * A Node.js implementaton of Typecho API.
 * @author gogobody
 */

'use strict';

const xmlrpc = require('xmlrpc');
const url = require('url');

/**
 * @constructs Typechoblog
 * @param {String} uri - Server URI to make the HTTP request to.
 * @param username
 * @param password
 */
function Typechoblog(uri,username, password) {
    const urlparts = url.parse(uri);
    const secure = urlparts.protocol === 'https:';
    let client;
    this.username = username;
    this.password = password;
    if (secure) {
        client = xmlrpc.createSecureClient(uri);
    }
    else {
        client = xmlrpc.createClient(uri);
    }

    /*
     * Makes an XML-RPC call to the server and returns a Promise.
     * @param {String} methodName - The method name.
     * @param {Array} params      - Params to send in the call.
     * @return {Promise<Object|Error>} 
     */
    function methodCall(methodName, params) {
        return new Promise(function (resolve, reject) {
            client.methodCall(methodName, params, function (error, data) {
                if (!error) {
                    resolve(data);
                } else {
                    reject(error);
                }
            });
        });
    }

    /**
     * Returns information on all the blogs of a given user.
     * @param blogid
     * @return {Promise<BlogInfo[]|Error>}
     */
    this.getUsersBlogs = function (blogid) {
        return methodCall('blogger.getUsersBlogs', [blogid, this.username, this.password]);
    };

    /**
     * Retrieves a list of the most recent posts.
     * @param {String} blogid
     * @param {Number} numberOfPosts
     * @return {Promise<Post[]|Error>}
     */
    this.getRecentPosts = function (blogid, numberOfPosts) {
        return methodCall('metaWeblog.getRecentPosts', [blogid, this.username, this.password, numberOfPosts]);
    };

    /**
     * Retrieves a list of valid categories.
     * @param {String} blogid
     * @return {Promise<CategoryInfo[]|Error>}
     */
    this.getCategories = function (blogid) {
        return methodCall('metaWeblog.getCategories', [blogid,  this.username, this.password]);
    };

    /**
     * Gets a post by id.
     * @param {String} postid
     * @return {Promise<Post|Error>}
     */
    this.getPost = function (postid) {
        return methodCall('metaWeblog.getPost', [postid, this.username, this.password]);
    };

    /**
     * Updates a post by id.
     * @param {String} postid
     * @param {Post} post
     * @param {Boolean} publish
     * @return {Promise<Boolean|Error>} success or error
     */
    this.editPost = function (postid, post, publish) {

        return methodCall('metaWeblog.editPost', [postid, this.username, this.password, post, publish]);
    };

    /**
     * Makes a new post.
     * @param {String} blogid
     * @param {Post} post
     * @param {Boolean} publish
     * @return {Promise<Number|Error>} post id or error
     */
    this.newPost = function (blogid, post, publish) {
        return methodCall('metaWeblog.newPost', [blogid, this.username, this.password, post, publish]);
    };

    /**
     * Deletes a post.
     * @param {String} blogid
     * @param {String} postid
     * @param {Boolean} publish
     * @return {Promise<Boolean|Error>} success or error
     */
    this.deletePost = function (blogid, postid, publish) {
        return methodCall('blogger.deletePost', [blogid, postid, this.username, this.password, publish]);
    };

    /**
     * Uploads a new file.
     * @param {String} blogid
     * @param {MediaObject} mediaObject{name,type,bytes}
     * @return {Promise<MediaObject|Error>}
     */
    this.newMediaObject = function (blogid, mediaObject) {
        return methodCall('metaWeblog.newMediaObject', [blogid, this.username, this.password, mediaObject]);
    };
}

exports = module.exports = Typechoblog;

/**
 * Struct BlogInfo
 * @typedef {Object} BlogInfo
 * @property {String} blogid
 * @property {String} url
 * @property {String} blogName
 */

/**
 * Struct Post
 * @typedef {Object} Post
 * @property {Date} dateCreated - Required when posting.
 * @property {String} description - Required when posting.
 * @property {String} title - Required when posting.
 * @property {String[]} [categories]
 * @property {String} [link]
 * @property {String} [permalink]
 * @property {String} [postid]
 * @property {Source} [source]
 * @property {String} [userid]
 * @property {any} [...] - other properties not listed in this doc.
 */

/**
 * Struct CategoryInfo
 * @typedef {Object} CategoryInfo
 * @property {String} description
 * @property {String} htmlUrl
 * @property {String} rssUrl
 * @property {String} title
 * @property {String} categoryid
 */

/**
 * Struct MediaObject
 * @typedef {Object} MediaObject
 * @property {String} name
 * @property {String} type
 * @property {base64} bytes
 */

/**
 * Struct Source
 * @typedef {Object} Source
 * @property {String} [name]
 * @property {String} [url]
 */

/**
 * Struct UrlData
 * @typedef {Object} UrlData
 * @property {String} url
 */

/**
 * Struct Error
 * @typedef {Object} Error
 * @property {String} faultCode
 * @property {String} faultString
 */