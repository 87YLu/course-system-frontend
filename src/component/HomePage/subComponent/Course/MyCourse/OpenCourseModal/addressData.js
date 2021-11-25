export const building = ['教一', '教二', '教三', '教四', '教五', '教六']
export const classroom = new Array(5)
  .fill(0)
  .map((_, index) =>
    new Array(20)
      .fill(0)
      .map((_, indey) => `${index + 1}${(indey + 1).toString().padStart(2, '0')}`),
  )
  .flat()
export const clazz = new Array(9).fill(0).map((_, index) => index + 1)
