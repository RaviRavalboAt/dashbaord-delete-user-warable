export const validateMobile = (mobile, messageApi) => {
    const regex = /^(\+\d{1,3}[- ]?)?\d{10}$/
    if (!mobile.match(regex)) {
      messageApi.open({
        type: 'error',
        content: 'Not a valid number',
      });
     return false
    }
    return true
}

