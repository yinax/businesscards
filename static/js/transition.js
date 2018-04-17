/**
 * Created by xudao on 16/9/12.
 */
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD
        define(['exports'], factory);
    } else if (typeof exports === 'object' && typeof exports.nodeName !== 'string') {
        // Node, CommonJS-like
        factory(module.exports);
    } else {
        factory(root);
    }
})(this, function (exports) {
    "use strict";

    transition.prototype.option = {
        $main: '',
        $pages: '',
        pagesCount: 0,
        current: 0,
        isAnimating: false,
        endCurrPage: false,
        endNextPage: false,
        loop: true,
        callback: null,
    };

    transition.prototype.init = function (option) {
        this.option.$main = option.$main;
        this.option.$pages = option.$main.children('.pt-page');
        this.option.pagesCount = this.option.$pages.length;
        this.option.current = option.current ? option.current : 0;
        this.option.callback = option.callback ? option.callback : null;
        this.option.loop = option.loop != undefined ? option.loop : true;

        console.log(this.option.current);

        //保存各个View的默认class
        this.option.$pages.each(function () {
            var $page = $(this);
            console.log($page.attr('class'));
            $page.data('originalClassList', $page.attr('class'));
        });

        //console.log(current);
        //设置默认页面
        this.option.$pages.eq(this.option.current).addClass('pt-page-current');

    };

    transition.prototype.nextPage = function (animation,rank) {
        rank = rank != undefined ? rank : 11;
        if (this.option.isAnimating) {
            return false;
        }

        this.option.isAnimating = true;

        var $currPage = this.option.$pages.eq(this.option.current);

        // if( this.option.current < this.option.pagesCount - 1 ) {
        //     ++this.option.current;
        // }else if(this.option.current >= this.option.pagesCount - 1 && this.option.loop){
        //     this.option.current = 0;
        // }else{
        //     return false;
        // }

        // 这是我修改的--start
        if (this.option.current < this.option.pagesCount - 1) {
            console.log(rank);

            if (this.option.current == 1 && rank < 11) {
                this.option.current = this.option.current + 2;
            } else {
                ++this.option.current;

            }
        } else if (this.option.current >= this.option.pagesCount - 1 && this.option.loop) {
            this.option.current = 0;
        } else {
            return false;
        }
        // 这是我修改的--end

        console.log(this.option.current);

        var $nextPage = this.option.$pages.eq(this.option.current).addClass('pt-page-current'),
            outClass = '', inClass = '';
        console.log($nextPage)

        switch (animation) {

            case 1:
                outClass = 'pt-page-moveToLeft';
                inClass = 'pt-page-moveFromRight';
                break;
        }

        var self = this;
        $currPage.addClass(outClass).on('webkitAnimationEnd', function () {
            $currPage.off('webkitAnimationEnd');
            self.option.endCurrPage = true;
            if (self.option.endNextPage) {
                self.onEndAnimation($currPage, $nextPage);
            }
        });

        $nextPage.addClass(inClass).on('webkitAnimationEnd', function () {
            $nextPage.off('webkitAnimationEnd');
            self.option.endNextPage = true;
            if (self.option.endCurrPage) {
                self.onEndAnimation($currPage, $nextPage);
            }
        });
    };

    transition.prototype.onEndAnimation = function ($outpage, $inpage) {
        this.option.endCurrPage = false;
        this.option.endNextPage = false;
        this.resetPage($outpage, $inpage);
        this.option.isAnimating = false;
    };

    transition.prototype.resetPage = function ($outpage, $inpage) {
        $outpage.attr('class', $outpage.data('originalClassList'));
        $inpage.attr('class', $inpage.data('originalClassList') + ' pt-page-current');

        this.option.callback && this.option.callback(this.option.current);
    };

    transition.prototype.appendAfter = function (html) {
        var pagesCount = this.option.pagesCount,
            diff = 0;
        this.option.$main.append(html);
        this.option.$pages = this.option.$main.children('.pt-page');
        this.option.pagesCount = this.option.$pages.length;
        diff = this.option.pagesCount - pagesCount;
        for (var i = 1; i <= diff; i++) {
            this.option.$pages.eq(this.option.pagesCount - i).data('originalClassList', this.option.$pages.eq(this.option.pagesCount - i).attr('class'));
        }
    };

    transition.prototype.appendAfter = function (html) {
        var pagesCount = this.option.pagesCount,
            diff = 0;
        this.option.$main.prepend(html);
        this.option.$pages = this.option.$main.children('.pt-page');
        this.option.pagesCount = this.option.$pages.length;
        diff = this.option.pagesCount - pagesCount;
        for (var i = 0; i < diff; i++) {
            this.option.$pages.eq(i).data('originalClassList', this.option.$pages.eq(i).attr('class'));
        }
    };

    transition.prototype.destroy = function () {

    };

    function transition(option) {
        this.init(option);
    }

    exports.transition = transition;
});

