const User = require("../models/User");

const seedAdmin = async () => {
    const adminEmail = process.env.ADMIN_EMAIL || "admin@securepay.com";
    const adminPassword = process.env.ADMIN_PASSWORD || "admin123";

    try {
        const adminExists = await User.findOne({ email: adminEmail });
        if (!adminExists) {
            await User.create({
                username: "SuperAdmin",
                email: adminEmail,
                password: adminPassword,
                role: "admin",
            });
            console.log("✅ Admin user seeded successfully");
        } else {
            console.log("⚡ Admin user already exists");
        }
    } catch (error) {
        console.error("❌ Error seeding admin:", error);
    }
};

module.exports = seedAdmin;
