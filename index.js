var Readable = require('readable-stream')
var Diff = require('./diff')

module.exports = function (textarea) {
  textarea.addEventListener('input', onInput)
  textarea.addEventListener('focus', function () {
    return onInput(null, true)
  })

  var old = []
  var stream = new Readable({objectMode: true})

  stream._read = function () {}

  function onInput (ev, ignore) {
    var val = textarea.value

    if (ignore) {
      old = val
      return true
    }

    var diff = Diff(old, val)
    if (diff[0]) {
      stream.push({ op: 'delete', pos: diff[0].at, count: diff[0].count })
    }
    if (diff[1]) {
      stream.push({ op: 'insert', pos: diff[1].at, str: diff[1].text })
    }

    old = val
  }

  return stream
}
