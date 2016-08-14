(function(name, definition) {
    if (typeof module != 'undefined') module.exports = definition();
    else if (typeof define == 'function' && typeof define.amd == 'object') define(definition);
    else this[name] = definition();
}('qoob', function() {
    return {
        first(selector) {
            let elements = this.find(selector);

            if (elements.length > 0) {
                return elements[0];
            }

            return null;
        },

        find(selector) {
            if (selector !== null && typeof selector === 'object') {
                return [selector];
            }

            return document.querySelectorAll(selector);
        },

        on(selector, event, closure) {
            this.each(selector, function(element, _) {
                if (element.addEventListener) {
                    element.addEventListener(event, closure);
                } else {
                    element.attachEvent('on' + event, function() {
                        closure.call(element);
                    });
                }
            });
        },

        fadeIn(selector) {
            // TODO: Implement.
        },

        fadeOut(selector) {
            // TODO: Implement.
        },

        hide(selector) {
            this.each(selector, function(element, _) {
                element.style.display = 'none';
            });
        },

        show(selector) {
            this.each(selector, function(element, _) {
                element.style.display = '';
            });
        },

        html(selector, content = null) {
            // TODO: Implement.
        },

        css(selector, properties = {}) {
            // TODO: Implement.
        },

        addClass(selector, class_name) {
            // TODO: Implement.
        },

        removeClass(selector, class_name) {
            // TODO: Implement.
        },

        hasClass(selector, class_name) {
            // TODO: Implement.
        },

        children(selector, child_selector) {
            // TODO: Implement.
        },

        attr(selector, attribute, value = null) {
            // TODO: Implement.
        },

        val(selector, value = null) {
            // TODO: Implement.
        },

        text(selector) {
            // TODO: Implement.
        },

        each(selector, closure) {
            var elements = this.find(selector);

            for (var i = 0; i < elements.length; i++) {
                closure(elements[i], i);
            }
        },

        documentReady(closure) {
            if (document.readyState != 'loading'){
                closure();
            } else if (document.addEventListener) {
                document.addEventListener('DOMContentLoaded', closure);
            } else {
                document.attachEvent('onreadystatechange', function() {
                    if (document.readyState != 'loading') {
                        closure();
                    }
                });
            }
        },
    }
}));
