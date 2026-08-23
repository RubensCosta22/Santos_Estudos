// Mobile sidebar behavior: close after navigation, outside tap and Escape.
// Kept isolated from app.js to avoid touching the main application logic.

const MOBILE_BREAKPOINT = 820

function sidebarElements() {
  return {
    sidebar: document.querySelector('#sidebar'),
    menuBtn: document.querySelector('#menuBtn'),
    nav: document.querySelector('#nav')
  }
}

function closeMobileSidebar() {
  const { sidebar } = sidebarElements()
  if (!sidebar) return
  sidebar.classList.remove('open')
  document.body.classList.remove('mobile-sidebar-open')
}

function syncMobileSidebarState() {
  const { sidebar } = sidebarElements()
  if (!sidebar) return
  document.body.classList.toggle(
    'mobile-sidebar-open',
    window.innerWidth <= MOBILE_BREAKPOINT && sidebar.classList.contains('open')
  )
}

// The app creates/binds the menu after authentication, so event delegation
// keeps this fix working regardless of when the shell becomes visible.
document.addEventListener('click', event => {
  if (window.innerWidth > MOBILE_BREAKPOINT) return

  const { sidebar, menuBtn, nav } = sidebarElements()
  if (!sidebar || !menuBtn) return

  // Let app.js toggle the menu first, then mirror the body state.
  if (event.target.closest('#menuBtn')) {
    queueMicrotask(syncMobileSidebarState)
    return
  }

  // Any navigation option must dismiss the drawer immediately.
  if (nav?.contains(event.target) && event.target.closest('button')) {
    closeMobileSidebar()
    return
  }

  // Tapping anywhere outside the drawer dismisses it.
  if (sidebar.classList.contains('open') && !sidebar.contains(event.target)) {
    closeMobileSidebar()
  }
})

document.addEventListener('keydown', event => {
  if (event.key === 'Escape') closeMobileSidebar()
})

window.addEventListener('resize', () => {
  if (window.innerWidth > MOBILE_BREAKPOINT) closeMobileSidebar()
  else syncMobileSidebarState()
})

// Prevent the page behind the drawer from scrolling on mobile.
const style = document.createElement('style')
style.textContent = `
  @media (max-width: ${MOBILE_BREAKPOINT}px) {
    body.mobile-sidebar-open { overflow: hidden; }
    .sidebar { width: min(82vw, 320px); }
  }
`
document.head.appendChild(style)
