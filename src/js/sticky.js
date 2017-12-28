import $ from "jquery";

class Sticky {

    constructor(selector, stickyOffset) {
        this.$stickElms = $(selector);
        if (this.$stickElms.css('position') === 'sticky'
                || this.$stickElms.css('position') === '-webkit-sticky'
                || this.$stickElms.css('position') === '-moz-sticky'
                || this.$stickElms.css('position') === '-ms-sticky'
                || this.$stickElms.css('position') === '-o-sticky'
        ) {
            this.$stickElms.css('top', stickyOffset + 'px');
            return;
        }
        this.stickyOffset = stickyOffset;
        $(window).on('scroll', this.setBehavoir.bind(this));
        $(window).on('resize', function() {
            window.setTimeout(this.init.bind(this), 0);
        }.bind(this));
        window.setTimeout(function(){
            this.init();
        }.bind(this), 0);
    }

    init() {
        this.setPositions();
        this.setBehavoir();
    }

    setPositions() {
        for (let stickElm of this.$stickElms) {
            stickElm.start = $(stickElm).offset().top;
            // during scrolling elements are changing there height because of changing position
            // and we need fix there height
            $(stickElm).closest('.section').css('height', 'auto');
            let parentHeigth = $(stickElm).closest('.section').outerHeight(true);
            $(stickElm).closest('.section').css('height', parentHeigth + 'px');
        }
        for (let i = 0; i < this.$stickElms.length; i ++) {
            if (i < this.$stickElms.length - 1) {
                this.$stickElms[i].end = this.$stickElms[i+1].start;
            } else {
                this.$stickElms[i].end = this.$stickElms[i].start + this.$stickElms.eq(i).closest('.section').outerHeight(true);
            }
        }

        /**Help me to fixed bugs in IE. To see the $stickElms[i] height Where it starts and ends **/

        // for (let i = 0; i < this.$stickElms.length; i ++) {
        //     $('body').append('<div class="st_elem st_elem_' + i + '"></div>');
        //     console.log('<div class="st_elem st_elem_' + i + '"></div>');
        //     $('.st_elem_' + i).css({
        //         position: 'absolute',
        //         width: '20px',
        //         right: i*20 + 'px',
        //         top: this.$stickElms[i].start + 'px',
        //         height: (this.$stickElms[i].end - this.$stickElms[i].start) + 'px',
        //         background: 'green'
        //     });
        // }
    }

    setBehavoir() {
        let position = $(window).scrollTop() + this.stickyOffset;

        /**Help me to fixed bugs in IE. To see Scroll Line **/

        // this.setPositions();
        // $('.scroll-line').css('top', position + 'px');

        for (let stickElm of this.$stickElms) {
            $(stickElm).removeClass('sticked').removeClass('stucked').removeClass('un-sticked');
            $(stickElm).parent().css('top', '0');
            if (stickElm.end <= position) {
                $(stickElm).addClass('stucked');
            } else if (stickElm.end > position && stickElm.start < position) {

                $(stickElm).parent().css('top', $(stickElm).outerHeight() + 'px');
                $(stickElm).addClass('sticked');
            } else {
                $(stickElm).addClass('un-sticked');
            }
        }
    }
}

export default Sticky;