<p align="center"><img src="https://cloud.githubusercontent.com/assets/2805249/18409938/3bc3fa0e-7798-11e6-81e4-c7e8e69bf90c.jpg" alt="Qoob logo"></p>
<h1 align="center">Qoob (/kjuːb/)</h1>
<p align="center">A lightweight DOM manipulation library.</p>

## Examples

### CSS manipulation
```javascript
import Q from 'qoob'

Q.css('p', {
    color: 'red',
    fontWeight: 'bold',
})
```

### Events
```javascript
import Q from 'qoob'

Q.on('.Button', 'click', (e) => {
    alert('Button was clicked!')
})
```

### Iteration + HTML manipulation
```javascript
import Q from 'qoob'

Q.each('p', (el, i) => {
    Q.html(el, `I am at index ${i}`)
})
```

### Element creation
```javascript
import Q from 'qoob'

let p_tag = Q.make('p', 'Hello world!')

Q.append('body', p_tag)
```

and much more...

## Install

### NPM
```bash
$ npm install --save qoob
```

### Bower
```bash
$ bower install qoob
```

### CDN
#### Development
```
https://cdn.rawgit.com/enzyme/qoob/master/dist/qoob.js
```
#### Production
```
https://cdn.rawgit.com/enzyme/qoob/master/dist/qoob.min.js
```

## Function reference

| Name | Parameters | Description |
| --- | --- | --- |
| **addClass** | `selector, class_name` | Add the given class to the element(s) matching the selector. |
| **ancestor** | `selector, ancestor_selector` | Get an array of ancestors matching the ancestor_selector for the element(s) matching the selector. |
| **append** | `selector, child_element` | Append the child element given to the element(s) matching the selector. |
| **attr** | `selector, attribute, value = null` | Get or set the given attribute for the element(s) matching the selector. |
| **children** | `selector, child_selector = null` | Get an array of children for the element(s) matching the selector. |
| **clone** | `selector` | Clone the given element(s) matching the selector and return them as an array. |
| **css** | `selector, properties = {}` | Set the given css description object on the element(s) matching the selector, or get the value of the css property if `properties` is a string value. E.g. "padding". |
| **data** | `selector, name, content = null` | Gets or sets the data attributes on the element(s) matching the selector. |
| **documentReady** | `closure` | Executes the given callback function with the document is ready. |
| **each** | `selector, closure` | Execute the given callback function for each element in the list provided. |
| **find** | `selector` | Find and return any element(s) matching the given selector. If the selector is an array or NodeList, simply return it as is. If the selector is a single object, return it as an array with 1 element. |
| **findAll** | `selectors` | Find and return any element(s) matching the given selectors. |
| **first** | `selector` | Get the first element matching the given selector.|
| **firstOf** | `fn` | Returns a function that calls the given function and returns only the first result returned by that function. Eg `let firstHtml = Qoob.firstOf(Qoob.html)` when called like `firstHtml('p')` with multiple `p` tags on the page, will only return the HTML contents of the first `p` tag. |
| **func** | `name` | Returns a function that takes an object as an argument and returns the value returned by calling the provided function on it. |
| **hasClass** | `selector, class_name` | Checks whether the given class exists on the element(s) matching the selector. This will still return true if multiple elements are matched and any one of them has the class applied. |
| **head** | `list` | Alias for `strip(...)`. |
| **hide** | `selector` | Hide the element(s) matching the selector. |
| **html** | `selector, content = null` | Gets or sets the html content on the element(s) matching the selector. |
| **is** | `selector, class_name` | Whether the element(s) matching the selector have the given class applied. |
| **make** | `type, inner_html = null` | Create a new html element of the specified type and optionally fill it with the given html. |
| **on** | `selector, event, closure` | Fire a callback on any element(s) matching the selector when the specified event type occurs. |
| **parent** | `selector` | Get an array of parents for the element(s) matching the selector. |
| **prepend** | `selector, child_element` | Prepend the child element given to the element(s) matching the selector. |
| **prop** | `name` | Returns a function that takes an object as an argument and returns the given property value on it. |
| **remove** | `selector` | Remove the element(s) from the DOM. |
| **removeAttr** | `selector, attribute` | Remove the attribute from the element(s) matching the selector. |
| **removeClass** | `selector, class_name` | Remove the given class from the element(s) matching the selector. |
| **show** | `selector, preferred_display = 'block'` | Show the element(s) matching the selector. |
| **siblings** | `selector` | Get an array of siblings for the element(s) matching the selector. |
| **state** | `selector, attribute` | Alias for the setter functionality of `attr(...)` where the attribute will be set to a value equal to its name. Eg `state('input', 'disabled')` is equivalent to calling `attr('input', 'disabled', 'disabled')`. |
| **strip** | `list` | Returns the first value in the array provided, otherwise returns null if the array is empty. |
| **text** | `selector, value = null` | Get or set the text for the element(s) matching the selector. |
| **toggle** | `selector, preferred_display = 'block'` | Toggle the visibility of the element(s) matching the selector. |
| **toggler** | `selector, fn_on, fn_off` | When called on `selector`, it will either call `fn_on` or `fn_off` if the state of the element(s) are transitioning to their `on` or `off` states respectively. Element(s) start in an `off` state. |
| **val** | `selector, value = null` | Get or set the value for the element(s) matching the selector. |

## License

MIT, see LICENSE.

`Copyright (c) 2016 Tristan Strathearn <r3oath@gmail.com>`
