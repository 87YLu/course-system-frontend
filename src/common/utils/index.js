export class Enum {
  constructor(originData) {
    this.enum = originData
  }

  set enum(originData) {
    // 如果传入的是数组，则以下标作为 key 值
    const originObj = Array.isArray(originData)
      ? {
          ...originData,
        }
      : originData
    this.originObj = originObj // 遍历值双向映射到 Enum 实例中

    Object.keys(originObj).forEach(key => {
      this[key] = originObj[key]
      this[originObj[key]] = Number(key)
    })
  }
}

export const roleEnum = new Enum({
  1: '学生',
  2: '老师',
})

export const getTop = element => {
  let realTop = element.offsetTop
  let parent = element.offsetParent

  while (parent != null) {
    realTop += parent.offsetTop
    parent = parent.offsetParent
  }

  return realTop
}

export const getLocationPath = level => {
  const href = window.location.href
  const origin = window.location.origin
  return href.replace(origin, '').split('/')[level]
}
