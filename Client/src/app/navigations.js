export const navigations = [
  { name: 'Dashboard', path: '/dashboard', icon: 'dashboard' },
  { label: 'PAGES', type: 'label' },
  {
    name: 'Actuality',
    icon: 'crop_rotate',
    children: [
      { name: 'Posts', iconText: 'account_circle', path: '/dashboard/actuality',icon: 'border_color' },


    ],
  },
  {
    name: 'Users',
    icon: 'accessibility',
    children: [
      { name: 'All users', iconText: 'account_circle', path: '/dashboard/listusers',icon: ' wc' },
      { name: 'Profil', iconText: 'SI', path: '/dashboard/profil',icon: 'account_circle' },

    ],
  },
  {
    name: 'Events',
    icon: 'nature_people',
    children: [
      { name: 'Add event', iconText: 'account_circle', path: '/dashboard/event',icon: ' cake' },
      { name: 'Events done', iconText: 'account_circle', path: '/dashboard/eventsdone',icon: ' offline_pin' },
    ],
  },

  {
    name: 'Products',
    icon: 'local_parking',
    children: [
      { name: 'Add product', iconText: 'account_circle', path: '/dashboard/product',icon: ' add_circle' },


    ],
  },
  {
    name: 'Tools',
    icon: 'build',
    children: [
      { name: 'Add tools', iconText: 'account_circle', path: '/dashboard/tools',icon: 'desktop_mac' },


    ],
  },

];
