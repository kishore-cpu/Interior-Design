/* ==========================================================================
   GEO INTERIORS - INTERACTIVE LOGIC (JS)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // --- DOM Elements ---
    const header = document.querySelector('.main-header');
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const contactForm = document.getElementById('contactForm');
    const formSubmitBtn = document.getElementById('formSubmitBtn');
    const formStatus = document.getElementById('formStatus');
    
    // Modal Elements
    const projectModal = document.getElementById('projectModal');
    const modalClose = document.getElementById('modalClose');
    const modalOverlay = document.getElementById('modalOverlay');
    const modalBody = document.getElementById('modalBody');

    // --- Dynamic Content Data for Services and Gallery Popups ---
    const serviceDetailsData = {
        'plywood': {
            title: 'Plywood & Woodworks',
            category: 'We Execute',
            image: 'images/tv_unit.png',
            description: 'We construct durable structural baseworks using high-density commercial wood and boiling-waterproof (BWP) marine plywood. Specially treated for anti-termite and moisture resistance, our woodwork provides a bulletproof foundation for custom cabinetry, beds, and partitions.',
            specs: ['BWP IS:710 Marine Grade Plywood', 'Anti-termite chemical vacuum treated', '0.8mm inside laminate lining', '10-Year structural warranty']
        },
        'kitchen': {
            title: 'Modular Kitchens',
            category: 'We Execute',
            image: 'images/kitchen.png',
            description: 'Our signature modular kitchens represent modern culinary style. Engineered for maximum space utility, they feature pull-out oil-pullouts, tandem drawer systems, customized pantry storage, and premium countertop finishes, creating a clutter-free, luxurious cooking environment.',
            specs: ['Hettich / Blum soft-close hinges', 'Custom tall pantry units', 'Boiling water resistant plywood carcasses', 'Acrylic / PU Lacquered exterior finishes']
        },
        'tv-unit': {
            title: 'T.V. Console & Feature Walls',
            category: 'We Execute',
            image: 'images/tv_unit.png',
            description: 'Transform your living room focal point with floating wood media consoles, textured Italian marble backdrops, warm hidden LED cove diffusers, and custom vertical fluted wood slats. Completely engineered to hide wiring and accommodate multi-media boxes.',
            specs: ['Hidden cable management routes', 'Integrated LED cove channels', 'Italian marble / Charcoal sheet wall claddings', 'Heavy-duty soft-open flap doors']
        },
        'pooja': {
            title: 'Pooja Rooms & Units',
            category: 'We Execute',
            image: 'images/hero.png',
            description: 'Design peaceful and customized pooja structures. We craft intricate CNC-cut backlit jaali patterns, brass bells hanging systems, marble bases, and ambient backlighting. Tailored to fit both small modern wall units or elaborate traditional walk-in pooja rooms.',
            specs: ['Teakwood frames & carvings', 'CNC laser-cut corian jaalis', 'Storage drawers for prayer items', 'Integrated low-voltage warm yellow spots']
        },
        'wardrobe': {
            title: 'Custom Wardrobes',
            category: 'We Execute',
            image: 'images/wardrobe.png',
            description: 'Elegant bedroom storage designed to fit your room dimensions. Options include floor-to-ceiling sliding wardrobe profiles, classic hinged shutter systems, or custom open walk-in closets with anodized aluminium frames, glass fronts, and internal sensor LEDs.',
            specs: ['Tinted safety glass shutters', 'Internal soft-lined jewelry organizers', 'Built-in clothes hanging sensor lighting', 'Durable uPVC sliding tracks']
        },
        'ceiling': {
            title: 'Designer False Ceilings',
            category: 'We Execute',
            image: 'images/hero.png',
            description: 'Architectural ceiling plans that enhance room acoustics and lighting. Designed using Saint-Gobain Gypsum and POP structures, decorated with wooden rafters, step patterns, and recess lighting for a warm, cozy ambience.',
            specs: ['Saint-Gobain high-durability boards', 'Fire-resistant metal frameworks', 'Dimmable LED strip integrations', 'Sleek magnetic profile track lights']
        },
        'cot': {
            title: 'Handcrafted Wooden Cots',
            category: 'We Execute',
            image: 'images/wardrobe.png',
            description: 'Solid teakwood and high-density plywood cot frames built to last. Fitted with customized upholstered headboards (velvet or leatherette), heavy-duty gas spring hydraulic storage cylinders, and sturdy cross beams.',
            specs: ['100% seasoned teak or rosewood margins', 'German gas-lift hydraulic storage pumps', 'Custom headboard upholstery padding', 'Eco-friendly water-based wood polishes']
        },
        // --- We Assist You With Items ---
        'pvc-cupboard': {
            title: 'PVC Cupboards',
            category: 'We Assist You With',
            image: 'images/kitchen.png',
            description: 'Premium grade PVC panel cupboards designed specifically for moisture-heavy environments such as utility balconies, outdoor areas, bathrooms, and under-sink structures. Termite-proof, decay-resistant, and lightweight.',
            specs: ['100% moisture & water resistant PVC panels', 'Termite and borer proof warranty', 'Lightweight and easy-to-operate tracks', 'Zero maintenance design']
        },
        'pvc-window': {
            title: 'PVC Windows',
            category: 'We Assist You With',
            image: 'images/hero.png',
            description: 'High-performance uPVC window profiles featuring double/triple glazing options, dust seals, sound insulation, and weather-proof perimeter sealing. Engineered for smooth sliding and casement openings.',
            specs: ['Galvanized steel reinforced inner frames', 'Multi-chambered profiles for noise dampening', 'Heavy-duty weather-stripping friction hinges', 'Sleek mosquito mesh integration']
        },
        'steel-door': {
            title: 'Premium Steel Doors',
            category: 'We Assist You With',
            image: 'images/tv_unit.png',
            description: 'Main entrance security steel doors designed with solid core structures, decorative wood-grain textures, multi-point locksets, and anti-pry hinges. Protects your home from weather and security threats.',
            specs: ['Heavy duty cold-rolled steel sheet body', 'Multi-point door locking bolts', 'Rust-resistant zinc galvanized primer layer', 'High insulation honeycomb paper core']
        },
        'aluminium-partition': {
            title: 'Aluminium Partitions',
            category: 'We Assist You With',
            image: 'images/tv_unit.png',
            description: 'Sturdy, modular anodized or powder-coated aluminium frames used for partition walls in offices, balconies, and kitchen boundaries. Fitted with glass panels, gypsum boards, or wooden laminate infills.',
            specs: ['T6 structural grade aluminium sections', 'Toughened / Frosted glass panels', 'Anodized gold, black, or grey frame finishes', 'Quick snap-together installation framework']
        },
        'bathroom-door': {
            title: 'Bathroom Doors',
            category: 'We Assist You With',
            image: 'images/wardrobe.png',
            description: 'Durable, waterproof FRP (Fiber Reinforced Plastic) and WPC (Wood Plastic Composite) doors built specifically to prevent bending, rotting, or swelling due to bathroom humidity and water contact.',
            specs: ['100% waterproof WPC core', 'Wood-grain surface finish laminations', 'Corrosion-proof stainless steel locks & hinge systems', 'Decay and warp resistant warranty']
        },
        'floor-paneling': {
            title: 'Floor Paneling',
            category: 'We Assist You With',
            image: 'images/hero.png',
            description: 'Premium flooring layouts ranging from AC4-grade scratch-resistant laminate wood, luxury vinyl tile (LVT), to engineered wood panel planks. Perfect for living rooms, master bedrooms, and home theatres.',
            specs: ['AC4-grade heavy traffic scratch resistance', 'Sound dampening underlayment sheet', 'Click-lock grout-less panel edges', 'Water repellent wax sealed edges']
        },
        'window-screen': {
            title: 'Window Screens & Meshes',
            category: 'We Assist You With',
            image: 'images/hero.png',
            description: 'Precision mosquito and insect mesh window screen installations. Options include elegant sliding mesh tracks, magnetic frames, and pleated roll-away mesh systems fitted perfectly to existing window frames.',
            specs: ['Heavy duty fiberglass / SS 304 wire mesh', 'Tension pleated sliding mesh tracks', 'Magnets with dust-proof seals', 'UV-resistant powder coated frames']
        },
        'glass-partition': {
            title: 'Glass Partitions',
            category: 'We Assist You With',
            image: 'images/wardrobe.png',
            description: 'Frameless shower enclosures, kitchen dividers, and office conference partitions created using tempered safety glass and solid brass or black matte floor guides. Designed to maintain spatial openness.',
            specs: ['8mm to 12mm thick tempered safety glass', 'Brass or SS 304 architectural pivot clips', 'Water-stop clear plastic door sweeps', 'Optional frosting / custom decal lining']
        },
        'ss-railing': {
            title: 'SS Railings',
            category: 'We Assist You With',
            image: 'images/tv_unit.png',
            description: 'Premium grade Stainless Steel (SS 304/316) balustrades and custom railings for indoor/outdoor staircases and balconies. Mirror polish or satin finishes combined with glass or wood posts.',
            specs: ['Rustproof SS 304 / Marine grade SS 316', 'Toughened glass insert holder clips', 'Precision TIG welded structural joins', 'Custom height posts for staircase safety']
        },
        'ss-handrail': {
            title: 'SS Handrails',
            category: 'We Assist You With',
            image: 'images/tv_unit.png',
            description: 'Wall-mounted or post-mounted ergonomic stainless steel handrails for stairs, ramps, and corridors. Built for heavy grip support, finished beautifully to match residential or commercial layouts.',
            specs: ['Heavy gauge tubular SS railings', 'Secure multi-anchor wall bracket mountings', 'Seamless smooth-radius corner elbows', 'Matte satin brush / High gloss finish options']
        }
    };

    // --- Scroll Behavior (Sticky Header & Active Link) ---
    window.addEventListener('scroll', () => {
        // Sticky Header scroll styling
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Active Navigation Link Highlighting on scroll
        let currentSectionId = '';
        const scrollPosition = window.scrollY + 120; // offset for nav height

        document.querySelectorAll('section').forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < (sectionTop + sectionHeight)) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    });

    // --- Mobile Menu Toggle ---
    mobileToggle.addEventListener('click', () => {
        mobileToggle.classList.toggle('open');
        navMenu.classList.toggle('open');
    });

    // Close menu when link clicked (Mobile)
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileToggle.classList.remove('open');
            navMenu.classList.remove('open');
        });
    });

    // --- Gallery Filter Logic ---
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active state from other buttons
            filterButtons.forEach(b => b.classList.remove('active'));
            // Add active to clicked button
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            galleryItems.forEach(item => {
                const category = item.getAttribute('data-category');
                if (filterValue === 'all' || category === filterValue) {
                    item.classList.remove('hidden');
                } else {
                    item.classList.add('hidden');
                }
            });
        });
    });

    // --- Modal Popup Manager ---
    function openModal(data) {
        modalBody.innerHTML = `
            <div class="modal-detail-grid">
                <div class="modal-detail-img">
                    <img src="${data.image}" alt="${data.title}">
                </div>
                <div class="modal-detail-info">
                    <span class="cat-label">${data.category}</span>
                    <h3>${data.title}</h3>
                    <p>${data.description}</p>
                    <div class="modal-specs">
                        <h4 style="font-family: var(--font-sans); font-size: 0.8rem; font-weight: 700; text-transform: uppercase; margin-bottom: 12px; color: var(--primary-color);">Key Specifications:</h4>
                        <ul style="list-style: none; padding: 0; display: flex; flex-direction: column; gap: 8px;">
                            ${data.specs.map(spec => `
                                <li style="font-size: 0.8rem; color: var(--text-muted); display: flex; align-items: center; gap: 10px;">
                                    <span style="color: var(--gold-color); font-weight: bold;">✔</span> ${spec}
                                </li>
                            `).join('')}
                        </ul>
                    </div>
                </div>
            </div>
        `;
        projectModal.classList.add('open');
        document.body.style.overflow = 'hidden'; // prevent background scrolling
    }

    function closeModal() {
        projectModal.classList.remove('open');
        document.body.style.overflow = 'auto'; // restore scrolling
    }

    // Bind Services Cards and Helper Cards clicks
    document.querySelectorAll('.service-card, .helper-card').forEach(card => {
        card.addEventListener('click', () => {
            const key = card.getAttribute('data-service');
            const data = serviceDetailsData[key];
            if (data) {
                openModal(data);
            }
        });
    });

    // Bind Gallery Items 'View Project' click
    document.querySelectorAll('.gallery-item').forEach(item => {
        const btn = item.querySelector('.view-item-btn');
        btn.addEventListener('click', () => {
            const category = item.getAttribute('data-category');
            const title = item.querySelector('h4').innerText;
            const subtitle = item.querySelector('.gallery-cat').innerText;
            const desc = item.querySelector('p').innerText;
            const imgSrc = item.querySelector('.gallery-img').getAttribute('src');

            const customModalData = {
                title: title,
                category: subtitle,
                image: imgSrc,
                description: `A custom-tailored design execution demonstrating precision engineering. this ${title.toLowerCase()} installation integrates premium finishes and architectural styling matching the homeowner's vision.`,
                specs: [
                    'Bespoke spatial design',
                    'Premium surface laminates & paneling',
                    'Soft-close cabinet components',
                    'Fully integrated layout illumination'
                ]
            };
            openModal(customModalData);
        });
    });

    // Close Modal triggers
    modalClose.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', closeModal);
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && projectModal.classList.contains('open')) {
            closeModal();
        }
    });

    // --- Contact Form Submission & Status ---
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Trigger loading state
        formSubmitBtn.classList.add('loading');
        formSubmitBtn.disabled = true;
        formStatus.className = 'form-status';
        formStatus.innerText = '';

        const clientName = document.getElementById('clientName').value;

        // Simulate API network latency of 2 seconds
        setTimeout(() => {
            formSubmitBtn.classList.remove('loading');
            formSubmitBtn.disabled = false;
            
            // Show Success Status
            formStatus.classList.add('success');
            formStatus.innerText = `Thank you, ${clientName}! Your interior consultation request was submitted successfully. Our design team will call you within 24 hours.`;
            
            // Reset Form fields
            contactForm.reset();
        }, 2000);
    });

});
