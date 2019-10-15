const utils = {
    getSidebar : function(title, children=[''],collapsable = false,sidebarDepth = 2){
        return {
            title,
            collapsable,
            sidebarDepth,
            children,
        }
    }
};

module.exports = utils;