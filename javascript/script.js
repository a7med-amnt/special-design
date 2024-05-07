let landing = document.querySelector(".landing");
//--------setting box-----------//
let containerSetting = document.querySelector(".setting");

let settingIcon = document.querySelector(".setting-icon");

settingIcon.onclick = () => {
    containerSetting.classList.toggle("open-setting");
};
//--------------box color
let buttonColor = document.querySelectorAll(".setting .list-color li");

if (window.localStorage.getItem("main-color")) {
    document.documentElement.style.setProperty(
        "--main-color",
        window.localStorage.getItem("main-color")
    );

    buttonColor.forEach(e => {
        if (
            e.getAttribute("set-color") ==
            window.localStorage.getItem("main-color")
        ) {
            e.classList.add("active");
        }
    });
} else {
    buttonColor[0].classList.add(`active`);
}

buttonColor.forEach(e => {
    e.onclick = () => {
        document.documentElement.style.setProperty(
            "--main-color",
            e.getAttribute("set-color")
        );

        buttonColor.forEach(el => {
            el.classList.remove("active");
        });
        e.classList.add("active");

        window.localStorage.setItem("main-color", e.getAttribute("set-color"));
    };
});

//-------background option
let buttonBackground = document.querySelectorAll(
    ".setting .box-background span"
);

if (window.localStorage.getItem("auto-background")) {
    buttonBackground.forEach(e => {
        if (
            e.getAttribute("value") ==
            window.localStorage.getItem("auto-background")
        ) {
            e.classList.add("active");
        }
    });
}

buttonBackground.forEach(e => {
    e.onclick = () => {
        buttonBackground.forEach(el => {
            el.classList.remove("active");
        });
        e.classList.add("active");

        window.localStorage.setItem("auto-background", e.getAttribute("value"));
        autoOurNotAuto();
    };
});

let backgroundImg = document.querySelector(".setting .background-img");

let buttonImg = [];

for (let i = 0; i < 8; i++) {
    buttonImg[i] = document.createElement("span");
    buttonImg[i].append(i + 1);
    backgroundImg.append(buttonImg[i]);
}

buttonImg.forEach(e => {
    e.onclick = () => {
        buttonImg.forEach(el => {
            el.classList.remove(`active`);
        });

        window.localStorage.setItem(`count-background`, e.textContent);

        checkBackgroundStorage();
    };
});
if (!window.localStorage.getItem(`count-background`)) {
    buttonImg[0].classList.add(`active`);
}
//--------scroll---------//
let disUndis = document.querySelectorAll(`.setting .scroll .dis-undis span`);

let scrollYN = window.localStorage.getItem(`scroll`);

if (scrollYN !== null) {
    if (scrollYN == `yes`) {
        disUndis.forEach(e => {
            e.classList.remove(`no`);
        });
        disUndis[0].classList.add(`no`);
    } else {
        disUndis.forEach(e => {
            e.classList.remove(`no`);
        });
        disUndis[1].classList.add(`no`);
    }
} else {
    window.localStorage.setItem(`scroll`, `yes`);
    disUndis[0].classList.add(`no`);
}

disUndis.forEach((e, i) => {
    e.onclick = () => {
        disUndis.forEach(el => {
            el.classList.remove(`no`);
        });
        e.classList.add(`no`);
        if (i == 0) {
            window.localStorage.setItem(`scroll`, `yes`);
            document
                .querySelector(`.go-setting-show-hid`)
                .classList.remove(`none`);
        } else {
            window.localStorage.setItem(`scroll`, `no`);
            document
                .querySelector(`.go-setting-show-hid`)
                .classList.add(`none`);
            document.querySelector(`.go-setting`).classList.remove(`show`);
        }
    };
});
//--------end scroll---------//
//--------setting reset---------//
let settingReset = document.querySelector(`.setting-reset`);

settingReset.onclick = () => {
    window.localStorage.clear();
    window.location.reload();
};
//--------end setting reset---------//

//--------landing pag---------//

let background = [];

for (let i = 0; i < 8; i++) {
    background[i] = document.createElement("div");
    background[
        i
    ].style.cssText = `position: absolute; top: 0; left: 0; width: 100%; height: 100vh; background-image: url('../imgs/portfolio${
        i + 1
    }.jpg'); background-size: cover; z-index: -2; opacity: 0; transition: opacity 2s;`;
}
background.forEach(e => {
    landing.append(e);
});

let clearIntervalBackground;
function autoOurNotAuto() {
    let check;
    if (window.localStorage.getItem("auto-background")) {
        check = window.localStorage.getItem("auto-background");
    } else check = "true";

    if (check == "true") {
        let countBackground = 0;
        clearIntervalBackground = setInterval(() => {
            if (countBackground == 8) countBackground = 0;
            background.forEach(e => {
                e.style.opacity = "0";
            });
            background[countBackground].style.opacity = "1";
            countBackground++;
        }, 3000);
        buttonBackground[0].classList.add("active");
    } else {
        checkBackgroundStorage();
        clearInterval(clearIntervalBackground);
    }
    if (check == `true`) {
        backgroundImg.classList.add("no-click");
    } else {
        backgroundImg.classList.remove("no-click");
    }
}
autoOurNotAuto();

function checkBackgroundStorage() {
    let countBackground = window.localStorage.getItem("count-background");
    if (countBackground) {
        background.forEach((e, i) => {
            e.style.opacity = "0";
        });
        background.forEach((e, i) => {
            if (i == countBackground - 1) {
                e.style.opacity = "1";
            }
        });
        buttonImg.forEach((e, i) => {
            if (countBackground == i + 1) {
                e.classList.add(`active`);
            }
        });
    } else {
        window.localStorage.setItem(`count-background`, `1`);
    }
}
checkBackgroundStorage();

//-----------start links----------//

let links = document.querySelector(`.landing .links`);

let linkOpenClose = document.querySelector(`.landing .links .links-open-close`);

let linksIcon = document.querySelectorAll(`.landing .links .links-icon`);

linkOpenClose.onclick = () => {
    links.classList.toggle(`show`);
    linksIcon.forEach(e => {
        e.classList.toggle(`show`);
    });
};

let linksItems = document.querySelectorAll(`.landing .links li`);

linksItems.forEach(e => {
    e.onclick = () => {
        scrollTo(e.dataset.golocation);
    };
});
//-----------end start links----------//

//------------end landing-------------/
//------------our skills-------------/

let skills = document.querySelector(".skills");

let spanSkills = document.querySelectorAll(".skills .box div span");

window.onscroll = () => {
    let skillsOffsetTop = skills.offsetTop;

    let skillsOffsetHeight = skills.offsetHeight;

    let windowHeight = window.innerHeight;

    let windowScrollTop = window.pageYOffset;

    if (windowScrollTop > skillsOffsetTop + skillsOffsetHeight - windowHeight) {
        spanSkills.forEach(e => {
            e.style.width = e.dataset.width;
        });
    } else {
        spanSkills.forEach(e => {
            e.style.width = "0";
        });
    }
};
//------------end our skills-------------/

//------------gallery-------------/
let gallery = document.querySelector(".gallery");

let boxGallery = [];
let imgGallery = [];
let boxFlotImg;
let flotImg;
let titleFlotImg;
let closeFlotImg;


for (let i = 0; i < 8; i++) {
    boxGallery[i] = document.createElement("div");

    boxGallery[i].classList.add("box");

    imgGallery[i] = document.createElement("img");


    imgGallery[i].classList.add("img");

    imgGallery[i].src = `imgs/portfolio${i + 1}.jpg`;

    boxGallery[i].append(imgGallery[i]);

    gallery.append(boxGallery[i]);
}

imgGallery.forEach(e => {
    e.onclick = () => {
        createFlotImg(e.src, e.alt);
    };
});

function createFlotImg(b, t) {
    boxFlotImg = document.createElement("div");

    boxFlotImg.classList.add("box-flot-img");

    gallery.append(boxFlotImg);

    if (t.length > 0) {
        titleFlotImg = document.createElement("div");

        titleFlotImg.className = `title-img`;

        titleFlotImg.append(t);

        boxFlotImg.prepend(titleFlotImg);
    } else {
        titleFlotImg = document.createElement("div");

        titleFlotImg.className = `title-img`;

        titleFlotImg.append(`Unknown`);

        boxFlotImg.prepend(titleFlotImg);
    }

    flotImg = document.createElement("img");

    boxFlotImg.append(flotImg);

    flotImg.classList.add("flot-img");

    flotImg.src = b;

    closeFlotImg = document.createElement("div");

    closeFlotImg.append(`X`);

    closeFlotImg.className = `close-img`;

    boxFlotImg.append(closeFlotImg);

    closeFlotImg.onclick = () => {
        boxFlotImg.remove();
    };
}
//------------end gallery-------------/

//------------timline-------------/
arrayTimelie = [
    {
        name: `2017`,
        timeline: [
            {
                title: `T1`,
                line: `Lodkd eded kdodhoighz ohoiloh otoluzde otlioie jluohwelo olemde`
            },
            {
                title: `T2`,
                line: `Lodkd eded kdodhoighz ohoiloh otoluzde otlioie jluohwelo olemde`
            },
            {
                title: `T3`,
                line: `Lodkd eded kdodhoighz ohoiloh otoluzde otlioie jluohwelo olemde`
            }
        ]
    },
    {
        name: `2018`,
        timeline: [
            {
                title: `T1`,
                line: `Lodkd eded kdodhoighz ohoiloh otoluzde otlioie jluohwelo olemde`
            },
            {
                title: `T2`,
                line: `Lodkd eded kdodhoighz ohoiloh otoluzde otlioie jluohwelo olemde`
            }
        ]
    },
    {
        name: `2019`,
        timeline: [
            {
                title: `T1`,
                line: `Lodkd eded kdodhoighz ohoiloh otoluzde otlioie jluohwelo olemde`
            },
            {
                title: `T2`,
                line: `Lodkd eded kdodhoighz ohoiloh otoluzde otlioie jluohwelo olemde`
            },
            {
                title: `T3`,
                line: `Lodkd eded kdodhoighz ohoiloh otoluzde otlioie jluohwelo olemde`
            },
            {
                title: `T4`,
                line: `Lodkd eded kdodhoighz ohoiloh otoluzde otlioie jluohwelo olemde`
            },
            {
                title: `T5`,
                line: `Lodkd eded kdodhoighz ohoiloh otoluzde otlioie jluohwelo olemde`
            }
        ]
    },
    {
        name: `2020`,
        timeline: [
            {
                title: `T1`,
                line: `Lodkd eded kdodhoighz ohoiloh otoluzde otlioie jluohwelo olemde`
            },
            {
                title: `T2`,
                line: `Lodkd eded kdodhoighz ohoiloh otoluzde otlioie jluohwelo olemde`
            },
            {
                title: `T3`,
                line: `Lodkd eded kdodhoighz ohoiloh otoluzde otlioie jluohwelo olemde`
            }
        ]
    },
    {
        name: `2021`,
        timeline: [
            {
                title: `T`,
                line: `Lodkd eded kdodhoighz ohoiloh otoluzde otlioie jluohwelo olemde`
            }
        ]
    }
];

let leftRight = false;

let timeline = document.querySelector(`.timeline`);

for (let i = 0; i < arrayTimelie.length; i++) {
    if (timeline.offsetHeight >= 500) {
        timeline.classList.add(`max-height`);
    }

    let boxTimeline = document.createElement(`div`);

    boxTimeline.className = `box-timeline`;
    boxTimeline.classList.add(fleftRight(`box-timeline`));

    timeline.append(boxTimeline);

    let titleYear = document.createElement(`span`);

    titleYear.className = `title-year`;

    titleYear.append(arrayTimelie[i].name);

    let lineYear = document.createElement(`span`);

    lineYear.className = `line-year`;

    lineYear.append(titleYear);

    boxTimeline.append(lineYear);

    for (let e = 0; e < arrayTimelie[i].timeline.length; e++) {
        let boxLine = document.createElement(`div`);

        boxLine.className = `box-line`;

        boxTimeline.append(boxLine);

        let titleLine = document.createElement(`div`);

        titleLine.className = `title-line`;

        titleLine.append(arrayTimelie[i].timeline[e].title);

        boxLine.append(titleLine);

        let Line = document.createElement("div");

        Line.className = `line`;

        Line.append(arrayTimelie[i].timeline[e].line);

        boxLine.append(Line);

        let arrawLine = document.createElement("span");

        arrawLine.className = `arraw-line`;

        boxLine.append(arrawLine);

        let circleLine = document.createElement(`span`);

        circleLine.className = `circle-line`;

        arrawLine.append(circleLine);
    }
}

function fleftRight(v) {
    if (leftRight === true) {
        leftRight = false;
        return `${v}-right`;
    } else {
        leftRight = true;
        return `${v}-left`;
    }
}
//------------end timline-------------/

//------------go setting-------------/
let showGoSetting = document.querySelector(`.go-setting-show-hid`);

if (scrollYN !== null) {
    if (scrollYN == `yes`) {
        showGoSetting.classList.remove(`none`);
    } else {
        showGoSetting.classList.add(`none`);
    }
}

let goSetting = document.querySelector(`.go-setting`);

let boxGoSetting = document.querySelectorAll(`.go-setting .box`);

showGoSetting.onclick = () => {
    goSetting.classList.toggle(`show`);
};

boxGoSetting.forEach(e => {
    e.onclick = () => {
        scrollTo(e.dataset.golocation);
    };
});

function scrollTo(v) {
    document.getElementById(v).scrollIntoView({ behavior: `smooth` });
}
//------------end go setting-------------//
