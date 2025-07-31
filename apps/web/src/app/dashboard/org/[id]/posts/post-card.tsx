type Post = {
  id: number;
  title: string;
  thumbnail: string;
  type: string;
  platforms: string[];
  status: string;
  scheduledFor?: string;
  author: string;
  progress?: number;
  createdAt: string;
  size: string;
  duration?: string; // Make this optional
  publishedAt?: string;
  error?: string;
};

import {
  AlertCircle,
  CheckCircle,
  Clock,
  Download,
  Eye,
  Facebook,
  Instagram,
  Linkedin,
  MoreHorizontal,
  Music,
  Play,
  Share2,
  Twitter,
  User,
  XCircle,
  Youtube,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CardContent } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

type PostCardProps = {
  post: Post;
};

export default function PostCard({ post }: PostCardProps) {
  const getPlatformIcon = (platform: string) => {
    const icons = {
      instagram: <Instagram className="size-4" />,
      facebook: <Facebook className="size-4" />,
      twitter: <Twitter className="size-4" />,
      youtube: <Youtube className="size-4" />,
      linkedin: <Linkedin className="size-4" />,
      tiktok: <Music className="size-4" />,
    };
    return icons[platform as keyof typeof icons];
  };

  const getStatusIcon = (status: string) => {
    const icons = {
      scheduled: <Clock className="size-4 text-blue-400" />,
      published: <CheckCircle className="size-4 text-green-400" />,
      processing: <AlertCircle className="size-4 text-yellow-400" />,
      failed: <XCircle className="size-4 text-red-400" />,
    };
    return icons[status as keyof typeof icons];
  };

  const getStatusColor = (status: string) => {
    const colors = {
      scheduled: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      published: 'bg-green-500/20 text-green-400 border-green-500/30',
      processing: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      failed: 'bg-red-500/20 text-red-400 border-red-500/30',
    } as const;
    return colors[status as keyof typeof colors];
  };

  return (
    <div className="rounded-lg border dark:bg-card">
      <div className="group relative overflow-hidden rounded-t-lg transition-colors">
        <img
          alt={post.title}
          className="h-40 w-full object-cover"
          src={post.thumbnail}
        />
        {post.type === 'video' && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="rounded-full p-3">
              <Play className="size-6 text-white" />
            </div>
          </div>
        )}
        {post.status === 'processing' && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="mb-2 size-16 animate-spin rounded-full border-4 border-t-transparent" />
              <p className="text-muted-foreground text-sm">{post.progress}%</p>
            </div>
          </div>
        )}
        <div className="absolute top-2 right-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                className="opacity-0 transition-opacity group-hover:opacity-100"
                size="icon"
                variant="ghost"
              >
                <MoreHorizontal className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Eye className="mr-2 size-4" />
                Visualizar
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Download className="mr-2 size-4" />
                Download
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Share2 className="mr-2 size-4" />
                Compartilhar
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <CardContent className="p-4">
        <div className="space-y-3">
          <div>
            <h3 className="mb-1 line-clamp-2 font-medium text-sm">
              {post.title}
            </h3>
            <div className="mb-2 flex items-center gap-2">
              {post.platforms.map((platform) => (
                <div key={platform}>{getPlatformIcon(platform)}</div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between text-xs">
            <Badge className={getStatusColor(post.status)} variant="outline">
              <div className="flex items-center gap-1">
                {getStatusIcon(post.status)}
                {post.status === 'scheduled'
                  ? 'Agendado'
                  : post.status === 'published'
                    ? 'Publicado'
                    : post.status === 'processing'
                      ? 'Processando'
                      : 'Falhou'}
              </div>
            </Badge>
            <span className="text-gray-400">{post.size}</span>
          </div>

          {post.duration && (
            <div className="flex items-center justify-between text-xs">
              <span>Duração</span>
              <span>{post.duration}</span>
            </div>
          )}

          <div className="flex items-center justify-between border-t pt-2 text-xs">
            <div className="flex items-center gap-1">
              <User className="h-3 w-3" />
              <span>{post.author}</span>
            </div>
            <span>{post.createdAt}</span>
          </div>
        </div>
      </CardContent>
    </div>
  );
}
