
export default [
    {
        url: "/api/1.0/basicForm",
        method: "post",
        response: (request) => {
            console.log(request.headers.token)
            return {
                code: 0,
                message: "ok",
                data: {
                    message: '操作成功'
                }
            }
        }
    }
]