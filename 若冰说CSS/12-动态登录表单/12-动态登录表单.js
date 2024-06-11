// 要操作的元素
const container=document.querySelector('.container');
const btn_login=document.querySelector('.btn-login');

// 登录按钮点击事件
btn_login.addEventListener('click',function(){
    // 这里只作效果展示，就不写逻辑判断了。
    container.classList.add('success');
})