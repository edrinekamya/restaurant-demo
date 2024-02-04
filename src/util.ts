export function validateNumeric(event: KeyboardEvent) {
  const keyCode = event.keyCode
  if ((keyCode < 48 || keyCode > 57) && keyCode !== 8) {
    // keyCode 48-57 represents 0-9, and 8 is for backspace
    event.preventDefault()
  }
}

export function validateCardNumber(number: string) {
  let nCheck = 0
  let bEven = false
  for (let n = number.length - 1; n >= 0; n--) {
    const cDigit = number.charAt(n)
    let nDigit = parseInt(cDigit, 10)
    if (bEven && (nDigit *= 2) > 9) {
      nDigit -= 9
    }
    nCheck += nDigit
    bEven = !bEven
  }
  return nCheck % 10 === 0
}
