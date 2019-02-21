// baseUrl:域名地址
//routerMode :路由模式
//baseImgpath 图片存放地址

let baseUrl='';
let routerMode="hash";
let baseImgPath;
if (process.env.NODE_ENV == 'development') {
	baseUrl = '';
    baseImgPath = '/img/';
}else{
	baseUrl = '//http://localhost:8080';
    baseImgPath = '//http://localhost:8080/img';
}

export {
	baseUrl,
	routerMode,
	baseImgPath
}