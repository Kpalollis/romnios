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
      quoteForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const status = document.querySelector('#form-status');
        const submitButton = quoteForm.querySelector('button[type="submit"]');

        if (!BUSINESS_EMAIL) {
          status.textContent = 'Η φόρμα δεν είναι ακόμη ενεργή. Θα προστεθεί το email της επιχείρησης.';
          status.classList.add('is-error');
          return;
        }

        const formData = new FormData(quoteForm);
        formData.set('_subject', 'Νέο αίτημα προσφοράς | ΡΩΜΝΙΟΣ');
        formData.set('_template', 'table');
        status.classList.remove('is-error', 'is-success');
        status.textContent = 'Αποστολή αιτήματος...';
        submitButton.disabled = true;

        try {
          const response = await fetch(`https://formsubmit.co/ajax/${BUSINESS_EMAIL}`, {
            method: 'POST',
            headers: { Accept: 'application/json' },
            body: formData
          });
          const result = await response.json();

          if (!response.ok || result.success === false || result.success === 'false') {
            throw new Error('Form submission failed');
          }

          quoteForm.reset();
          status.textContent = 'Ευχαριστούμε! Λάβαμε το αίτημά σας και θα επικοινωνήσουμε μαζί σας.';
          status.classList.add('is-success');
        } catch {
          status.textContent = 'Δεν στάλθηκε το αίτημα. Δοκιμάστε ξανά σε λίγο.';
          status.classList.add('is-error');
        } finally {
          submitButton.disabled = false;
        }
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
