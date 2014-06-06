$(function () {
    $("#submit").click(function () {
        var book_name = $("#book_name").val();
        var image_url = $("#image_url").val();
        var author = $("#author").val();
        var genre = $("#genre").val();
        var summary = $("#summary").val();
        var user_id = $("#user_id").html()?$("#user_id").html() : null;

        console.log(image_url);
        if (!user_id) {
            alert("你还未登录！<br/>请点击右上角登录按钮，登陆后登记书本信息");
        }
        else{
            if (book_name && image_url && author && genre) {
                $.ajax({
                    type: "POST",
                    dataType: "json",
                    url: "api/v1/books/add",
                    data: {"book_name": book_name, "author" : author, "genre": genre, "summary":summary, "user_id": user_id },
                    success: function (data) {
                            confirm("成功添加书籍");
                    },
                    error: function (data) {
                        console.log(data);
                    }
                });
            }
            else {
                alert("请确认标 * 的必填项已填满");
            }
        }
    });
});