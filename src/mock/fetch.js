
const fetchData = async (fetchName, params, options) => {
  try {
    const defaultPrams = {};
    params = Object.assign(defaultPrams, params || {});
    const resultData = await fetchName(params, options);
    // console.log(resultData)
    if (resultData) {
      if (resultData.data) {
        // 获取到正常数据并返回
        if (resultData.data.code.toString() === '200' || resultData.data.code.toString() === '304') {
          return {
            code: 'success',
            data: resultData.data.data,
            pageLimit: resultData.data.pageLimit,
            text: resultData.data.text
          };
        } else {
          // 状态码异常
          return {
            code: 'no_data',
            text: resultData.data.text
          }
        }
      } else {
        // 接口返回异常
        return {
          code: 'error',
          text: resultData.data.text
        }
      }
    } else {
      return {
        code: 'error',
        text: 'no response'
      }
    }
  } catch (e) {
    // 请求失败
    console.log(e)
    return {
      code: 'fail'
    };
  }
};

export {
  fetchData
};
