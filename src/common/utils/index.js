import axios from 'axios'
import { message } from 'antd'
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
  return window.location.pathname.split('/')[level]
}

export const UploadFile = ({ data, url, callback, success }) => {
  const param = new FormData()

  Object.keys(data).forEach(key => {
    param.append(key, data[key])
  })

  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }

  axios
    .post(url, param, config)
    .then(res => {
      if (res.data.success === false) {
        message.error(res.data.message)
      } else {
        success && success(res)
      }
    })
    .catch(err => {
      message.error(err.message)
    })
    .finally(_ => {
      callback && callback()
    })
}

export const ExportExcel = ({ url, fileName = 'excel', params, callback , success }) => {
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

      success && success(res)
    })
    .catch(err => {
      message.error(err.message)
    })
    .finally(_ => {
      callback && callback()
    })
}

export const validateNecessaryProps = (componentName, necessaryProps) => {
  const missingProps = []

  Object.keys(necessaryProps).forEach(key => {
    if (necessaryProps[key] == null) {
      missingProps.push(key)
    }
  })

  if (missingProps.length > 0) {
    throw new Error(`${componentName} 组件中，${missingProps.join('，')} 是必传参数`)
  }
}
