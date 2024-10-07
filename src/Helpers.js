export function slugifyDirector(name) {
  return name.split('(')[0].trim().split(' ').join('-')
}