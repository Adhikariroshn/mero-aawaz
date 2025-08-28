document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('.section');
    const navItems = document.querySelectorAll('.sidebar-nav li');
    const notification = document.getElementById('notification');
    const languageButtons = document.querySelectorAll('.language-btn');
    const provinceOptions = document.querySelectorAll('.province-option');
    
    // Set default language to English
    let currentLanguage = 'en';
    
    // Demo complaints with Nepali names and problems
    const demoComplaints = [
        {name:'Ram Shrestha', type:'Road', address:'Kathmandu', desc:'Potholes on main road', status:'pending'},
        {name:'Sita Maharjan', type:'Garbage', address:'Lalitpur', desc:'Garbage not collected for 2 weeks', status:'inprogress'},
        {name:'Hari Prasad', type:'Safety', address:'Bhaktapur', desc:'Street light not working', status:'resolved'},
        {name:'Gita Thapa', type:'Road', address:'Pokhara', desc:'Broken footpath', status:'pending'},
        {name:'Vijay Kumar', type:'Other', address:'Kathmandu', desc:'Noise pollution from market', status:'inprogress'},
        {name:'Sarla Gurung', type:'Safety', address:'Bhaktapur', desc:'Traffic light not working', status:'resolved'},
        {name:'Krishna Bahadur', type:'Garbage', address:'Lalitpur', desc:'Overflowing bins near school', status:'pending'},
        {name:'Meena Devi', type:'Road', address:'Kathmandu', desc:'Water logging after rain', status:'inprogress'},
        {name:'Rajesh Hamal', type:'Other', address:'Pokhara', desc:'Illegal construction issues', status:'resolved'},
        {name:'Anita Sharma', type:'Safety', address:'Bhaktapur', desc:'Unsecured electrical wires', status:'pending'},
        {name:'Bikash Khadka', type:'Water', address:'Kathmandu', desc:'No water supply for 1 week', status:'inprogress'},
        {name:'Sunita Rai', type:'Electricity', address:'Lalitpur', desc:'No electricity for 2 days', status:'resolved'},
    ];

    const homeFeed = document.getElementById('homeFeed');
    const complaintGrid = document.getElementById('complaintGrid');
    let showing = 6;
    
    // Navigation
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
            const sectionId = item.getAttribute('data-section');
            sections.forEach(sec => {
                sec.classList.remove('active');
                if(sec.id === sectionId) sec.classList.add('active');
            });
        });
    });
    
    // Language toggle
    languageButtons.forEach(button => {
        button.addEventListener('click', () => {
            languageButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            currentLanguage = button.getAttribute('data-lang');
            toggleLanguage(currentLanguage);
        });
    });
    
    // Province selection
    provinceOptions.forEach(option => {
        option.addEventListener('click', () => {
            provinceOptions.forEach(op => op.classList.remove('selected'));
            option.classList.add('selected');
            
            // Set the selected province in the form
            const province = option.getAttribute('data-province');
            document.querySelector('select[name="province"]').value = province;
        });
    });
    
    // Language content
    const languageContent = {
        en: {
            welcomeTitle: "Hello, Welcome to Mero Aawaz!",
            welcomeText: "We're here to help solve community problems",
            home: "Home",
            complaint: "Submit Complaint",
            about: "About Us",
            how: "How it Works",
            contact: "Contact",
            recentComplaints: "Recent Complaints",
            seeMore: "See More",
            seeLess: "See Less",
            newComplaint: "Submit a New Complaint",
            selectProvince: "Select Your Province",
            yourName: "Your Name",
            enterName: "Enter your full name",
            selectProvinceForm: "Select a Province",
            exactLocation: "Exact Location",
            enterLocation: "Enter the exact location of the problem",
            problemType: "Problem Type",
            selectProblemType: "Select Problem Type",
            problemDesc: "Problem Description",
            enterDesc: "Please provide a detailed description of the problem...",
            uploadPhoto: "Upload Photo (if any)",
            submitComplaint: "Submit Complaint",
            aboutTitle: "About Us",
            aboutText: "Mero Aawaz is a citizen complaint portal with the main objective of reducing the distance between citizens and local government.",
            aboutGoals: "Our goals:",
            goal1: "Enable citizens to easily register their problems",
            goal2: "Make the problem resolution process transparent",
            goal3: "Help local government understand area problems",
            goal4: "Bring positive change to the community",
            aboutFooter: "This portal is operated with the cooperation of local government and civic organizations.",
            ourTeam: "Our Team",
            howTitle: "How It Works",
            step1: "Identify the Problem",
            step1Desc: "Identify any problem or disorder in your area.",
            step2: "Register the Problem",
            step2Desc: "Use our form to provide details, location and photos of the problem.",
            step3: "Send to Us",
            step3Desc: "Submit your problem and we'll forward it to local government.",
            step4: "Wait for Resolution",
            step4Desc: "Receive information that your problem is in the resolution process.",
            problemTypes: "Types of Problems",
            contactTitle: "Contact Us",
            contactText: "If you have any questions or suggestions, you can contact us. We are always ready for your feedback.",
            footerText: "© 2023 Mero Aawaz - Citizen Complaint Portal. All rights reserved.",
            sampleText: "This is a sample website only",
            notificationText: "Your complaint has been registered successfully!",
            totalComplaints: "Total Complaints",
            resolved: "Resolved",
            inProgress: "In Progress",
            pending: "Pending"
        },
        ne: {
            welcomeTitle: "नमस्ते, मेरो आवाजमा स्वागत छ!",
            welcomeText: "हामी समुदायका समस्याहरू समाधान गर्न तपाईंको सहयोगमा छौं",
            home: "गृहपृष्ठ",
            complaint: "समस्या दर्ता",
            about: "हाम्रो बारे",
            how: "कसरी काम गर्छ",
            contact: "सम्पर्क",
            recentComplaints: "हालका समस्याहरू",
            seeMore: "थप हेर्नुहोस्",
            seeLess: "कम हेर्नुहोस्",
            newComplaint: "नयाँ समस्या दर्ता गर्नुहोस्",
            selectProvince: "तपाईंको प्रदेश छान्नुहोस्",
            yourName: "तपाईंको नाम",
            enterName: "तपाईंको पूरा नाम लेख्नुहोस्",
            selectProvinceForm: "प्रदेश छान्नुहोस्",
            exactLocation: "ठीक ठाउँ",
            enterLocation: "समस्याको ठीक ठाउँ लेख्नुहोस्",
            problemType: "समस्याको प्रकार",
            selectProblemType: "समस्याको प्रकार छान्नुहोस्",
            problemDesc: "समस्याको विवरण",
            enterDesc: "कृपया समस्याको विस्तृत विवरण दिनुहोस्...",
            uploadPhoto: "तस्वीर राख्नुहोस् (यदि छ भने)",
            submitComplaint: "समस्या दर्ता गर्नुहोस्",
            aboutTitle: "हाम्रो बारे",
            aboutText: "मेरो आवाज नागरिक समस्या समाधानको लागि एक पोर्टल हो जसको मुख्य उद्देश्य नागरिकहरू र स्थानीय सरकारबिचको दुरीलाई कम गर्नु हो।",
            aboutGoals: "हाम्रो लक्ष्यहरू:",
            goal1: "नागरिकहरूले सजिलैसँग आफ्ना समस्याहरू दर्ता गर्न सकुन्",
            goal2: "समस्याहरूको समाधान प्रक्रियालाई पारदर्शी बनाउनु",
            goal3: "स्थानीय सरकारलाई क्षेत्रका समस्याहरू बुझ्न मद्दत गर्नु",
            goal4: "समुदायमा सकारात्मक परिवर्तन ल्याउनु",
            aboutFooter: "यो पोर्टल स्थानीय सरकार र नागरिक संगठनहरूको सहयोगमा संचालित छ।",
            ourTeam: "हाम्रो टिम",
            howTitle: "कसरी काम गर्छ",
            step1: "समस्या चिन्हित गर्नुहोस्",
            step1Desc: "तपाईंको क्षेत्रमा भएको कुनै पनि समस्या वा अव्यवस्था चिन्हित गर्नुहोस्।",
            step2: "समस्या दर्ता गर्नुहोस्",
            step2Desc: "हाम्रो फारम प्रयोग गरेर समस्याको विवरण, स्थान र तस्वीर संलग्न गर्नुहोस्।",
            step3: "हामीलाई पठाउनुहोस्",
            step3Desc: "तपाईंको समस्या हामीलाई पठाउनुहोस् र हामी स्थानीय सरकारसम्म पुर्याउँछौं।",
            step4: "समाधानको प्रतिक्षा गर्नुहोस्",
            step4Desc: "तपाईंको समस्याको समाधान प्रक्रियामा रहेको छ भन्ने जानकारी प्राप्त गर्नुहोस्।",
            problemTypes: "समस्याका प्रकारहरू",
            contactTitle: "हामीलाई सम्पर्क गर्नुहोस्",
            contactText: "तपाईंसँग कुनै प्रश्न वा सुझाव छ भने हामीलाई सम्पर्क गर्न सक्नुहुन्छ। हामी तपाईंको प्रतिक्रियाको लागि सधैं तयार छौं।",
            footerText: "© २०२३ मेरो आवाज - नागरिक समस्या समाधान पोर्टल। सर्वाधिकार सुरक्षित।",
            sampleText: "यो एक नमूना वेबसाइट मात्र हो",
            notificationText: "तपाईंको समस्या सफलतापूर्वक दर्ता भएको छ!",
            totalComplaints: "जम्मा समस्याहरू",
            resolved: "समाधान भएका",
            inProgress: "चलिरहेका",
            pending: "पेन्डिङ"
        }
    };
    
    // Toggle language function
    function toggleLanguage(lang) {
        // Update all text content based on selected language
        document.querySelector('.welcome-message h1').textContent = languageContent[lang].welcomeTitle;
        document.querySelector('.welcome-message p').textContent = languageContent[lang].welcomeText;
        
        // Update navigation
        document.querySelector('[data-section="home"] span').textContent = languageContent[lang].home;
        document.querySelector('[data-section="complaint"] span').textContent = languageContent[lang].complaint;
        document.querySelector('[data-section="about"] span').textContent = languageContent[lang].about;
        document.querySelector('[data-section="how"] span').textContent = languageContent[lang].how;
        document.querySelector('[data-section="contact"] span').textContent = languageContent[lang].contact;
        
        // Update section titles
        document.querySelector('#home .section-title').textContent = languageContent[lang].recentComplaints;
        document.querySelector('#complaint .section-title').textContent = languageContent[lang].newComplaint;
        document.querySelector('#about .section-title').textContent = languageContent[lang].aboutTitle;
        document.querySelector('#how .section-title').textContent = languageContent[lang].howTitle;
        document.querySelector('#contact .section-title').textContent = languageContent[lang].contactTitle;
        
        // Update button text
        const toggleButton = document.getElementById('toggleComplaints');
        if (showing === 6) {
            toggleButton.innerHTML = `<i class="fas fa-chevron-down"></i> ${languageContent[lang].seeMore}`;
        } else {
            toggleButton.innerHTML = `<i class="fas fa-chevron-up"></i> ${languageContent[lang].seeLess}`;
        }
        
        // Update form labels
        document.querySelector('label[for="name"]').textContent = languageContent[lang].yourName;
        document.querySelector('input[name="name"]').placeholder = languageContent[lang].enterName;
        document.querySelector('select[name="province"] option[value=""]').textContent = languageContent[lang].selectProvinceForm;
        document.querySelector('label[for="location"]').textContent = languageContent[lang].exactLocation;
        document.querySelector('input[name="location"]').placeholder = languageContent[lang].enterLocation;
        document.querySelector('label[for="type"]').textContent = languageContent[lang].problemType;
        document.querySelector('select[name="type"] option[value=""]').textContent = languageContent[lang].selectProblemType;
        document.querySelector('label[for="description"]').textContent = languageContent[lang].problemDesc;
        document.querySelector('textarea[name="description"]').placeholder = languageContent[lang].enterDesc;
        document.querySelector('label[for="image"]').textContent = languageContent[lang].uploadPhoto;
        document.querySelector('button[type="submit"]').innerHTML = `<i class="fas fa-paper-plane"></i> ${languageContent[lang].submitComplaint}`;
        
        // Update about section
        document.querySelector('#about .content-card p').textContent = languageContent[lang].aboutText;
        document.querySelector('#about .content-card p:nth-child(3)').textContent = languageContent[lang].aboutGoals;
        document.querySelector('#about .content-card ul li:nth-child(1)').textContent = languageContent[lang].goal1;
        document.querySelector('#about .content-card ul li:nth-child(2)').textContent = languageContent[lang].goal2;
        document.querySelector('#about .content-card ul li:nth-child(3)').textContent = languageContent[lang].goal3;
        document.querySelector('#about .content-card ul li:nth-child(4)').textContent = languageContent[lang].goal4;
        document.querySelector('#about .content-card p:last-child').textContent = languageContent[lang].aboutFooter;
        document.querySelector('#about .content-subtitle').textContent = languageContent[lang].ourTeam;
        
        // Update how it works section
        document.querySelectorAll('.step-title')[0].textContent = languageContent[lang].step1;
        document.querySelectorAll('.step-card p')[0].textContent = languageContent[lang].step1Desc;
        document.querySelectorAll('.step-title')[1].textContent = languageContent[lang].step2;
        document.querySelectorAll('.step-card p')[1].textContent = languageContent[lang].step2Desc;
        document.querySelectorAll('.step-title')[2].textContent = languageContent[lang].step3;
        document.querySelectorAll('.step-card p')[2].textContent = languageContent[lang].step3Desc;
        document.querySelectorAll('.step-title')[3].textContent = languageContent[lang].step4;
        document.querySelectorAll('.step-card p')[3].textContent = languageContent[lang].step4Desc;
        document.querySelector('#how .content-card h3').textContent = languageContent[lang].problemTypes;
        
        // Update contact section
        document.querySelector('#contact .content-card p').textContent = languageContent[lang].contactText;
        
        // Update footer
        document.querySelector('.footer p').textContent = languageContent[lang].footerText;
        document.querySelector('.footer p:last-child').textContent = languageContent[lang].sampleText;
        
        // Update stats
        document.querySelectorAll('.stat-info p')[0].textContent = languageContent[lang].totalComplaints;
        document.querySelectorAll('.stat-info p')[1].textContent = languageContent[lang].resolved;
        document.querySelectorAll('.stat-info p')[2].textContent = languageContent[lang].inProgress;
        document.querySelectorAll('.stat-info p')[3].textContent = languageContent[lang].pending;
    }
    
    // Render complaints
    function renderComplaints(container, complaints) {
        container.innerHTML = '';
        complaints.forEach((c, index) => {
            const card = document.createElement('div');
            card.classList.add('complaint-card');
            
            // Add delay class for animation
            if (index < 6) {
                card.classList.add('visible');
            }
            
            // Set status and type classes
            const statusClass = `status-${c.status}`;
            const typeClass = `type-${c.type.toLowerCase()}`;
            
            card.innerHTML = `
                <div class="card-header">
                    <h3 class="card-title">${c.name}</h3>
                    <span class="complaint-type ${typeClass}">${c.type}</span>
                </div>
                <div class="card-body">
                    <p><strong>Address:</strong> ${c.address}</p>
                    <p>${c.desc}</p>
                </div>
                <div class="card-footer">
                    <span class="complaint-date">2 days ago</span>
                    <span class="complaint-status ${statusClass}">${c.status}</span>
                </div>
            `;
            
            container.appendChild(card);
        });
    }
    
    // Initial render
    renderComplaints(homeFeed, demoComplaints.slice(0, showing));
    
    // Toggle complaints
    document.getElementById('toggleComplaints').addEventListener('click', () => {
        showing = showing === 6 ? 12 : 6;
        renderComplaints(homeFeed, demoComplaints.slice(0, showing));
        
        // Update button text
        const button = document.getElementById('toggleComplaints');
        if (showing === 6) {
            button.innerHTML = `<i class="fas fa-chevron-down"></i> ${currentLanguage === 'en' ? 'See More' : 'थप हेर्नुहोस्'}`;
        } else {
            button.innerHTML = `<i class="fas fa-chevron-up"></i> ${currentLanguage === 'en' ? 'See Less' : 'कम हेर्नुहोस्'}`;
        }
    });
    
    // Form submission
    document.getElementById('complaintForm').addEventListener('submit', e => {
        e.preventDefault();
        const form = e.target;
        
        const newComplaint = {
            name: form.name.value,
            type: form.type.value,
            address: `${form.province.value}, ${form.location.value}`,
            desc: form.description.value,
            status: 'pending'
        };
        
        demoComplaints.unshift(newComplaint);
        renderComplaints(homeFeed, demoComplaints.slice(0, showing));
        
        // Add to user's complaints
        const userCard = document.createElement('div');
        userCard.classList.add('complaint-card', 'visible');
        userCard.innerHTML = `
            <div class="card-header">
                <h3 class="card-title">${newComplaint.name}</h3>
                <span class="complaint-type type-${newComplaint.type.toLowerCase()}">${newComplaint.type}</span>
            </div>
            <div class="card-body">
                <p><strong>Address:</strong> ${newComplaint.address}</p>
                <p>${newComplaint.desc}</p>
            </div>
            <div class="card-footer">
                <span class="complaint-date">Just now</span>
                <span class="complaint-status status-pending">pending</span>
            </div>
        `;
        
        complaintGrid.prepend(userCard);
        form.reset();
        
        // Reset province selection
        provinceOptions.forEach(option => option.classList.remove('selected'));
        
        // Show notification
        notification.innerHTML = `<i class="fas fa-check-circle"></i> ${currentLanguage === 'en' ? 'Your complaint has been registered successfully!' : 'तपाईंको समस्या सफलतापूर्वक दर्ता भएको छ!'}`;
        notification.classList.add('show');
        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000);
    });
    
    // Animate stats cards on scroll
    const observerOptions = {
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.stat-card, .step-card').forEach(card => {
        observer.observe(card);
    });
});
