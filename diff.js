// finds a *single* block of change between two strings.

module.exports = function (prev, cur) {
  // scan 'prev' for the first changed char from the front
  var frontIdx
  for (frontIdx=0; frontIdx < prev.length; frontIdx++) {
    // console.error('0', prev[frontIdx], cur[frontIdx], frontIdx)
    if (prev[frontIdx] !== cur[frontIdx]) {
      break
    }
  }
  frontIdx--

  // scan both for the first changed char from the back
  var pIdx = prev.length
  var cIdx = cur.length
  while (pIdx > frontIdx && cIdx > frontIdx) {
    // console.error('1', prev[pIdx], cur[cIdx])
    if (prev[pIdx] !== cur[cIdx]) {
      pIdx++
      cIdx++
      break
    }
    pIdx--
    cIdx--
  }

  // console.error('frontIdx', frontIdx)
  // console.error('pBackIdx', pIdx)
  // console.error('cBackIdx', cIdx)

  // identical
  if (frontIdx === pIdx && frontIdx === cIdx) {
    return [null, null]
  }

  // add to end or front
  if (frontIdx == pIdx && cIdx > pIdx) {
    return [
      null,
      { at: pIdx + 1, text: cur.substring(frontIdx + 1, cIdx + 1) }
    ]
  }

  // remove from end or front
  if (frontIdx == cIdx && pIdx > cIdx) {
    return [
      { at: frontIdx + 1, count: pIdx - cIdx },
      null
    ]
  }

  // remove some, add some
  return [
    { at: frontIdx + 1, count: pIdx - frontIdx - 1 },
    { at: frontIdx + 1, text: cur.substring(frontIdx + 1, cIdx) }
  ]
}

var diff = module.exports

// same
// console.log(diff('hello', 'hello'))

// add to middle, front, or back
// "hello world", "hello tiny word" => add @ 6: "tiny "
// "hi", "oh hi" => add @ 0: "oh "
// "hi", "hi there" => add @ 2: " there"
// console.log(diff('hi', 'hi there'))
// console.log(diff('hi', 'oh hi'))
// console.log(diff('hello world', 'hello tiny world'))

// delete from middle, front, or back
// "hello tiny word", "hello world" => del @ 6: 5
// "hey you", "you" => del @ 0: 4
// "hey you", "hey" => del @ 4: 4
// console.log(diff('hey you', 'hey'))
// console.log(diff('hey you', 'you'))
// console.log(diff('hello tiny world', 'hello world'))

// "hi there bob", "hi my pal bob" => del @ 3: 5, add @ 3: "pal"
// console.log(diff('hi there bob', 'hi my pal bob'))
