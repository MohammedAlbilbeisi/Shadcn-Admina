import {
  IconApps,
  IconBarrierBlock,
  IconBoxSeam,
  IconChartHistogram,
  IconChecklist,
  IconComponents,
  IconError404,
  IconExclamationCircle,
  IconHexagonNumber1,
  IconHexagonNumber2,
  IconHexagonNumber3,
  IconHexagonNumber4,
  IconHexagonNumber5,
  IconLayoutDashboard,
  IconMessages,
  IconRouteAltLeft,
  IconServerOff,
  IconSettings,
  IconTruck,
  IconUserShield,
  IconUsers,
  IconLock,
} from '@tabler/icons-react'

export interface NavLink {
  title: string
  label?: string
  href: string
  icon: JSX.Element
}

export interface SideLink extends NavLink {
  sub?: NavLink[]
}

export const sidelinks: SideLink[] = [
  {
    title: 'Dashboard',
    label: '',
    href: '/dashboard',
    icon: <IconLayoutDashboard size={18} />,
  },
  {
    title: 'Tasks',
    label: '3',
    href: '/dashboard/tasks',
    icon: <IconChecklist size={18} />,
  },
  {
    title: 'Chats',
    label: '9',
    href: '/dashboard/chats',
    icon: <IconMessages size={18} />,
  },
  {
    title: 'Apps',
    label: '',
    href: '/dashboard/apps',
    icon: <IconApps size={18} />,
  },
  {
    title: 'Authentication',
    label: '',
    href: '/dashboard',
    icon: <IconUserShield size={18} />,
    sub: [
      {
        title: 'Sign In (Box)',
        label: '',
        href: '/sign-in-2',
        icon: <IconHexagonNumber2 size={18} />,
      },
      {
        title: 'Sign Up',
        label: '',
        href: '/sign-up',
        icon: <IconHexagonNumber3 size={18} />,
      },
      {
        title: 'Forgot Password',
        label: '',
        href: '/forgot-password',
        icon: <IconHexagonNumber4 size={18} />,
      },
      {
        title: 'OTP',
        label: '',
        href: '/otp',
        icon: <IconHexagonNumber5 size={18} />,
      },
    ],
  },
  {
    title: 'Users',
    label: '',
    href: '/dashboard/users',
    icon: <IconUsers size={18} />,
  },
  {
    title: 'Requests',
    label: '10',
    href: '/dashboard/requests',
    icon: <IconRouteAltLeft size={18} />,
    sub: [
      {
        title: 'Trucks',
        label: '9',
        href: '/trucks',
        icon: <IconTruck size={18} />,
      },
      {
        title: 'Cargos',
        label: '',
        href: '/cargos',
        icon: <IconBoxSeam size={18} />,
      },
    ],
  },
  {
    title: 'Analysis',
    label: '',
    href: '/dashboard/analysis',
    icon: <IconChartHistogram size={18} />,
  },
  {
    title: 'Extra Components',
    label: '',
    href: '/dashboard/extra-components',
    icon: <IconComponents size={18} />,
  },
  {
    title: 'Error Pages',
    label: '',
    href: '',
    icon: <IconExclamationCircle size={18} />,
    sub: [
      {
        title: 'Not Found',
        label: '',
        href: '/404',
        icon: <IconError404 size={18} />,
      },
      {
        title: 'Internal Server Error',
        label: '',
        href: '/500',
        icon: <IconServerOff size={18} />,
      },
      {
        title: 'Maintenance Error',
        label: '',
        href: '/503',
        icon: <IconBarrierBlock size={18} />,
      },
      {
        title: 'Unauthorised Error',
        label: '',
        href: '/401',
        icon: <IconLock size={18} />,
      },
    ],
  },
  {
    title: 'Settings',
    label: '',
    href: '/dashboard/settings',
    icon: <IconSettings size={18} />,
  },
]
