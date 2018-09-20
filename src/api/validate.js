export default function valid (model, data) {
  const needKey = [];
  const diffType = [];
  Object.keys(model).forEach(key => {
    // 必填字段
    if (model[key].need) {
      if (data[key]) {
        // typeof model[key].type
        const type = model[key].type;
        // type不为any类型时
        if (type && type !== 'Any') {
          // type为单个类型时
          if (typeof type === 'function') {
            // 类型不相同
            if (data[key].constructor !== type) {
              diffType.push({
                key,
                needType: type,
                nowType: data[key].constructor
              })
            }
            // type为多个类型时，即为数组时
          } else if (typeof type === 'object') {
            // 类型不相同
            if (type.indexOf(data[key].constructor) === -1) {
              diffType.push({
                key,
                needType: type,
                nowType: data[key].constructor
              })
            }
          }
        }
      } else {
        needKey.push(key)
        console.log(`${key}是必填字段`)
      }
    } else {
      // 非必填字段
      if (data[key]) {
        const type = model[key].type;
        // type不为any类型时
        if (type && type !== 'Any') {
          // type为单个类型时
          if (typeof type === 'function') {
            // 类型不相同
            if (data[key].constructor !== type) {
              diffType.push({
                key,
                needType: type,
                nowType: data[key].constructor
              })
            }
            // type为多个类型时，即为数组时
          } else if (typeof type === 'object') {
            // 类型不相同
            if (type.indexOf(data[key].constructor) === -1) {
              diffType.push({
                key,
                needType: type,
                nowType: data[key].constructor
              })
            }
          }
        }
      }
    }
  })
}
