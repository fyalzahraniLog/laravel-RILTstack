import {
    FileAudio,
    FileIcon,
    FileImage,
    FileText,
    FileVideo,
    Plus,
    Trash2,
    X,
} from 'lucide-react';
import { type ChangeEvent, useRef } from 'react';

type FileUploadProps = {
    files: File[];
    onFilesChange: (files: File[]) => void;
    disabled?: boolean;
    accept?: string;
};

export function FileUpload({ files, onFilesChange, disabled, accept = "image/*" }: FileUploadProps) {
    const inputRef = useRef<HTMLInputElement>(null);

    function handleFileSelect(e: ChangeEvent<HTMLInputElement>) {
        if (!e.target.files?.length) return;
        const newFiles = Array.from(e.target.files);
        onFilesChange([...files, ...newFiles]);
        if (inputRef.current) inputRef.current.value = '';
    }

    function removeFile(fileToRemove: File) {
        onFilesChange(files.filter(f => f !== fileToRemove));
    }

    function handleClear() {
        onFilesChange([]);
    }

    return (
        <div className="flex flex-col gap-4">
            <div className="flex gap-2">
                <FileInput inputRef={inputRef} disabled={!!disabled} onFileSelect={handleFileSelect} accept={accept} />
                {files.length > 0 && (
                    <button
                        type="button"
                        onClick={handleClear}
                        className="flex items-center gap-2 rounded-md bg-destructive/10 px-4 py-2 text-destructive hover:bg-destructive/20 text-sm font-medium transition-colors"
                        disabled={disabled}
                    >
                        <Trash2 size={16} />
                        Clear All
                    </button>
                )}
            </div>
            <FileList files={files} onRemove={removeFile} disabled={!!disabled} />
        </div>
    );
}

function FileInput({ inputRef, disabled, onFileSelect, accept }: { inputRef: React.RefObject<HTMLInputElement>, disabled: boolean, onFileSelect: (e: ChangeEvent<HTMLInputElement>) => void, accept?: string }) {
    return (
        <>
            <input
                type="file"
                ref={inputRef}
                onChange={onFileSelect}
                multiple
                className="hidden"
                id="file-upload"
                disabled={disabled}
                accept={accept}
            />
            <label
                htmlFor="file-upload"
                className="flex cursor-pointer items-center gap-2 rounded-md bg-secondary text-secondary-foreground px-4 py-2 hover:bg-secondary/80 text-sm font-medium transition-colors"
            >
                <Plus size={16} />
                Select Images
            </label>
        </>
    );
}

function FileList({ files, onRemove, disabled }: { files: File[], onRemove: (file: File) => void, disabled: boolean }) {
    if (files.length === 0) return null;

    return (
        <div className="space-y-2 mt-2">
            <h3 className="font-semibold text-sm text-muted-foreground">Selected Files ({files.length}):</h3>
            <div className="space-y-2">
                {files.map((file, i) => (
                    <FileItem key={`${file.name}-${i}`} file={file} onRemove={() => onRemove(file)} disabled={disabled} />
                ))}
            </div>
        </div>
    );
}

function FileItem({ file, onRemove, disabled }: { file: File, onRemove: () => void, disabled: boolean }) {
    const Icon = getFileIcon(file.type);

    return (
        <div className="flex flex-col gap-2 rounded-md border bg-card text-card-foreground p-3 shadow-sm">
            <div className="flex items-start justify-between">
                <div className="flex items-center gap-3 overflow-hidden">
                    <div className="p-2 bg-primary/10 rounded-md">
                        <Icon size={24} className="text-primary" />
                    </div>
                    <div className="flex flex-col overflow-hidden">
                        <span className="font-medium text-sm truncate">{file.name}</span>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <span>{formatFileSize(file.size)}</span>
                            <span>•</span>
                            <span className="truncate">{file.type || 'Unknown type'}</span>
                        </div>
                    </div>
                </div>
                {!disabled && (
                    <button type="button" onClick={onRemove} className="text-muted-foreground hover:text-destructive transition-colors p-1">
                        <X size={16} />
                    </button>
                )}
            </div>
        </div>
    );
}

const getFileIcon = (mimeType: string) => {
    if (mimeType.startsWith('image/')) return FileImage;
    if (mimeType.startsWith('video/')) return FileVideo;
    if (mimeType.startsWith('audio/')) return FileAudio;
    if (mimeType === 'application/pdf') return FileText;
    return FileIcon;
};

const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
};
