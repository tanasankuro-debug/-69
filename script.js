/* ============================================
   StagflationTH — Main JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    initScrollReveal();
    initCharts();
    drawASADDiagram();
    initMobileMenu();
    initSmoothScroll();
});

/* ============================================
   Navbar Scroll Effect
   ============================================ */
function initNavbar() {
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 60) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });
}

/* ============================================
   Mobile Menu
   ============================================ */
function initMobileMenu() {
    const toggle = document.getElementById('navToggle');
    const menu = document.getElementById('mobileMenu');

    if (!toggle || !menu) return;

    toggle.addEventListener('click', () => {
        menu.classList.toggle('active');
        toggle.classList.toggle('active');
    });

    // Close menu on link click
    menu.querySelectorAll('.mobile-link').forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.remove('active');
            toggle.classList.remove('active');
        });
    });
}

/* ============================================
   Smooth Scroll
   ============================================ */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/* ============================================
   Scroll Reveal Animation
   ============================================ */
function initScrollReveal() {
    const revealElements = document.querySelectorAll(
        '.section-header, .paradox-card, .cycle-section, .chart-card, .indicator-card, ' +
        '.theory-card, .diagram-section, .impact-card, .policy-card, .research-section, .source-card'
    );

    revealElements.forEach(el => el.classList.add('reveal'));

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 80);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => observer.observe(el));
}

/* ============================================
   Chart.js Configurations
   ============================================ */
function initCharts() {
    // Global Chart.js defaults
    Chart.defaults.color = '#8888a0';
    Chart.defaults.borderColor = 'rgba(255, 255, 255, 0.06)';
    Chart.defaults.font.family = "'Inter', 'IBM Plex Sans Thai', sans-serif";
    Chart.defaults.font.size = 12;
    Chart.defaults.plugins.legend.labels.usePointStyle = true;
    Chart.defaults.plugins.legend.labels.pointStyleWidth = 10;

    createCPIPPIChart();
    createConfidenceChart();
    createDebtChart();
}

/* CPI vs PPI Chart */
function createCPIPPIChart() {
    const ctx = document.getElementById('cpiPpiChart');
    if (!ctx) return;

    const months = ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'];

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: months,
            datasets: [
                {
                    label: 'PPI (ดัชนีราคาผู้ผลิต)',
                    data: [3.8, 4.2, 4.8, 5.1, 5.6, 6.2, 6.8, 6.5, 5.9, 5.4, 5.1, 5.2],
                    borderColor: '#ef4444',
                    backgroundColor: 'rgba(239, 68, 68, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointRadius: 4,
                    pointBackgroundColor: '#ef4444',
                    pointBorderColor: '#0a0a0f',
                    pointBorderWidth: 2,
                    pointHoverRadius: 7
                },
                {
                    label: 'CPI (ดัชนีราคาผู้บริโภค)',
                    data: [2.1, 2.3, 2.6, 2.8, 3.0, 3.2, 3.1, 2.9, 2.7, 2.5, 2.6, 2.8],
                    borderColor: '#f59e0b',
                    backgroundColor: 'rgba(245, 158, 11, 0.08)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointRadius: 4,
                    pointBackgroundColor: '#f59e0b',
                    pointBorderColor: '#0a0a0f',
                    pointBorderWidth: 2,
                    pointHoverRadius: 7
                },
                {
                    label: 'ค่าจ้างจริง (Real Wage Growth)',
                    data: [0.5, 0.3, 0.1, -0.2, -0.5, -0.8, -1.0, -0.9, -0.6, -0.4, -0.3, -0.1],
                    borderColor: '#3b82f6',
                    backgroundColor: 'rgba(59, 130, 246, 0.08)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointRadius: 4,
                    pointBackgroundColor: '#3b82f6',
                    pointBorderColor: '#0a0a0f',
                    pointBorderWidth: 2,
                    pointHoverRadius: 7,
                    borderDash: [5, 5]
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                mode: 'index',
                intersect: false
            },
            plugins: {
                legend: {
                    position: 'top',
                    align: 'start',
                    labels: {
                        padding: 20,
                        font: { size: 11 }
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(17, 17, 24, 0.95)',
                    borderColor: 'rgba(255,255,255,0.1)',
                    borderWidth: 1,
                    padding: 14,
                    cornerRadius: 12,
                    titleFont: { size: 13, weight: '600' },
                    bodyFont: { size: 12 },
                    callbacks: {
                        label: (ctx) => `${ctx.dataset.label}: ${ctx.parsed.y}%`
                    }
                }
            },
            scales: {
                x: {
                    grid: { display: false },
                    ticks: { font: { size: 11 } }
                },
                y: {
                    grid: { color: 'rgba(255,255,255,0.04)' },
                    ticks: {
                        font: { size: 11 },
                        callback: (v) => v + '%'
                    }
                }
            }
        }
    });
}

/* Consumer Confidence Chart */
function createConfidenceChart() {
    const ctx = document.getElementById('confidenceChart');
    if (!ctx) return;

    const months = ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'];

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: months,
            datasets: [{
                label: 'ดัชนีความเชื่อมั่นผู้บริโภค',
                data: [56.2, 54.8, 53.1, 51.6, 50.2, 48.9, 47.5, 48.3, 49.1, 50.8, 49.5, 48.7],
                backgroundColor: (ctx) => {
                    const value = ctx.parsed.y;
                    if (value >= 55) return 'rgba(34, 197, 94, 0.6)';
                    if (value >= 50) return 'rgba(245, 158, 11, 0.6)';
                    return 'rgba(239, 68, 68, 0.5)';
                },
                borderColor: (ctx) => {
                    const value = ctx.parsed.y;
                    if (value >= 55) return '#22c55e';
                    if (value >= 50) return '#f59e0b';
                    return '#ef4444';
                },
                borderWidth: 1,
                borderRadius: 6,
                borderSkipped: false,
                barPercentage: 0.7,
                categoryPercentage: 0.8
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                    align: 'start',
                    labels: { padding: 20, font: { size: 11 } }
                },
                tooltip: {
                    backgroundColor: 'rgba(17, 17, 24, 0.95)',
                    borderColor: 'rgba(255,255,255,0.1)',
                    borderWidth: 1,
                    padding: 14,
                    cornerRadius: 12,
                    callbacks: {
                        label: (ctx) => `ดัชนี: ${ctx.parsed.y}`,
                        afterBody: (tooltipItems) => {
                            const val = tooltipItems[0].parsed.y;
                            if (val >= 55) return '✅ สถานะ: ค่อนข้างดี';
                            if (val >= 50) return '⚠️ สถานะ: ต้องระวัง';
                            return '🔴 สถานะ: ต่ำกว่าเกณฑ์';
                        }
                    }
                },
                annotation: {
                    annotations: {}
                }
            },
            scales: {
                x: {
                    grid: { display: false },
                    ticks: { font: { size: 11 } }
                },
                y: {
                    grid: { color: 'rgba(255,255,255,0.04)' },
                    min: 40,
                    max: 65,
                    ticks: { font: { size: 11 } }
                }
            }
        }
    });
}

/* Household Debt Chart */
function createDebtChart() {
    const ctx = document.getElementById('debtChart');
    if (!ctx) return;

    const years = ['2558', '2559', '2560', '2561', '2562', '2563', '2564', '2565', '2566', '2567'];

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: years,
            datasets: [{
                label: 'หนี้ครัวเรือน/GDP (%)',
                data: [80.2, 79.5, 78.1, 78.6, 79.8, 89.3, 90.1, 91.5, 90.8, 91.3],
                borderColor: '#f59e0b',
                backgroundColor: (ctx) => {
                    const chart = ctx.chart;
                    const { ctx: canvasCtx, chartArea } = chart;
                    if (!chartArea) return 'rgba(245, 158, 11, 0.1)';
                    const gradient = canvasCtx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
                    gradient.addColorStop(0, 'rgba(245, 158, 11, 0.2)');
                    gradient.addColorStop(1, 'rgba(245, 158, 11, 0.01)');
                    return gradient;
                },
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointRadius: 5,
                pointBackgroundColor: '#f59e0b',
                pointBorderColor: '#111118',
                pointBorderWidth: 3,
                pointHoverRadius: 8
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                    align: 'start',
                    labels: { padding: 20, font: { size: 11 } }
                },
                tooltip: {
                    backgroundColor: 'rgba(17, 17, 24, 0.95)',
                    borderColor: 'rgba(255,255,255,0.1)',
                    borderWidth: 1,
                    padding: 14,
                    cornerRadius: 12,
                    callbacks: {
                        title: (items) => `ปี พ.ศ. ${items[0].label}`,
                        label: (ctx) => `หนี้ครัวเรือน: ${ctx.parsed.y}% ของ GDP`,
                        afterBody: (items) => {
                            const val = items[0].parsed.y;
                            if (val > 90) return '⚠️ สูงกว่าเกณฑ์เตือนภัย (80%)';
                            if (val > 80) return '🟡 ใกล้เกณฑ์เตือนภัย';
                            return '✅ อยู่ในเกณฑ์ปกติ';
                        }
                    }
                }
            },
            scales: {
                x: {
                    grid: { display: false },
                    title: {
                        display: true,
                        text: 'ปี พ.ศ.',
                        color: '#55556a',
                        font: { size: 11 }
                    },
                    ticks: { font: { size: 11 } }
                },
                y: {
                    grid: { color: 'rgba(255,255,255,0.04)' },
                    min: 70,
                    max: 100,
                    ticks: {
                        font: { size: 11 },
                        callback: (v) => v + '%'
                    }
                }
            }
        }
    });
}

/* ============================================
   AS-AD Diagram (Canvas)
   ============================================ */
function drawASADDiagram() {
    const canvas = document.getElementById('asadDiagram');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;

    canvas.width = 500 * dpr;
    canvas.height = 400 * dpr;
    canvas.style.width = '500px';
    canvas.style.height = '400px';
    ctx.scale(dpr, dpr);

    const w = 500;
    const h = 400;
    const margin = { top: 40, right: 40, bottom: 60, left: 60 };
    const plotW = w - margin.left - margin.right;
    const plotH = h - margin.top - margin.bottom;

    // Clear
    ctx.clearRect(0, 0, w, h);

    // Background
    ctx.fillStyle = 'rgba(10, 10, 15, 0.5)';
    ctx.fillRect(0, 0, w, h);

    // Grid lines
    ctx.strokeStyle = 'rgba(255,255,255,0.04)';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 5; i++) {
        const x = margin.left + (plotW / 5) * i;
        const y = margin.top + (plotH / 5) * i;
        ctx.beginPath();
        ctx.moveTo(x, margin.top);
        ctx.lineTo(x, margin.top + plotH);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(margin.left, y);
        ctx.lineTo(margin.left + plotW, y);
        ctx.stroke();
    }

    // Axes
    ctx.strokeStyle = 'rgba(255,255,255,0.2)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(margin.left, margin.top);
    ctx.lineTo(margin.left, margin.top + plotH);
    ctx.lineTo(margin.left + plotW, margin.top + plotH);
    ctx.stroke();

    // Axis labels
    ctx.fillStyle = '#8888a0';
    ctx.font = '13px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Real GDP (ผลผลิตจริง)', margin.left + plotW / 2, h - 10);

    ctx.save();
    ctx.translate(18, margin.top + plotH / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText('ระดับราคา (Price Level)', 0, 0);
    ctx.restore();

    // Helper: draw curve
    function drawCurve(points, color, lineWidth, dash) {
        ctx.strokeStyle = color;
        ctx.lineWidth = lineWidth;
        ctx.setLineDash(dash || []);
        ctx.beginPath();
        ctx.moveTo(margin.left + points[0][0] * plotW, margin.top + (1 - points[0][1]) * plotH);
        for (let i = 1; i < points.length; i++) {
            ctx.lineTo(margin.left + points[i][0] * plotW, margin.top + (1 - points[i][1]) * plotH);
        }
        ctx.stroke();
        ctx.setLineDash([]);
    }

    // Helper: label
    function drawLabel(text, x, y, color, fontSize) {
        ctx.fillStyle = color;
        ctx.font = `bold ${fontSize || 13}px Inter, sans-serif`;
        ctx.textAlign = 'left';
        ctx.fillText(text, margin.left + x * plotW, margin.top + (1 - y) * plotH);
    }

    // AD1 (original)
    drawCurve([[0.15, 0.85], [0.5, 0.5], [0.85, 0.15]], '#3b82f6', 2.5);
    drawLabel('AD₁', 0.83, 0.12, '#3b82f6');

    // AD2 (shifted left)
    drawCurve([[0.05, 0.75], [0.35, 0.4], [0.7, 0.08]], '#3b82f6', 2, [6, 4]);
    drawLabel('AD₂', 0.68, 0.05, 'rgba(59, 130, 246, 0.6)');

    // AS1 (original)
    drawCurve([[0.15, 0.15], [0.5, 0.5], [0.72, 0.9]], '#ef4444', 2.5);
    drawLabel('AS₁', 0.7, 0.92, '#ef4444');

    // AS2 (shifted left)
    drawCurve([[0.05, 0.25], [0.35, 0.55], [0.55, 0.9]], '#ef4444', 2, [6, 4]);
    drawLabel('AS₂', 0.53, 0.92, 'rgba(239, 68, 68, 0.6)');

    // Equilibrium points
    function drawPoint(x, y, color, label) {
        const px = margin.left + x * plotW;
        const py = margin.top + (1 - y) * plotH;

        // Glow
        ctx.beginPath();
        ctx.arc(px, py, 12, 0, Math.PI * 2);
        ctx.fillStyle = color.replace(')', ', 0.2)').replace('rgb', 'rgba');
        ctx.fill();

        // Point
        ctx.beginPath();
        ctx.arc(px, py, 5, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();

        // Label
        ctx.fillStyle = color;
        ctx.font = 'bold 12px Inter, sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText(label, px + 14, py + 4);

        // Dashed lines to axes
        ctx.strokeStyle = color.replace(')', ', 0.3)').replace('rgb', 'rgba');
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(margin.left, py);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(px, margin.top + plotH);
        ctx.stroke();
        ctx.setLineDash([]);
    }

    // E1 - Original equilibrium
    drawPoint(0.5, 0.5, 'rgb(168, 162, 255)', 'E₁ (ดุลยภาพเดิม)');

    // E2 - New equilibrium (higher price, lower output)
    drawPoint(0.3, 0.52, 'rgb(251, 191, 36)', 'E₂ (Stagflation)');

    // Arrow from E1 to E2
    ctx.strokeStyle = '#fbbf24';
    ctx.lineWidth = 2;
    ctx.setLineDash([3, 3]);
    const e1x = margin.left + 0.5 * plotW;
    const e1y = margin.top + 0.5 * plotH;
    const e2x = margin.left + 0.3 * plotW;
    const e2y = margin.top + 0.48 * plotH;
    ctx.beginPath();
    ctx.moveTo(e1x, e1y);
    ctx.lineTo(e2x, e2y);
    ctx.stroke();
    ctx.setLineDash([]);

    // Arrowhead
    const angle = Math.atan2(e2y - e1y, e2x - e1x);
    ctx.fillStyle = '#fbbf24';
    ctx.beginPath();
    ctx.moveTo(e2x, e2y);
    ctx.lineTo(e2x - 10 * Math.cos(angle - 0.4), e2y - 10 * Math.sin(angle - 0.4));
    ctx.lineTo(e2x - 10 * Math.cos(angle + 0.4), e2y - 10 * Math.sin(angle + 0.4));
    ctx.closePath();
    ctx.fill();
}

/* ============================================
   Counter Animation
   ============================================ */
function animateValue(element, start, end, duration, suffix) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
        const current = start + (end - start) * eased;
        element.textContent = current.toFixed(1) + (suffix || '');
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

/* ============================================
   Resize Handler for Canvas
   ============================================ */
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        drawASADDiagram();
    }, 200);
});
