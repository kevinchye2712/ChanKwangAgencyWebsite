// --- TAILWIND CONFIG ---
tailwind.config = {
    theme: {
        extend: {
            colors: {
                firm: {
                    navy: '#0F172A',   // Authority (Slate 900)
                    gold: '#C5A059',   // Premium Accent
                    light: '#F8FAFC',  // Clean Background
                    accent: '#334155'  // Secondary Text
                }
            },
            fontFamily: {
                sans: ['Lato', 'sans-serif'],
                serif: ['Playfair Display', 'serif'],
            }
        }
    }
};

// --- DOM CONTENT LOADED WRAPPER ---
document.addEventListener('DOMContentLoaded', () => {

    // --- DATA FOR MODALS ---
    const serviceDetails = {
        'risk': {
            title: 'Risk Management',
            icon: 'fa-shield-alt',
            desc: 'We perform a comprehensive audit of your current exposure to ensure you are not under-insured or paying for redundant coverage.',
            points: ['Personal Life & Medical Coverage Audit', 'Income Replacement Strategies', 'Keyman Insurance for Business Continuity', 'Disability & Critical Illness Analysis']
        },
        'estate': {
            title: 'Estate Planning',
            icon: 'fa-scroll',
            desc: 'Ensuring your wealth is transferred to your loved ones efficiently, without being frozen by legal bureaucracy.',
            points: ['Insurance Trusts (Absolute Assignment)', 'Wasiat (Will) Writing Services', 'Hibah for Immediate Liquidity', 'Business Succession Planning']
        },
        'finance': {
            title: 'Financial Structuring',
            icon: 'fa-university',
            desc: 'We protect your assets from creditors and ensure your debts die with you, not your family.',
            points: ['MLTA vs MRTA Analysis', 'Debt Cancellation Strategies', 'Loan Protection for SMEs', 'Asset Protection from Creditors']
        },
        'tax': {
            title: 'Tax Optimization',
            icon: 'fa-calculator',
            desc: 'Using legal financial instruments to reduce your taxable income effectively.',
            points: ['Corporate Tax Relief via Keyman Insurance', 'Personal Relief (Life, Medical, Education)', 'Private Retirement Scheme (PRS) Tax Incentives', 'Deferred Annuity Planning']
        },
        'wealth': {
            title: 'Wealth Accumulation',
            icon: 'fa-chart-line',
            desc: 'Growing your capital through diversified investment vehicles tailored to your risk profile.',
            points: ['Managed Investment-Linked Funds', 'Retirement Income Replacement Plans', 'Education Funding for Children', 'Dollar Cost Averaging Strategies']
        },
        'legal': {
            title: 'Legal Advisory',
            icon: 'fa-gavel',
            desc: 'We work with panel lawyers to ensure your insurance policies are wrapped in solid legal contracts.',
            points: ['Buy-Sell Agreements for Partners', 'Trust Deed Creation', 'Policy Nomination & Assignment', 'Contract Review & Validation']
        }
    };

    // --- MODAL FUNCTIONS ---
    const modal = document.getElementById('service-modal');
    const mTitle = document.getElementById('modal-title');
    const mDesc = document.getElementById('modal-desc');
    const mList = document.getElementById('modal-list');
    const mIcon = document.getElementById('modal-icon');

    // Make modal functions global for inline onclick handlers
    window.openModal = function (serviceKey) {
        const data = serviceDetails[serviceKey];
        if (!data) return;
        mTitle.innerText = data.title;
        mDesc.innerText = data.desc;
        mIcon.className = `fas ${data.icon} text-xl`;
        mList.innerHTML = '';
        data.points.forEach(point => {
            const li = document.createElement('li');
            li.className = "flex items-start";
            li.innerHTML = `<i class="fas fa-check text-firm-gold mt-1 mr-2"></i><span>${point}</span>`;
            mList.appendChild(li);
        });
        modal.classList.remove('hidden');
    };

    window.closeModal = function () {
        modal.classList.add('hidden');
    };

    document.addEventListener('keydown', function (event) { if (event.key === "Escape") window.closeModal(); });

    // --- MOBILE MENU ---
    const btn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const icon = btn.querySelector('i');
    const links = document.querySelectorAll('.mobile-link');
    const toggleMenu = () => {
        mobileMenu.classList.toggle('hidden');
        icon.className = mobileMenu.classList.contains('hidden') ? 'fas fa-bars' : 'fas fa-times';
    };
    btn.addEventListener('click', toggleMenu);
    links.forEach(link => link.addEventListener('click', () => { mobileMenu.classList.add('hidden'); icon.className = 'fas fa-bars'; }));

    // --- SCROLL SPY (INTERSECTION OBSERVER) ---
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    const observerOptions = {
        threshold: 0.3 // Trigger when 30% of section is visible
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.dataset.target === id) link.classList.add('active');
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });
});