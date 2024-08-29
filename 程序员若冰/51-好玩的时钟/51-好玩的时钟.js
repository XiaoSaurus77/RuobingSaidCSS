let wrapper = document.getElementById("wrapper");
let monthBox = document.getElementById("monthBox");
let dateBox = document.getElementById("dateBox");
let hourbox = document.getElementById("hourbox");
let minutebox = document.getElementById("minutebox");
let secondbox = document.getElementById("secondbox");

/*
* 找所有的东西标签函数
* */
let findSiblings = (tag) => {
    let parent = tag.parentNode;
    let childs = parent.children;
    let sb = [];
    for (let i = 0; i <= childs.length - 1; i++) {
        if (childs[i] !== tag) {
            sb[sb.length] = childs[i];
        }
    };
    return sb;
};

/*
* 去掉所有兄弟的类
* */
let removeSiblingClass = (tag) => {
    let sb = findSiblings(tag);
    for (let i = 0; i <= sb.length - 1; i++) {
        sb[i].className = "";
    }
};

/*
* 初始化月份函数
* */
let initMonth = () => {
    for (let i = 1; i <= 12; i++) {
        let span = document.createElement("span");
        span.innerHTML = i + "月";
        monthBox.appendChild(span);
    }
};

// 初始化日期
let initDate = () => {
    for (let i = 1; i <= 31; i++) {
        let span = document.createElement("span");
        span.innerHTML = i + "日";
        dateBox.appendChild(span);
    }
};

// 初始化小时，分钟，秒
let initHour = () => {
    for (let i = 0; i <= 23; i++) {
        let h = i;
        let span = document.createElement("span");
        if (h < 10) {
            h = "0" + h;
        }
        span.innerHTML = h + "点";
        hourbox.appendChild(span);
    }
};
let initMinute = () => {
    for (let i = 0; i <= 59; i++) {
        let f = i;
        let span = document.createElement("span");
        if (f < 10) {
            f = "0" + f;
        }
        span.innerHTML = f + "分";
        minutebox.appendChild(span);
    }
};
let initSecond = () => {
    for (let i = 0; i <= 59; i++) {
        let miao = i;
        let span = document.createElement("span");
        if (miao < 10) {
            miao = "0" + miao;
        }
        span.innerHTML = miao + "秒";
        secondbox.appendChild(span);
    }
};

// 时间文字样式切换函数
let changeTime = (tag) => {
    tag.className = "on";
    removeSiblingClass(tag);
};

/*
* 初始化日历函数
* */
let initRili = () => {
    initMonth(); // 初始化月份
    initDate(); // 初始化日期
    initHour(); // 小时
    initMinute();
    initSecond();
};

/*
* 展示当前时间
* 参数：mydate 时间对象
* */
let showNow = (mydate) => {

    let month = mydate.getMonth();
    let date = mydate.getDate();
    let hour = mydate.getHours();
    let minute = mydate.getMinutes();
    let second = mydate.getSeconds();
    // 时间文字样式切换函数
    changeTime(monthBox.children[month]);
    changeTime(dateBox.children[date - 1]);
    changeTime(hourbox.children[hour]);
    changeTime(minutebox.children[minute]);
    changeTime(secondbox.children[second]);

};

// 展示时间圆圈函数
// tag：目标
// num：数字数量
// dis：圆圈半径
let textRound = (tag, num, dis) => {
    let span = tag.children;
    for (let i = 0; i <= span.length - 1; i++) {
        span[i].style.transform = "rotate(" + (360 / span.length) * i + "deg)  translateX(" + dis + "px)";
    }
};
/*
* 旋转指定“圆圈”指定度数
* */
let rotateTag = (tag, deg) => {
    tag.style.transform = "rotate(" + deg + "deg)";
};

let timeRun = () => {
    initRili(); // 初始化日历

    setInterval(() => {
        let mydate = new Date();
        showNow(mydate); // 展示当前时间
    }, 1000);

    //  n秒后，摆出圆形
    setTimeout(() => {
        wrapper.className = "wrapper";
        textRound(monthBox, 12, 40);
        textRound(dateBox, 31, 80);
        textRound(hourbox, 24, 120);
        textRound(minutebox, 60, 160);
        textRound(secondbox, 60, 200);
        setInterval(() => {
            let mydate = new Date();
            rotateTag(monthBox, -30 * mydate.getMonth());
            rotateTag(dateBox, -360 / 31 * (mydate.getDate() - 1));
            rotateTag(hourbox, -360 / 24 * mydate.getHours());
            rotateTag(minutebox, -6 * mydate.getMinutes());
            rotateTag(secondbox, -6 * mydate.getSeconds());
        }, 1000)
    }, 0)
};
timeRun();