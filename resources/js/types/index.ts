export type * from './auth';
export type * from './navigation';
export type * from './ui';

export interface PaginatedResponse<T = Task | TaskCategory | Album | null> {
    current_page: number;
    data: T[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: {
        url: string | null;
        label: string;
        active: boolean;
    }[];
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
}
export interface Task {
    id: number;
    name: string;
    is_completed: boolean;
    due_date?: string;
    mediaFile?: MediaFile;
    task_categories?: TaskCategory[];
    created_at: string;
    updated_at: string;
}
export interface MediaFile {
    id: number;
    model_type: string;
    model_id: number;
    uuid: string;
    collection_name: string;
    name: string;
    file_name: string;
    mime_type: string;
    disk: string;
    conversions_disk: string;
    size: number;
    manipulations: string[];
    custom_properties: string[];
    generated_conversions: string[];
    responsive_images: string[];
    order_column: number;
    created_at: string;
    updated_at: string;
    original_url: string;
    preview_url: string;
}

export interface TaskCategory {
    id: number;
    name: string;
    tasks_count: number | null;
    tasks: Task[] | null;
    created_at: string;
    updated_at: string;
}

export interface Album {
    id: number;
    name: string;
    mediaFiles?: MediaFile[];
    created_at: string;
    updated_at: string;
}
