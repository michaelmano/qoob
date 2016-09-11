(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global.Qoob = factory());
}(this, (function () { 'use strict';

/**
 * Whether the given object is a NodeList.
 * @param  {object} object
 * @return {Boolean}
 */
function isNodeList(object) {
    return typeof object.length != 'undefined' && typeof object.item != 'undefined';
}

/**
 * Returns a new array with only unique values (duplicates removed).
 * @param  {array} list
 * @return {array}
 */
function uniques(list) {
    return list.filter(function (value, index, self) {
        return self.indexOf(value) === index;
    });
}

/**
 * Returns a camel cased string from a slug cased string.
 * @param  {string} str
 * @return {string}
 */
function camelize(str) {
    return str.replace(/-([a-z])/g, function (m, w) {
        return w.toUpperCase();
    });
}

/**
 * Execute the given callback function for each element in the
 * list provided.
 * @param {mixed} selector
 * @param {function} closure Will be passed element and index arguments.
 */
function each(selector, closure) {
    var elements = find(selector);

    for (var i = 0; i < elements.length; i++) {
        closure(elements[i], i);
    }
}

/**
 * Returns the first value in the array provided, otherwise returns null
 * if the array is empty.
 * @param  {array} list
 * @return {mixed}
 */
function strip(list) {
    return list.length > 0 ? list[0] : null;
}

/**
 * Returns a function that takes an object as an argument and returns
 * the given property value on it.
 * @param  {string} name The property name,
 * @return {function}
 */
function prop(name) {
    return function (element) {
        return element[name];
    };
}

/**
 * Returns a function that takes an object as an argument and returns
 * the value returned by calling the provided function on it.
 * @param  {string} name The name of the function to call.
 * @return {function}
 */
function func(name) {
    return function (element) {
        return element[name]();
    };
}

/**
 * Get the first element matching the given selector.
 * @param  {string} selector
 * @return {mixed}
 */
function first(selector) {
    var elements = find(selector);

    if (elements.length > 0) {
        return elements[0];
    }

    return null;
}

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

/**
 * Find and return any element(s) matching the given selector. If the
 * selector is an array or NodeList, simply return it as is. If the
 * selector is a single object, return it as an array with 1 element.
 * @param  {mixed} selector
 * @return {mixed}
 */
function find(selector) {
    if (selector === null) {
        return null;
    }

    if (selector.constructor === Array || true === isNodeList(selector)) {
        return selector;
    }

    if ((typeof selector === 'undefined' ? 'undefined' : _typeof(selector)) === 'object') {
        return [selector];
    }

    return document.querySelectorAll(selector);
}

/**
 * Append the child element given to the element(s)
 * matching the selector.
 * @param {mixed} selector
 * @param {object} child_element
 */
function append(selector, child_element) {
    each(selector, function (element, _) {
        element.appendChild(child_element);
    });
}

/**
 * Prepend the child element given to the element(s)
 * matching the selector.
 * @param {mixed} selector
 * @param {object} child_element
 */
function prepend(selector, child_element) {
    each(selector, function (element, _) {
        element.insertBefore(child_element, element.firstChild);
    });
}

/**
 * Remove the element(s) from the DOM.
 * @param {mixed} selector
 */
function remove(selector) {
    each(selector, function (element, _) {
        element.parentNode.removeChild(element);
    });
}

/**
 * Add the given class to the element(s) matching the selector.
 * @param {mixed} selector
 * @param {string} class_name
 */
function addClass(selector, class_name) {
    each(selector, function (element, _) {
        if (element.classList) {
            element.classList.add(class_name);
        } else {
            element.className += ' ' + class_name;
        }
    });
}

/**
 * Remove the given class from the element(s) matching the selector.
 * @param {mixed} selector
 * @param {string} class_name
 */
function removeClass(selector, class_name) {
    each(selector, function (element, _) {
        if (element.classList) {
            element.classList.remove(class_name);
        } else {
            element.className = element.className.replace(new RegExp('(^|\\b)' + class_name.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
        }
    });
}

/**
 * Checks whether the given class exists on the element(s) matching the
 * selector. This will still return true if multiple elements are
 * matched and any one of them has the class applied.
 * @param  {mixed} selector
 * @param  {string} class_name
 * @return {Boolean}
 */
function hasClass(selector, class_name) {
    var truth = false;

    each(selector, function (element, _) {
        if (element.classList) {
            truth = element.classList.contains(class_name) === true ? true : truth;
        } else {
            truth = new RegExp('(^| )' + class_name + '( |$)', 'gi').test(element.className) === true ? true : truth;
        }
    });

    return truth;
}

/**
 * Whether the element(s) matching the selector have the
 * given class applied.
 * @param  {mixed} selector
 * @param  {string} class_name
 * @return {Boolean}
 */
function is(selector, class_name) {
    var truth = false;
    var self = this;

    each(selector, function (element, _) {
        var matches_fn = element.matches || element.matchesSelector || element.msMatchesSelector || element.mozMatchesSelector || element.webkitMatchesSelector || element.oMatchesSelector;

        if (matches_fn) {
            truth = matches_fn.call(element, class_name) ? true : truth;
        } else {
            var nodes = find(class_name);

            self.each(nodes, function (node, _) {
                if (node === element) {
                    truth = true;
                }
            });
        }
    });

    return truth;
}

/**
 * Gets or sets the html content on the element(s) matching the selector.
 * @param  {mixed} selector
 * @param  {mixed} [content=null]
 * @return {mixed}
 */
function html(selector) {
    var content = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

    var html = [];

    each(selector, function (element, _) {
        if (content === null) {
            html.unshift(element.innerHTML);
        } else {
            element.innerHTML = content;
        }
    });

    if (content === null) {
        return html;
    }
}

/**
 * Get or set the text for the element(s) matching the selector.
 * @param  {mixed} selector
 * @param  {mixed} [value=null]
 * @return {mixed}
 */
function text(selector) {
    var value = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

    var text = [];

    each(selector, function (element, _) {
        if (value === null) {
            text.unshift(element.textContent || element.innerText);
        } else {
            if (element.textContent !== undefined) {
                element.textContent = value;
            } else {
                element.innerText = value;
            }
        }
    });

    if (value === null) {
        return text;
    }
}

/**
 * Fire a callback on any element(s) matching the selector when the
 * specified event type occurs.
 * @param {mixed} selector
 * @param {string} event
 * @param {function} closure
 */
function on(selector, event, closure) {
    each(selector, function (element, _) {
        if (element.addEventListener) {
            element.addEventListener(event, closure);
        } else {
            element.attachEvent('on' + event, function () {
                closure.call(element);
            });
        }
    });
}

/**
 * Executes the given callback function with the document is ready.
 * @param {function} closure
 */
function documentReady(closure) {
    if (document.readyState != 'loading') {
        closure();
    } else if (document.addEventListener) {
        document.addEventListener('DOMContentLoaded', closure);
    } else {
        document.attachEvent('onreadystatechange', function () {
            if (document.readyState != 'loading') {
                closure();
            }
        });
    }
}

/**
 * Get an array of ancestors matching the ancestor_selector for the
 * element(s) matching the selector.
 * @param  {mixed} selector
 * @param  {string} ancestor_selector
 * @return {array}
 */
function ancestor(selector, ancestor_selector) {
    var ancestors = find(ancestor_selector);
    var list = [];
    var self = this;

    var finder = function finder(parent, list) {
        var node = null;

        each(list, function (element, _) {
            if (node === null && element === parent) {
                node = element;
            }
        });

        return node;
    };

    each(selector, function (element, _) {
        var cur_node = element.parentNode;

        while (cur_node !== null) {
            var result = finder(cur_node, ancestors);

            if (result !== null) {
                list.unshift(result);
                break;
            }

            cur_node = cur_node.parentNode;
        }
    });

    return uniques(list);
}

/**
 * Get an array of parents for the element(s) matching the selector.
 * @param  {mixed} selector
 * @return {array}
 */
function parent(selector) {
    var parents = [];

    each(selector, function (element, _) {
        parents.unshift(element.parentNode);
    });

    return parents;
}

/**
 * Get an array of children for the element(s) matching the selector.
 * @param  {mixed} selector
 * @param  {string} [child_selector=null]
 * @return {array}
 */
function children(selector) {
    var child_selector = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

    var children = [];
    var self = this;

    each(selector, function (element, _) {
        if (child_selector !== null) {
            var child_elements = element.querySelectorAll(child_selector);

            each(child_elements, function (child_element, _) {
                children.unshift(child_element);
            });
        } else {
            each(element.children, function (child_element, _) {
                // Skip comment nodes on IE8
                if (child_element.nodeType != 8) {
                    children.unshift(child_element);
                }
            });
        }
    });

    return children;
}

/**
 * Get an array of siblings for the element(s) matching the selector.
 * @param  {mixed} selector
 * @return {array}
 */
function siblings(selector) {
    var list = [];
    var self = this;

    each(selector, function (element, _) {
        var siblings = Array.prototype.slice.call(element.parentNode.children);

        each(siblings, function (sibling_element, _) {
            if (element !== sibling_element) {
                list.unshift(sibling_element);
            }
        });
    });

    return list;
}

/**
 * Get or set the given attribute for the element(s) matching the selector.
 * @param  {mixed} selector
 * @param  {string} attribute
 * @param  {mixed} [value=null]
 * @return {mixed}
 */
function attr(selector, attribute) {
    var value = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];

    var attr = [];

    each(selector, function (element, _) {
        if (value === null) {
            attr.unshift(element.getAttribute(attribute));
        } else {
            element.setAttribute(attribute, value);
        }
    });

    if (value === null) {
        return attr;
    }
}

/**
 * Get or set the value for the element(s) matching the selector.
 * @param  {mixed} selector
 * @param  {mixed} [value=null]
 * @return {mixed}
 */
function val(selector) {
    var value = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

    var val = [];

    each(selector, function (element, _) {
        if (value === null) {
            val.unshift(element.value);
        } else {
            element.value = value;
        }
    });

    if (value === null) {
        return val;
    }
}

/**
 * Gets or sets the data attributes on the element(s) matching the selector.
 * @param  {mixed} selector
 * @param  {String} name
 * @param  {String} [content=null]
 * @return {mixed}
 */
function data(selector, name) {
    var content = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];

    var data = [];
    var self = this;

    each(selector, function (element, _) {
        if (content === null) {
            if (element.dataset) {
                data.unshift(element.dataset[camelize(name)]);
            } else {
                data.unshift(element.getAttribute('data-' + name));
            }
        } else {
            if (element.dataset) {
                element.dataset[camelize(name)] = content;
            } else {
                element.setAttribute('data-' + name, content);
            }
        }
    });

    if (content === null) {
        return data;
    }
}

/**
 * Set the css on the element(s) matching the selector.
 * @param {mixed} selector
 * @param {Object} [properties={}]
 */
function css(selector) {
    var properties = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    each(selector, function (element, _) {
        for (var property in properties) {
            element.style[property] = properties[property];
        }
    });
}

/**
 * Hide the element(s) matching the selector.
 * @param {mixed} selector
 */
function hide(selector) {
    each(selector, function (element, _) {
        element.style.display = 'none';
    });
}

/**
 * Show the element(s) matching the selector.
 * @param {mixed} selector
 * @param {String} [preferred_display='block']
 */
function show(selector) {
    var preferred_display = arguments.length <= 1 || arguments[1] === undefined ? 'block' : arguments[1];

    each(selector, function (element, _) {
        element.style.display = preferred_display;
    });
}

/**
 * Toggle the visibility of the element(s) matching the selector.
 * @param {mixed} selector
 * @param {String} [preferred_display='block']
 */
function toggle(selector) {
    var preferred_display = arguments.length <= 1 || arguments[1] === undefined ? 'block' : arguments[1];

    var self = this;

    each(selector, function (element, _) {
        if ('none' === element.style.display) {
            show(element, preferred_display);
        } else {
            hide(element);
        }
    });
}

// These are all the functions that Qoob has to offer.
var qoob = {
    addClass: addClass,
    ancestor: ancestor,
    append: append,
    attr: attr,
    camelize: camelize,
    children: children,
    css: css,
    data: data,
    documentReady: documentReady,
    each: each,
    find: find,
    first: first,
    func: func,
    hasClass: hasClass,
    hide: hide,
    html: html,
    is: is,
    isNodeList: isNodeList,
    on: on,
    parent: parent,
    prepend: prepend,
    prop: prop,
    remove: remove,
    removeClass: removeClass,
    show: show,
    siblings: siblings,
    strip: strip,
    text: text,
    toggle: toggle,
    uniques: uniques,
    val: val
};

return qoob;

})));