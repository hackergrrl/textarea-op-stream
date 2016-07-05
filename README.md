# textarea-op-stream

> Get a readable stream of all of a textarea's inserts and deletes.

## Background

[`textarea`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea)
is complex: they have a slew of properties and events, and describing its state
is non-trivial. It's not easy to learn about inserts and delete operations:
interpreting multiple `keydown` events to determine what key and modifiers were
pressed is onerous. I thought it would be nice to have a readable stream of
these operations.

## Usage

Let's wrap a textarea and type in it:

```js
var wrap = require('textarea-op-stream')

var ta = document.createElement('textarea')
ta.setAttribute('cols', 80)
ta.setAttribute('rows', 8)
document.body.appendChild(ta)

var ops = wrap(ta)

ops.on('data', function (ev) {
  console.log(ev.op, '@', ev.pos, '( ' + (ev.str ? ev.str : ev.count) + ')')
})
```

After editing some text, you may see

```
insert @ 0 (hello)
insert @ 5 (!)
delete @ 5 1
delete @ 0 5
```

as you insert 'Hello!' and then delete pieces of the text.

## API

```js
var wrap = require('textarea-op-stream')
```

Wraps a `<textarea>` element, returning a Readable object stream of insert and
delete operations. The two object forms to be expected are

```js
{
  op: 'insert',
  pos: Number,
  str: String
}
```

```js
{
  op: 'delete',
  pos: Number,
  count: Number  // the number of consecutive chars deleted at 'pos'
}
```

## Install

With [npm](https://npmjs.org/) installed, run

```
$ npm install textarea-op-stream
```

## See Also

- [hyper-textarea](https://github.com/noffle/hyper-textarea)
- [hyper-string](https://github.com/noffle/hyper-string)

## License

ISC
