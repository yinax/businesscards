$(function () {
    var imgflag = false;
    fastcomment();
    resizepic();

    //页面跳转到信息填写页面
    $("#confirm1").click(function () {
        $(".pt-page-1").hide();
        $(".pt-page-3").hide();
        $(".pt-page-2").show();

    });

    //信息填写页面返回首页
    $("#goback1").click(function () {
        $(".pt-page-1").show();
        $(".pt-page-2").hide();

    });
    $("#goback2").click(function () {
        $(".pt-page-1").show();
        $(".pt-page-3").hide();
    });

    //页面跳转到图片上传页面
    $("#confirm2").click(function () {
        $(".pt-page-1").hide();
        $(".pt-page-2").hide();
        $(".pt-page-3").show();
    });

    // Jquery异步提交表单
    $('#msgform').submit(function () {
        $.post("/addclientinfo", {
            name: $("#name").val(),
            phone: $("#phone").val(),
            email: $("#email").val(),
            comment: $("#comment").val()
        }, function (data) {
            if (data.status == "ok") {
                alert("提交成功");
                $(".pt-page-1").show();
                $("#msgform")[0].reset();
            } else {
                alert("提交失败，请再次尝试");
            }
        });
        return false;
    });

    //上传图片
    function resizepic() {
        $("#img_recz").click(function () {
            $("#idzfile").click();
        });
        $("#cardUpload").click(function () {
            if (imgflag == true) {
                $.post("/uploadcam", function (data) {
                    if (data.status == "ok") {
                        alert("上传成功");
                        $(".pt-page-1").show();
                        $("#img_recz").attr('src', "../static/images/icon_add.png");
                        imgflag = false;

                    } else {
                        alert("提交失败，请再次尝试！");
                    }
                });
            }else{
                alert("请选择名片！")
            }
        });
        $("#idzfile").change(function () {
            layer.open({
                type: 2,
                content: '上传中...'
            });
            lrz(this.files[0])
                .then(function (rst) {
                    // 处理成功会执行
                    $("#img_recz").css({display: "block"})
                    $("#img_recz").attr('src', rst.base64);
                    var b64imgdatacam = rst.base64;
                    b64imgdatacam = b64imgdatacam.substring(23, b64imgdatacam.length);
                    $.post("/savecamimg", {b64imgdatacam: b64imgdatacam,}, function (data) {
                        if (data.status == "ok") {
                            setTimeout(function () {
                                layer.closeAll();
                                imgflag = true;
                            }, 1000)
                        }
                    });

                })
                .catch(function (err) {
                    // 处理失败会执行
                })
                .always(function () {
                    // 不管是成功失败，都会执行
                });
        });
    }

//快捷留言
    function fastcomment() {
        $(".quickMessage li").click(function () {
            var lit = $(this).find("p").text()
            $(".Message").val(lit)
        });

    }

});
