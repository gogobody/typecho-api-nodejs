Typecho blog API 是一个nodejs编写的typecho 博客api库

目前支持的api有:
1. getUsersBlogs 获取博客信息
2. getRecentPosts 获取最近的num条博客
3. getCategories 获取分类
4. getPost 获取博文详情
5. editPost 编辑、更新博文
6. newPost 发布新的博文
7. deletePost 删除博文
8. newMediaObject 上传媒体

已知问题：

- typecho 如果使用了AutoTags插件，则post的mt_keywords为必填字段
- 果使用了handsome插件，则必须先去插件->搜索设置里构建索引
- 如果需要上传附件，需要保证usr/目录下有uploads文件夹且具有可写入权限

地址：
[github][1]
[npm][2]

# install
>npm i typecho-api

一般uri为：
- "博客域名/action/xmlrpc"

# examples

```$js


const Typechoblog = require('typecho-api');
const metaWeblog = new Typechoblog('uri', 'name', 'password');
var blogid, postid;
var post = {
    title:"new post", //title
    description:"##make down", //content
    // wp_slug: "测试slug", //id?
    // mt_text_more: "mt_text_more", //"Read more"
    // wp_password: "",
    mt_keywords: "测试tag", //关键词
    categories: ['随便写写'],//categories
    // dateCreated:"dateCreated", //创建时间
    // mt_allow_comments:1, //允许评论
    // mt_allow_pings:1,
    // post_status:'publish',//'publish'

};



//
//getUsersBlogs
metaWeblog.getUsersBlogs(1)
  .then(blogInfos => {
    console.log('\n Method response for \'getUsersBlogs\': ');
    console.log(blogInfos);
    blogid = blogInfos[0].blogid;

    // getCategories
    metaWeblog.getCategories(blogid)
      .then(categories => {
        console.log('\n Method response[0] for \'getCategories\': ');
        console.log(categories[0]);
      });

    //getRecentPosts
    metaWeblog.getRecentPosts(blogid, 1)
      .then(posts => {
        console.log('\n Method response for \'getRecentPosts\': ');
        // console.log(posts);
        postid = posts[0].postid;

        // getPost
        metaWeblog.getPost(postid)
          .then(post => {
            console.log('\n Method response for \'getPost\': ');
            // console.log(post);

            // editPost
            post.description = '##makre \r\n' + post.description;
            metaWeblog.editPost(postid, post, true)
              .then(success => {
                console.log('\n Method response for \'editPost\': ');
                console.log(success);
              }).catch(error => {
                  console.log(error)
            });
          });
      });


    // newPost
    var post = {
      title: 'New Post1',
      description: 'Post created by `Typechoblog API` on ' + Date(),
      categories: ['随便写写'],
      mt_keywords: "测试tag",
    };
    metaWeblog.newPost(blogid, post, true)
              .then(newPostId => {
        console.log('\n Method response for \'newPost\': ');
        console.log(newPostId);

        // deletePost
        metaWeblog.deletePost(1, newPostId, true)
          .then(success => {
            console.log('\n Method response for \'deletePost\': ');
            console.log(success);
          });
      }).catch(error => {
          console.log(error)
    });

    // //newMediaObject
    // var fs = require("fs");
    // var imageFile = fs.readFileSync('test.jpg');
    // var media = {
    //   name: 'test.jpg',
    //   type: 'image/jpg',
    //   bytes: new Buffer.from(imageFile, 'binary')
    // };
    // metaWeblog.newMediaObject("1", media)
    //   .then(urlData => {
    //     console.log('\n Method response for \'newMediaObject\': ');
    //     console.log(urlData);
    //   });

  //
})
.catch(error => {
  console.error(error);
});

```
  [1]: https://github.com/gogobody/typecho-api-nodejs/blob/master/README.md
  [2]: https://www.npmjs.com/package/typecho-api