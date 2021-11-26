import axios from 'axios'
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

export const UploadFile = ({ data, url, callback }) => {
  const param = new FormData()

  Object.keys(data).forEach(key => {
    param.append(key, data[key])
  })

  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }

  axios.post(url, param, config).finally(res => {
    console.log(res)
    callback && callback()
  })
}

export const ExportExcel = ({ url, fileName = 'excel', params, callback }) => {
  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    responseType: 'arraybuffer',
  }

  if (params) {
    config.params = {
      ...params,
    }
  }

  axios
    .get(url, config)
    .then(res => {
      const url = window.URL.createObjectURL(
        new Blob([res.data], {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        }),
      )
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', fileName)
      link.click()
    })
    .finally(() => {
      callback && callback()
    })
}
