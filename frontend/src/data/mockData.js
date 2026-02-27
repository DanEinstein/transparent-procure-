// Mock data for development - mirrors the expected backend API data shapes
// See API_CONTRACTS.md for full documentation of expected formats

export const mockUser = {
    id: 'usr_001',
    userId: 'OVR-2024-001',
    email: 'admin@transparentprocure.go.ke',
    name: 'James Ochieng',
    role: 'Senior Oversight Officer',
    permissions: ['dashboard', 'feed', 'registry', 'fraud', 'audit', 'reports', 'admin'],
    department: 'Public Procurement Regulatory Authority',
    createdAt: '2023-01-15T08:00:00.000Z',
    lastLogin: '2024-12-20T09:30:00.000Z'
};

export const mockDashboardStats = {
    avgBidDeviation: 14.2,
    avgBidDeviationChange: 2.1,
    activeTenders: 1284,
    activeTendersChange: -5.2,
    flaggedAnomalies: 42,
    flaggedAnomaliesChange: 12,
    totalContractors: 2450,
    contractorsBlacklisted: 12,
    activeProjects: 892,
    projectsCompleted: 756
};

export const mockContractorScores = [
    {
        id: 'contr_001',
        name: 'Safari Construction Co.',
        licenseNumber: 'NCA-A1',
        score: 88,
        category: 'Building',
        region: 'Nairobi',
        projectsCompleted: 45,
        avgCompletionTime: '14 months',
        complianceRating: 92,
        lastProject: 'Thika Road Expansion Phase 3',
        status: 'active'
    },
    {
        id: 'contr_002',
        name: 'Kenya Universal Traders',
        licenseNumber: 'NCA-B2',
        score: 76,
        category: 'Supplies',
        region: 'Mombasa',
        projectsCompleted: 32,
        avgCompletionTime: '8 months',
        complianceRating: 78,
        lastProject: 'Medical Equipment Supply - Coast General',
        status: 'active'
    },
    {
        id: 'contr_003',
        name: 'Rift Valley Contractors',
        licenseNumber: 'NCA-C3',
        score: 55,
        category: 'Roads',
        region: 'Nakuru',
        projectsCompleted: 18,
        avgCompletionTime: '22 months',
        complianceRating: 60,
        lastProject: 'Nakuru-Naivasha Water Pipeline',
        status: 'under_review'
    },
    {
        id: 'contr_004',
        name: 'Nairobi Logistics Ltd',
        licenseNumber: 'NCA-D4',
        score: 28,
        category: 'Transport',
        region: 'Nairobi',
        projectsCompleted: 5,
        avgCompletionTime: '6 months',
        complianceRating: 35,
        lastProject: 'County Fleet Management',
        status: 'flagged'
    }
];

export const mockPriceAnomalies = [
    {
        id: 'anom_001',
        tenderId: '#TR-2023-0941',
        itemCategory: 'Road Construction Materials',
        quotedPrice: 12500000,
        marketAverage: 4200000,
        variance: 197,
        unit: 'KES',
        tenderDescription: 'Supply of bitumen for Thika Superhighway maintenance',
        contractor: 'Avenue Construction Ltd',
        submittedDate: '2024-11-15T10:00:00.000Z',
        status: 'flagged'
    },
    {
        id: 'anom_002',
        tenderId: '#TR-2023-1108',
        itemCategory: 'IT Equipment',
        quotedPrice: 8800000,
        marketAverage: 1950000,
        variance: 351,
        unit: 'KES',
        tenderDescription: 'Laptop procurement for Ministry of Education',
        contractor: 'FastTrack IT Solutions',
        submittedDate: '2024-10-22T14:30:00.000Z',
        status: 'under_investigation'
    },
    {
        id: 'anom_003',
        tenderId: '#TR-2024-0012',
        itemCategory: 'Medical Supplies',
        quotedPrice: 45200000,
        marketAverage: 14800000,
        variance: 205,
        unit: 'KES',
        tenderDescription: 'PPE Supply for County Hospitals',
        contractor: 'Global Supplies Kenya',
        submittedDate: '2024-12-01T09:15:00.000Z',
        status: 'flagged'
    }
];

export const mockWardFeed = [
    {
        id: 'ward_feed_001',
        ward: 'Westlands Ward',
        eventType: 'tender_awarded',
        title: 'New Tender Awarded — KES 12M Road Repair',
        description: 'Tender for Westlands road repair awarded to Safari Construction Co.',
        amount: 12000000,
        timestamp: '2024-12-20T08:30:00.000Z',
        priority: 'normal',
        color: 'primary'
    },
    {
        id: 'ward_feed_002',
        ward: 'Kibra Ward',
        eventType: 'anomaly_detected',
        title: 'Price Anomaly Detected — Medical Supplies',
        description: 'Quoted price 312% above market average for syringes.',
        amount: 4500000,
        timestamp: '2024-12-20T07:15:00.000Z',
        priority: 'high',
        color: 'red'
    },
    {
        id: 'ward_feed_003',
        ward: 'Langata Ward',
        eventType: 'project_update',
        title: 'School Construction Phase 2 Complete',
        description: 'Langata Primary expansion completed on schedule.',
        amount: 8200000,
        timestamp: '2024-12-19T16:45:00.000Z',
        priority: 'normal',
        color: 'primary'
    },
    {
        id: 'ward_feed_004',
        ward: 'Embakasi Ward',
        eventType: 'compliance_alert',
        title: 'Contractor License Expiry Warning',
        description: 'Beta Construction license expires in 14 days.',
        amount: null,
        timestamp: '2024-12-19T14:20:00.000Z',
        priority: 'medium',
        color: 'primary'
    },
    {
        id: 'ward_feed_005',
        ward: 'Kasarani Ward',
        eventType: 'bid_rigging_alert',
        title: 'Potential Bid Rigging Alert — Cluster Detected',
        description: '3 bids from same IP block detected on water tender.',
        amount: 15000000,
        timestamp: '2024-12-19T11:00:00.000Z',
        priority: 'critical',
        color: 'red'
    }
];

export const mockFeedPosts = [
    {
        id: 'post_001',
        author: {
            id: 'usr_010',
            name: 'Alice Wanjiru',
            avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB83OIdIS5e1DidqB-RKjBzGCOqOqxuuwdkHCUpGG1XbR2P-xtRyALZeOyqNmr7hkPKGo6WaPe5ydtx7WngH4uGOkIN5B0O2YCKJ1TicmuCXCdK1988FW16N-7a7e8_LlI84nCPqrN6pW4zUyH-OSizelTadzKvrCj4gwzPP_WbDvMGNmku7o7ifp3kC1OR1A6w4hjmmR49sXX2_Ce6he_VXGpyZnGU-38q7sSGCJJtxT3sJvNgkYlxP73yz4smRwoxf0YZU-6rXV4',
            verified: true
        },
        ward: 'Nairobi Central Ward',
        title: 'Kenyatta Avenue Drainage System — Progress Update',
        content: 'Phase 1 of the Kenyatta Avenue drainage upgrade is now 70% complete. The contractor has addressed previous quality concerns raised by our community audit team. New concrete reinforcements meet the Kenya Bureau of Standards specifications.',
        images: [
            'https://lh3.googleusercontent.com/aida-public/AB6AXuBBohPvxySYpEzIvuICxgsRk6fMmPfDjo41Mg6gotitmXNT0_m2zD7WU5V4whykAuKW2JIN-dlcKy-71iupj6azBY5YSMsr0K7oLrZj53yUcn3-RYfYwHO1bvVi-sf4a8DLohEmnX4XeLmd7uzgYPqM-eJHyJ27j-pRS1Mb6MQas5_Mo4Zi820RbDRZrXehNlZV4mDBoxvGJERCs2_JNcWslJdyHGDtmhxt8qmk425ZeIZLhK-UpNOK3DLcCiE6oLuo6O77h1RCy1U'
        ],
        status: 'on_schedule',
        likes: 24,
        comments: 8,
        timestamp: '2024-12-18T10:30:00.000Z',
        referenceId: 'PRJ-2024-NBI-0042',
        geoTag: {
            lat: -1.286389,
            lng: 36.817223,
            location: 'Kenyatta Avenue, Nairobi CBD'
        }
    },
    {
        id: 'post_002',
        author: {
            id: 'usr_011',
            name: 'Omondi Otieno',
            avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBqVY10VwpkBkeYC68hQ5ozrphQPnnZL3FHmi7WblmMWny8aczByohBizl3RjyPy10x3CGSbL5cY5M3zUzsAkox63qHjs1bm_g5CzfpgHiGWH4bsUQ3K-QaD05yCkJW_xmQALB_SYTtdSkXZYVCu2hB_8FApQCidmWmDoXEKZ9xNJ8A82rL_qw2RY8aTALFMh-AWjgUqYrVq4Q4a4zK2b_u0AFSy88FH-nV-ILqnWEad77P2EqVww_lsb_EMAOS0--9U1nAwllTz4I',
            verified: true
        },
        ward: 'Nairobi Central Ward',
        title: 'Public Toilet Construction — Quality Concern Raised',
        content: 'The public toilet facility near City Market shows signs of substandard materials. Walls built with single-layer bricks instead of the specified double-layer construction. Photographic evidence attached. Requesting immediate inspection by the county engineer.',
        images: [
            'https://lh3.googleusercontent.com/aida-public/AB6AXuD3V4LqUPkzD9fFap9XVrHK62sJ_0StDUthAw2P75vKsNS-GrJgA9kiGEDfOkUvJiHoSi8biHrx7bGKI4sOYiD3pxDA3V305v0iBcYku2k-2Snfqa1RTlmXnmYWAJnCkHcwgu4ET-zoP55DsYc09ae7A2ZALv9pZUhOeP_MiuZAadVz_v-x5X_roK9SzkV0FI1tVi0_2PnugUudMUy_02xyvePg52bPCedYSKgTWZRLYfFX8dazhYlgygfFUy_qv1mvYtEEDw7Sx2w'
        ],
        status: 'delay_reported',
        likes: 42,
        comments: 15,
        timestamp: '2024-12-17T14:00:00.000Z',
        referenceId: 'PRJ-2024-NBI-0038',
        geoTag: {
            lat: -1.283333,
            lng: 36.826389,
            location: 'City Market, Nairobi CBD'
        }
    },
    {
        id: 'post_003',
        author: {
            id: 'usr_012',
            name: 'Sarah Kimani',
            avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCKYvEE6N2eATxb4kvI9Jt-bFpRQeS-F2gXd9X5iOIvdXNl8awsWosPZeQmBYdVqG4Yl63hwL70mUvjUBShMczw8NuIYT-rCDpfvho8t4bXS71Q8A7x0fr0uoSktOYAZBgGqaDQurFiVuTbeCunVP2VkCSnJuTT6IUzzPqV8ayWksOIY_SPCP7NnHufDae5nZKREnfg5Cg6m3QxbcHj5Jo8ZxR1mPFb7Gp6u7vdj2I6ozdcZUEcEFFJ0QTH95U71_PFdN3Ss1PKgSw',
            verified: false
        },
        ward: 'Westlands',
        title: 'Waiyaki Way Streetlights Installation — On Track',
        content: 'New LED streetlights being installed along Waiyaki Way near Sarit Centre. Work started on time and contractor appears to be using quality materials. Community is pleased with the progress so far.',
        images: [],
        status: 'on_schedule',
        likes: 18,
        comments: 4,
        timestamp: '2024-12-16T09:00:00.000Z',
        referenceId: 'PRJ-2024-NBI-0051',
        geoTag: {
            lat: -1.264167,
            lng: 36.805833,
            location: 'Waiyaki Way, Westlands'
        }
    }
];

export const mockContractors = [
    {
        id: 'contr_001',
        name: 'Safari Construction Co.',
        kraPin: 'A002394857X',
        licenseNumber: 'NCA-A1-2018-0045',
        registrationDate: '2018-03-05T00:00:00.000Z',
        category: 'Building',
        subcategories: ['Commercial', 'Residential', 'Industrial'],
        region: 'Nairobi',
        contactPerson: 'John Kamau',
        contactEmail: 'john@safariconstruction.co.ke',
        contactPhone: '+254712345678',
        address: 'P.O. Box 12345-00100, Nairobi',
        rating: 4.2,
        projectsCompleted: 45,
        activeProjects: 3,
        blacklisted: false,
        blacklistReason: null,
        complianceScore: 92,
        financialCapacity: 500000000,
        lastActivity: '2024-12-15T10:30:00.000Z',
        status: 'active'
    },
    {
        id: 'contr_002',
        name: 'Nairobi Logistics Ltd',
        kraPin: 'P051029384Z',
        licenseNumber: 'NCA-D4-2024-0112',
        registrationDate: '2024-01-12T00:00:00.000Z',
        category: 'Transport',
        subcategories: ['Logistics', 'Fleet Management'],
        region: 'Nairobi',
        contactPerson: 'Peter Mwangi',
        contactEmail: 'info@nairobilogistics.co.ke',
        contactPhone: '+254723456789',
        address: 'P.O. Box 24151-00100, Nairobi',
        rating: 1.5,
        projectsCompleted: 2,
        activeProjects: 1,
        blacklisted: false,
        blacklistReason: null,
        complianceScore: 28,
        financialCapacity: 15000000,
        lastActivity: '2024-12-18T14:00:00.000Z',
        status: 'flagged'
    },
    {
        id: 'contr_003',
        name: 'Kenya Universal Traders',
        kraPin: 'P098765432W',
        licenseNumber: 'NCA-B2-2021-0078',
        registrationDate: '2021-10-14T00:00:00.000Z',
        category: 'Supplies',
        subcategories: ['Medical', 'Office', 'Industrial'],
        region: 'Mombasa',
        contactPerson: 'Amina Hassan',
        contactEmail: 'amina@kutraders.co.ke',
        contactPhone: '+254734567890',
        address: 'P.O. Box 5678-80100, Mombasa',
        rating: 3.8,
        projectsCompleted: 32,
        activeProjects: 5,
        blacklisted: false,
        blacklistReason: null,
        complianceScore: 76,
        financialCapacity: 200000000,
        lastActivity: '2024-12-10T09:00:00.000Z',
        status: 'active'
    },
    {
        id: 'contr_004',
        name: 'Summit Elite Ventures',
        kraPin: 'C019283746B',
        licenseNumber: 'NCA-C3-2020-0056',
        registrationDate: '2020-05-20T00:00:00.000Z',
        category: 'Consulting',
        subcategories: ['Engineering', 'Management'],
        region: 'Nairobi',
        contactPerson: 'David Odhiambo',
        contactEmail: 'david@summitelite.co.ke',
        contactPhone: '+254745678901',
        address: 'P.O. Box 9999-00200, Nairobi',
        rating: 0.8,
        projectsCompleted: 8,
        activeProjects: 0,
        blacklisted: true,
        blacklistReason: 'Falsification of financial records and procurement fraud',
        complianceScore: 12,
        financialCapacity: 50000000,
        lastActivity: '2024-06-01T00:00:00.000Z',
        status: 'blacklisted'
    },
    {
        id: 'contr_005',
        name: 'Tana River Kibarua Group',
        kraPin: 'P011223344M',
        licenseNumber: 'NCA-E5-2023-0098',
        registrationDate: '2023-11-30T00:00:00.000Z',
        category: 'Water',
        subcategories: ['Piping', 'Sanitation'],
        region: 'Tana River',
        contactPerson: 'Hassan Mohamed',
        contactEmail: 'hassan@tanariver.co.ke',
        contactPhone: '+254756789012',
        address: 'P.O. Box 112-70101, Garsen',
        rating: 2.3,
        projectsCompleted: 4,
        activeProjects: 2,
        blacklisted: false,
        blacklistReason: null,
        complianceScore: 45,
        financialCapacity: 30000000,
        lastActivity: '2024-12-05T11:30:00.000Z',
        status: 'under_review'
    }
];

export const mockFraudAlerts = [
    {
        id: 'fraud_001',
        title: 'Bid Rigging Network Detected — Construction Cluster',
        description: 'Multiple bids from different KRA PINs originating from the same IP block and postal address detected on infrastructure tenders.',
        severity: 'high',
        status: 'open',
        detectedBy: 'AI Pattern Detection',
        detectedAt: '2024-12-18T08:00:00.000Z',
        affectedTenders: ['#TR-2023-0941', '#TR-2023-1108'],
        affectedContractors: ['Avenue Construction Ltd', 'FastTrack IT Solutions'],
        evidence: ['Shared postal address', 'Same IP block', 'Overlapping directors'],
        assignedTo: 'Senior Auditor Team A',
        resolutionNotes: null,
        resolvedAt: null
    },
    {
        id: 'fraud_002',
        title: 'Price Inflation Alert — IT Equipment Tender',
        description: 'Quoted price for laptop procurement exceeds market average by 451%. Vendor has limited track record.',
        severity: 'high',
        status: 'investigating',
        detectedBy: 'Price Monitoring System',
        detectedAt: '2024-12-16T14:30:00.000Z',
        affectedTenders: ['#TR-2023-1108'],
        affectedContractors: ['FastTrack IT Solutions'],
        evidence: ['Price variance over 400%', 'New vendor registration', 'No prior government contracts'],
        assignedTo: 'Fraud Investigation Unit',
        resolutionNotes: null,
        resolvedAt: null
    },
    {
        id: 'fraud_003',
        title: 'Conflict of Interest — County Official Linked to Bidder',
        description: 'County procurement officer identified as a director in one of the bidding entities for a water supply tender.',
        severity: 'medium',
        status: 'open',
        detectedBy: 'Identity Linkage Analysis',
        detectedAt: '2024-12-14T11:00:00.000Z',
        affectedTenders: ['#TR-2024-0012'],
        affectedContractors: ['Global Supplies Kenya'],
        evidence: ['Shared directorship', 'KRA registration overlap'],
        assignedTo: 'Ethics Review Board',
        resolutionNotes: null,
        resolvedAt: null
    },
    {
        id: 'fraud_004',
        title: 'Counterfeit Compliance Certificate Submitted',
        description: 'Submitted NCA compliance certificate serial number does not match PPRA database records.',
        severity: 'low',
        status: 'resolved',
        detectedBy: 'Document Verification System',
        detectedAt: '2024-12-10T09:00:00.000Z',
        affectedTenders: ['#TR-2023-0882'],
        affectedContractors: ['Apex Logistics'],
        evidence: ['Mismatched serial number', 'Font inconsistencies'],
        assignedTo: 'Compliance Unit',
        resolutionNotes: 'Contractor warned and certificate resubmitted with valid documentation.',
        resolvedAt: '2024-12-12T16:00:00.000Z'
    }
];

export const mockAudits = [
    {
        id: 'audit_001',
        title: 'Q4 2024 Infrastructure Procurement Review',
        description: 'Comprehensive audit of all infrastructure procurement above KES 50M for Q4 2024.',
        type: 'routine',
        status: 'in_progress',
        startDate: '2024-12-01T00:00:00.000Z',
        endDate: '2025-01-31T00:00:00.000Z',
        assignedTo: ['James Ochieng', 'Alice Wanjiru'],
        findings: ['3 tenders with irregular pricing detected', 'Missing documentation in 2 cases'],
        recommendations: ['Mandatory price comparison for all tenders above 10M', 'Automated document verification'],
        reportUrl: null,
        createdAt: '2024-11-25T10:00:00.000Z',
        completedAt: null
    },
    {
        id: 'audit_002',
        title: 'Special Investigation — Avenue Construction Ltd',
        description: 'Targeted audit of Avenue Construction Ltd following bid rigging alerts.',
        type: 'special',
        status: 'in_progress',
        startDate: '2024-12-15T00:00:00.000Z',
        endDate: '2025-02-28T00:00:00.000Z',
        assignedTo: ['Fraud Investigation Unit'],
        findings: [],
        recommendations: [],
        reportUrl: null,
        createdAt: '2024-12-14T08:00:00.000Z',
        completedAt: null
    },
    {
        id: 'audit_003',
        title: 'Annual Compliance Audit — Nairobi County',
        description: 'Year-end compliance review of all Nairobi County procurement activities.',
        type: 'compliance',
        status: 'completed',
        startDate: '2024-10-01T00:00:00.000Z',
        endDate: '2024-11-30T00:00:00.000Z',
        assignedTo: ['Senior Audit Team'],
        findings: ['92.4% compliance rate achieved', '8 entities flagged for follow-up'],
        recommendations: ['Enhance digital tracking for smaller tenders', 'Monthly compliance reports'],
        reportUrl: '/reports/audit_003_report.pdf',
        createdAt: '2024-09-15T10:00:00.000Z',
        completedAt: '2024-12-05T14:00:00.000Z'
    }
];

export const mockReports = [
    {
        id: 'report_001',
        title: 'Blacklisted Contractors Summary Report — Q4 2024',
        description: 'Comprehensive list of all contractors suspended or blacklisted during Q4 2024.',
        type: 'summary',
        category: 'blacklist',
        period: 'Q4 2024',
        generatedAt: '2024-12-20T09:42:00.000Z',
        generatedBy: 'System',
        status: 'published',
        fileUrl: '/reports/blacklist_q4_2024.pdf',
        size: '2.4 MB',
        pageCount: 45,
        recipients: ['PPRA Board', 'County Procurement Officers'],
        accessLevel: 'restricted'
    },
    {
        id: 'report_002',
        title: 'Fraud Detection Monthly Report — December 2024',
        description: 'Monthly overview of all fraud detection activities and investigations.',
        type: 'monthly',
        category: 'fraud',
        period: 'December 2024',
        generatedAt: '2024-12-19T15:00:00.000Z',
        generatedBy: 'Fraud Investigation Unit',
        status: 'draft',
        fileUrl: null,
        size: '1.8 MB',
        pageCount: 32,
        recipients: ['PPRA Director'],
        accessLevel: 'confidential'
    },
    {
        id: 'report_003',
        title: 'Contractor Compliance Annual Report — 2024',
        description: 'Annual compliance assessment for all registered contractors.',
        type: 'annual',
        category: 'compliance',
        period: '2024',
        generatedAt: '2024-12-15T10:00:00.000Z',
        generatedBy: 'Compliance Unit',
        status: 'published',
        fileUrl: '/reports/compliance_annual_2024.pdf',
        size: '5.1 MB',
        pageCount: 112,
        recipients: ['All County Procurement Officers', 'PPRA Board'],
        accessLevel: 'public'
    }
];

export const mockWards = [
    { id: 'ward_001', name: 'Nairobi Central Ward', county: 'Nairobi', code: 'NBI-001' },
    { id: 'ward_002', name: 'Westlands', county: 'Nairobi', code: 'NBI-002' },
    { id: 'ward_003', name: 'Langata', county: 'Nairobi', code: 'NBI-003' },
    { id: 'ward_004', name: 'Kibra', county: 'Nairobi', code: 'NBI-004' },
    { id: 'ward_005', name: 'Embakasi', county: 'Nairobi', code: 'NBI-005' },
    { id: 'ward_006', name: 'Kasarani', county: 'Nairobi', code: 'NBI-006' },
    { id: 'ward_007', name: 'Changamwe', county: 'Mombasa', code: 'MSA-001' },
    { id: 'ward_008', name: 'Kisauni', county: 'Mombasa', code: 'MSA-002' },
    { id: 'ward_009', name: 'Milimani', county: 'Kisumu', code: 'KSM-001' },
    { id: 'ward_010', name: 'Bondeni', county: 'Nakuru', code: 'NKR-001' }
];

export const mockCounties = [
    { id: 'county_001', name: 'Nairobi', code: '047' },
    { id: 'county_002', name: 'Mombasa', code: '001' },
    { id: 'county_003', name: 'Kisumu', code: '042' },
    { id: 'county_004', name: 'Nakuru', code: '032' },
    { id: 'county_005', name: 'Kiambu', code: '022' },
    { id: 'county_006', name: 'Machakos', code: '016' },
    { id: 'county_007', name: 'Uasin Gishu', code: '027' },
    { id: 'county_008', name: 'Turkana', code: '023' },
    { id: 'county_009', name: 'Wajir', code: '008' },
    { id: 'county_010', name: 'Garissa', code: '007' }
];
