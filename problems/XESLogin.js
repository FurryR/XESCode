/*
Author:Fox-Awa组织
desc:本Javascript是学而思登录协议的一个封装。
*/
function XESLogin(){
    var __request__=function(method,url,data=""){
        var i=new XMLHttpRequest();
        i.open(method,url,false);
        if(data!="")i.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
        i.send(data);
    }//SOP跨域问题未得到解决。希望您可以帮我们解决然后发起pull request或者将点子发送给awa_the_fox@qq.com。
    //您可以编写php代理（设置允许跨域的网址为*）来帮助我们解决这个问题，但由于您需要自费且连接不稳定，所以不推荐此解决方法。
    return {
        getcaptcha:function(username,password){
            return __request__("POST","https://passport.100tal.com/v1/web/captcha/get","symbol="+encodeURIComponent(username)+"&password="+encodeURIComponent(password));
        },
        login:function(username,password,captchacode){
            var i=JSON.parse(__request__("POST","https://passport.100tal.com/v1/web/login/pwd","symbol="+encodeURIComponent(username)+"&password="+encodeURIComponent(password)+"&captcha="+encodeURIComponent(captchacode))).data.code;
            if(i===undefined)return {};
            var temp=new XMLHttpRequest();
            temp.open("POST","https://login.xueersi.com/V1/Web/getToken",false);
            temp.send("code="+i);
            console.log(temp.getResponseHeader("set-cookie"));//此库不可用。此为debug语句。
        },
    };
}
