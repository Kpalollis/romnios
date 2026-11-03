    const BUSINESS_EMAIL = '';
    const WHATSAPP_NUMBER = '';

    const menuToggle = document.querySelector('.menu-toggle');
    const navigation = document.querySelector('.nav-links');

    if (menuToggle && navigation) {
      menuToggle.addEventListener('click', () => {
        const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
        menuToggle.setAttribute('aria-expanded', String(!isOpen));
        menuToggle.setAttribute('aria-label', isOpen ? 'Άνοιγμα μενού' : 'Κλείσιμο μενού');
        navigation.classList.toggle('is-open', !isOpen);
      });

      navigation.addEventListener('click', (event) => {
        if (event.target.closest('a')) {
          menuToggle.setAttribute('aria-expanded', 'false');
          menuToggle.setAttribute('aria-label', 'Άνοιγμα μενού');
          navigation.classList.remove('is-open');
        }
      });
    }

    const quoteForm = document.querySelector('#quote-form');
    if (quoteForm) {
      quoteForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const details = [
          `Ονοματεπώνυμο: ${formData.get('name')}`,
          `Τηλέφωνο: ${formData.get('phone')}`,
          `Ώρα επικοινωνίας: ${formData.get('callback-time')}`,
          `Ενδιαφέρομαι για: ${formData.get('space')}`,
          `Περιοχή: ${formData.get('area') || 'Δεν αναφέρθηκε'}`,
          `Πληροφορίες: ${formData.get('details') || 'Δεν αναφέρθηκαν'}`
        ].join('\n');
        const subject = encodeURIComponent('Αίτημα προσφοράς για λύση σκίασης');
        window.location.href = `mailto:${BUSINESS_EMAIL}?subject=${subject}&body=${encodeURIComponent(details)}`;
        document.querySelector('#form-status').textContent = 'Ανοίγει έτοιμο email. Πατήστε Αποστολή για να καταχωρηθεί το αίτημα επιστροφής κλήσης.';
      });
    }

    const whatsappNumber = WHATSAPP_NUMBER.replace(/\D/g, '');
    document.querySelectorAll('.whatsapp-button').forEach((link) => {
      if (whatsappNumber) {
        const message = encodeURIComponent('Γεια σας, ενδιαφέρομαι για τέντα.');
        link.href = `https://wa.me/${whatsappNumber}?text=${message}`;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.title = 'Στείλτε μήνυμα στο WhatsApp';
      } else {
        link.title = 'Δεν έχει προστεθεί αριθμός WhatsApp. Ανοίγει η φόρμα επιστροφής κλήσης.';
        link.setAttribute('aria-label', 'WhatsApp. Προς το παρόν ανοίγει η φόρμα επιστροφής κλήσης.');
      }
    });
