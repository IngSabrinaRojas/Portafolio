document.addEventListener('DOMContentLoaded', () => {
  // ==================== MENÚ HAMBURGUESA ====================
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (menuToggle && navLinks) {
    // Toggle del menú
    menuToggle.addEventListener('click', () => {
      const isActive = menuToggle.classList.toggle('active');
      navLinks.classList.toggle('active');
      menuToggle.setAttribute('aria-expanded', isActive);
    });

    // Cerrar menú al hacer clic en un enlace
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });

    // Cerrar menú al hacer clic fuera
    document.addEventListener('click', (e) => {
      if (!menuToggle.contains(e.target) && !navLinks.contains(e.target)) {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }
  // ==================== FIN MENÚ HAMBURGUESA ====================

  // Configuración del Intersection Observer para animaciones al hacer scroll
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15 // Se activa cuando el 15% de la sección es visible
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
    });
  }, observerOptions);

  // Seleccionar todas las secciones con la clase de animación
  const animatedSections = document.querySelectorAll('.animate-on-scroll');
  animatedSections.forEach(section => observer.observe(section));

  // ==================== FUNCIONALIDAD MODAL ====================
  const modalContacto = document.getElementById('modal-contacto');
  const modalProyectos = document.getElementById('modal-proyectos');
  const modalCursos = document.getElementById('modal-cursos');
  const btnsContact = document.querySelectorAll('.btn-contact:not(.btn-proyectos)');
  const btnsProyectos = document.querySelectorAll('.btn-proyectos');
  const btnsCursos = document.querySelectorAll('.btn-cursos');
  const modalCloses = document.querySelectorAll('.modal-close');

  // Función para abrir modal
  function openModal(modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  // Función para cerrar modal
  function closeModal(modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  // Abrir modal de contacto
  btnsContact.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal(modalContacto);
    });
  });

  // Abrir modal de proyectos
  btnsProyectos.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal(modalProyectos);
    });
  });

  // Abrir modal de cursos
  btnsCursos.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal(modalCursos);
    });
  });

  // Cerrar modal al hacer clic en la X
  modalCloses.forEach(closeBtn => {
    closeBtn.addEventListener('click', () => {
      const modal = closeBtn.closest('.modal-overlay');
      closeModal(modal);
    });
  });

  // Cerrar modal al hacer clic fuera del contenido
  document.querySelectorAll('.modal-overlay').forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal(modal);
      }
    });
  });

  // Cerrar modal con la tecla Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (modalContacto && modalContacto.classList.contains('active')) {
        closeModal(modalContacto);
      }
      if (modalProyectos && modalProyectos.classList.contains('active')) {
        closeModal(modalProyectos);
      }
      if (modalCursos && modalCursos.classList.contains('active')) {
        closeModal(modalCursos);
      }
    }
  });

  // ==================== BOTONES VER PROYECTO (CARD PILLS) ====================
  document.querySelectorAll('.card-pill[data-modal]').forEach(pill => {
    pill.addEventListener('click', () => {
      const modalId = pill.getAttribute('data-modal');
      const modal = document.getElementById(modalId);
      if (modal) openModal(modal);
    });
  });

  // ==================== CARRUSEL DE CURSOS ====================
  const coursesCarousel = document.querySelector('.courses-carousel');
  if (coursesCarousel) {
    const prevBtn = coursesCarousel.querySelector('.prev');
    const nextBtn = coursesCarousel.querySelector('.next');
    const indicators = coursesCarousel.querySelectorAll('.indicator');
    const cards = coursesCarousel.querySelectorAll('.course-card');
    let currentIndex = 0;

    function updateCarousel() {
      // Solo mostrar la tarjeta actual
      cards.forEach((card, index) => {
        card.style.display = index === currentIndex ? 'flex' : 'none';
      });

      // Actualizar indicadores
      indicators.forEach((ind, index) => {
        ind.classList.toggle('active', index === currentIndex);
      });
    }

    prevBtn.addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + cards.length) % cards.length;
      updateCarousel();
    });

    nextBtn.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % cards.length;
      updateCarousel();
    });

    indicators.forEach((ind, index) => {
      ind.addEventListener('click', () => {
        currentIndex = index;
        updateCarousel();
      });
    });

    // Inicializar carrusel
    updateCarousel();
  }
  // ==================== FIN CARRUSEL DE CURSOS ====================

  // ==================== GALERÍA CON CARRUSEL ====================
  const modalGallery = document.getElementById('modal-gallery');
  const galleryMainImage = document.querySelector('.gallery-main-image');
  const galleryPrevBtn = document.querySelector('.gallery-nav-btn.prev');
  const galleryNextBtn = document.querySelector('.gallery-nav-btn.next');
  const galleryIndicators = document.querySelectorAll('.gallery-indicator');
  let galleryImages = [];
  let currentGalleryIndex = 0;

  // Función para abrir la galería
  function openGallery(images, startIndex = 0) {
    galleryImages = images.filter(img => img !== '');
    currentGalleryIndex = startIndex;
    updateGalleryImage();
    modalGallery.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  // Función para cerrar la galería
  function closeGallery() {
    modalGallery.classList.remove('active');
    document.body.style.overflow = '';
  }

  // Actualizar imagen de la galería
  function updateGalleryImage() {
    if (galleryImages.length > 0) {
      galleryMainImage.src = galleryImages[currentGalleryIndex];
      
      // Actualizar indicadores
      galleryIndicators.forEach((ind, index) => {
        ind.classList.toggle('active', index === currentGalleryIndex);
        ind.style.display = index < galleryImages.length ? 'block' : 'none';
      });

      // Mostrar/ocultar botones de navegación
      if (galleryImages.length <= 1) {
        galleryPrevBtn.style.display = 'none';
        galleryNextBtn.style.display = 'none';
      } else {
        galleryPrevBtn.style.display = 'flex';
        galleryNextBtn.style.display = 'flex';
      }
    }
  }

  // Click en las imágenes con data-gallery
  document.querySelectorAll('.project-image-container[data-gallery]').forEach(container => {
    container.addEventListener('click', () => {
      const mainImg = container.querySelector('img:first-of-type');
      const altImg = container.querySelector('.image-alternativa');
      
      const images = [
        mainImg ? mainImg.src : '',
        altImg && altImg.src ? altImg.src : ''
      ].filter(img => img !== '' && !img.endsWith('/'));
      
      if (images.length > 0) {
        openGallery(images, 0);
      }
    });
  });

  // Navegación del carrusel
  galleryPrevBtn.addEventListener('click', () => {
    if (galleryImages.length > 1) {
      currentGalleryIndex = (currentGalleryIndex - 1 + galleryImages.length) % galleryImages.length;
      updateGalleryImage();
    }
  });

  galleryNextBtn.addEventListener('click', () => {
    if (galleryImages.length > 1) {
      currentGalleryIndex = (currentGalleryIndex + 1) % galleryImages.length;
      updateGalleryImage();
    }
  });

  // Click en indicadores
  galleryIndicators.forEach((ind, index) => {
    ind.addEventListener('click', () => {
      currentGalleryIndex = index;
      updateGalleryImage();
    });
  });

  // Cerrar galería
  const closeGalleryBtn = document.querySelector('.modal-gallery-close');
  if (closeGalleryBtn) {
    closeGalleryBtn.addEventListener('click', closeGallery);
  }
  
  if (modalGallery) {
    modalGallery.addEventListener('click', (e) => {
      if (e.target === modalGallery) {
        closeGallery();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (modalGallery && modalGallery.classList.contains('active')) {
      if (e.key === 'Escape') {
        closeGallery();
      } else if (e.key === 'ArrowLeft') {
        galleryPrevBtn.click();
      } else if (e.key === 'ArrowRight') {
        galleryNextBtn.click();
      }
    }
  });
  // ==================== FIN GALERÍA CON CARRUSEL ====================
});