(() => {
    // TODO:
    // complete this explaination
    /**
     * @param {Object} eventOne 
     * @param {Object} eventTwo 
     * Both of the objects in parameter has three properties:
     * before (a function), after (a function), and delay (an integer).
     * 
     * @returns {Function} callbacks for 'addEventListener' to use.
     */
    function createCallback(eventOne, eventTwo, runEventOne = true) {
        let onGoingEvent = false;
        return async (event) => {
            // if one of the events (eventOne or eventTwo) 
            // is still going, we then just ignore the
            // callback.
            if(onGoingEvent) return;
            if(runEventOne) {
                const promise = new Promise((resolve) => {
                    eventOne.before(event);
                    setTimeout(resolve, eventOne.delay);
                    onGoingEvent = true;
                });
                await promise;
                eventOne.after(event);
                onGoingEvent = false;
                runEventOne = false;
            }
            else {
                const promise = new Promise((resolve) => {
                    eventTwo.before(event);
                    setTimeout(resolve, eventTwo.delay);
                    onGoingEvent = true;
                });
                await promise;
                eventTwo.after(event);
                onGoingEvent = false;
                runEventOne = true;
            }
        };
    }

    /* ---- Navigation Behaviour ---- */
    const navigationSidebar = () => {
        const buttonToggler = document.querySelector("button.navigation-button-toggle");
        const list = document.querySelector(".navigation-list").cloneNode(true);
        list.classList.add("navigation-collapse");

        const wayToCloseSidebar = document.createElement("div");
        wayToCloseSidebar.classList.add("navigation-way-to-close-sidebar");
        const body = document.querySelector("body");

        let openingSidebar = {
            before: () => { buttonToggler.append(list); },
            after: () => { 
                list.classList.add("collapse-show"); 
                body.prepend(wayToCloseSidebar);
            },
            delay: 0
        };
        let closingSidebar = {
            before: () => { 
                list.classList.remove("collapse-show"); 
                body.removeChild(wayToCloseSidebar);
            },
            after: () => { buttonToggler.removeChild(list); },
            delay: 250
        };
        const callback = createCallback(openingSidebar, closingSidebar);
        buttonToggler.addEventListener("click", callback);
        wayToCloseSidebar.addEventListener("click", callback);
    };
    navigationSidebar();

    const navigationThemeMode = () => {
        const buttonToggler = document.querySelector(".navigation-theme-mode");
        const themeSwitcher = buttonToggler.querySelector(".navigation-theme-button");
        const rootDataset = document.documentElement.dataset;
        
        let toLightMode = true;
        if(localStorage.getItem("theme") === "light") {
            toLightMode = false;
            themeSwitcher.classList.add("toggle-theme-button");
            rootDataset.theme = 'light';
        }
        else {
            localStorage.setItem("theme", "dark");
        }

        const promise = new Promise((resolve) => { setTimeout(resolve, 0); });
        promise.then(() => {
            const lightRoot = document.querySelector(":root");
            lightRoot.style.setProperty(
                "--transition-theme-mode", 
                "background-color 500ms ease-in-out, border-bottom-color 500ms ease-in-out");
            lightRoot.style.setProperty("--transition-theme-button", "left 150ms ease-in-out");
        });


        let lightMode = {
            before: () => { 
                themeSwitcher.classList.add("toggle-theme-button");
                rootDataset.theme = 'light';
                localStorage.setItem("theme", "light");
            },
            after: () => {},
            delay: 150
        };
        let darkMode = {
            before: () => { 
                themeSwitcher.classList.remove("toggle-theme-button"); 
                localStorage.setItem("theme", "dark");
                rootDataset.theme = '';
            },
            after: () => {},
            delay: 150
        };
        buttonToggler.addEventListener("click", createCallback(lightMode, darkMode, toLightMode));
    };
    navigationThemeMode();
})();