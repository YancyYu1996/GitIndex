var status = 0;
var flag=false;
var index;
//用来检查输入数据正确性
function check(){
            //用变量存取用户的用户名和密码,邮件，手机号
        var username = $("#InputUname").val();
        var password = $("#InputPassword").val();
        var password2 = $("#InputPassword2").val();
        var email = $("#InputEmail").val();
        var phone_number = $("#InputPhoneNumber").val();
            $.ajax("/api/register/match/",{
            // 期待返回的数据类型，不写会自动判断， 根据mime
            dataType: "json",
            type: "POST",
            data: {"username" :username,"passwd":password,"email":email,
                "phone_number":phone_number,"passwd2":password2},
            success: function (data) {
                    status = data["status"];
                    flag = data['msg']

            }
        });
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
     else if(!($("#InputEmail").val()))
            {
                index = layer.tips('邮箱不能为空', "#InputEmail", {time: 0}, {tips: [2, '#0FA6D8']}); //不自动关闭
                return true
            }
     else if(!($("#InputPhoneNumber").val()))
            {
                index = layer.tips('电话号码不能为空', "#InputPhoneNumber", {time: 0}, {tips: [2, '#0FA6D8']}); //不自动关闭
                return true
            }
}

function flag2() {
         index = layer.tips('用户名重复', "#InputUname", {time: 0}, {tips: [2, '#0FA6D8']});
}
function flag3() {
         index = layer.tips('两次密码不同', "#InputPassword2", {time: 0}, {tips: [2, '#0FA6D8']});
}
function flag4() {
         index = layer.tips('邮箱格式错误', "#InputEmail", {time: 0}, {tips: [2, '#0FA6D8']});
}
function flag5() {
         index = layer.tips('电话号码格式错误', "#InputPhoneNumber", {time: 0}, {tips: [2, '#0FA6D8']});
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
       if(flag === "2")
        {
            flag2();
        }
        else if(flag === "3")
        {
            flag3();
        }
        else if(flag === "4")
        {
            flag4();
        }
        else if(flag === "5")
        {
            flag5();
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
       if(flag === "2")
        {
            flag2();
        }
        else if(flag === "3")
        {
            flag3();
        }
        else if(flag === "4")
        {
            flag4();
        }
        else if(flag === "5")
        {
            flag5();
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
       if(flag === "2")
        {
            flag2();
        }
        else if(flag === "3")
        {
            flag3();
        }
        else if(flag === "4")
        {
            flag4();
        }
        else if(flag === "5")
        {
            flag5();
        }
        }
    }
});
//邮箱框
$("#InputEmail").on({
    mouseout : function(){
        //鼠标移出自动关闭tips
        layer.close(index);
    },
    mouseover : function(){

        if(!flag1())
        {
            check();
       if(flag === "2")
        {
            flag2();
        }
        else if(flag === "3")
        {
            flag3();
        }
        else if(flag === "4")
        {
            flag4();
        }
        else if(flag === "5")
        {
            flag5();
        }
        }
    }
});

//邮箱框
$("#InputPhoneNumber").on({
    mouseout : function(){
        //鼠标移出自动关闭tips
        layer.close(index);
    },
    mouseover : function(){

        if(!flag1())
        {
            check();
       if(flag === "2")
        {
            flag2();
        }
        else if(flag === "3")
        {
            flag3();
        }
        else if(flag === "4")
        {
            flag4();
        }
        else if(flag === "5")
        {
            flag5();
        }
        }
    }
});

$(function () {
     //监听输入框的回车键
    $('#InputUname').bind('keyup', function (event) {
    if (event.keyCode == "13") {
        //回车执行查询
        $("#registerButton").click();


    }
});
    $('#InputPassword').bind('keyup', function (event) {
    if (event.keyCode == "13") {
        //回车执行查询
        $("#registerButton").click();


    }
});
    $('#InputPassword2').bind('keyup', function (event) {
    if (event.keyCode == "13") {
        //回车执行查询
        $("#registerButton").click();


    }
});
    $('#InputEmail').bind('keyup', function (event) {
    if (event.keyCode == "13") {
        //回车执行查询
        $("#registerButton").click();


    }
});
    $('#InputPhoneNumber').bind('keyup', function (event) {
    if (event.keyCode == "13") {
        //回车执行查询
        $("#registerButton").click();


    }
});


     $("#registerButton").click(function () {
         if (status)
         {
             console.log(status);
             //用变量存取用户的用户名和密码,邮件，手机号
             var username = $("#InputUname").val();
             var password = $("#InputPassword").val();
             var email = $("#InputEmail").val();
             var phone_number = $("#InputPhoneNumber").val();
             $.ajax("/api/register/", {
             // 期待返回的数据类型，不写会自动判断， 根据mime
             dataType: "json",
             type: "POST",
             data: {
                 "username": username, "passwd": password, "email": email,
                 "phone_number": phone_number
             },
             success: function (data) {
                 if (data["msg"] === "注册成功,请先登录") {
                     alert(data["msg"]);
                     window.open('/static/html/myweb/login.html', target = "_self");
                 }
             }
         })
     }
     else {
            check();
             alert("注册失败")
         }
     });
     // 用来监控光标移出输出文本框事件(提交输入事件)
    $("#InputUname").blur(function(){
                check()
    });
    $("#InputPassword").blur(function(){
                check()
    });
    $("#InputPasswordTwo").blur(function(){
                check()
    });
    $("#InputEmail").blur(function(){
                check()
    });
    $("#InputPhoneNumber").blur(function(){
                check()
    });

});
