'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { type CreateUploadBody, createUploadSchema } from '@purlo/contracts';
import {
  FolderOpen,
  Music,
  Play,
  Plus,
  Share2,
  Trash2,
  Upload,
  UploadCloud,
  X,
  Youtube,
} from 'lucide-react';
import { type ChangeEvent, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { convertVideoToMP3 } from '@/lib/ffmpeg';
import { formatBytes } from '@/utils/format-bytes';

export default function CreatePost() {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<CreateUploadBody>({
    resolver: zodResolver(createUploadSchema),
  });

  const {
    fields: uploads,
    remove: removeUpload,
    append: appendUpload,
  } = useFieldArray({ control, name: 'uploads' });

  const firstFileOnUploadList = uploads[0]?.file;

  const [previewFile, setPreviewFile] = useState<File | undefined>(
    firstFileOnUploadList
  );

  async function handleCreateUpload({ uploads }: CreateUploadBody) {
    await Promise.all(
      uploads.map((upload) =>
        convertVideoToMP3(upload.file, () => {
          // console.log(`${upload.file} - ${progress}`);
        })
      )
    );
    // console.log('All files uploaded!');
  }

  function handleSelectFiles(event: ChangeEvent<HTMLInputElement>) {
    const { files } = event.target;

    if (!files) {
      return;
    }

    for (const file of files) {
      appendUpload({
        file,
        social: null,
        information: {
          title: file.name,
          description: '',
        },
      });
    }
  }

  function handleSelectedPreviewFile(file: File) {
    setPreviewFile(file);
  }

  function handleDeleteAllFiles() {
    reset({
      uploads: [],
    });
  }

  const getSocialIcon = (social: string | null) => {
    switch (social) {
      case 'youtube':
        return <Youtube className="h-4 w-4 text-red-500" />;
      case 'tiktok':
        return <Music className="h-4 w-4 text-black" />;
      case null:
        return null;
      default:
        return null;
    }
  };

  const getSocialLabel = (social: string | null) => {
    switch (social) {
      case 'youtube':
        return 'YouTube';
      case 'tiktok':
        return 'TikTok';
      case null:
        return null;
      default:
        return social;
    }
  };

  const getSocialBadgeStyle = (social: string | null) => {
    switch (social) {
      case 'youtube':
        return 'bg-red-50 text-red-700 border-red-200';
      case 'tiktok':
        return 'bg-gray-50 text-gray-700 border-gray-200';
      case null:
        return 'bg-gray-50 text-gray-700 border-gray-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const totalFiles = uploads.length;
  const totalSize = uploads.reduce((acc, upload) => acc + upload.file.size, 0);
  const hasUploads = uploads.length > 0;

  return (
    <form onSubmit={handleSubmit(handleCreateUpload)}>
      <input
        accept=".mp4"
        className="sr-only"
        id="file"
        multiple={true}
        name="file"
        onChange={handleSelectFiles}
        type="file"
      />
      <div className="space-y-6">
        {/* Video Preview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Play className="h-5 w-5" />
              Preview do Vídeo
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative mx-auto max-w-2xl overflow-hidden rounded-lg bg-black">
              {previewFile ? (
                // biome-ignore lint/a11y/useMediaCaption: sadasd
                <video
                  autoPlay={true}
                  className="aspect-video w-full"
                  controls={true}
                  src={URL.createObjectURL(previewFile)}
                />
              ) : (
                // biome-ignore lint/a11y/useMediaCaption: asadsad
                <video
                  className="aspect-video w-full"
                  src="/placeholder.svg?height=400&width=600&text=Video+Preview"
                />
              )}
            </div>
          </CardContent>
        </Card>

        {/* File Management */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5" />
              Gerenciar Arquivos
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* File Management Actions */}
            <div className="flex flex-col gap-2 sm:flex-row">
              <Button
                asChild
                className="flex flex-1 items-center gap-2"
                type="button"
              >
                <label htmlFor="file">
                  <FolderOpen className="size-4" />
                  Adicionar Vídeos
                </label>
              </Button>
              <Button
                className="flex items-center gap-2"
                disabled={!hasUploads || isSubmitting}
                onClick={handleDeleteAllFiles}
                type="button"
                variant="destructive"
              >
                <Trash2 className="h-4 w-4" />
                Limpar Tudo
              </Button>
              <Button
                className="flex items-center gap-2"
                disabled={isSubmitting || !hasUploads}
                type="submit"
              >
                <UploadCloud className="size-4" />
                Fazer Upload
              </Button>
            </div>

            {/* File Summary */}
            <div className="flex items-center justify-between rounded-lg border p-3">
              <div className="flex items-center gap-2">
                <Upload className="h-4 w-4" />
                <span className="font-medium">
                  {totalFiles} arquivo{totalFiles !== 1 ? 's' : ''} •{' '}
                  {uploads.length} upload
                  {uploads.length !== 1 ? 's' : ''}
                </span>
              </div>
              <span className="text-sm">Total: {formatBytes(totalSize)}</span>
            </div>

            <div className="text-center text-xs">
              Apenas arquivos .mp4 são aceitos
            </div>
          </CardContent>
        </Card>

        {/* Uploads Configuration */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Share2 className="h-5 w-5" />
              Configuração dos Uploads ({uploads.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {hasUploads ? (
                uploads.map((upload, index) => (
                  <div
                    className="space-y-4 rounded-lg border p-4"
                    key={upload.id}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex flex-1 items-center gap-3">
                        <div className="mt-2 h-2 w-2 flex-shrink-0 rounded-full" />
                        <div className="flex min-w-0 flex-1 flex-col">
                          <div className="mb-1 flex items-center gap-2">
                            <span
                              className="truncate font-medium text-sm"
                              title={upload.file.name}
                            >
                              {upload.file.name}
                            </span>
                            <div
                              className={`flex items-center gap-1 rounded-full border px-2 py-1 text-xs ${getSocialBadgeStyle(
                                upload.social
                              )}`}
                            >
                              {getSocialIcon(upload.social)}
                              {getSocialLabel(upload.social)}
                            </div>
                          </div>
                          <span className="text-gray-500 text-xs">
                            {formatBytes(upload.file.size)}
                          </span>
                        </div>
                      </div>
                      <Button
                        className="h-6 w-6 flex-shrink-0 p-1"
                        onClick={() => removeUpload(Number(upload.id))}
                        size="sm"
                        variant="ghost"
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor={`title-${index}`}>Título</Label>
                        <Input
                          id={`title-${index}`}
                          placeholder="Digite o título do post..."
                          {...register(`uploads.${index}.information.title`)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`social-${index}`}>Rede Social</Label>
                        <Select value={upload.social}>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione a rede social" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="youtube">
                              <div className="flex items-center gap-2">
                                <Youtube className="h-4 w-4 text-red-500" />
                                YouTube
                              </div>
                            </SelectItem>
                            <SelectItem value="tiktok">
                              <div className="flex items-center gap-2">
                                <Music className="h-4 w-4 text-black" />
                                TikTok
                              </div>
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <Textarea
                        className="w-full"
                        placeholder="Upload description"
                      />
                    </div>
                  </div>
                ))
              ) : (
                <p>Nenhum arquivo selecionado</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </form>
  );
}
