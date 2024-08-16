const leftBtn = document.querySelector(".buttons .left")
const rightBtn = document.querySelector(".buttons .right")
const slide = document.querySelector("#slide")
let openClick = true // 节流处理 (保证动画执行过程，按钮不被重复点击)

leftBtn.addEventListener("click", () => {
    if (openClick) {
        openClick = false // 触发点击后，禁用按钮
        const items = document.querySelectorAll(".item")
        slide.prepend(items[items.length - 1])

        setTimeout(() => openClick = true, 1000) // 1s 再开放按钮的点击
    }
})
rightBtn.addEventListener("click", () => {
    if (openClick) {
        openClick = false
        const items = document.querySelectorAll(".item")
        slide.appendChild(items[0])

        setTimeout(() => openClick = true, 1000)
    }
})