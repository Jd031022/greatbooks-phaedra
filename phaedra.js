// Phaedra Literary Archive - Interactive Elements

document.addEventListener('DOMContentLoaded', function() {
    // Navigation between sections
    const navLinks = document.querySelectorAll('.nav-link');
    const contentSections = document.querySelectorAll('.content-section');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('data-target');
            
            // Update active nav link
            navLinks.forEach(navLink => navLink.classList.remove('active'));
            this.classList.add('active');
            
            // Show target section
            contentSections.forEach(section => {
                section.classList.remove('active');
                if (section.id === targetId) {
                    section.classList.add('active');
                }
            });
            
            // Update footer links
            const footerLinks = document.querySelectorAll('.footer-links a[data-target]');
            footerLinks.forEach(footerLink => {
                footerLink.classList.remove('active');
                if (footerLink.getAttribute('data-target') === targetId) {
                    footerLink.classList.add('active');
                }
            });
            
            // Scroll to top of section
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });
    
    // Footer links also navigate
    document.querySelectorAll('.footer-links a[data-target]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('data-target');
            document.querySelector(`.nav-link[data-target="${targetId}"]`).click();
        });
    });
    
    // Toggle dark/light mode
    const toggleThemeBtn = document.getElementById('toggleTheme');
    toggleThemeBtn.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        const icon = this.querySelector('i');
        if (document.body.classList.contains('dark-mode')) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    });
    
    // Ambient audio control
    const playAudioBtn = document.getElementById('playAudio');
    const ambientAudio = document.getElementById('ambientAudio');
    let isPlaying = false;
    
    playAudioBtn.addEventListener('click', function() {
        if (isPlaying) {
            ambientAudio.pause();
            this.innerHTML = '<i class="fas fa-volume-up"></i>';
        } else {
            ambientAudio.play().catch(e => {
                console.log("Audio playback failed:", e);
                // Fallback for browsers that block autoplay
                alert("Click the audio button again to enable background music. Some browsers require user interaction first.");
            });
            this.innerHTML = '<i class="fas fa-volume-mute"></i>';
        }
        isPlaying = !isPlaying;
    });
    
    // Character cards interaction
    const characterCards = document.querySelectorAll('.character-card');
    const characterDetails = document.getElementById('characterDetails');
    
    const characterData = {
        phaedra: {
            name: "Phaedra",
            fullTitle: "Phaedra, Wife of Theseus",
            description: "Phaedra is the tragic heroine of the play, daughter of King Minos of Crete and Queen Pasiphaë. Married to Theseus, she becomes consumed by an illicit passion for her stepson Hippolytus. Her internal conflict between desire and honor, compounded by a family curse (her mother Pasiphaë fell in love with a bull, producing the Minotaur), drives the tragic narrative.",
            keyQuotes: [
                "'My wound is older. I was struck by love / For Theseus' son, the youthful conqueror.'",
                "'Venus I feel in all my fever'd frame.'",
                "'I have deserved it all; I'll bear it all.'"
            ],
            analysis: "Racine's Phaedra is one of literature's most psychologically complex heroines. Unlike Euripides' more directly culpable Phaedra, Racine's heroine is torn by guilt and tries to resist her passion. Her tragedy stems from both external fate (the family curse, Venus's wrath) and internal conflict, making her a profoundly human character.",
            significance: "Phaedra represents the Jansenist concept of human powerlessness against sin without divine grace. Her struggle exemplifies the 17th-century French moraliste examination of passion versus reason."
        },
        hippolytus: {
            name: "Hippolytus",
            fullTitle: "Hippolytus, Son of Theseus",
            description: "Hippolytus is Theseus's son by the Amazon Hippolyta. A devoted follower of Artemis, goddess of the hunt, he rejects love and sexuality, which makes him repulsed by Phaedra's advances. However, he secretly loves Aricia, the last descendant of a rival line to the Athenian throne, despite his father's prohibition.",
            keyQuotes: [
                "'My hands, trained not to punish innocence.'",
                "'The day is not more pure than is my heart.'",
                "'I love, I do confess it.' (Regarding Aricia)"
            ],
            analysis: "Hippolytus represents chastity and purity, yet his tragic flaw is his inability to communicate effectively. His rejection of Phaedra is morally correct but tactless, and his secret love for Aricia creates dramatic irony. His death results from Theseus's curse and Poseidon's intervention, highlighting the destructive power of divine forces in human affairs.",
            significance: "Hippolytus embodies neoclassical ideals of heroic virtue, yet his fate demonstrates how even virtue cannot protect against divine wrath and parental wrath."
        },
        theseus: {
            name: "Theseus",
            fullTitle: "Theseus, King of Athens",
            description: "Theseus is the legendary hero and king of Athens, absent for most of the play on a journey to the underworld. Believed dead, he returns to find his wife apparently violated by his son. His rash judgment and invocation of Poseidon's curse lead directly to Hippolytus's death.",
            keyQuotes: [
                "'Neptune has sworn, and he will keep his oath.'",
                "'A king's commands are justified by all.'",
                "'O moment of despair and of regret!'"
            ],
            analysis: "Theseus represents royal authority and paternal power, but also the dangers of rash judgment. His quickness to believe Oenone's accusation without investigating demonstrates how passion can cloud reason, even in a king. His grief upon learning the truth provides the play's emotional climax.",
            significance: "Theseus's character explores the responsibilities and failings of monarchy, a key concern in 17th-century France under Louis XIV's absolutist rule."
        },
        aricia: {
            name: "Aricia",
            fullTitle: "Aricia, Princess of Athens",
            description: "Aricia is the last surviving member of the Pallantidae, a rival line to the Athenian throne. Theseus has forbidden her to marry to prevent her from producing an heir. She becomes the object of Hippolytus's secret affection, and their mutual love creates additional tension in the play.",
            keyQuotes: [
                "'I dare not say I love, yet I do love.'",
                "'Can I then trust a passion so unlawful?'"
            ],
            analysis: "Aricia serves as a contrast to Phaedra—a virtuous love interest for Hippolytus. Her character allows Racine to explore legitimate versus illicit love. As the sole survivor at the play's end, she represents continuity and the possibility of redemption.",
            significance: "Aricia provides a legitimate outlet for Hippolytus's capacity for love, highlighting the distinction between forbidden passion (Phaedra) and permissible affection (Aricia)."
        },
        oenone: {
            name: "Oenone",
            fullTitle: "Oenone, Phaedra's Nurse",
            description: "Oenone is Phaedra's devoted nurse and confidante. She encourages Phaedra to confess her love to Hippolytus, then falsely accuses Hippolytus of rape when he rejects Phaedra. After Phaedra learns of Hippolytus's death and rejects her, Oenone commits suicide by throwing herself into the sea.",
            keyQuotes: [
                "'You love; you cannot conquer passion's fire.'",
                "'To save your fame, I'd sacrifice my soul.'"
            ],
            analysis: "Oenone represents practical, worldly advice contrasted with moral principle. Her devotion to Phaedra leads her to commit morally questionable acts, demonstrating how loyalty can become destructive. Her suicide acknowledges her guilt in the tragedy.",
            significance: "Oenone embodies the confidante role common in French classical tragedy, serving as a foil who reveals the protagonist's inner thoughts while also advancing the plot through action."
        },
        theramenes: {
            name: "Theramenes",
            fullTitle: "Theramenes, Hippolytus's Tutor",
            description: "Theramenes is Hippolytus's tutor and confidant. He brings news of Theseus's supposed death and later returns to deliver the lengthy, tragic account of Hippolytus's death at sea—a classic example of French classical tragedy's avoidance of onstage violence.",
            keyQuotes: [
                "'I bring you heavy news: the king is dead.'",
                "'A watery mountain raises its white crest / And bursts, and throws its foam against his face.' (Describing Hippolytus's death)"
            ],
            analysis: "Theramenes serves as a messenger and narrator, fulfilling the classical function of reporting offstage events. His detailed account of Hippolytus's death is one of Racine's most famous passages, showcasing his poetic skill in describing violent action through language rather than spectacle.",
            significance: "Theramenes represents the classical convention of messenger speeches, allowing Racine to maintain decorum (avoiding onstage violence) while achieving powerful emotional effects through vivid narration."
        }
    };
    
    characterCards.forEach(card => {
        card.addEventListener('click', function() {
            const character = this.getAttribute('data-character');
            const data = characterData[character];
            
            characterDetails.innerHTML = `
                <h3>${data.fullTitle}</h3>
                <p><strong>Character Analysis:</strong> ${data.description}</p>
                <div style="margin: 1rem 0;">
                    <h4>Key Quotes:</h4>
                    <ul style="list-style-type: none; padding-left: 0;">
                        ${data.keyQuotes.map(quote => `<li style="margin-bottom: 0.5rem; font-style: italic; color: var(--ink-light);">${quote}</li>`).join('')}
                    </ul>
                </div>
                <p><strong>Literary Significance:</strong> ${data.analysis}</p>
                <p><strong>Thematic Role:</strong> ${data.significance}</p>
            `;
            
            // Highlight selected card
            characterCards.forEach(c => c.style.backgroundColor = '');
            this.style.backgroundColor = 'rgba(184, 134, 11, 0.1)';
        });
    });
    
    // Explore button
    document.getElementById('exploreBtn').addEventListener('click', function() {
        document.querySelector('.nav-link[data-target="analysis"]').click();
    });
    
    // GitHub button in Creators section
    document.getElementById('githubBtn').addEventListener('click', function() {
        window.open('https://github.com/Jd031022, '_blank');
    });
    
    // Print page

    document.getElementById('printPage').addEventListener('click', function() {
        window.print();
    });
    
    // View source (GitHub)
    document.getElementById('viewSource').addEventListener('click', function() {
        window.open('https://github.com/Jd031022/greatbooks-phaedra', '_blank');
    });
    
    // Add some interactive hover effects
    const ancientCards = document.querySelectorAll('.ancient-card, .feature, .theme-card, .creator-card');
    ancientCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Initialize the page with some random facts
    const facts = [
        "Phaedra was Racine's last secular tragedy before he turned to religious themes.",
        "The play was initially titled 'Phèdre et Hippolyte' but was changed to simply 'Phèdre' in later editions.",
        "Racine wrote Phaedra in response to a rival playwright's adaptation of the same myth.",
        "The role of Phaedra is considered one of the most demanding in French classical theater.",
        "Phaedra is one of only two plays by Racine with a mythological rather than historical subject."
    ];
    
    // Display a random fact in the console (could be displayed on page if desired)
    console.log("Did you know? " + facts[Math.floor(Math.random() * facts.length)]);
    console.log("Website created by Juliane Rebecca S. Dayandante and Jethro J. Manzanillo");
});
