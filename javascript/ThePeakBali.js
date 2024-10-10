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
        buttonToggler.addEventListener("click", function() {
            if(isShowed) {
                list.classList.remove("collapse-show");
                setTimeout(() => {
                    buttonToggler.removeChild(list);
                }, 300)
                isShowed = false;
            }
            else {
                buttonToggler.append(list);
                setTimeout(() => {
                    list.classList.add("collapse-show");
                }, 10);
                isShowed = true;
            }
        });
    };
    navigationSidebar();

    const navigationList = () => {
        
    };
    navigationList();
})();