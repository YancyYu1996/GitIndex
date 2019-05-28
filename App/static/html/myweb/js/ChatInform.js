
$(function () {
    //get第一页的内容
    $.get("/ChatRobot/ChatInform/",function (data) {
        for(var i =0;i<10;i++)
        {
            $("#msg").append("<span>"+data[i]["username"]+"</span>");
            $("#msg").append("<span>"+data[i]["chat_information"]+"</span>");
            $("#msg").append("<span>"+data[i]["recv_information"]+"</span>");
            $("#msg").append("<span>"+data[i]["chat_time"]+"</span>");
        }

    });

    // 这是分页请求
});
