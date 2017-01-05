(function (APP, paging) {

    // ECMAScript 5 Strict Mode
    "use strict";

    // Paginate search results.
    APP.setPagination = function () {
        paging.pages = APP.utils.getPages(APP.state.searchData.results);
        paging.count = paging.pages.length;
        paging.current = paging.count > 0 ? paging.pages[0] : undefined;
    };

}(
    this.APP,
    this.APP.state.paging
));
