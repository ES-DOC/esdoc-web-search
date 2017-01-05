// --------------------------------------------------------
// search/view._.js - Main page view.
// --------------------------------------------------------
(function (APP, paging, _, $, Backbone, window) {

    // ECMAScript 5 Strict Mode
    "use strict";

    // Main module level view.
    APP.views.MainView = Backbone.View.extend({
        // Backbone: view event handlers.
        events: {
            // Open email: support.
            'click button.esdoc-support': function () {
                APP.utils.openSupportEmail();
            },

            // Open page: home.
            'click img.esdoc-logo': function () {
                APP.utils.openHomepage();
            },

            // Open page: document detail.
            'click .doc': function (e) {
                this._openDetailPage($(e.target).parent().attr("id") ||
                                     $(e.target).parent().parent().attr("id"));
            },

            // Filter: value change.
            'change .filter select': function (e) {
                APP.events.trigger("filter:update",
                                   $(e.target).attr("id").slice(7),
                                   $(e.target).val());
            },

            // Pager: navigate to manually chosen page.
            'change .pagination-info' : function (e) {
                var pageNumber;

                pageNumber = parseInt($(e.target).val(), 10);
                $(e.target).val("");
                if (_.isNaN(pageNumber) === false &&
                    pageNumber > 0 &&
                    pageNumber <= paging.pages.length &&
                    paging.current !== paging.pages[pageNumber - 1]) {
                    paging.current = paging.pages[pageNumber - 1];
                    APP.events.trigger('state:pageUpdate');
                }
            },

            // Pager: navigate to first page.
            'click .pagination-first' : function () {
                if (paging.pages.length && paging.current !== _.first(paging.pages)) {
                    paging.current = _.first(paging.pages);
                    APP.events.trigger('state:pageUpdate');
                }
            },

            // Pager: navigate to previous page.
            'click .pagination-previous' : function () {
                if (paging.pages.length && paging.current !== _.first(paging.pages)) {
                    paging.current = paging.pages[paging.current.id - 2];
                    APP.events.trigger('state:pageUpdate');
                }
            },

            // Pager: navigate to next page.
            'click .pagination-next' : function () {
                if (paging.pages.length && paging.current !== _.last(paging.pages)) {
                    paging.current = paging.pages[paging.current.id];
                    APP.events.trigger('state:pageUpdate');
                }
            },

            // Pager: navigate to last page.
            'click .pagination-last' : function () {
                if (paging.pages.length && paging.current !== _.last(paging.pages)) {
                    paging.current = _.last(paging.pages);
                    APP.events.trigger('state:pageUpdate');
                }
            },

            // Pager: page-size change.
            'change .pagination-page-size' : function (e) {
                paging.pageSize = $(e.target).val();
                paging.pages = APP.utils.getPages(APP.state.searchData.results);
                paging.count = paging.pages.length;
                paging.current = paging.count > 0 ? paging.pages[0] : undefined;
                APP.events.trigger('state:pageUpdate');
            }
        },

        // Backbone: view initializer.
        initialize: function () {
            APP.events.on("filter:refresh", this._updateFilterPanel, this);
            APP.events.on("search:complete", this._updateStatisticsInfo, this);
            APP.events.on("state:pageUpdate", this._updateGrid, this);
            APP.events.on("state:pageUpdate", this._updateGridPager, this);
        },

        // Backbone: view renderer.
        render: function () {
            _.each([
                "template-header",
                "template-filter",
                "template-grid"
                ], function (template) {
                APP.utils.renderTemplate(template, APP, this);
            }, this);

            return this;
        },

        // Opens errata detail page.
        _openDetailPage: function (documentID) {
            var uid, version, p, url;

            // Extract document uid/version.
            uid = documentID.split("_")[0];
            version = documentID.split("_")[1];

            // Set project.
            p = APP.state.filters.project.data.current;

            // Set url.
            url = "{0}?renderMethod=id&project={1}&id={2}&version={3}&client=esdoc-search";
            url = url.replace("{0}", APP.defaults.viewerBaseURL);
            url = url.replace("{1}", p.key);
            url = url.replace("{2}", uid);
            url = url.replace("{3}", version);

            // Open url.
            APP.utils.openURL(url, true);
        },

        _updateFilterPanel: function () {
            this._replaceNode('.filter', 'template-filter');
        },

        // Updates search statistics.
        _updateStatisticsInfo: function () {
            this._replaceNode('#grid-header-summary', 'template-grid-header-summary');
            this._replaceNode('#grid-footer-summary', 'template-grid-footer-summary');
        },

        // Updates results grid.
        _updateGrid: function () {
            this._replaceNode('#template-grid-header-body', 'template-grid-header-body-row');
            this._replaceNode('tbody', 'template-grid-body');
        },

        // Updates grid pagination.
        _updateGridPager: function () {
            var text;

            text = "Page ";
            text += paging.current ? paging.current.id : '0';
            text += " of ";
            text += paging.count;
            this.$('.pagination-info').attr('placeholder', text);

            this.$('.pagination-container').removeClass('hidden');
            if (paging.count < 2 && APP.state.searchData.count < 25) {
                console.log("# pages: " + paging.count);
                this.$('.pagination-container').addClass('hidden');
            }
        },

        // Utility function to replace a page DOM node.
        _replaceNode: function (nodeSelector, template) {
            this.$(nodeSelector).replaceWith(APP.utils.renderTemplate(template, APP.state));
        }
    });

}(
    this.APP,
    this.APP.state.paging,
    this._,
    this.$,
    this.Backbone,
    this.window
));
