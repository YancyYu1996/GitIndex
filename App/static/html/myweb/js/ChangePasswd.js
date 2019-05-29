
var status = 0;
var flag=false;
//用来检查输入数据正确性
function check(){
            //用变量存取用户的用户名和密码,邮件，手机号
        var username = $("#InputUname").val();
        var password = $("#InputPassword").val();
        var password2 = $("#InputPassword2").val();
            $.ajax("/api/ChangePasswd/match/",{
            // 期待返回的数据类型，不写会自动判断， 根据mime
            dataType: "json",
            type: "POST",
            data: {"username" :username,"passwd":password,"passwd2":password2},
            success: function (data) {
                    status = data["status"];
                    console.log(status)
                    flag = data['msg']
            }
        })
}
function flag1() {
    if(!($("#InputUname").val()))
            {
                index = layer.tips('用户名不能为空', "#InputUname", {time: 0}, {tips: [2, '#0FA6D8']}); //不自动关闭
                return true
            }
     else if(!($("#InputPassword").val()))
            {
                index = layer.tips('密码不能为空', "#InputPassword", {time: 0}, {tips: [2, '#0FA6D8']}); //不自动关闭
                return true
            }
     else if(!($("#InputPassword2").val()))
            {
                index = layer.tips('密码不能为空', "#InputPassword2", {time: 0}, {tips: [2, '#0FA6D8']}); //不自动关闭
                return true
            }

}

function flag3() {
         index = layer.tips('两次密码不同', "#InputPassword2", {time: 0}, {tips: [2, '#0FA6D8']});
}
function flag6() {
         index = layer.tips('无此用户', "#InputUname", {time: 0}, {tips: [2, '#0FA6D8']});
}
$("#InputUname").on({
    mouseout : function(){
        //鼠标移出自动关闭tips
        layer.close(index);
    },
    mouseover : function(){

        if(!flag1())
        {
            check();
       if(flag === "3")
        {
            flag3();
        }
        else if(flag === "6")
        {
            flag6();
        }

        }
    }
});

//密码框
$("#InputPassword").on({
    mouseout : function(){
        //鼠标移出自动关闭tips
        layer.close(index);
    },
    mouseover : function(){

        if(!flag1())
        {
            check();
       if(flag === "3")
        {
            flag3();
        }
        else if(flag === "6")
        {
            flag6();
        }
        }
    }
});

//密码框2
$("#InputPassword2").on({
    mouseout : function(){
        //鼠标移出自动关闭tips
        layer.close(index);
    },
    mouseover : function(){

        if(!flag1())
        {
            check();
       if(flag === "3")
        {
            flag3();
        }
        else if(flag === "6")
        {
            flag6();
        }
        }
    }
});
$(function () {
     //监听输入框的回车键
    $('#InputUname').bind('keyup', function (event) {
    if (event.keyCode == "13") {
        //回车执行查询
        $("#ChangeButton").click();


    }
});
    $('#InputPassword').bind('keyup', function (event) {
    if (event.keyCode == "13") {
        //回车执行查询
        $("#ChangeButton").click();


    }
});
    $('#InputPasswordTwo').bind('keyup', function (event) {
    if (event.keyCode == "13") {
        //回车执行查询
        $("#ChangeButton").click();


    }
});

     $("#ChangeButton").click(function () {
         if (status)
         {
             //用变量存取用户的用户名和密码
             var username = $("#InputUname").val();
             var password = $("#InputPassword").val();

             $.ajax("/api/ChangePasswd/", {
             // 期待返回的数据类型，不写会自动判断， 根据mime
             dataType: "json",
             type: "POST",
             data: {
                 "username": username, "passwd": password
             },
             success: function (data) {
                 if (data["msg"] === "修改密码成功,请先登录") {
                     alert(data["msg"]);
                     window.open('/static/html/myweb/login.html', target = "_self");
                 }
             }
         })
     }
     else {
            check()
         }
     });
     // 用来监控光标移出输出文本框事件(提交输入事件)
    $("#InputUname").blur(function(){
                check()
    });
    $("#InputPassword").blur(function(){
                check()
    });
    $("#InputPassword2").blur(function(){
                check()
    });

});
