import mockjs from 'mockjs';

const getTags = () => {
    return mockjs.mock({
        'list|100': [{ name: '@city', 'value|1-100': 150, 'type|0-2': 1 }],
    })
};

export default [
    {
        url: "/api/1.0/tags",
        method: "get",
        response: (request) => {
            console.log(request.headers.token)
            return {
                code: 0,
                message: "ok",
                data: getTags(),
            }
        }
    },
]