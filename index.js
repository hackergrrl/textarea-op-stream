var Readable = require('readable-stream')
var Diff = require('adiff').diff

module.exports = function (textarea) {
  textarea.addEventListener('input', onInput)
  textarea.addEventListener('focus', function () {
    return onInput(null, true)
  })

  var old = []
  var stream = new Readable({objectMode: true})

  stream._read = function () {}

  function onInput (ev, ignore) {
    var val = textarea.value.split('')

    if (ignore) {
      old = val
      return true
    }

    var diff = Diff(old, val)
    while (diff.length) {
      var change = diff.shift()
      var pos = change[0]

      // deletion
      if (change[1] > 0) {
        stream.push({ op: 'delete', pos: pos, count: change[1] })
      }

      // insert
      if (change.length > 2) {
        var str = change.slice(2).join('')
        stream.push({ op: 'insert', pos: pos, str: str })
      }
    }

    old = val
  }

  return stream
}
