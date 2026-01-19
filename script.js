// Модальное окно для записи
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('bookingModal');
    const bookingButtons = document.querySelectorAll('.btn-service, .btn-primary');
    const closeBtn = document.querySelector('.close');
    const bookingForm = document.querySelector('.booking-form');

    // Открытие модального окна
    bookingButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Если кнопка в карточке услуги, заполняем выбранную услугу
            if (this.classList.contains('btn-service')) {
                const serviceName = this.closest('.service-info').querySelector('h3').textContent;
                document.getElementById('service').value = getServiceValue(serviceName);
            }
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    });

    // Закрытие модального окна
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    // Закрытие по клику вне модального окна
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Обработка формы
    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = {
            service: document.getElementById('service').value,
            name: document.getElementById('name').value,
            phone: document.getElementById('phone').value,
            date: document.getElementById('date').value
        };

        // В реальном приложении здесь был бы AJAX запрос
        showSuccessMessage(formData);
    });

    // Установка минимальной даты (сегодня)
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('date').min = today;

    // Плавная прокрутка для якорных ссылок
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 100;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Анимация появления элементов при скролле
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Применяем анимацию к элементам
    const animatedElements = document.querySelectorAll('.service-card, .category-card, .step');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Добавляем ховер-эффекты для карточек
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Функция для получения значения услуги из названия
function getServiceValue(serviceName) {
    const serviceMap = {
        'Пошив платьев': 'dress',
        'Пошив блузок и рубашек': 'blouse',
        'Юбки и брюки': 'skirt_pants',
        'Мужские костюмы': 'suit',
        'Мужские рубашки': 'shirt',
        'Услуги алтерции': 'alteration',
        'Ремонт одежды': 'repair',
        'Переделка одежды': 'remake'
    };
    
    return serviceMap[serviceName] || '';
}

// Функция показа успешного сообщения
function showSuccessMessage(formData) {
    const modal = document.getElementById('bookingModal');
    const serviceText = document.getElementById('service').options[document.getElementById('service').selectedIndex].text;
    
    modal.querySelector('.modal-content').innerHTML = `
        <span class="close">&times;</span>
        <div style="text-align: center; padding: 2rem;">
            <div style="font-size: 4rem; color: #27ae60; margin-bottom: 1rem;">
                <i class="fas fa-check-circle"></i>
            </div>
            <h2>Заявка отправлена!</h2>
            <p style="margin: 1rem 0;">Спасибо, ${formData.name}! Мы свяжемся с вами в ближайшее время для подтверждения записи.</p>
            <div style="background: #f8f9fa; padding: 1rem; border-radius: 8px; margin: 1rem 0;">
                <p><strong>Услуга:</strong> ${serviceText}</p>
                <p><strong>Дата:</strong> ${formData.date}</p>
                <p><strong>Телефон:</strong> ${formData.phone}</p>
            </div>
            <button class="btn-primary" onclick="closeModal()">Закрыть</button>
        </div>
    `;

    // Обновляем обработчик закрытия
    modal.querySelector('.close').addEventListener('click', function() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
}

// Функция закрытия модального окна
function closeModal() {
    const modal = document.getElementById('bookingModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
    
    // Перезагружаем страницу через секунду для сброса формы
    setTimeout(() => {
        location.reload();
    }, 1000);
}

// Добавляем стили для анимаций
const style = document.createElement('style');
style.textContent = `
    .service-card, .category-card, .step {
        transition: transform 0.3s ease, box-shadow 0.3s ease, opacity 0.6s ease;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .fade-in-up {
        animation: fadeInUp 0.6s ease-out;
    }
`;
document.head.appendChild(style);