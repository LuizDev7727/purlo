export default async function getPostsHttp(organizationId: string) {
  const posts = [
    {
      id: 1,
      title: 'Lançamento do novo produto',
      thumbnail:
        'https://plus.unsplash.com/premium_photo-1751891806770-db33e1124093?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      type: 'image',
      platforms: ['instagram'],
      status: 'scheduled',
      scheduledFor: '2024-01-15 14:30',
      author: 'Maria Silva',
      progress: 100,
      createdAt: 'Jan 10, 2024',
      size: '2.4mb',
    },
    {
      id: 2,
      title: 'Tutorial: Como usar nossa plataforma',
      thumbnail:
        'https://plus.unsplash.com/premium_photo-1751891806770-db33e1124093?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      type: 'video',
      platforms: ['youtube', 'linkedin', 'tiktok'],
      status: 'processing',
      progress: 67,
      author: 'João Santos',
      createdAt: 'Jan 10, 2024',
      duration: '03:45',
      size: '45.2mb',
    },
    {
      id: 3,
      title: 'Depoimento de cliente satisfeito',
      thumbnail:
        'https://plus.unsplash.com/premium_photo-1751891806770-db33e1124093?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      type: 'video',
      platforms: ['instagram', 'facebook', 'youtube'],
      status: 'published',
      publishedAt: 'Jan 9, 2024',
      author: 'Ana Costa',
      createdAt: 'Jan 8, 2024',
      progress: 100,
      duration: '01:23',
      size: '18.7mb',
    },
    {
      id: 4,
      title: 'Infográfico: Estatísticas 2024',
      thumbnail:
        'https://plus.unsplash.com/premium_photo-1751891806770-db33e1124093?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      type: 'image',
      platforms: ['linkedin', 'twitter'],
      status: 'failed',
      error: 'Formato não suportado pelo LinkedIn',
      progress: 100,
      author: 'Carlos Oliveira',
      createdAt: 'Jan 9, 2024',
      size: '3.1mb',
    },
    {
      id: 5,
      title: 'Behind the scenes da equipe',
      thumbnail:
        'https://plus.unsplash.com/premium_photo-1751891806770-db33e1124093?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      type: 'video',
      platforms: ['instagram', 'tiktok'],
      status: 'published',
      publishedAt: 'Jan 8, 2024',
      author: 'Fernanda Lima',
      createdAt: 'Jan 7, 2024',
      duration: '00:58',
      size: '12.3mb',
    },
    {
      id: 6,
      title: 'Promoção especial de fim de ano',
      thumbnail:
        'https://plus.unsplash.com/premium_photo-1751891806770-db33e1124093?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      type: 'image',
      platforms: ['facebook', 'instagram', 'twitter'],
      status: 'scheduled',
      scheduledFor: '2024-01-12 18:00',
      author: 'Roberto Mendes',
      createdAt: 'Jan 9, 2024',
      size: '1.8mb',
    },
  ];

  return posts;
}
