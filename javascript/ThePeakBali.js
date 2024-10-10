(() => {
    /* ---- Navigation Behaviour ---- */
    const navigationSidebar = () => {
        const buttonToggler = document.querySelector("button.navigation-button-toggle");
        const list = document.querySelector(".navigation-list").cloneNode(true);
        list.classList.add("navigation-collapse");
        let isShowed = false;
        // TODO:
        //  Use promise, await, or asnyc to wait for the 'list' node
        //  to be added, and then we apply for the pop-up animation.
        //  That goes the same for removing the node.
        // Note:
        // I have zero idea why this works.
        buttonToggler.addEventListener("click", function() {
            if(isShowed) {
                const closeSidebar = new Promise((resolve) => {
                    list.classList.remove("collapse-show");
                    setTimeout(() => { 
                        if(isShowed) {
                            resolve(); 
                        }
                    }, 0);
                });
                closeSidebar.then(() => {
                    isShowed = false;
                    buttonToggler.removeChild(list);
                });
            }
            else {
                const openSidebar = new Promise((resolve) => {
                    buttonToggler.append(list);
                    setTimeout(() => {
                        if(!isShowed) {
                            resolve();
                        }
                    }, 0);
                });
                openSidebar.then(() => {
                    isShowed = true;
                    list.classList.add("collapse-show");
                });
            }
        });
    };
    navigationSidebar();
})();