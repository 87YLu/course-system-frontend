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
