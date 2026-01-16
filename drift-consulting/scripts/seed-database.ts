// Run this with: npx ts-node --compiler-options '{"module":"commonjs"}' scripts/seed-database.ts
// Or add to package.json: "seed": "ts-node scripts/seed-database.ts"

import mongoose from 'mongoose';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

// Simple inline schemas for seeding (alternative to importing models)
const ProjectSchema = new mongoose.Schema({
    title: String,
    slug: String,
    category: String,
    location: String,
    description: String,
    client: String,
    duration: String,
    value: String,
    status: String,
    featuredImage: String,
    gallery: [String],
    stats: [{ key: String, value: String }],
    challenge: String,
    approach: String,
    outcome: String,
    features: [String],
    teamSize: Number,
    partners: [String],
    startDate: Date,
    completionDate: Date,
    metaTitle: String,
    metaDescription: String,
    featured: Boolean,
    order: Number,
    published: Boolean,
}, { timestamps: true });

const Project = mongoose.models.Project || mongoose.model('Project', ProjectSchema);

const sampleProjects = [
    {
        title: 'Luxury Residential Complex - Ikoyi Waterfront',
        slug: 'luxury-residential-ikoyi-waterfront',
        category: 'residential',
        location: 'Ikoyi, Lagos, Nigeria',
        description: '120-unit high-rise residential development with premium amenities, smart home integration, and sustainable features overlooking Lagos Harbor.',
        client: 'Confidential Private Developer',
        duration: '24 months',
        value: '₦2.8B',
        status: 'completed',
        featuredImage: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00',
        gallery: [
            'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00',
            'https://images.unsplash.com/photo-1577495508048-b635879837f1',
        ],
        stats: [
            { key: 'Units', value: '120' },
            { key: 'Floors', value: '18' },
            { key: 'Area', value: '85,000 sqm' },
            { key: 'Duration', value: '24 months' },
        ],
        challenge: 'Complex waterfront site with challenging soil conditions, high water table, and strict environmental regulations. Limited site access required innovative logistics planning.',
        approach: 'Implemented advanced deep piling foundation system with 45m piles and comprehensive dewatering solution. Phased construction approach maintained site access while optimizing workflow. Integrated BIM coordination for MEP systems to prevent clashes.',
        outcome: 'Delivered 2 weeks ahead of schedule with 100% quality compliance, zero safety incidents across 500,000 man-hours, and 15% cost savings through value engineering initiatives.',
        features: [
            'Smart home automation systems',
            'Rooftop infinity pool and sky lounge',
            'Three-level underground parking (240 bays)',
            'Solar power with battery backup',
            'State-of-the-art gym and spa facilities',
            'Concierge and security services',
            'Rainwater harvesting system',
            'EDGE sustainability certification',
        ],
        teamSize: 85,
        partners: ['Julius Berger Nigeria Plc', 'Bouygues Construction'],
        startDate: new Date('2021-03-15'),
        completionDate: new Date('2023-03-01'),
        metaTitle: 'Luxury Residential Complex - Ikoyi Waterfront Project',
        metaDescription: '120-unit high-rise development delivered ahead of schedule with zero safety incidents',
        featured: true,
        order: 1,
        published: true,
    },
    {
        title: 'Five-Star Boutique Hotel - Victoria Island',
        slug: 'boutique-hotel-victoria-island',
        category: 'hospitality',
        location: 'Victoria Island, Lagos, Nigeria',
        description: 'Contemporary 85-room boutique hotel with conference facilities, rooftop restaurant, and world-class amenities catering to business and leisure travelers.',
        client: 'International Hotel Group',
        duration: '18 months',
        value: '₦1.5B',
        status: 'completed',
        featuredImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945',
        gallery: [
            'https://images.unsplash.com/photo-1566073771259-6a8506099945',
            'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b',
        ],
        stats: [
            { key: 'Rooms', value: '85' },
            { key: 'Floors', value: '12' },
            { key: 'Conference', value: '500 capacity' },
            { key: 'Rating', value: '5-Star' },
        ],
        challenge: 'Fast-track delivery timeline with complex MEP requirements for hospitality standards. Coordination of 15+ international specialty contractors while maintaining quality and schedule.',
        approach: 'Implemented advanced project scheduling using CPM and fast-tracking techniques. Weekly coordination meetings with all stakeholders. Used modular construction for bathroom pods to accelerate installation. Pre-fabricated MEP risers for consistency.',
        outcome: 'Achieved practical completion on schedule. Hotel opened for business with immediate 5-star rating. Client awarded additional projects based on delivery excellence.',
        features: [
            'Executive suites with smart controls',
            'Rooftop infinity pool and bar',
            'Full-service spa and wellness center',
            'Three restaurants and lounges',
            'Business center and meeting rooms',
            'Ballroom for 500 guests',
            'Underground parking for 120 vehicles',
            'Advanced security and access control',
        ],
        teamSize: 120,
        partners: ['Marriott International', 'Hilton Worldwide'],
        startDate: new Date('2022-01-10'),
        completionDate: new Date('2023-07-10'),
        metaTitle: 'Five-Star Boutique Hotel Project - Victoria Island',
        metaDescription: '85-room luxury hotel delivered on schedule with international hospitality standards',
        featured: true,
        order: 2,
        published: true,
    },
    {
        title: 'Educational Campus Expansion - University of Lagos',
        slug: 'educational-campus-unilag',
        category: 'institutional',
        location: 'Akoka, Lagos, Nigeria',
        description: 'Multi-phase university campus expansion including lecture halls, laboratories, student housing, and recreational facilities for 5,000+ students.',
        client: 'University of Lagos',
        duration: '36 months',
        value: '₦4.2B',
        status: 'completed',
        featuredImage: 'https://images.unsplash.com/photo-1562774053-701939374585',
        gallery: [
            'https://images.unsplash.com/photo-1562774053-701939374585',
            'https://images.unsplash.com/photo-1541339907198-e08756dedf3f',
        ],
        stats: [
            { key: 'Buildings', value: '8' },
            { key: 'Capacity', value: '5,000+ students' },
            { key: 'Area', value: '125,000 sqm' },
            { key: 'Phases', value: '3' },
        ],
        challenge: 'Large-scale multi-phase project requiring continuous coordination with active university operations. Managing multiple concurrent activities without disrupting academic calendar.',
        approach: 'Detailed phasing plan synchronized with university calendar. Night and weekend work for critical tie-ins. Extensive stakeholder engagement and communication protocols. Modular construction techniques for student housing blocks.',
        outcome: 'All three phases completed successfully with minimal disruption to campus activities. Project featured in national education development reports. Received commendation from Federal Ministry of Education.',
        features: [
            'Modern lecture halls with AV systems',
            'Research laboratories (science & engineering)',
            'Student housing for 2,000 residents',
            'Central library and learning commons',
            'Sports complex and gymnasium',
            'Cafeterias and dining halls',
            'IT infrastructure and fiber optics',
            'Renewable energy integration',
        ],
        teamSize: 200,
        partners: ['Federal Ministry of Education', 'TETFund'],
        startDate: new Date('2020-09-01'),
        completionDate: new Date('2023-09-01'),
        metaTitle: 'University Campus Expansion Project - UNILAG',
        metaDescription: 'Multi-phase educational facility expansion for 5,000+ students completed successfully',
        featured: true,
        order: 3,
        published: true,
    },
    {
        title: 'Government Office Complex Renovation - Abuja',
        slug: 'government-office-abuja',
        category: 'government',
        location: 'Central Business District, Abuja, Nigeria',
        description: 'Complete renovation and modernization of federal government office complex including structural upgrades, MEP systems replacement, and accessibility improvements.',
        client: 'Federal Capital Development Authority',
        duration: '20 months',
        value: '₦850M',
        status: 'completed',
        featuredImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab',
        gallery: [
            'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab',
            'https://images.unsplash.com/photo-1497366216548-37526070297c',
        ],
        stats: [
            { key: 'Office Space', value: '45,000 sqm' },
            { key: 'Capacity', value: '800+ staff' },
            { key: 'Compliance', value: '100%' },
            { key: 'Sustainability', value: 'EDGE Certified' },
        ],
        challenge: 'Working within occupied government facility with high security requirements. Complex regulatory approvals and strict compliance with federal building codes.',
        approach: 'Phased renovation approach allowing continued occupancy. Close coordination with security agencies. Comprehensive compliance documentation and weekly progress reporting to stakeholders. After-hours work for critical systems.',
        outcome: 'Successfully completed with full regulatory compliance and security clearances. Achieved EDGE sustainability certification. Project became model for other federal building renovations nationwide.',
        features: [
            'Structural reinforcement and seismic upgrades',
            'Complete MEP systems replacement',
            'Energy-efficient HVAC and lighting',
            'Advanced security and access control',
            'Fiber optic network infrastructure',
            'Disability access improvements',
            'Solar power installation (200kW)',
            'Rainwater harvesting and treatment',
        ],
        teamSize: 65,
        partners: ['FCDA', 'Federal Ministry of Works'],
        startDate: new Date('2021-06-01'),
        completionDate: new Date('2023-02-01'),
        metaTitle: 'Government Office Complex Renovation - Abuja',
        metaDescription: 'Federal building modernization with 100% compliance and sustainability certification',
        featured: true,
        order: 4,
        published: true,
    },
    {
        title: 'Duplex Estate Development - Lekki Phase 1',
        slug: 'duplex-estate-lekki',
        category: 'residential',
        location: 'Lekki Phase 1, Lagos, Nigeria',
        description: 'Gated community featuring 40 luxury 4-bedroom duplexes with modern amenities, recreational facilities, and 24/7 security in prime Lekki location.',
        client: 'Private Real Estate Developer',
        duration: '20 months',
        value: '₦1.2B',
        status: 'completed',
        featuredImage: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811',
        gallery: [
            'https://images.unsplash.com/photo-1613490493576-7fde63acd811',
            'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9',
        ],
        stats: [
            { key: 'Units', value: '40 duplexes' },
            { key: 'Bedrooms', value: '4 per unit' },
            { key: 'Estate', value: '8 hectares' },
            { key: 'Completion', value: '100%' },
        ],
        challenge: 'Standardized construction across 40 units while maintaining quality and schedule. Managing bulk material procurement and coordinating multiple trade contractors efficiently.',
        approach: 'Implemented repetitive construction methodology with standardized processes. Bulk procurement strategy for cost savings. Weekly production targets and progress tracking. Quality control checkpoints at each construction stage.',
        outcome: 'All 40 units delivered on schedule. 95% pre-sold before completion. Zero defects at handover. Developer awarded additional phase based on quality delivery.',
        features: [
            'Contemporary architectural design',
            'Spacious 4-bedroom layouts',
            'Fully fitted kitchens',
            'Master bedrooms with en-suite',
            'Backup power generation',
            'Perimeter security and CCTV',
            'Central recreational facilities',
            'Paved internal roads and drainage',
        ],
        teamSize: 95,
        partners: ['Local Building Materials Suppliers'],
        startDate: new Date('2022-03-01'),
        completionDate: new Date('2023-11-01'),
        metaTitle: 'Luxury Duplex Estate - Lekki Phase 1',
        metaDescription: '40-unit gated community delivered with zero defects and 95% pre-sales',
        featured: false,
        order: 5,
        published: true,
    },
    {
        title: 'UK Government Infrastructure - Westminster Renovation',
        slug: 'uk-government-westminster',
        category: 'government',
        location: 'Westminster, London, UK',
        description: 'Heritage building renovation for UK government facility including structural conservation, modern systems integration, and accessibility compliance.',
        client: 'UK Government Property Agency',
        duration: '30 months',
        value: '£38M',
        status: 'completed',
        featuredImage: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad',
        gallery: [
            'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad',
            'https://images.unsplash.com/photo-1478860409698-8707f313ee8b',
        ],
        stats: [
            { key: 'Heritage', value: 'Grade II Listed' },
            { key: 'Area', value: '35,000 sqm' },
            { key: 'Compliance', value: '100%' },
            { key: 'Duration', value: '30 months' },
        ],
        challenge: 'Balancing heritage conservation requirements with modern building standards. Working within strict UK building regulations and heritage guidelines. Coordination with Historic England and multiple regulatory bodies.',
        approach: 'Specialist heritage consultants engaged for conservation work. Non-invasive modern systems integration. Detailed documentation and approvals process. Traditional craftsmanship combined with modern technology.',
        outcome: 'Successfully preserved heritage character while achieving modern performance standards. Commended by Historic England for exemplary conservation work. Featured in UK government best practice publications.',
        features: [
            'Heritage facade restoration',
            'Structural stabilization and repairs',
            'Modern MEP systems (hidden integration)',
            'Energy efficiency improvements',
            'Disability access compliance',
            'Security and surveillance upgrades',
            'IT infrastructure modernization',
            'Sustainable materials and practices',
        ],
        teamSize: 75,
        partners: ['Historic England', 'UK Government Property Agency'],
        startDate: new Date('2019-06-01'),
        completionDate: new Date('2021-12-01'),
        metaTitle: 'UK Government Heritage Building Renovation - Westminster',
        metaDescription: 'Grade II listed building renovation with heritage conservation and modern standards',
        featured: true,
        order: 6,
        published: true,
    },
];

async function seedDatabase() {
    try {
        console.log('🌱 Starting database seeding...');

        // Connect to MongoDB
        if (!process.env.MONGODB_URI) {
            throw new Error('MONGODB_URI not found in environment variables');
        }

        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Connected to MongoDB');

        // Clear existing projects
        const deletedCount = await Project.deleteMany({});
        console.log(`🗑️  Deleted ${deletedCount.deletedCount} existing projects`);

        // Insert sample projects
        const insertedProjects = await Project.insertMany(sampleProjects);
        console.log(`✅ Inserted ${insertedProjects.length} sample projects`);

        // Display summary
        console.log('\n📊 Database Seeding Summary:');
        console.log('─────────────────────────────');

        const categoryCounts = await Project.aggregate([
            { $group: { _id: '$category', count: { $sum: 1 } } },
            { $sort: { _id: 1 } }
        ]);

        categoryCounts.forEach(({ _id, count }) => {
            console.log(`   ${_id}: ${count} projects`);
        });

        console.log(`   Total: ${insertedProjects.length} projects`);
        console.log('─────────────────────────────\n');

        console.log('🎉 Database seeding completed successfully!');
        console.log('\n💡 Next steps:');
        console.log('   1. Start your dev server: npm run dev');
        console.log('   2. Visit http://localhost:3000');
        console.log('   3. Check portfolio section to see projects\n');

        await mongoose.connection.close();
        process.exit(0);

    } catch (error) {
        console.error('❌ Database seeding failed:', error);
        await mongoose.connection.close();
        process.exit(1);
    }
}

// Run seeding
seedDatabase();