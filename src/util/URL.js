// const BASEURL = 'http://localhost:443';
const BASEURL = '/api';

const REGISTURL = BASEURL + "/regist"; // 注册
const LOGINURL = BASEURL + "/login"; // 注册
const UPLOADURL = BASEURL + "/video/upload"; // 上传文件
const SHOWALLURL = BASEURL + "/video/showAll"; // 上传文件
const GETCOMMENTS = BASEURL + "/video/getVideoComments"; // 获取评论
const SAVECOMMENTS = BASEURL + "/video/saveComment"; // 评论
const USERLIKE = BASEURL + "/video/userLike"; // 评论
const USERUNLIKE = BASEURL + "/video/userUnLike"; // 评论
const UPLOADFACE = BASEURL + "/user/uploadFace"; //
const QUERYUSER = BASEURL + "/user/query"; //
const BEFANS = BASEURL + "/user/beyourfans"; //
const QUERYPUBLISH = BASEURL + "/user/queryPublisher"; //

export default {
    REGISTURL,
    UPLOADURL,
    SHOWALLURL,
    QUERYUSER,
    BEFANS,
    USERLIKE,
    USERUNLIKE,
    QUERYPUBLISH,
    UPLOADFACE,
    GETCOMMENTS,
    SAVECOMMENTS,
    LOGINURL,
}