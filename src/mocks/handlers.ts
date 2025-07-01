import { http, HttpResponse } from 'msw'

import { profile as profileData } from '../services/db.json';

export const handlers = [
    // post request to login
    http.post('/login', async ({ request }) => {
        const { email, password } = await request.json() as { email: string; password: string };

        // Check credentials against the profile data
        if (email === profileData.email && password === profileData.password) {
            // Set profile in localStorage (simulating server-side localStorage operation)
            if (typeof window !== 'undefined') {
                console.log('setting profile in localStorage');

                localStorage.setItem('userProfile', JSON.stringify(profileData));
                localStorage.setItem('authToken', 'abc-123');
            }

            return HttpResponse.json({
                token: 'abc-123',
                user: profileData
            }, {
                status: 200
            })
        }
        return HttpResponse.json({
            error: 'Invalid credentials'
        }, {
            status: 401
        })
    }),

    // get request to fetch profile data
    http.get('/profile', () => {
        return HttpResponse.json(profileData)
    }),

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