    const menuToggle = document.querySelector('.menu-toggle');
    const navigation = document.querySelector('.nav-links');

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

    document.querySelector('#quote-form').addEventListener('submit', (event) => {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      const details = [
        `Ονοματεπώνυμο: ${formData.get('name')}`,
        `Τηλέφωνο: ${formData.get('phone')}`,
        `Ενδιαφέρομαι για: ${formData.get('space')}`,
        `Περιοχή: ${formData.get('area') || 'Δεν αναφέρθηκε'}`,
        `Πληροφορίες: ${formData.get('details') || 'Δεν αναφέρθηκαν'}`
      ].join('\n');
      const subject = encodeURIComponent('Αίτημα προσφοράς για λύση σκίασης');
      window.location.href = `mailto:?subject=${subject}&body=${encodeURIComponent(details)}`;
      document.querySelector('#form-status').textContent = 'Το αίτημά σας ετοιμάστηκε σε νέο μήνυμα email.';
    });
