import { http, HttpResponse } from 'msw'

import dbData from '../services/db.json';

const { profile: profileData, 'users-kpis': usersKpis, 'users-records': usersRecords } = dbData;

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

    http.get('/users', ({ request }) => {
        const url = new URL(request.url);
        const page = parseInt(url.searchParams.get('page') || '1');
        const per_page = parseInt(url.searchParams.get('per_page') || '10');
        
        // Filter parameters
        const organization = url.searchParams.get('organization');
        const username = url.searchParams.get('username');
        const email = url.searchParams.get('email');
        const phone = url.searchParams.get('phone');
        const date = url.searchParams.get('date');
        const status = url.searchParams.get('status');

        // Apply filters
        let filteredRecords = [...usersRecords];
        
        if (organization) {
            filteredRecords = filteredRecords.filter(user => 
                user.organizations?.some(org => 
                    org.toLowerCase().includes(organization.toLowerCase())
                ) || 
                user.activeOrganization?.toLowerCase().includes(organization.toLowerCase())
            );
        }
        
        if (username) {
            filteredRecords = filteredRecords.filter(user => 
                user.username?.toLowerCase().includes(username.toLowerCase())
            );
        }
        
        if (email) {
            filteredRecords = filteredRecords.filter(user => 
                user.email?.toLowerCase().includes(email.toLowerCase())
            );
        }
        
        if (phone) {
            filteredRecords = filteredRecords.filter(user => 
                (user.phoneNumber || user.phone)?.includes(phone)
            );
        }
        
        if (date) {
            filteredRecords = filteredRecords.filter(user => 
                user.createdAt?.includes(date)
            );
        }
        
        if (status) {
            filteredRecords = filteredRecords.filter(user => 
                user.status?.toLowerCase() === status.toLowerCase()
            );
        }

        // Calculate pagination
        const totalRecords = filteredRecords.length;
        const totalPages = Math.ceil(totalRecords / per_page);
        const startIndex = (page - 1) * per_page;
        const endIndex = startIndex + per_page;
        const paginatedRecords = filteredRecords.slice(startIndex, endIndex);

        return HttpResponse.json({
            kpis: usersKpis,
            records: paginatedRecords,
            pagination: {
                first: 1,
                prev: page > 1 ? page - 1 : null,
                next: page < totalPages ? page + 1 : null,
                last: totalPages,
                pages: totalPages,
                items: totalRecords
            }
        });
    })
]