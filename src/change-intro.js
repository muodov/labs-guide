import {introJs} from 'intro.js';
import styles from 'intro.js/introjs.css';

let intro = null;

function waitForElement(selector, callback) {
    if (document.querySelector(selector)) {
        callback();
    } else {
        setTimeout(() => waitForElement(selector, callback), 500);
    }
}

function initTutorial() {
    intro = null;

    function initIntro() {
        intro = introJs();
        intro.setOptions({
            positionPrecedence: ['top', 'right', 'left', 'bottom'],
            showBullets: false,
            showButtons: true,
            keyboardNavigation: false,
            disableInteraction: false,
            overlayOpacity: 0.4,
            showStepNumbers: true,
            hideNext: true,
            hidePrev: true
        });
    }

    function firstPage() {
        initIntro();
        let startSelector = '.home-intro>a';
        document.querySelector(startSelector).addEventListener('click', () => {
            intro.exit();
            waitForElement('#ask textarea', () => {
                petitionNamePage();
            });
        });
        intro.addSteps([
            {
                intro: "Hi! Welcome to the Surfly Tutorials experiment!"
            },
            {
                intro: "This page is a real content served from the Change.org website. This tutorial is added by Surfly in real time."
            },
            {
                intro: "Change.org is an awesome website where anyone can start a petition and change the world around."
            },
            {
                element: startSelector,
                intro: "You'll see how easy it is to start a petition. Let's start by clicking this button",
            }
        ]);
        intro.start();
    }

    function petitionNamePage() {
        initIntro();
        let nextSelector = '.row.man input.js-save-continue';
        intro.addSteps([
            {
                element: '#ask textarea',
                intro: "First, your petition needs a name. Make sure it is concise and reflects your intentions"
            },
            {
                element: nextSelector,
                intro: "Click this button to continue"
            }
        ]);

        waitForElement('#ask textarea', () => {
            document.querySelector(nextSelector).addEventListener('click', () => {
                intro.exit();
                waitForElement('#targets-control input', () => {
                    targetPage();
                });
            });
            let petitionName = 'Make web browsing fun again!';
            function typeChar(el, l) {
                console.log('typing', l);
                if (l <= petitionName.length) {
                    el.value = petitionName.slice(0, l);
                    setTimeout(typeChar, 100, el, l + 1);
                }
            }
            typeChar(document.querySelector('#ask textarea'), 1);
            intro.start();
        });
    }

    function targetPage() {
        initIntro();
        // let nextSelector = '.row.man input.js-save-continue';
        // intro.addSteps([
        //     {
        //         element: '#ask textarea',
        //         intro: "First, your petition needs a name. Make sure it is concise and reflects your intentions"
        //     },
        //     {
        //         element: nextSelector,
        //         intro: "Click this button to continue"
        //     }
        // ]);

        // waitForElement('#ask textarea', () => {
        //     document.querySelector(nextSelector).addEventListener('click', () => {
        //         intro.exit();
        //         waitForElement('#targets-control input', () => {
        //             targetPage();
        //         });
        //     });
        //     let petitionName = 'Make web browsing fun again!';
        //     function typeChar(el, l) {
        //         console.log('typing', l);
        //         if (l <= petitionName.length) {
        //             el.value = petitionName.slice(0, l);
        //             setTimeout(typeChar, 100, el, l + 1);
        //         }
        //     }
        //     typeChar(document.querySelector('#ask textarea'), 1);
        //     intro.start();
        // });
    }

    if (location.href.indexOf('start-a-petition') >= 0 && location.href.indexOf('step=ask') >= 0) {
        // petition name
        petitionNamePage();
    } else if (document.querySelector('.home-intro>a')) {
        // start page
        firstPage();
    }
}

if (document.readyState === 'loading') {
    window.addEventListener('DOMContentLoaded', e => {
        initTutorial();
    });
} else {
    initTutorial();
}
