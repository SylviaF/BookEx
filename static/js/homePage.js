(function ($) {
    $.getUrlParam = function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return decodeURIComponent(r[2]); return null;
    }
})(jQuery);

$(function () {
    user = $("#user_id").html();
    var user_id = $.getUrlParam("user_id");

    if (user == undefined) {
        alert("登陆后才能看到详细信息哦~");
        location.href = "/api/v1/users/login";
    }
    else {
        $.ajax({
            type: "POST",
            dataType: "json",
            url: "/api/v1/info",
            data: { "user_id": user_id },
            success: function (data) {
                $("#userName").html("名字："+data[0].user_name);
                $("#userLocation").html("地址："+data[0].address);
                $("#communicate").html("email："+data[0].email);
            }
        });

        $.ajax({
            dataType: "json",
            url: "/api/v1/borrowbook",
            data: {"owner_id": user_id},
            success: function (data) {
                console.log(data);
                $("#myBookDetail").html("");
                if (data.length == 0) {
                    if (user == user_id) {
                        $("#myBookDetail").append("<p style=\"font-size:0.8em; margin: 10px;\">你没有共享自己的书籍哦~~<a href=\"/addbook\" class=\"greenBtn\" style=\"margin-left:50px;\">添加书籍</a></p>");
                    }
                    else {
                        $("#myBookDetail").append("<p style=\"font-size:0.8em; margin: 10px;\">他没有共享自己的书籍哦~~</p>");
                    }
                }
                else {
                    for (book in data) {
                        var div = "<li><a href=\"book?book_id=" + data[book].isbn + "\"><img  src=\""+  data[book].image_url+"\"><p>" + data[book].book_name + "</p></a></li>";

                        $("#myBookDetail").append(div);
                    }
                }
            }
        });

        $.ajax({
            dataType: "json",
            url: "/api/v1/savebook",
            data: { "user_id": user_id },
            success: function (data) {
                console.log(data);
                $("#myDetail").html("");
                for (book in data) {
                    var div = "<li><a href=\"book?book_id=" + data[book].isbn + "\"><img  src=\"" + data[book].image_url + "\"><p>" + data[book].book_name + "</p></a></li>";

                    $("#myDetail").append(div);
                }
            }
        });


    }
});