document.addEventListener("DOMContentLoaded", function() {

        /* =========================================
             0.1 FORCE PAGE TO TOP ON REFRESH
           ========================================= */
    if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);

// ... the rest of your existing JavaScript starts below this ...
    
    // 1. DYNAMIC NAVIGATION BAR
    const nav = document.getElementById('mainNav');
    
    window.addEventListener('scroll', function() {
        // If you scroll down more than 50 pixels, add the solid color
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            // If you scroll back to the top, make it transparent again
            nav.classList.remove('scrolled');
        }
    });

    // 2. FADE & SLIDE SCROLL REVEAL
    const reveals = document.querySelectorAll('.reveal');

    // This checks if the element has entered the screen
    const revealOptions = {
        threshold: 0.15, // Triggers when 15% of the element is visible
        rootMargin: "0px 0px -50px 0px" 
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(function(entry) {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('active');
                // Stop observing once it has been revealed
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    // Attach the observer to every element with the 'reveal' class
    reveals.forEach(function(reveal) {
        revealOnScroll.observe(reveal);
    });

    // 3. SMOOTH SCROLLING FOR LINKS
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(function(anchor) {
        anchor.addEventListener('click', function (e) {
            e.preventDefault(); 
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // 4. CONTACT FORM HANDLER
    // this is handled by Netlify Forms, so no JavaScript is actually needed for it to work! But we could add some custom validation 
    // or a success message here if we wanted to in the future.
    
    
    // 5. THE DYNAMIC TYPING EFFECT
    const typingText = document.querySelector('.typing-text');
    const words = ["Overflowing Bins.", "Flaky Volunteers.",  "Event Trash."];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    if (typingText) {
        function type() {
            const currentWord = words[wordIndex];
            
            if (isDeleting) {
                typingText.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typingText.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
            }

            let typeSpeed = isDeleting ? 50 : 100;

            if (!isDeleting && charIndex === currentWord.length) {
                typeSpeed = 2000; // Pause at the end of the word
                // Stop completely on the final word ("Event Trash.")
                if (wordIndex === words.length - 1) return; 
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex++;
                typeSpeed = 500; // Pause before typing the next word
            }

            setTimeout(type, typeSpeed);
        }
        // Start the typing effect after a short delay
        setTimeout(type, 1000); 
    }

    // 6. THE LIVE STATS COUNTER
    const counters = document.querySelectorAll('.counter');
    const statsSection = document.querySelector('.stats-section');
    let hasCounted = false;

    if (statsSection) {
        const counterObserver = new IntersectionObserver(function(entries) {
            if (entries[0].isIntersecting && !hasCounted) {
                hasCounted = true;
                counters.forEach(counter => {
                    const updateCount = () => {
                        const target = +counter.getAttribute('data-target');
                        const count = +counter.innerText;
                        // Speed of the spin
                        const inc = target / 100; 

                        if (count < target) {
                            counter.innerText = Math.ceil(count + inc);
                            setTimeout(updateCount, 20);
                        } else {
                            counter.innerText = target;
                            // Add a "+" sign to the middle stat
                            if (target === 5000) counter.innerText = "5,000+";
                            if (target === 100) counter.innerText = "100%";
                        }
                    };
                    updateCount();
                });
            }
        }, { threshold: 0.5 }); // Triggers when halfway visible

        counterObserver.observe(statsSection);
    }

    // 7. EXPERIENCE TYPING EFFECT
    const typingExp = document.querySelector('.typing-experience');
    const expWords = ["Tested.", "Proven.", "Reliable.", "Tested. Proven. Reliable."];
    let expWordIndex = 0;
    let expCharIndex = 0;
    let expIsDeleting = false;

    if (typingExp) {
        function typeExp() {
            const currentWord = expWords[expWordIndex];

            if (expIsDeleting) {
                typingExp.textContent = currentWord.substring(0, expCharIndex - 1);
                expCharIndex--;
            } else {
                typingExp.textContent = currentWord.substring(0, expCharIndex + 1);
                expCharIndex++;
            }

            let typeSpeed = expIsDeleting ? 50 : 100;

            if (!expIsDeleting && expCharIndex === currentWord.length) {
                // If it's the very last phrase, stop completely!
                if (expWordIndex === expWords.length - 1) return;
                
                typeSpeed = 1000; // Pause to read the word before deleting
                expIsDeleting = true;
            } else if (expIsDeleting && expCharIndex === 0) {
                expIsDeleting = false;
                expWordIndex++;
                typeSpeed = 400;
            }

            setTimeout(typeExp, typeSpeed);
        }

        // We use an observer so it only starts typing WHEN the user scrolls down to it!
        const expObserver = new IntersectionObserver(function(entries, observer) {
            if (entries[0].isIntersecting) {
                setTimeout(typeExp, 500);
                observer.disconnect(); // Only play the animation once
            }
        }, { threshold: 0.5 });

        const expSection = document.getElementById('experience');
        if (expSection) expObserver.observe(expSection);
    }

    // 8. FAQ ACCORDION LOGIC
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            // Close all other open answers for a clean look
            faqQuestions.forEach(item => {
                if (item !== question) {
                    item.classList.remove('active');
                    item.nextElementSibling.style.maxHeight = null;
                }
            });

            // Toggle the clicked one
            question.classList.toggle('active');
            const answer = question.nextElementSibling;
            if (question.classList.contains('active')) {
                answer.style.maxHeight = answer.scrollHeight + "px";
            } else {
                answer.style.maxHeight = null;
            }
        });
    });

    // 9. BACK TO TOP BUTTON LOGIC
    const topButton = document.getElementById("backToTop");
    
    window.addEventListener("scroll", () => {
        if (window.scrollY > 500) {
            topButton.classList.add("show");
        } else {
            topButton.classList.remove("show");
        }
    });

    if (topButton) {
        topButton.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }

    // 10. MOBILE MENU TOGGLE
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links li a');

    if (mobileMenu) {
        // Toggle the menu open and closed
        mobileMenu.addEventListener('click', function() {
            mobileMenu.classList.toggle('is-active');
            navMenu.classList.toggle('active');
            
            // Forces the nav background to turn black so the menu is easy to read
            nav.classList.add('scrolled'); 
        });

        // Close the menu automatically when a link is clicked
        navItems.forEach(item => {
            item.addEventListener('click', function() {
                mobileMenu.classList.remove('is-active');
                navMenu.classList.remove('active');
            });
        });
    }

    // 11. RANDOMIZED INFINITE SCROLL GALLERY
    const galleryTrack = document.getElementById('randomGallery');

    if (galleryTrack) {
        // THE MASTER PHOTO LIST: Add all your future photo file names right here!
        const myPhotos = [
            "team-1.jpg", 
            "team-2.jpg", 
            "team-3.jpg", 
            "hero-bg.jpg"
            // Just add a comma and "new-photo.jpg" when you get more!
        ];

        // The Shuffle Machine (Fisher-Yates Algorithm)
        function shuffleDeck(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
        }

        // 1. Shuffle our master list
        const shuffledPhotos = shuffleDeck([...myPhotos]);

        // 2. Build the HTML for the images
        let galleryHTML = '';
        shuffledPhotos.forEach(photo => {
            galleryHTML += `<img src="images/${photo}" alt="Bag It & Tag It Event Action">`;
        });

        // 3. Duplicate it so the CSS animation loops seamlessly without a gap
        // 3.1 Duplicate it 4 times so it completely fills wide monitors and stops issues with rendering/loading new photos in time
        galleryTrack.innerHTML = galleryHTML + galleryHTML + galleryHTML + galleryHTML;
    }
});