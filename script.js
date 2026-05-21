/* =========================================
   Stagflation TH - Premium Script
   ========================================= */

// Wait for DOM
document.addEventListener('DOMContentLoaded', () => {
    initCursor();
    initMagnetic();
    initGSAP();
    initCharts();
});

/* --- Custom Cursor --- */
function initCursor() {
    const dot = document.querySelector('.cursor-dot');
    const outline = document.querySelector('.cursor-outline');
    
    if (!dot || !outline) return;
    
    // Disable on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    window.addEventListener('mousemove', (e) => {
        const posX = e.clientX;
        const posY = e.clientY;

        // Instant follow for dot
        dot.style.transform = `translate(${posX}px, ${posY}px)`;
        
        // Smooth follow for outline using animate
        outline.animate({
            transform: `translate(${posX}px, ${posY}px)`
        }, { duration: 500, fill: "forwards" });
    });

    // Hover effects on links and buttons
    const interactables = document.querySelectorAll('a, button, .magnetic-item');
    interactables.forEach(el => {
        el.addEventListener('mouseenter', () => {
            outline.style.transform = 'translate(-50%, -50%) scale(1.5)';
            outline.style.backgroundColor = 'rgba(255,255,255,0.1)';
        });
        el.addEventListener('mouseleave', () => {
            outline.style.transform = 'translate(-50%, -50%) scale(1)';
            outline.style.backgroundColor = 'transparent';
        });
    });
}

/* --- Magnetic Effect --- */
function initMagnetic() {
    const magneticItems = document.querySelectorAll('.magnetic-item');
    
    magneticItems.forEach(item => {
        item.addEventListener('mousemove', (e) => {
            const bound = item.getBoundingClientRect();
            const x = e.clientX - bound.left - bound.width / 2;
            const y = e.clientY - bound.top - bound.height / 2;
            
            gsap.to(item, {
                x: x * 0.3,
                y: y * 0.3,
                duration: 0.5,
                ease: 'power2.out'
            });
        });

        item.addEventListener('mouseleave', () => {
            gsap.to(item, {
                x: 0,
                y: 0,
                duration: 0.8,
                ease: 'elastic.out(1, 0.3)'
            });
        });
    });
}

/* --- GSAP Scroll Animations --- */
function initGSAP() {
    // Register plugin
    gsap.registerPlugin(ScrollTrigger);

    // Initial Reveal for Hero
    gsap.fromTo('.reveal-up', 
        { y: 50, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: 'power3.out' }
    );

    gsap.fromTo('.float-anim',
        { y: 30, opacity: 0, rotationX: 10 },
        { y: 0, opacity: 1, rotationX: 0, duration: 1.5, ease: 'power3.out', delay: 0.5 }
    );

    // Scroll Triggers for Sections
    const panels = document.querySelectorAll('.panel');
    panels.forEach((panel) => {
        // Reveal elements scrolling up
        const reveals = panel.querySelectorAll('.reveal-up');
        if (reveals.length > 0) {
            gsap.fromTo(reveals, 
                { y: 50, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 0.8, stagger: 0.1,
                    scrollTrigger: {
                        trigger: panel,
                        start: 'top 80%',
                    }
                }
            );
        }

        // Split Layout (Left / Right)
        const left = panel.querySelector('.reveal-left');
        const right = panel.querySelector('.reveal-right');
        const scale = panel.querySelector('.reveal-scale');

        if (left && right) {
            gsap.fromTo(left, { x: -50, opacity: 0 }, { x: 0, opacity: 1, duration: 0.8, scrollTrigger: { trigger: panel, start: 'top 75%' } });
            gsap.fromTo(right, { x: 50, opacity: 0 }, { x: 0, opacity: 1, duration: 0.8, scrollTrigger: { trigger: panel, start: 'top 75%' } });
        }
        if (scale) {
            gsap.fromTo(scale, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.6, delay: 0.4, ease: 'back.out(1.5)', scrollTrigger: { trigger: panel, start: 'top 75%' } });
        }
    });

    // 3D Cards Hover Effect
    const cards = document.querySelectorAll('.hover-3d');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((y - centerY) / centerY) * -10;
            const rotateY = ((x - centerX) / centerX) * 10;
            
            gsap.to(card, {
                rotationX: rotateX,
                rotationY: rotateY,
                transformPerspective: 1000,
                duration: 0.5,
                ease: 'power1.out'
            });
        });
        
        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                rotationX: 0,
                rotationY: 0,
                duration: 0.8,
                ease: 'elastic.out(1, 0.3)'
            });
        });
    });
}

/* --- Charts JS --- */
function initCharts() {
    Chart.defaults.color = '#8b8b9c';
    Chart.defaults.borderColor = 'rgba(255,255,255,0.05)';
    Chart.defaults.font.family = "'Outfit', sans-serif";
    
    // CPI vs PPI Chart
    const cpiCtx = document.getElementById('cpiChart');
    if (cpiCtx) {
        new Chart(cpiCtx, {
            type: 'line',
            data: {
                labels: ['Q1', 'Q2', 'Q3', 'Q4', 'Q1(Next)'],
                datasets: [
                    {
                        label: 'PPI (Cost)',
                        data: [4.2, 5.1, 6.5, 5.9, 5.2],
                        borderColor: '#ff3b5c',
                        backgroundColor: 'rgba(255, 59, 92, 0.1)',
                        borderWidth: 3,
                        tension: 0.4,
                        fill: true,
                        pointBackgroundColor: '#ff3b5c',
                        pointBorderColor: '#050508',
                        pointBorderWidth: 2,
                        pointRadius: 5
                    },
                    {
                        label: 'CPI (Price)',
                        data: [2.3, 2.8, 3.1, 2.7, 2.8],
                        borderColor: '#f59e0b',
                        backgroundColor: 'rgba(245, 158, 11, 0.1)',
                        borderWidth: 3,
                        tension: 0.4,
                        fill: true,
                        pointBackgroundColor: '#f59e0b',
                        pointBorderColor: '#050508',
                        pointBorderWidth: 2,
                        pointRadius: 5
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                interaction: { mode: 'index', intersect: false },
                plugins: {
                    legend: { position: 'top', labels: { usePointStyle: true, boxWidth: 8 } },
                    tooltip: {
                        backgroundColor: 'rgba(15, 15, 20, 0.9)',
                        titleColor: '#fff',
                        bodyColor: '#e2e8f0',
                        borderColor: 'rgba(255,255,255,0.1)',
                        borderWidth: 1,
                        padding: 12,
                        cornerRadius: 8
                    }
                },
                scales: {
                    x: { grid: { display: false } },
                    y: { ticks: { callback: (v) => v + '%' } }
                },
                animation: { duration: 2000, easing: 'easeOutQuart' }
            }
        });
    }

    // Debt Chart
    const debtCtx = document.getElementById('debtChart');
    if (debtCtx) {
        new Chart(debtCtx, {
            type: 'bar',
            data: {
                labels: ['2020', '2021', '2022', '2023', '2024'],
                datasets: [{
                    label: 'Household Debt / GDP',
                    data: [89.3, 90.1, 91.5, 90.8, 91.3],
                    backgroundColor: (context) => {
                        const chart = context.chart;
                        const {ctx, chartArea} = chart;
                        if (!chartArea) return null;
                        const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
                        gradient.addColorStop(0, 'rgba(59, 130, 246, 0.2)');
                        gradient.addColorStop(1, '#3b82f6');
                        return gradient;
                    },
                    borderRadius: 6,
                    barPercentage: 0.6
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        backgroundColor: 'rgba(15, 15, 20, 0.9)',
                        callbacks: { label: (ctx) => `${ctx.raw}%` }
                    }
                },
                scales: {
                    x: { grid: { display: false } },
                    y: { min: 80, max: 100 }
                },
                animation: { duration: 2000, easing: 'easeOutBounce' }
            }
        });
    }
}
