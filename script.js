document.addEventListener('DOMContentLoaded', () => {
    // Smooth Scroll for Navigation
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            document.querySelector(targetId).scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Carousel with Touch Support
    class Carousel {
        constructor() {
            this.container = document.querySelector('.carousel-container');
            this.slides = document.querySelectorAll('.carousel-slide');
            this.prevBtn = document.querySelector('.prev-btn');
            this.nextBtn = document.querySelector('.next-btn');
            this.currentIndex = 0;
            this.touchStartX = 0;
            this.touchEndX = 0;
            this.autoSlide = null;
            this.init();
        }

        showSlide(index) {
            if (index >= this.slides.length) {
                this.currentIndex = 0;
            } else if (index < 0) {
                this.currentIndex = this.slides.length - 1;
            } else {
                this.currentIndex = index;
            }
            this.container.style.transform = `translateX(-${this.currentIndex * 100}%)`;
        }

        startAutoSlide() {
            this.autoSlide = setInterval(() => {
                this.showSlide(this.currentIndex + 1);
            }, 6000);
        }

        stopAutoSlide() {
            clearInterval(this.autoSlide);
        }

        init() {
            this.prevBtn.addEventListener('click', () => {
                this.showSlide(this.currentIndex - 1);
            });

            this.nextBtn.addEventListener('click', () => {
                this.showSlide(this.currentIndex + 1);
            });

            this.container.addEventListener('touchstart', (e) => {
                this.touchStartX = e.touches[0].clientX;
            });

            this.container.addEventListener('touchmove', (e) => {
                this.touchEndX = e.touches[0].clientX;
            });

            this.container.addEventListener('touchend', () => {
                const deltaX = this.touchEndX - this.touchStartX;
                if (deltaX > 50) {
                    this.showSlide(this.currentIndex - 1);
                } else if (deltaX < -50) {
                    this.showSlide(this.currentIndex + 1);
                }
            });

            this.container.addEventListener('mouseenter', () => this.stopAutoSlide());
            this.container.addEventListener('mouseleave', () => this.startAutoSlide());

            this.startAutoSlide();
            this.showSlide(this.currentIndex);
        }
    }

    new Carousel();

    // Energy Chart
    class EnergyChart {
        constructor() {
            this.ctx = document.getElementById('energyChart').getContext('2d');
            this.data = {
                labels: ['Solar', 'Wind', 'Hydro', 'Fossil', 'Nuclear'],
                datasets: [{
                    label: 'Global Energy Mix (%)',
                    data: [20, 15, 10, 45, 10],
                    backgroundColor: [
                        'rgba(255, 206, 86, 0.5)',
                        'rgba(75, 192, 192, 0.5)',
                        'rgba(54, 162, 235, 0.5)',
                        'rgba(153, 102, 255, 0.5)',
                        'rgba(255, 99, 132, 0.5)'
                    ],
                    borderColor: [
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 99, 132, 1)'
                    ],
                    borderWidth: 1
                }]
            };
            this.init();
        }

        init() {
            new Chart(this.ctx, {
                type: 'pie',
                data: this.data,
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'top',
                            labels: { color: '#4a2c0b' }
                        },
                        title: {
                            display: true,
                            text: '2025 Energy Consumption',
                            color: '#4a2c0b',
                            font: { size: 16 }
                        }
                    },
                    animation: {
                        animateScale: true,
                        animateRotate: true
                    }
                }
            });
        }
    }

    new EnergyChart();

    // Solar Panel Calculator
    class SolarCalculator {
        constructor() {
            this.form = document.getElementById('solarForm');
            this.resultDiv = document.getElementById('result');
            this.init();
        }

        calculatePanels(energyUsage, sunlightHours, panelWattage) {
            const dailyEnergy = energyUsage / 30; // kWh/day
            const panelOutput = (panelWattage * sunlightHours) / 1000; // kWh/day per panel
            const panelsNeeded = Math.ceil(dailyEnergy / panelOutput);
            return panelsNeeded;
        }

        init() {
            this.form.addEventListener('submit', (e) => {
                e.preventDefault();
                const energyUsage = parseFloat(document.getElementById('energyUsage').value);
                const sunlightHours = parseFloat(document.getElementById('sunlightHours').value);
                const panelWattage = parseFloat(document.getElementById('panelWattage').value);

                if (isNaN(energyUsage) || isNaN(sunlightHours) || isNaN(panelWattage)) {
                    this.resultDiv.textContent = 'Please enter valid numbers.';
                    return;
                }

                const panelsNeeded = this.calculatePanels(energyUsage, sunlightHours, panelWattage);
                this.resultDiv.textContent = `You need approximately ${panelsNeeded} solar panels.`;
            });
        }
    }

    new SolarCalculator();
});