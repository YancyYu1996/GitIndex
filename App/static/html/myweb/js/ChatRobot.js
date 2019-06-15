var username = "";
var path = ""
function f() {
    // 先检测apikey有没有输入,如果没有输入
    if(!($("#apikey").val())){
        alert("请在回复框上方添加apikey吧")
    }
    else
    {
    var myDate = new Date();
    $('#msg1').html("");
    $('#nowtime1').html("");
    $("#nowtime1").append(myDate.toLocaleTimeString());
    $("#msg1").append($("#sendmsgbox").val());
    $.get("/ChatRobot/",function (data) {
        console.log(data["msg"]);
    });

    $.ajax("/ChatRobot/Chat/", {
        // 期待返回的数据类型，不写会自动判断， 根据mime
        dataType: "json",
        type: "POST",
        data: {"username": username, "msg": $("#sendmsgbox").val(),"apikey":$("#apikey").val()},
        success: function (data) {
             $("#sendmsgbox").attr("value","");
            try {
                var updata_msg = "<p style='float: right'>"+$('#sendmsgbox').val()+"</p>";
                if (data["list"]) {
                    console.log(data["list"]);
                    for (var ve of data["list"]) {
                        updata_msg += "<p>" + ve['article'] + "</p>";    //标题
                        updata_msg += "<p>" + ve['source'] + "</p>";    //来源
                        updata_msg += "<p></p><img src=" + ve['icon'] + "></p>";    //图片
                        updata_msg += "<a href='" + ve['detailurl'] + "' target=_blank>" + ve['detailurl'] + "</a>";
                    }
                } else {

                    if(data["text"] === "location")
                    {
                        window.open("/static/html/myweb/Map.html?username="+username)
                    }
                    else
                    {
                    updata_msg += "<p>" + data["text"] + "</p>";
                    updata_msg += "<a href='" + data["url"] + "' target=_blank>" + data["url"] + "</a>";
                    }
                }
            }
            //如果是普通数据
            catch (e) {
            }

            $('#nowtime2').html("");
            $("#msg2").append($(updata_msg));
            $("#nowtime2").append(myDate.toLocaleTimeString());

        },
        error: function (data) {
            alert("未登录");
            window.open("/static/html/myweb/login.html")
        }
    })
        }
}

$(function () {
    /*
    ** 不同页面切换转场效果
    ** $.mobile.changePage ('/test.html', 'slide/pop/fade/slideup/slidedown/flip/none', false, false);
    */
    var href = window.location.href;
    console.log(href);
    username = href.split("=")[1];
    $("#username").append(username);
    $('.list-group-item,.menu a').click(function () {
        $.mobile.changePage($(this).attr('href'), {
            transition: 'flip', //转场效果
            reverse: true       //默认为false,设置为true时将导致一个反方向的转场
        });
    });
    // 发送请求
    $.getJSON("/ChatRobot/Chat/", function () {
        console.log("已经发送");
    });
    // 监听发送按键事件 ajax发送请求
    $("#sendmsg").click(function () {
        f();
        $("#msgbox").append($("#userbox"));
        $("#msgbox").show();
        $("#warning").hide();
        $("#success").hide();
    });
    //监听按键回车事件
    $('#sendmsgbox').bind('keyup', function (event) {

        if (event.keyCode == "13") {
            //回车执行查询
            $('#sendmsg').click();

        }
    });
    //监听微信按键登录事件
    $("#wxchat").click(function () {
        console.log("wxconnectclik");
        if(!($("#apikey").val())){
        alert("请在回复框上方添加apikey吧")
        }
        else
        {

        $.ajax("/ChatRobot/wxChat/", {
            // 期待返回的数据类型，不写会自动判断， 根据mime
            dataType: "json",
            type: "POST",
            data: {"status": "connect","apikey":$("#apikey").val()},
            success: function (data) {
                username = data["username"];
                path = '../../../../static/'+username+'.png';
                console.log(username,path);
                $("#QR").html("");
                $("#QR").append($("<img src="+path+" style='width: 150px;height: 150px'>"));

            }

        })
        }
    });

    //监听刷新二维码的按键
    $("#QR").click(function () {
        console.log(username,path);
        $("#QR").html("");
        $("#QR").append($("<img src="+path+" style='width: 150px;height: 150px'>"));
    });
    //监听微信按键退出事件
    $("#wxchatend").click(function () {
        $.ajax("/ChatRobot/wxChatend/",{
            dataType: "json",
            type: "POST",
            data: {"status": "disconnect","apikey":$("#apikey").val()},
            success: function (data) {
                $("#QR").html("");

            }
        });
       // window.open('/static/html/ChatRobot.html?username=' + username, target = "_self");
    })
});
// 返回顶部按钮
$("#toTop").click(function () {
    $("html").animate({"scrollTop": "0px"}, 100); //IE,FF
    $("body").animate({"scrollTop": "0px"}, 100); //Webkit
});
//监听安全退出按钮
$("#logout").click(function () {
          $.ajax("/ChatRobot/logout/",{
            dataType: "json",
            type: "POST",
            success: function (data) {
                //返回首页
            window.open('login.html',target = "_self");
            }
        });
});
//监听修改密码的点击事件
$("#ChangePasswd").click(function () {
    window.open('ChangePasswd.html',target = "self")
});
//监听删除键值点击事件
$("#delete").click(function () {
        console.log($("#insertkey").val());
    if ($("#insertkey").val() === "") {
        $("#deletewarning").show();
        $("#deletesuccess").hide();
    }

    if (($("#insertvalue").val() !== "")) {
        $.ajax("/ChatRobot/delete/", {
            dataType: "json",
            type: "POST",
            data: {"username": username, "keys": $("#insertkey").val(),"apikey":$("#apikey").val()},
            success: function () {
                $("#deletesuccess").show();
                $("#deletewarning").hide();

            }
        })

    }
});
//监听一个插入框的点击事件
$("#sendmsg2").click(function () {

    console.log($("#insertkey").val());
    if ($("#insertkey").val() === "") {
        $("#warning").show();
        $("#success").hide();
    }
    if ($("#insertvalue").val() === "") {
        $("#warning").show();
        $("#success").hide();
    }
    if (($("#insertvalue").val() !== "") && ($("#insertkey").val() !== "")) {
        $.ajax("/ChatRobot/insert/", {
            dataType: "json",
            type: "POST",
            data: {"username": username, "keys": $("#insertkey").val(), "value": $("#insertvalue").val(),"apikey":$("#apikey").val()},
            success: function () {
                $("#success").show();
                $("#warning").hide();

            }
        })

    }

});

//监听一个插入键和值得那两个文本输入框的按键回车事件
$('#insertkey').bind('keyup', function (event) {
    if (event.keyCode == "13") {
        //回车执行查询
        $('#sendmsg2').click();


    }
});
$('#insertvalue').bind('keyup', function (event) {
    if (event.keyCode == "13") {
        //回车执行查询
        $('#sendmsg2').click();

    }
});
$("#inserdbut").click(function () {
    $("#insertgroup").show();
    $("#inputgroup").hide();

});
$("#resvbut").click(function () {
    $("#inputgroup").show();
    $("#insertgroup").hide();

});
//清空点击事件
$("#clear").click(function () {
    $("#msg2").empty()
});

//获取一个聊天记录的操作
$("#chatmsg").click(function () {

    window.open('ChatInform.html',target = "self")
});
$("#who").click(function () {
    $("#sendmsgbox").val($("#who").text());
    $('#sendmsg').click();
});
$("#FindHotel").click(function () {
    $("#sendmsgbox").val($("#FindHotel").text());
    $('#sendmsg').click();
});
$("#FindPic").click(function () {
    $("#sendmsgbox").val($("#FindPic").text());
    $('#sendmsg').click();
});
$("#FindWh").click(function () {
    $("#sendmsgbox").val($("#FindWh").text());
    $('#sendmsg').click();
});
$("#FindTr").click(function () {
    $("#sendmsgbox").val($("#FindTr").text());
    $('#sendmsg').click();
});
$("#StringUp").click(function () {
    $("#sendmsgbox").val($("#StringUp").text());
    $('#sendmsg').click();
});
$("#FindGp").click(function () {
    $("#sendmsgbox").val($("#FindGp").text());
    $('#sendmsg').click();
});
$("#FindDy").click(function () {
    $("#sendmsgbox").val($("#FindDy").text());
    $('#sendmsg').click();
});
$("#News").click(function () {
    $("#sendmsgbox").val($("#News").text());
    $('#sendmsg').click();
});
$("#Jok").click(function () {
    $("#sendmsgbox").val($("#Jok").text());
    $('#sendmsg').click();
});