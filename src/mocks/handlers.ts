import { http, HttpResponse } from 'msw'

export const handlers = [
    // http.get('https://api.example.com/user', () => {
    //     return HttpResponse.json({
    //         id: 'abc-123',
    //         firstName: 'John',
    //         lastName: 'Maverick',
    //     })
    // }),

    http.get('/users', () => {
        return HttpResponse.json([
            {
                id: 'abc-123',
                firstName: 'John',
                lastName: 'Maverick',
            },
            {
                id: 'abc-124',
                firstName: 'Jane',
                lastName: 'Doe',
            },
            {
                id: 'abc-125',
                firstName: 'John',
                lastName: 'Smith',
            },
        ]
        )
    })
]