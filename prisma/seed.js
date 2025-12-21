import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('Seeding database...');

    const products = [
        {
            name: 'Drepto MenstroHerb Sheet',
            description: 'For relief from cramps during those difficult days. 12 Hours, Ultimate Comfort, Instant Relief, 100% Herbal.',
            detailedDescription: 'The Drepto MenstroHerb Sheet is a powerful herbal pain-relieving patch designed as a sophisticated and safe method for treating pain and inflammation. It is a Supreme Strength patch intended for use on the external skin (transdermal delivery). The sheet contains active ingredients that provide relief for 12 hours. Unique transdermal system delivers medicine directly through the skin, starting to work within 10 minutes of application.',
            mrp: 100.0,
            price: 45.0,
            images: ['/images/products/menstroherb.jpg'],
            category: 'Pain Relief',
            ingredients: ["Methyl Salicylate", "Menthol", "Camphor", "Boswellia", "Eucalyptus Oil"],
            benefits: ["12 Hours Relief", "Instant Comfort", "100% Herbal", "No Gastric Irritation", "Clean & Discreet"],
            sideEffects: ["None observed when used as directed.", "Rare cases of mild skin irritation.", "Do not use on open wounds."],
            developmentStory: "Developed after years of research into transdermal herbal delivery systems. Our scientists combined ancient Ayurvedic wisdom with modern adhesive technology to create a patch that delivers sustained relief without the side effects of oral painkillers."
        },
        {
            name: 'Drepto Biodevice Aryasoothe Pad',
            description: "India's First Pain Killer Patch. Supreme Strength for Stiff Neck, Rheumatoid Arthritis, Sore Shoulder, Osteoarthritis.",
            detailedDescription: "Introducing the most sophisticated and safest method of treating pain and inflammation. The Aryasoothe patch uses traditional Ayurvedic ingredients backed by modern biotech. It provides instant cooling relief, numbs pain receptors, and reduces discomfort. The breathable adhesive is hypoallergenic and suitable for all skin types.",
            mrp: 100.0,
            price: 45.0,
            images: ['/images/products/aryasoothe.jpg'],
            category: 'Pain Relief',
            ingredients: ["Boswellia", "Eucalyptus Oil", "Methyl Salicylate", "Menthol", "Camphor", "Nirgundi Extract (Optional)"],
            benefits: ["Instant Cooling Relief", "Long-Lasting Action (8-12 Hours)", "Reduces Muscle & Joint Pain", "Improves Micro-circulation", "Non-Greasy & Mess-Free"],
            sideEffects: ["Minor redness may occur on sensitive skin.", "Avoid direct sun exposure on the patch.", "Discontinue use if itching persists."],
            developmentStory: "Aryasoothe was born from a need for non-invasive arthritis solutions. Clinical trials showed a 40% reduction in localized pain within 30 minutes of application, leading to its approval as a safe alternative to NSAID pills."
        },
        {
            name: 'Drepto Surveda Relief',
            description: 'Ultimate relief with sophisticated pain and inflammation treatment. 24h Active Patch.',
            detailedDescription: "The most sophisticated and safest method of treating pain and inflammation. Powerful (NSAID) & Anti-Inflammatory Patch. Post Surgery Pain Relief. Recovery from minor or major strains, sprains & bruises. Dosage: One patch to be applied for 24 hours.",
            mrp: 100.0,
            price: 45.0,
            images: ['/images/drepto-surveda-relief.png'],
            category: 'Pain Relief',
            ingredients: ["Diclofenac Diethylamine BP 200mg"],
            benefits: ["Active 24h Relief", "Anti-Inflammatory", "Post Surgery Relief", "Treats Strains & Sprains"],
            sideEffects: ["Local skin reaction (rare).", "Consult doctor if pregnant.", "Do not use if allergic to NSAIDs."],
            developmentStory: "Surveda represents the pinnacle of 24-hour transdermal technology. Designed specifically for post-operative recovery and deep tissue inflammation, it provides continuous dosage stability that oral medication cannot match."
        }
    ];

    // Clear existing products to remove old placeholders
    console.log('Clearing existing products...');
    await prisma.product.deleteMany({});

    for (const p of products) {
        console.log(`Creating product: ${p.name}`);
        await prisma.product.create({ data: p });
    }

    console.log('Seeding complete.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
