/**
* 打包的时候确保mock, buildType这两个配置正确
*/

//打包类型，1:测试， 2:发布
let buildType = 1; 

//使用模拟API的话则为true, 否为false;
let mock = false;

//路由模式配置
let routerMode = 'hash';



//api配置
let baseUrl = ''; 
let uploadUrl = '';
let logUrl = '';
let LIMIT = 20;
let USER_FROM = 0;


/**
 * 预发布环境域名：aaa.com
 * 开发境域名：aaa.bb.com
 */
if(process.env.NODE_ENV == 'production'){
	//打包产品的配置
	if (buildType === 1) {
		baseUrl = 'http://aaa.bb.com/api/';
		uploadUrl = 'http://upload.aaa.bb.com/api/';
		logUrl = 'http://mon.aaa.com/t.html';
	} else if (buildType === 2){
		baseUrl = 'http://aaa.com/api/';
		uploadUrl = 'http://upload.aaa.cn/api/';
		logUrl = 'http://mon.singworld.cn/t.html';
	}
	
} else {
	if (!mock) {
		//开发环境下使用测试环境服务器API，mock为true的情况下使用本地模拟API
		baseUrl = 'http://aaa.bb.com/api/';
		uploadUrl = 'http://upload.aaa.bb.com/api/';
		logUrl = 'http://mon.aaa.com/t.html';
	}
}

export {
	baseUrl,
	uploadUrl,
	logUrl,
	routerMode,
	LIMIT,
	USER_FROM
}