// ===== CONFIGURATION =====
const CONFIG = {
    email: 'fatimatabintaniang8@gmail.com',
    phone: '77 267 26 96',
    address: 'Thiès, Tivaouane',
    social: {
        github: '#',
        linkedin: '#',
        twitter: '#'
    }
};

// ===== ÉTAT GLOBAL =====
let currentTheme = localStorage.getItem('theme') || 'dark';

// ===== INITIALISATION =====
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initNavigation();
    initScrollEffects();
    initAnimations();
    initContactForm();
    initProjectModals();
    initCVDownload();
    initBackToTop();

    console.log('Portfolio de Moustapha Niang chargé avec succès!');
});

// ===== THÈME =====
function initTheme() {
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;

    // Appliquer le thème sauvegardé
    applyTheme(currentTheme);

    // Gérer le clic sur le bouton de thème
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }

    // Mettre à jour l'icône du thème
    updateThemeIcon();
}

function applyTheme(theme) {
    const body = document.body;
    body.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    currentTheme = theme;
    updateThemeIcon();
}

function toggleTheme() {
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);

    // Animation de transition
    document.body.style.transition = 'background-color 0.5s ease, color 0.5s ease';
    setTimeout(() => {
        document.body.style.transition = '';
    }, 500);
}

function updateThemeIcon() {
    const themeIcon = document.querySelector('#themeToggle i');
    if (themeIcon) {
        if (currentTheme === 'dark') {
            themeIcon.className = 'fas fa-moon';
            themeIcon.setAttribute('title', 'Passer en mode clair');
        } else {
            themeIcon.className = 'fas fa-sun';
            themeIcon.setAttribute('title', 'Passer en mode sombre');
        }
    }
}

// ===== NAVIGATION =====
function initNavigation() {
    const mobileMenu = document.getElementById('mobileMenu');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-link');

    // Menu mobile
    if (mobileMenu && navLinks) {
        mobileMenu.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = mobileMenu.querySelector('i');
            if (icon) {
                if (navLinks.classList.contains('active')) {
                    icon.className = 'fas fa-times';
                    mobileMenu.setAttribute('aria-expanded', 'true');
                } else {
                    icon.className = 'fas fa-bars';
                    mobileMenu.setAttribute('aria-expanded', 'false');
                }
            }
        });

        // Fermer le menu en cliquant sur un lien
        navLinksItems.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                const icon = mobileMenu.querySelector('i');
                if (icon) {
                    icon.className = 'fas fa-bars';
                    mobileMenu.setAttribute('aria-expanded', 'false');
                }
            });
        });

        // Fermer le menu en cliquant en dehors
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.nav-links') && !e.target.closest('.mobile-menu')) {
                navLinks.classList.remove('active');
                const icon = mobileMenu.querySelector('i');
                if (icon) {
                    icon.className = 'fas fa-bars';
                    mobileMenu.setAttribute('aria-expanded', 'false');
                }
            }
        });
    }

    // Mise à jour des liens actifs au scroll
    updateActiveNavLink();
    window.addEventListener('scroll', updateActiveNavLink);
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    let currentSection = '';
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href').replace('#', '');
        if (href === currentSection) {
            link.classList.add('active');
        }
    });
}

// ===== EFFETS DE DÉFILEMENT =====
function initScrollEffects() {
    const header = document.getElementById('header');

    window.addEventListener('scroll', () => {
        // Header au scroll
        if (header) {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }

        // Bouton retour en haut
        updateBackToTopButton();

        // Animations au scroll
        animateOnScroll();
    });
}

// ===== ANIMATIONS =====
function initAnimations() {
    // Animation des statistiques
    const statNumbers = document.querySelectorAll('.stat-number');
    if (statNumbers.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateNumbers(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        statNumbers.forEach(stat => observer.observe(stat));
    }

    // Animation des cartes
    const cards = document.querySelectorAll('.project-card, .competence-card');
    if (cards.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });

        cards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(card);
        });
    }
}

function animateNumbers(element) {
    const target = parseInt(element.getAttribute('data-target') || element.textContent.replace('%', ''));
    const duration = 2000; // 2 secondes
    const increment = target / (duration / 16); // 60fps
    let current = 0;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current) + '%';
    }, 16);
}

function animateOnScroll() {
    const elements = document.querySelectorAll('.animate-on-scroll');

    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (elementTop < windowHeight - 100) {
            element.classList.add('animated');
        }
    });
}

// ===== FORMULAIRE DE CONTACT AVEC MAILTO =====
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Récupérer les valeurs
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();

            // Validation
            if (!validateForm(name, email, subject, message)) return;

            // Récupérer le bouton d'envoi
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            const originalClasses = submitBtn.className;

            // Montrer le chargement
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Préparation...';
            submitBtn.disabled = true;

            showFormStatus('Préparation du message...', 'info');

            // Petite pause pour l'animation
            setTimeout(() => {
                try {
                    // Construire le message complet
                    const fullMessage = `
Bonjour Moustapha,

Nouveau message depuis votre portfolio :

Nom: ${name}
Email: ${email}

Message:
${message}

---
Envoyé le ${new Date().toLocaleDateString('fr-FR')} à ${new Date().toLocaleTimeString('fr-FR')}
                    `.trim();

                    // Construire le lien mailto
                    const mailtoLink = `mailto:fatimatabintaniang8@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(fullMessage)}`;

                    // Ouvrir le client mail (MÉTHODE LA PLUS FIABLE)
                    const link = document.createElement('a');
                    link.href = mailtoLink;
                    link.style.display = 'none';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);

                    // Message de succès
                    showFormStatus('✅ Client mail ouvert !', 'success');
                    submitBtn.innerHTML = '<i class="fas fa-check mr-2"></i> Client mail ouvert';
                    submitBtn.classList.add('btn-success');

                    // Instructions claires
                    setTimeout(() => {
                        showFormStatus('📧 Retournez sur votre client mail et cliquez sur "ENVOYER"', 'info');
                    }, 1000);

                    // Réinitialiser après 5 secondes
                    setTimeout(() => {
                        contactForm.reset();
                        submitBtn.innerHTML = originalText;
                        submitBtn.disabled = false;
                        submitBtn.classList.remove('btn-success');
                        submitBtn.className = originalClasses;
                        hideFormStatus();
                    }, 5000);

                } catch (error) {
                    showFormStatus('❌ Erreur: ' + error.message, 'error');
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    submitBtn.className = originalClasses;
                }
            }, 1000);
        });
    }
}

// Fonction de validation inchangée
function validateForm(name, email, subject, message) {
    if (!name || !email || !subject || !message) {
        showFormStatus('❌ Veuillez remplir tous les champs obligatoires.', 'error');
        return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showFormStatus('❌ Veuillez entrer une adresse email valide.', 'error');
        return false;
    }

    if (message.length < 10) {
        showFormStatus('❌ Le message doit contenir au moins 10 caractères.', 'error');
        return false;
    }

    return true;
}

// Fonctions d'affichage du statut inchangées
function showFormStatus(message, type) {
    const formStatus = document.getElementById('formStatus');
    if (!formStatus) return;

    formStatus.textContent = message;
    formStatus.className = 'form-status';
    formStatus.classList.add(type);
    formStatus.style.display = 'block';

    formStatus.style.opacity = '0';
    formStatus.style.transform = 'translateY(-10px)';

    setTimeout(() => {
        formStatus.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        formStatus.style.opacity = '1';
        formStatus.style.transform = 'translateY(0)';
    }, 10);
}

function hideFormStatus() {
    const formStatus = document.getElementById('formStatus');
    if (formStatus) {
        formStatus.style.opacity = '0';
        formStatus.style.transform = 'translateY(-10px)';
        setTimeout(() => {
            formStatus.style.display = 'none';
        }, 300);
    }
}

function initProjectModals() {
    const projectButtons = document.querySelectorAll('.project-detail-btn');
    const modal = document.getElementById('projectModal');
    const closeModal = document.getElementById('closeModal');
    const modalContent = document.getElementById('modalContent');

    if (!modal || !modalContent) return;

    // Données des projets
    const projectsData = {
        1: {
            title: "Conception et déploiement d'une solution de supervision réseau basée sur Zabbix",
            content: `
                <div class="modal-header">
                    <h2>Supervision Réseau avec Zabbix</h2>
                    <div class="modal-subtitle">Solution complète de monitoring réseau</div>
                </div>
                <div class="modal-body">
                    <h3><i class="fas fa-info-circle"></i> Contexte du projet</h3>
                    <p>Ce projet avait pour objectif de mettre en place une solution de supervision complète pour une infrastructure réseau d'entreprise. La solution devait permettre de surveiller l'ensemble des équipements réseau, serveurs et services en temps réel.</p>
                    
                    <h3><i class="fas fa-tasks"></i> Missions réalisées</h3>
                    <ul>
                        <li>Installation et configuration de Zabbix Server sur Ubuntu Server 22.04</li>
                        <li>Déploiement des agents Zabbix sur 15 serveurs Windows et Linux</li>
                        <li>Configuration du monitoring SNMP v3 pour 25 équipements réseau (routeurs, switches)</li>
                        <li>Création de templates de surveillance personnalisés pour différents types d'équipements</li>
                        <li>Configuration des alertes et notifications par email et SMS</li>
                        <li>Développement de tableaux de bord personnalisés avec Grafana</li>
                        <li>Mise en place de rapports automatisés hebdomadaires</li>
                        <li>Formation des administrateurs système à l'utilisation de la solution</li>
                    </ul>
                    
                    <h3><i class="fas fa-cogs"></i> Technologies utilisées</h3>
                    <div class="tech-stack">
                        <span class="tech-item">Zabbix 6.0</span>
                        <span class="tech-item">Ubuntu Server 22.04 LTS</span>
                        <span class="tech-item">MySQL 8.0</span>
                        <span class="tech-item">SNMP v3</span>
                        <span class="tech-item">Apache 2.4</span>
                        <span class="tech-item">Grafana 9.0</span>
                        <span class="tech-item">Bash Scripting</span>
                        <span class="tech-item">Python 3.10</span>
                    </div>
                    
                    <h3><i class="fas fa-chart-line"></i> Résultats obtenus</h3>
                    <ul>
                        <li><strong>Réduction de 40% du temps moyen de détection des incidents</strong></li>
                        <li>Surveillance de 50+ équipements réseau et serveurs</li>
                        <li>Alertes automatisées pour 200+ métriques différentes</li>
                        <li>Tableaux de bord en temps réel accessibles via interface web</li>
                        <li>Amélioration de 30% de la disponibilité des services</li>
                        <li>Réduction de 25% des coûts de maintenance</li>
                        <li>Documentation technique complète du système</li>
                    </ul>
                    
                    <h3><i class="fas fa-graduation-cap"></i> Compétences développées</h3>
                    <ul>
                        <li>Administration avancée de serveurs Linux</li>
                        <li>Configuration et optimisation de Zabbix</li>
                        <li>Monitoring réseau avec SNMP</li>
                        <li>Scripting Bash et Python pour l'automatisation</li>
                        <li>Gestion de bases de données MySQL</li>
                        <li>Intégration de systèmes (Zabbix + Grafana)</li>
                        <li>Documentation technique et formation d'utilisateurs</li>
                    </ul>
                </div>
            `
        },
        2: {
            title: "Déploiement d'une infrastructure réseau basée sur Windows Server",
            content: `
                <div class="modal-header">
                    <h2>Infrastructure Windows Server</h2>
                    <div class="modal-subtitle">Infrastructure réseau complète pour PME</div>
                </div>
                <div class="modal-body">
                    <h3><i class="fas fa-info-circle"></i> Contexte du projet</h3>
                    <p>Mise en place d'une infrastructure réseau complète pour une PME de 50 utilisateurs. L'objectif était de créer une infrastructure sécurisée, fiable, scalable et facile à administrer basée sur Windows Server 2022.</p>
                    
                    <h3><i class="fas fa-sitemap"></i> Architecture déployée</h3>
                    <ul>
                        <li>2 serveurs Windows Server 2022 Standard en cluster pour la haute disponibilité</li>
                        <li>Active Directory Domain Services pour la gestion centralisée des utilisateurs</li>
                        <li>Services DNS et DHCP intégrés avec réplication</li>
                        <li>Partage de fichiers avec quotas et permissions NTFS avancées</li>
                        <li>Politiques de groupe (GPO) pour la sécurité et la standardisation</li>
                        <li>WSUS pour la gestion centralisée des mises à jour Windows</li>
                        <li>Sauvegarde automatisée avec Windows Server Backup et rétention de 30 jours</li>
                        <li>Hyper-V pour la virtualisation de 3 serveurs applicatifs</li>
                        <li>DFS Replication pour la réplication des données critiques</li>
                    </ul>
                    
                    <h3><i class="fas fa-tasks"></i> Missions réalisées</h3>
                    <ul>
                        <li>Installation et configuration de Windows Server 2022 sur serveurs physiques</li>
                        <li>Promotion des contrôleurs de domaine et configuration de la réplication AD</li>
                        <li>Création de l'arborescence Active Directory (OU, groupes, utilisateurs, GPO)</li>
                        <li>Configuration des services réseau (DNS, DHCP avec réservations)</li>
                        <li>Mise en place des partages réseau avec permissions NTFS et quotas</li>
                        <li>Création et application de 15+ politiques de groupe (sécurité, bureau, applications)</li>
                        <li>Configuration de la réplication DFS pour les données importantes</li>
                        <li>Mise en place du système de sauvegarde automatisé</li>
                        <li>Déploiement de WSUS et configuration des mises à jour automatiques</li>
                        <li>Installation et configuration de Hyper-V avec machines virtuelles</li>
                        <li>Documentation complète de l'infrastructure et procédures d'administration</li>
                    </ul>
                    
                    <h3><i class="fas fa-cogs"></i> Technologies utilisées</h3>
                    <div class="tech-stack">
                        <span class="tech-item">Windows Server 2022</span>
                        <span class="tech-item">Active Directory Domain Services</span>
                        <span class="tech-item">DNS Server</span>
                        <span class="tech-item">DHCP Server</span>
                        <span class="tech-item">Group Policy</span>
                        <span class="tech-item">DFS Replication</span>
                        <span class="tech-item">WSUS</span>
                        <span class="tech-item">Hyper-V</span>
                        <span class="tech-item">Windows Server Backup</span>
                        <span class="tech-item">PowerShell 7.0</span>
                    </div>
                    
                    <h3><i class="fas fa-chart-line"></i> Résultats obtenus</h3>
                    <ul>
                        <li><strong>Infrastructure 100% opérationnelle et sécurisée</strong></li>
                        <li>Gestion centralisée de 50 comptes utilisateurs et 30 ordinateurs</li>
                        <li>Politiques de sécurité uniformes sur tous les postes de travail</li>
                        <li>Réduction de 60% du temps d'administration système</li>
                        <li>Sauvegarde automatisée avec rétention de 30 jours et tests de restauration</li>
                        <li>Haute disponibilité grâce au clustering et réplication</li>
                        <li>Virtualisation de 3 serveurs applicatifs sur 1 serveur physique</li>
                        <li>Documentation complète et procédures d'exploitation</li>
                    </ul>
                    
                    <h3><i class="fas fa-graduation-cap"></i> Compétences développées</h3>
                    <ul>
                        <li>Administration avancée Windows Server 2022</li>
                        <li>Gestion Active Directory et politiques de groupe</li>
                        <li>Configuration des services réseau (DNS, DHCP)</li>
                        <li>Sécurisation d'infrastructure Windows</li>
                        <li>Planification et mise en œuvre de la haute disponibilité</li>
                        <li>Virtualisation avec Hyper-V</li>
                        <li>Automatisation avec PowerShell</li>
                        <li>Documentation technique et procédures</li>
                    </ul>
                </div>
            `
        }
    };

    // Ouvrir la modale
    projectButtons.forEach(button => {
        button.addEventListener('click', () => {
            const projectId = button.getAttribute('data-project');
            const projectData = projectsData[projectId];

            if (projectData) {
                modalContent.innerHTML = projectData.content;
                modal.style.display = 'flex';
                document.body.style.overflow = 'hidden';

                // Ajouter une animation d'entrée
                modalContent.style.opacity = '0';
                modalContent.style.transform = 'translateY(20px)';

                setTimeout(() => {
                    modalContent.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                    modalContent.style.opacity = '1';
                    modalContent.style.transform = 'translateY(0)';
                }, 10);
            }
        });
    });

    // Fermer la modale
    function closeProjectModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    if (closeModal) {
        closeModal.addEventListener('click', closeProjectModal);
    }

    // Fermer en cliquant en dehors
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeProjectModal();
        }
    });

    // Fermer avec la touche Échap
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'flex') {
            closeProjectModal();
        }
    });
}

// ===== TÉLÉCHARGEMENT DU CV =====
function initCVDownload() {
    const downloadBtn = document.getElementById('downloadCV');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', () => {
            const cvUrl = 'image/Blue and White Background Simple Resume .pdf';
            const link = document.createElement('a');
            link.href = cvUrl;
            link.download = 'Blue and White Background Simple Resume .pdf';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });
    }
}



// ===== BOUTON RETOUR EN HAUT =====
function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');

    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

function updateBackToTopButton() {
    const backToTopBtn = document.getElementById('backToTop');

    if (backToTopBtn) {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    }
}

// ===== FONCTIONS UTILITAIRES =====
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Initialiser le bouton retour en haut
updateBackToTopButton();