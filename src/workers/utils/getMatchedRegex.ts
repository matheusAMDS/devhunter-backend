interface Params {
  regex: RegExp
  str: string 
  groups?: number 
}

export function getMatchedRegex(params: Params): string | null {
  const { regex, str, groups } = params
  const matchedRegex = str.match(regex)
  let match: string
  let i: number 

  if (matchedRegex) {
    for (i = 1; i <= (groups || 1); i++) {
      if (matchedRegex[i]) {
        match = matchedRegex[i]

        return match
      }
    }

    return null
  }

  return null
}
