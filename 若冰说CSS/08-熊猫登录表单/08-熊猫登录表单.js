// 当密码输入框获得焦点时，向登录框添加类名'up'
$('#password').focusin(function () {
    $('.login-box').addClass('up');
}).focusout(function () {
    // 当密码输入框失去焦点时，从登录框移除类名'up'
    $('.login-box').removeClass('up');
})

// 监听鼠标移动事件
$(document).on('mousemove', function (e) {
    // 计算鼠标移动距离与页面宽高的比例
    let dw = $(document).width() / 10;
    let dh = $(document).height() / 18;
    let x = e.pageX / dw;
    let y = e.pageY / dh;
    
    // 设置眼珠位置随鼠标移动
    $('.eye-ball').css({
        left: x,
        top: y
    })
})