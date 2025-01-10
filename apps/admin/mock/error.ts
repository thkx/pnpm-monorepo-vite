export default [
    {
        url: "/api/1.0/error",
        method: "get",
        response: (request) => {
            return {
                code: 10031,
                message: "403",
                data: { list: [1, 2, 3, 4] },
            }
        }
    }
]