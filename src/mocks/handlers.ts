import { http, HttpResponse } from 'msw'

import dbData from '../services/db.json';

const { profile: profileData, 'users-kpis': usersKpis, 'users-records': usersRecords, 'dashboard-kpis': dashboardKpis, 'dashboard-activities': dashboardActivities, 'dashboard-quick-stats': dashboardQuickStats } = dbData;

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
                (user.phoneNumber || user.phoneNumber)?.includes(phone)
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
    }),

    // get request to fetch dashboard data
    http.get('/dashboard', () => {
        return HttpResponse.json({
            kpis: dashboardKpis,
            activities: dashboardActivities,
            quickStats: dashboardQuickStats
        });
    }),

    // get request to fetch individual user details
    http.get('/users/:id', ({ params }) => {
        const { id } = params;
        const user = usersRecords.find(user => user.id === id);
        
        if (!user) {
            return HttpResponse.json(
                { error: 'User not found' },
                { status: 404 }
            );
        }

        return HttpResponse.json(user);
    }),

    // get request to fetch user account summary
    http.get('/users/:id/account-summary', ({ params }) => {
        const { id } = params;
        const user = usersRecords.find(user => user.id === id);
        
        if (!user) {
            return HttpResponse.json(
                { error: 'User not found' },
                { status: 404 }
            );
        }

        // Return account summary if it exists in the user record
        if (user.accountSummary) {
            return HttpResponse.json(user.accountSummary);
        }

        // Generate unique account summary based on user data
        const accountSummaries = {
            "550e8400-e29b-41d4-a716-446655440000": {
                accountNumber: "9912345678",
                accountName: user.firstName && user.lastName ? `${user.firstName} ${user.lastName}` : "Vasquez Mitchell",
                bankName: "Providus Bank",
                balance: "₦150,000.00",
                tier: "Bronze",
                status: user.status,
                createdAt: user.createdAt
            },
            "550e8400-e29b-41d4-a716-446655440001": {
                accountNumber: "9923456789",
                accountName: user.firstName && user.lastName ? `${user.firstName} ${user.lastName}` : "Jacobson Bullock",
                bankName: "Access Bank",
                balance: "₦450,000.00",
                tier: "Gold",
                status: user.status,
                createdAt: user.createdAt
            },
            "550e8400-e29b-41d4-a716-446655440002": {
                accountNumber: "9934567890",
                accountName: user.firstName && user.lastName ? `${user.firstName} ${user.lastName}` : "Lewis Dillard",
                bankName: "Zenith Bank",
                balance: "₦75,000.00",
                tier: "Silver",
                status: user.status,
                createdAt: user.createdAt
            },
            "550e8400-e29b-41d4-a716-446655440003": {
                accountNumber: "9945678901",
                accountName: user.firstName && user.lastName ? `${user.firstName} ${user.lastName}` : "Queen Wilkerson",
                bankName: "GT Bank",
                balance: "₦300,000.00",
                tier: "Platinum",
                status: user.status,
                createdAt: user.createdAt
            },
            "550e8400-e29b-41d4-a716-446655440004": {
                accountNumber: "9956789012",
                accountName: user.firstName && user.lastName ? `${user.firstName} ${user.lastName}` : "Lillian Young",
                bankName: "First Bank",
                balance: "₦120,000.00",
                tier: "Bronze",
                status: user.status,
                createdAt: user.createdAt
            }
        };

        // Return specific account summary if available, otherwise generate one
        const accountSummary = accountSummaries[id as keyof typeof accountSummaries] || {
            accountNumber: `99${Math.floor(Math.random() * 90000000) + 10000000}`,
            accountName: user.firstName && user.lastName ? `${user.firstName} ${user.lastName}` : user.username || "User Account",
            bankName: ["Providus Bank", "Access Bank", "Zenith Bank", "GT Bank", "First Bank"][Math.floor(Math.random() * 5)],
            balance: `₦${(Math.floor(Math.random() * 500000) + 50000).toLocaleString()}.00`,
            tier: ["Bronze", "Silver", "Gold", "Platinum"][Math.floor(Math.random() * 4)],
            status: user.status,
            createdAt: user.createdAt
        };

        return HttpResponse.json(accountSummary);
    }),

    // get request to fetch user general details
    http.get('/users/:id/general-details', ({ params }) => {
        const { id } = params;
        const user = usersRecords.find(user => user.id === id);
        
        if (!user) {
            return HttpResponse.json(
                { error: 'User not found' },
                { status: 404 }
            );
        }

        // Return general details if they exist in the user record
        if (user.generalDetails) {
            return HttpResponse.json(user.generalDetails);
        }

        // Generate unique general details based on user data
        const generalDetailsMap = {
            "550e8400-e29b-41d4-a716-446655440000": {
                personalInformation: {
                    fullName: user.firstName && user.lastName ? `${user.firstName} ${user.lastName}` : "Vasquez Mitchell",
                    phoneNumber: user.phoneNumber || "+11353877918",
                    emailAddress: user.email || "vasquez.mitchell@example.com",
                    bvn: "12345678901",
                    gender: "Male",
                    maritalStatus: "Married",
                    children: "2",
                    typeOfResidence: "Own Apartment"
                },
                educationAndEmployment: {
                    levelOfEducation: "M.Sc",
                    employmentStatus: "Employed",
                    sectorOfEmployment: "Technology",
                    durationOfEmployment: "5 years",
                    officeEmail: "vasquez@techcorp.com",
                    monthlyIncome: "₦500,000.00- ₦700,000.00",
                    loanRepayment: "₦150,000.00"
                },
                socials: {
                    twitter: "@vasquez_mitchell",
                    facebook: "Vasquez Mitchell",
                    instagram: "@vasquez_mitchell"
                },
                guarantor: [
                    {
                        fullName: "Sarah Mitchell",
                        phoneNumber: "+11353877919",
                        emailAddress: "sarah.mitchell@example.com",
                        relationship: "Spouse"
                    }
                ]
            },
            "550e8400-e29b-41d4-a716-446655440001": {
                personalInformation: {
                    fullName: user.firstName && user.lastName ? `${user.firstName} ${user.lastName}` : "Jacobson Bullock",
                    phoneNumber: user.phoneNumber || "+19200115819",
                    emailAddress: user.email || "jacobson.bullock@example.com",
                    bvn: "23456789012",
                    gender: "Female",
                    maritalStatus: "Single",
                    children: "None",
                    typeOfResidence: "Rented Apartment"
                },
                educationAndEmployment: {
                    levelOfEducation: "B.Sc",
                    employmentStatus: "Self-Employed",
                    sectorOfEmployment: "Healthcare",
                    durationOfEmployment: "3 years",
                    officeEmail: "jacobson@healthcare.com",
                    monthlyIncome: "₦300,000.00- ₦450,000.00",
                    loanRepayment: "₦100,000.00"
                },
                socials: {
                    twitter: "@jacobson_bullock",
                    facebook: "Jacobson Bullock",
                    instagram: "@jacobson_bullock"
                },
                guarantor: [
                    {
                        fullName: "Michael Bullock",
                        phoneNumber: "+19200115820",
                        emailAddress: "michael.bullock@example.com",
                        relationship: "Brother"
                    }
                ]
            },
            "550e8400-e29b-41d4-a716-446655440002": {
                personalInformation: {
                    fullName: user.firstName && user.lastName ? `${user.firstName} ${user.lastName}` : "Lewis Dillard",
                    phoneNumber: user.phoneNumber || "+11456138155",
                    emailAddress: user.email || "lewis.dillard@example.com",
                    bvn: "34567890123",
                    gender: "Male",
                    maritalStatus: "Divorced",
                    children: "1",
                    typeOfResidence: "Shared Apartment"
                },
                educationAndEmployment: {
                    levelOfEducation: "HND",
                    employmentStatus: "Employed",
                    sectorOfEmployment: "Manufacturing",
                    durationOfEmployment: "1 year",
                    officeEmail: "lewis@manufacturing.com",
                    monthlyIncome: "₦150,000.00- ₦250,000.00",
                    loanRepayment: "₦50,000.00"
                },
                socials: {
                    twitter: "@lewis_dillard",
                    facebook: "Lewis Dillard",
                    instagram: "@lewis_dillard"
                },
                guarantor: [
                    {
                        fullName: "Emma Dillard",
                        phoneNumber: "+11456138156",
                        emailAddress: "emma.dillard@example.com",
                        relationship: "Sister"
                    }
                ]
            },
            "550e8400-e29b-41d4-a716-446655440003": {
                personalInformation: {
                    fullName: user.firstName && user.lastName ? `${user.firstName} ${user.lastName}` : "Queen Wilkerson",
                    phoneNumber: user.phoneNumber || "+16190132678",
                    emailAddress: user.email || "queen.wilkerson@example.com",
                    bvn: "45678901234",
                    gender: "Female",
                    maritalStatus: "Single",
                    children: "None",
                    typeOfResidence: "Parent's House"
                },
                educationAndEmployment: {
                    levelOfEducation: "Ph.D",
                    employmentStatus: "Employed",
                    sectorOfEmployment: "Education",
                    durationOfEmployment: "8 years",
                    officeEmail: "queen@university.com",
                    monthlyIncome: "₦800,000.00- ₦1,200,000.00",
                    loanRepayment: "₦200,000.00"
                },
                socials: {
                    twitter: "@queen_wilkerson",
                    facebook: "Queen Wilkerson",
                    instagram: "@queen_wilkerson"
                },
                guarantor: [
                    {
                        fullName: "King Wilkerson",
                        phoneNumber: "+16190132679",
                        emailAddress: "king.wilkerson@example.com",
                        relationship: "Father"
                    }
                ]
            },
            "550e8400-e29b-41d4-a716-446655440004": {
                personalInformation: {
                    fullName: user.firstName && user.lastName ? `${user.firstName} ${user.lastName}` : "Lillian Young",
                    phoneNumber: user.phoneNumber || "+14831442223",
                    emailAddress: user.email || "lillian.young@example.com",
                    bvn: "56789012345",
                    gender: "Female",
                    maritalStatus: "Widowed",
                    children: "3",
                    typeOfResidence: "Own House"
                },
                educationAndEmployment: {
                    levelOfEducation: "B.Sc",
                    employmentStatus: "Retired",
                    sectorOfEmployment: "Finance",
                    durationOfEmployment: "25 years",
                    officeEmail: "lillian@finance.com",
                    monthlyIncome: "₦400,000.00- ₦600,000.00",
                    loanRepayment: "₦120,000.00"
                },
                socials: {
                    twitter: "@lillian_young",
                    facebook: "Lillian Young",
                    instagram: "@lillian_young"
                },
                guarantor: [
                    {
                        fullName: "Robert Young",
                        phoneNumber: "+14831442224",
                        emailAddress: "robert.young@example.com",
                        relationship: "Son"
                    }
                ]
            }
        };

        // Return specific general details if available, otherwise generate default structure
        const generalDetails = generalDetailsMap[id as keyof typeof generalDetailsMap] || {
            personalInformation: {
                fullName: user.firstName && user.lastName ? `${user.firstName} ${user.lastName}` : user.username || "User",
                phoneNumber: user.phoneNumber || user.phoneNumber || "N/A",
                emailAddress: user.email || "N/A",
                bvn: "00000000000",
                gender: "N/A",
                maritalStatus: "N/A",
                children: "N/A",
                typeOfResidence: "N/A"
            },
            educationAndEmployment: {
                levelOfEducation: "N/A",
                employmentStatus: "N/A",
                sectorOfEmployment: "N/A",
                durationOfEmployment: "N/A",
                officeEmail: "N/A",
                monthlyIncome: "N/A",
                loanRepayment: "N/A"
            },
            socials: {
                twitter: "N/A",
                facebook: "N/A",
                instagram: "N/A"
            },
            guarantor: [
                {
                    fullName: "N/A",
                    phoneNumber: "N/A",
                    emailAddress: "N/A",
                    relationship: "N/A"
                }
            ]
        };

        return HttpResponse.json(generalDetails);
    })
];