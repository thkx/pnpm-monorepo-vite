

export default [
    {
        url: "/api/1.0/test",
        method: "get",
        response: (request) => {
            return {
                code: 10031,
                message: "ok",
                data: { list: [1, 2, 3, 4] },
            }
        }
    }
]