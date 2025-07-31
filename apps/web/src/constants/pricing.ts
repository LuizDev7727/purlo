export const PLANS = [
  {
    name: 'Grátis',
    info: 'Para testar a plataforma',
    price: {
      monthly: 0,
    },
    features: [
      { id: 1, text: 'Criar multiplos canais' },
      { id: 2, text: 'Upload de até', limit: '100 tags' },
      { id: 3, text: 'Customizable branded links' },
      { id: 4, text: 'Track clicks', tooltip: '1K clicks/month' },
      {
        id: 5,
        text: 'Community support',
        tooltip: 'Get answers your questions on discord',
      },
      {
        id: 6,
        text: 'AI powered suggestions',
        tooltip: 'Get up to 100 AI powered suggestions',
      },
    ],
    btn: {
      text: 'Começar Agora',
      href: '/auth/sign-up?plan=free',
      variant: 'default',
    },
  },
  {
    name: 'Pro',
    info: 'For small businesses',
    price: {
      monthly: 9,
    },
    features: [
      { id: 1, text: 'Criar multiplos canais' },
      { id: 2, text: 'Upload de até', limit: '100 tags' },
      { id: 3, text: 'Customizable branded links' },
      { id: 4, text: 'Track clicks', tooltip: '1K clicks/month' },
      {
        id: 5,
        text: 'Community support',
        tooltip: 'Get answers your questions on discord',
      },
      {
        id: 6,
        text: 'AI powered suggestions',
        tooltip: 'Get up to 100 AI powered suggestions',
      },
    ],
    btn: {
      text: 'Selecionar',
      href: '/auth/sign-up?plan=pro',
      variant: 'purple',
    },
  },
  {
    name: 'Business',
    info: 'For large organizations',
    price: {
      monthly: 49,
    },
    features: [
      { id: 1, text: 'Shorten links' },
      { id: 2, text: 'Unlimited tags' },
      { id: 3, text: 'Customizable branded links' },
      { id: 4, text: 'Track clicks', tooltip: 'Unlimited clicks' },
      { id: 5, text: 'Export click data', tooltip: 'Unlimited clicks' },
      {
        id: 6,
        text: 'Dedicated manager',
        tooltip: 'Get priority support from our team',
      },
      {
        id: 7,
        text: 'AI powered suggestions',
        tooltip: 'Get unlimited AI powered suggestions',
      },
    ],
    btn: {
      text: 'Selecionar',
      href: '/auth/sign-up?plan=business',
      variant: 'default',
    },
  },
];

export const PRICING_FEATURES = [
  {
    text: 'Shorten links',
    tooltip: 'Create shortened links',
  },
  {
    text: 'Track clicks',
    tooltip: 'Track clicks on your links',
  },
  {
    text: 'See top countries',
    tooltip: 'See top countries where your links are clicked',
  },
  {
    text: 'Upto 10 tags',
    tooltip: 'Add upto 10 tags to your links',
  },
  {
    text: 'Community support',
    tooltip: 'Community support is available for free users',
  },
  {
    text: 'Priority support',
    tooltip: 'Get priority support from our team',
  },
  {
    text: 'AI powered suggestions',
    tooltip: 'Get AI powered suggestions for your links',
  },
];

export const WORKSPACE_LIMIT = 2;
