// 要操作的元素
const slider=document.getElementById('slider');
const span=document.querySelector('.slider-bar span');

// 绑定滑块控件的input事件
slider.addEventListener('input',function(){
    // 获取滑动的值并赋值显示
    span.innerText=slider.value;
    // 结合滑动的值，计算乔巴翻滚的角度，并赋值给自定义属性--thumb-rotate
    // 除以100：是将滑动的值转为小数
    // 乘以720：这里的720表示翻滚2周
    slider.style.setProperty('--thumb-rotate',(slider.value/100*720)+'deg');
})