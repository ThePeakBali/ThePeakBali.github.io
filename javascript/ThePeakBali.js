(() => {
    /* ---- Navigation Behaviour ---- */
    // TODO
    // Refactor all of this so it looks cleaner.
    const navigationSidebar = () => {
        const buttonToggler = document.querySelector("button.navigation-button-toggle");
        const list = document.querySelector(".navigation-list").cloneNode(true);
        list.classList.add("navigation-collapse");
        let isShowed = false;
        let onGoingEvent = false;
        buttonToggler.addEventListener("click", function() {
            if(onGoingEvent) return;
            if(isShowed) {
                const closeSidebar = new Promise((resolve) => {
                    list.classList.remove("collapse-show");
                    setTimeout(resolve, 250);
                    onGoingEvent = true;
                });
                closeSidebar.then(() => {
                    buttonToggler.removeChild(list);
                    isShowed = false;
                    onGoingEvent = false;
                });
            }
            else {
                const openSidebar = new Promise((resolve) => {
                    buttonToggler.append(list);
                    setTimeout(resolve, 0);
                    onGoingEvent = true;
                });
                openSidebar.then(() => {
                    list.classList.add("collapse-show");
                    isShowed = true;
                    onGoingEvent = false;
                });
            }
        });
    };
    navigationSidebar();
})();