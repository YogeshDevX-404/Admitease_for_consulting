require('dotenv').config();

const mongoose = require('mongoose');

const College = require('./models/College');
const Admin = require('./models/Admin');

/* ===============================
   ENV CHECK
================================= */

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error('❌ MONGO_URI not found in .env file');
  process.exit(1);
}

/* ===============================
   SAMPLE COLLEGES DATA
================================= */

const colleges = [
  {
    name: 'Babu Banarasi Das University',
    slug: 'babu-banarasi-das-university',
    location: 'Faizabad Road, Lucknow',
    description:
      'BBDU is one of the premier private universities in Lucknow offering world-class education in Engineering, Management, Law and Architecture.',
    courses: ['B.Tech', 'MBA', 'BCA', 'MCA', 'LLB', 'BBA'],
    feesRange: { min: 80000, max: 200000, display: '₹80K – ₹2L / year' },
    affiliation: 'UGC Approved Private University',
    images: ['https://images.unsplash.com/photo-1562774053-701939374585?w=800'],
    featured: true,
    established: 2010,
    rating: 4.2,
  },
  {
    name: 'Integral University',
    slug: 'integral-university',
    location: 'Kursi Road, Lucknow',
    description:
      'Integral University is a UGC-recognised university offering Engineering, Medical and Management programmes.',
    courses: ['B.Tech', 'MBBS', 'MBA', 'BBA', 'MCA'],
    feesRange: { min: 60000, max: 250000, display: '₹60K – ₹2.5L / year' },
    affiliation: 'UGC Recognised Private University',
    images: ['https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=800'],
    featured: true,
    established: 2004,
    rating: 4.1,
  },
  {
    name: 'Lucknow University',
    slug: 'lucknow-university',
    location: 'University Road, Lucknow',
    description:
      'University of Lucknow is one of the oldest and most reputed universities offering UG and PG programmes.',
    courses: ['B.A', 'B.Sc', 'B.Com', 'LLB', 'MBA'],
    feesRange: { min: 10000, max: 80000, display: '₹10K – ₹80K / year' },
    affiliation: 'State University – UGC Approved',
    images: ['https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800'],
    featured: true,
    established: 1920,
    rating: 4.4,
  },
];

/* ===============================
   SEED FUNCTION
================================= */

async function seed() {
  try {
    console.log('⏳ Connecting to MongoDB...');
    await mongoose.connect(MONGO_URI);
    console.log('✅ MongoDB Connected');

    /* Clear Existing Data */
    await College.deleteMany({});
    await Admin.deleteMany({});
    console.log('🗑 Old data cleared');

    /* Insert Colleges */
    await College.insertMany(colleges);
    console.log(`✅ Seeded ${colleges.length} colleges`);

    /* Create Admin (⚠️ Plain password — model will hash it) */
    const admin = new Admin({
      email: process.env.ADMIN_EMAIL || 'admin@admitease.in',
      password: process.env.ADMIN_PASSWORD || 'Admin@123',
    });

    await admin.save();

    console.log(`✅ Admin Created → ${admin.email}`);
    console.log(`🔐 Password → ${process.env.ADMIN_PASSWORD || 'Admin@123'}`);

    await mongoose.disconnect();
    console.log('🔌 MongoDB Disconnected');
    console.log('🎉 Seeding Completed Successfully');

    process.exit(0);
  } catch (err) {
    console.error('❌ Seed error:', err.message);
    process.exit(1);
  }
}

seed();