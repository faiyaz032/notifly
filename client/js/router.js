//Normal router to change content for the app to be a SPA 
const router = {
  pages: [],
  show: new Event('show'),
  init: function () {
    router.pages = document.querySelectorAll('.page');
    router.pages.forEach(page => {
      page.addEventListener('show', router.pageShown);
    });

    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', router.nav);
    });

    history.replaceState({ page: 'notes' }, 'Notes', '/notes');
    window.addEventListener('popstate', router.poppin);
  },
  nav: function (event) {
    event.preventDefault();
    let currentPage = event.target.getAttribute('data-target');
    const activePage = document.querySelector('.active');
    if (activePage) {
      activePage.classList.remove('active');
    }

    const currentPageElement = document.getElementById(currentPage);
    if (currentPageElement) {
      currentPageElement.classList.add('active');
      history.pushState({ page: currentPage }, currentPage, `/${currentPage}`);
      currentPageElement.dispatchEvent(router.show);
    } else {
      console.log(`Element with id ${currentPage} not found`);
    }
  },
  pageShown: function (event) {
    console.log('Page', event.target.id, 'just shown');
  },

  poppin: function (event) {
    console.log(location.pathname, 'popstate event');
    let path = location.pathname;

    const activePage = document.querySelector('.active');
    if (activePage) {
      activePage.classList.remove('active');
    }

    let currentPage = 'notes';
    if (path.startsWith('/notes')) {
      currentPage = 'notes';
    } else if (path.startsWith('/favourites')) {
      currentPage = 'favourites';
    } else if (path.startsWith('/login')) {
      currentPage = 'login';
    } else {
      currentPage = path.substr(1);
    }

    if (document.getElementById(currentPage)) {
      document.getElementById(currentPage).classList.add('active');
      document.getElementById(currentPage).dispatchEvent(router.show);
    } else {
      document.getElementById('notes').classList.add('active');
      history.replaceState({ page: 'notes' }, 'Notes', '/notes');
      document.getElementById('notes').dispatchEvent(router.show);
    }
  }
};

document.addEventListener('DOMContentLoaded', router.init);