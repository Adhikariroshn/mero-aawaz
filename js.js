document.addEventListener('DOMContentLoaded', function() {
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('.section');
    const sidebar = document.querySelector('.sidebar');
    const body = document.querySelector('body');
    const problemBtns = document.querySelectorAll('.problem-btn');
    const complaintForm = document.getElementById('complaintForm');
    const problemTypeInput = document.getElementById('problemType');
    const customComplaintBtn = document.getElementById('customComplaintBtn');
    const modal = document.getElementById('successModal');
    const modalOkBtn = document.getElementById('modalOkBtn');
    const reportBtn = document.querySelector('.report-btn');
    const languageToggle = document.querySelector('.language-toggle');
    const provinceSelect = document.getElementById('provinceSelect');
    const contactDetails = document.getElementById('contactDetails');
    
    const provinceContacts = {
        'koshi': {
            phone: '+977-21-543210',
            email: 'koshi@nepal.gov.np'
        },
        'madhesh': {
            phone: '+977-44-321098',
            email: 'madhesh@nepal.gov.np'
        },
        'bagmati': {
            phone: '+977-1-4212345',
            email: 'bagmati@nepal.gov.np'
        },
        'gandaki': {
            phone: '+977-61-520000',
            email: 'gandaki@nepal.gov.np'
        },
        'lumbini': {
            phone: '+977-71-520001',
            email: 'lumbini@nepal.gov.np'
        },
        'karnali': {
            phone: '+977-87-520002',
            email: 'karnali@nepal.gov.np'
        },
        'sudurpashchim': {
            phone: '+977-91-520003',
            email: 'sudurpashchim@nepal.gov.np'
        }
    };
    
    function activateSection(sectionId) {
        sections.forEach(section => {
            section.classList.remove('active');
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.dataset.section === sectionId) {
                item.classList.add('active');
            }
        });
        
        document.getElementById(sectionId).classList.add('active');
    }
    
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            const sectionId = this.dataset.section;
            activateSection(sectionId);
        });
    });
    
    problemBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const type = this.closest('.problem-card').dataset.problem;
            problemTypeInput.value = type;
            activateSection('report');
        });
    });
    
    customComplaintBtn.addEventListener('click', function() {
        problemTypeInput.value = 'custom';
        activateSection('report');
    });
    
    reportBtn.addEventListener('click', function(e) {
        e.preventDefault();
        activateSection('report');
    });
    
    complaintForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('name').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const title = document.getElementById('problemTitle').value.trim();
        const desc = document.getElementById('description').value.trim();
        const location = document.getElementById('exactLocation').value.trim();
        const province = document.getElementById('provinceSelect').value;

        if (!name || !phone || !title || !desc || !location || !province) {
            alert('Please fill all required details.');
            return;
        }

        modal.style.display = 'flex';
    });
    
    modalOkBtn.addEventListener('click', function() {
        modal.style.display = 'none';
        complaintForm.reset();
        problemTypeInput.value = '';
    });
    
    languageToggle.addEventListener('click', function() {
        const currentLang = this.querySelector('span').textContent;
        if (currentLang === 'English') {
            this.querySelector('span').textContent = 'नेपाली';
            this.querySelector('img').src = 'https://flagcdn.com/w40/np.png';
            this.querySelector('img').srcset = 'https://flagcdn.com/w80/np.png 2x';
            this.querySelector('img').alt = 'Nepal';
            
            document.querySelectorAll('.nav-text').forEach((el, index) => {
                const texts = ['गृहपृष्ठ', 'समस्याहरू', 'रिपोर्ट', 'सुझाव', 'सम्पर्क'];
                el.textContent = texts[index];
            });
            
            document.querySelector('.logo h1').textContent = 'मेरो आवाज';
            
            document.querySelector('.hero-content h2').textContent = 'नेपाली नागरिकको आवाज';
            document.querySelector('.hero-content p').textContent = 'सहर र गाउँका समस्याहरू स्थानीय सरकारलाई Report गर्ने ई-प्लेटफर्म';
            document.querySelector('.report-btn').textContent = 'समस्याको Report दिनुहोस्';
            
            document.querySelector('.section-title h2').textContent = 'सामान्य स्थानीय समस्याहरू';
            document.querySelector('.section-title p').textContent = 'यी केही सामान्य समस्याहरू हुन् जुन नेपालका नागरिकहरूले सामना गर्छन्';
            
            document.querySelectorAll('.problem-content h3').forEach((el, index) => {
                const titles = ['सडक मर्मतसम्बन्धी समस्या', 'फोहोर व्यवस्थापन', 'सार्वजनिक सुरक्षा'];
                el.textContent = titles[index];
            });
            
            document.querySelectorAll('.problem-content p').forEach((el, index) => {
                const texts = [
                    'गाडामोटर चल्न नसक्ने सडक, खाडल, टुटेका सडक संकेतहरू, र सडक मर्मतका अन्य समस्याहरू।',
                    'उब्जियरका डिब्बाहरू, खुला फोहोर ठाउँहरू, अनियमित फोहोर संकलन, र फोहोरको अन्य समस्याहरू।',
                    'बिग्रिएका बत्तीहरू, असुरक्षित सार्वजनिक स्थानहरू, यातायात समस्याहरू, र सुरक्षाका अन्य मुद्दाहरू।'
                ];
                el.textContent = texts[index];
            });
            
            document.querySelectorAll('.problem-btn').forEach(el => {
                el.textContent = 'यो समस्याको Report दिनुहोस्';
            });
            
            document.querySelector('.custom-complaint h3').textContent = 'अरू समस्याहरू?';
            document.querySelector('.custom-complaint p').textContent = 'तपाईंले अन्य कुनै समस्याहरूको सामना गर्नुभएको छ भने तल क्लिक गर्नुहोस्';
            document.querySelector('#customComplaintBtn').textContent = 'अन्य समस्याको Report दिनुहोस्';
            
            document.querySelectorAll('.section-title h2')[1].textContent = 'स्थानीय समस्याको Report दिनुहोस्';
            document.querySelectorAll('.section-title p')[1].textContent = 'आफ्नो क्षेत्रमा भएका समस्याहरू स्थानीय सरकारलाई Report गर्नुहोस्';
            
            document.querySelector('.province-selector h3').textContent = 'तपाईं कुन प्रदेशबाट हुनुहुन्छ?';
            document.querySelector('#provinceSelect option').textContent = '-- प्रदेश छान्नुहोस् --';
            
            document.querySelectorAll('.form-group label').forEach((el, index) => {
                const labels = ['पूरा नाम', 'फोन नम्बर', 'ठेगाना', 'समस्याको शीर्षक', 'समस्याको विवरण', 'तस्वीर अपलोड गर्नुहोस् (वैकल्पिक)'];
                el.textContent = labels[index];
            });
            
            document.querySelectorAll('.form-control').forEach((el, index) => {
                const placeholders = [
                    'तपाईंको पूरा नाम',
                    'तपाईंको फोन नम्बर',
                    'तपाईंको ठेगाना प्रविष्ट गर्नुहोस्',
                    'समस्याको संक्षिप्त शीर्षक',
                    'समस्याको विस्तृत विवरण लेख्नुहोस्...',
                    'तपाईंको पूरा नाम',
                    'तपाईंको सुझाव यहाँ लेख्नुहोस्...'
                ];
                el.placeholder = placeholders[index];
            });
            
            document.querySelector('.submit-btn button').textContent = 'Report पेश गर्नुहोस्';
            
            document.querySelector('#contactDetails h3').textContent = 'तपाईंको प्रदेशका सम्पर्क विवरणहरू';
            document.querySelector('.contact-card h4').textContent = 'प्रदेश कार्यालय';
            
            document.querySelectorAll('.section-title h2')[2].textContent = 'सुझाव';
            document.querySelectorAll('.section-title p')[2].textContent = 'हामीलाई तपाईंका सुझावहरू पठाउनुहोस्';
            
            document.querySelectorAll('.form-group label')[5].textContent = 'सन्देश';
            document.querySelectorAll('.submit-btn button')[1].textContent = 'सुझाव पठाउनुहोस्';
            
            document.querySelectorAll('.section-title h2')[3].textContent = 'सम्पर्क गर्नुहोस्';
            document.querySelectorAll('.section-title p')[3].textContent = 'हामीलाई सम्पर्क गर्न तल विवरणहरू प्रयोग गर्नुहोस्';
            
            document.querySelectorAll('.contact-card h4').forEach((el, index) => {
                const titles = ['मुख्यालय', 'ईमेल', 'फोन'];
                el.textContent = titles[index];
            });
            
            document.querySelector('.modal-content h3').textContent = 'Report पेश गरियो!';
            document.querySelector('.modal-content p').textContent = 'तपाईंको समस्या स्थानीय सरकारलाई Report गरियो।';
            document.querySelector('#modalOkBtn').textContent = 'ठीक छ';
        } else {
            this.querySelector('span').textContent = 'English';
            this.querySelector('img').src = 'https://flagcdn.com/w40/gb.png';
            this.querySelector('img').srcset = 'https://flagcdn.com/w80/gb.png 2x';
            this.querySelector('img').alt = 'United Kingdom';
            
            document.querySelectorAll('.nav-text').forEach((el, index) => {
                const texts = ['Home', 'Problems', 'Report', 'Suggestions', 'Contact'];
                el.textContent = texts[index];
            });
            
            document.querySelector('.logo h1').textContent = 'Mero Aawaz';
            
            document.querySelector('.hero-content h2').textContent = 'Voice of Nepali Citizens';
            document.querySelector('.hero-content p').textContent = 'E-platform to report local problems to the government';
            document.querySelector('.report-btn').textContent = 'Report a Problem';
            
            document.querySelector('.section-title h2').textContent = 'Common Local Problems';
            document.querySelector('.section-title p').textContent = 'These are some common problems faced by citizens in Nepal';
            
            document.querySelectorAll('.problem-content h3').forEach((el, index) => {
                const titles = ['Road Maintenance Issues', 'Waste Management', 'Public Safety'];
                el.textContent = titles[index];
            });
            
            document.querySelectorAll('.problem-content p').forEach((el, index) => {
                const texts = [
                    'Roads unsuitable for vehicles, potholes, broken road signs, and other road maintenance issues.',
                    'Overflowing bins, open garbage areas, irregular waste collection, and other waste issues.',
                    'Malfunctioning lights, unsafe public spaces, traffic problems, and other safety issues.'
                ];
                el.textContent = texts[index];
            });
            
            document.querySelectorAll('.problem-btn').forEach(el => {
                el.textContent = 'Report This Problem';
            });
            
            document.querySelector('.custom-complaint h3').textContent = 'Other Problems?';
            document.querySelector('.custom-complaint p').textContent = 'If you are facing any other problems, click below';
            document.querySelector('#customComplaintBtn').textContent = 'Report Other Problem';
            
            document.querySelectorAll('.section-title h2')[1].textContent = 'Report Local Problem';
            document.querySelectorAll('.section-title p')[1].textContent = 'Report problems in your area to the local government';
            
            document.querySelector('.province-selector h3').textContent = 'Which province are you from?';
            document.querySelector('#provinceSelect option').textContent = '-- Select Province --';
            
            document.querySelectorAll('.form-group label').forEach((el, index) => {
                const labels = ['Full Name', 'Phone Number', 'Address', 'Problem Title', 'Problem Description', 'Upload Image (Optional)'];
                el.textContent = labels[index];
            });
            
            document.querySelectorAll('.form-control').forEach((el, index) => {
                const placeholders = [
                    'Your full name',
                    'Your phone number',
                    'Enter your address',
                    'Brief title of the problem',
                    'Write a detailed description of the problem...',
                    'Your full name',
                    'Write your suggestion here...'
                ];
                el.placeholder = placeholders[index];
            });
            
            document.querySelector('.submit-btn button').textContent = 'Submit Report';
            
            document.querySelector('#contactDetails h3').textContent = 'Your Province Contact Details';
            document.querySelector('.contact-card h4').textContent = 'Province Office';
            
            document.querySelectorAll('.section-title h2')[2].textContent = 'Suggestions';
            document.querySelectorAll('.section-title p')[2].textContent = 'Send us your suggestions';
            
            document.querySelectorAll('.form-group label')[5].textContent = 'Message';
            document.querySelectorAll('.submit-btn button')[1].textContent = 'Send Suggestion';
            
            document.querySelectorAll('.section-title h2')[3].textContent = 'Contact Us';
            document.querySelectorAll('.section-title p')[3].textContent = 'Use the details below to contact us';
            
            document.querySelectorAll('.contact-card h4').forEach((el, index) => {
                const titles = ['Headquarters', 'Email', 'Phone'];
                el.textContent = titles[index];
            });
            
            document.querySelector('.modal-content h3').textContent = 'Report Submitted!';
            document.querySelector('.modal-content p').textContent = 'Your problem has been reported to the local government.';
            document.querySelector('#modalOkBtn').textContent = 'OK';
        }
    });
    
    provinceSelect.addEventListener('change', function() {
        const selectedProvince = this.value;
        if (selectedProvince && provinceContacts[selectedProvince]) {
            const contactInfo = document.querySelector('.contact-info');
            contactInfo.innerHTML = `
                <div class="contact-card">
                    <i class="fas fa-phone-alt"></i>
                    <h4>${languageToggle.querySelector('span').textContent === 'English' ? 'Province Office' : 'प्रदेश कार्यालय'}</h4>
                    <p>${provinceContacts[selectedProvince].phone}</p>
                    <p>${provinceContacts[selectedProvince].email}</p>
                </div>
            `;
            contactDetails.style.display = 'block';
        } else {
            contactDetails.style.display = 'none';
        }
    });
    
    window.addEventListener('scroll', function() {
        const animElements = document.querySelectorAll('.animate');
        animElements.forEach(el => {
            if (el.getBoundingClientRect().top < window.innerHeight - 50) {
                el.classList.add('animated');
            }
        });
    });
    
    setTimeout(function() {
        const animElements = document.querySelectorAll('.animate');
        animElements.forEach(el => {
            if (el.getBoundingClientRect().top < window.innerHeight - 50) {
                el.classList.add('animated');
            }
        });
    }, 500);
});