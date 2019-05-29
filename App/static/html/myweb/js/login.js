
$(function () {
    $.getJSON("/api/login/",function (data) {
        console.log(data);
        console.log("success");

   });

   //跳到修改密码
   $("#ChangePasswd").click(function () {
        window.open('/static/html/ChangePasswd.html', target="_self");
    });
   //监听两个输入框的回车键
   $('#InputPassword').bind('keyup', function (event) {
    if (event.keyCode == "13") {
        //回车执行查询
        $("#loginButton").click();


    }
});
   $('#InputUname').bind('keyup', function (event) {
    if (event.keyCode == "13") {
        //回车执行查询
        $("#loginButton").click();


    }
});

    //点击登录事件
     $("#loginButton").click(function () {
         //用变量存取用户的用户名和密码
        var username = $("#InputUname").val();
        var password = $("#InputPassword").val();
        console.log(username,password)
         $.ajax("/api/login/",{
            // 期待返回的数据类型，不写会自动判断， 根据mime
            dataType: "json",
            type: "POST",
            data: {"username" :username,"passwd":password,"IsSaved":$("#checkbox1[type='checkbox']").is(":checked")},
            success: function (data) {
                    // 用户登录到chat页面
                    window.open('/static/html/myweb/ChatRobot.html?username='+$("#InputUname").val(), target="_self");
                    // alert("Login OK")
            },
             error: function (data) {
                    alert("登录失败")
            }

        });

     });


var index;

$("#InputUname").on({
    mouseover : function(){
        var that = this;
        //鼠标移入自动显示tips
        if(!($("#InputUname").val()))
        {
            index = layer.tips('用户名不能为空', that, {time: 0},{tips: [2,'#0FA6D8']}); //不自动关闭
        }

    } ,
    mouseout : function(){
        //鼠标移出自动关闭tips
        layer.close(index);
    }
});
    $("#InputPassword").on({
    mouseover : function(){
        var that = this;
        //鼠标移入自动显示tips
        if(!($("#InputPassword").val()))
        {
            index = layer.tips('密码不能为空', that, {time: 0},{tips: [2,'#0FA6D8']}); //不自动关闭
        }

    } ,
    mouseout : function(){
        //鼠标移出自动关闭tips
        layer.close(index);
    }
})


});
