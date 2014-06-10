(function ($) {
    $.getUrlParam = function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return decodeURIComponent(r[2]); return null;
    }
})(jQuery);

function addQuote(str) {
    return "\"" + str + "\"";
}
function addQuote1(str) {
    return "\"" + str + "\"";
}

function search(type, hint) {

    switch (type) {
        case "book_name":
            $.ajax({
                dataType: "json",
                url: "api/v1/books",
                data: { book_name: hint },
                success: function (data) {
                    console.log(data);
                    if (data.length === 0) {
                        location.href = "/notfound?hint=" + encodeURIComponent(hint) + "&type=" + type;
                    }
                    else {
                        $("#result").html("");
                        for (book in data) {

                            var div = "<div class=\"book_container\"><div class=\"cover\"><a href=\'book?book_id=" + data[book].book_name + "\' target=\"_blank\" title=\"" + data[book].book_name + "\">" +
                            "<img src=\""+ data[book].image_url +"\" alt=\"" + data[book].book_name + "\"></a>" +
                    "</div><div class=\"bookInfo\"><p class=\"bookName\">书名：" + data[book].book_name + "</p>" +
                            "<p class=\"author\">作者：" + data[book].author + "</p><p class=\"bookType\">类别：" + data[book].genre + "</p>" +
                            "<p class=\"bookNum\">x人提供此书</p></div><div class=\"clear\"></div></div>";

                            $("#result").append(div);
                        }
                    }
                },
                error: function () {
                    location.href = "/notfound?hint=" + encodeURIComponent(hint) + "&type=" + type;
                }
            });

            break;
        case "author":
            $.ajax({
                dataType: "json",
                url: "api/v1/books",
                data: { author: hint },
                success: function (data) {
                    console.log(data);
                    if (data.length === 0) {
                        location.href = "/notfound?hint=" + encodeURIComponent(hint) + "&type=" + type;
                    }
                    else {
                        $("#result").html("");
                        for (book in data) {

                            var div = "<div class=\"book_container\"><div class=\"cover\"><a href=\'book?book_id=" + data[book].book_name + "\' target=\"_blank\" title=\"" + data[book].book_name + "\">" +
                            "<img src=\""+ data[book].image_url +"\" alt=\"" + data[book].book_name + "\"></a>" +
                    "</div><div class=\"bookInfo\"><p class=\"bookName\">书名：" + data[book].book_name + "</p>" +
                            "<p class=\"author\">作者：" + data[book].author + "</p><p class=\"bookType\">类别：" + data[book].genre + "</p>" +
                            "<p class=\"bookNum\">x人提供此书</p></div><div class=\"clear\"></div></div>";

                            $("#result").append(div);
                        }
                    }
                },
                error: function () {
                    location.href = "/notfound?hint=" + encodeURIComponent(hint) + "&type=" + type;
                }
            });

            break;
        case "genre":
            $.ajax({
                dataType: "json",
                url: "api/v1/books",
                data: { genre: hint },
                success: function (data) {
                    console.log(data);
                    if (data.length === 0) {
                        location.href = "/notfound?hint=" + encodeURIComponent(hint) + "&type=" + type;
                    }
                    else {
                        $("#result").html("");
                        for (book in data) {

                            var div = "<div class=\"book_container\"><div class=\"cover\"><a href=\'book?book_id=" + data[book].book_name + "\' target=\"_blank\" title=\"" + data[book].book_name + "\">" +
                            "<img src=\""+ data[book].image_url +"\" alt=\"" + data[book].book_name + "\"></a>" +
                    "</div><div class=\"bookInfo\"><p class=\"bookName\">书名：" + data[book].book_name + "</p>" +
                            "<p class=\"author\">作者：" + data[book].author + "</p><p class=\"bookType\">类别：" + data[book].genre + "</p>" +
                            "<p class=\"bookNum\">x人提供此书</p></div><div class=\"clear\"></div></div>";

                            $("#result").append(div);
                        }
                    }
                },
                error: function () {
                    location.href = "/notfound?hint=" + encodeURIComponent(hint) + "&type=" + type;
                }
            });

            break;
    }
}

$(function () {
    $("#logo").click(function () {
        location.href = "/";
    });
    // 搜索按钮被按下时
    $("#search_btn").click(function () {

        var hint = $("#search_input").val();
        var type = $('input[type="radio"][name="type"]:checked').val();

        if (!hint) {
            location.href = "/notfound?hint=" + encodeURIComponent(hint) + "&type=" + type;
        }
        else {
            location.href = "/found?hint=" + encodeURIComponent(hint) + "&type=" + type;


        }
    });
});