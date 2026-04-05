import type { InertiaLinkProps } from '@inertiajs/react';
import type { LucideIcon } from 'lucide-react';

export type BreadcrumbItem = {
    title: string;
    href: NonNullable<InertiaLinkProps['href']>;
};

export type NavItem = {
    title: string;
    href: NonNullable<InertiaLinkProps['href']>;
    icon?: LucideIcon | null;
    isActive?: boolean;
};

// export interface Task { 
//     id: number;
//     name: string;
//     due_date?: string; 
//     is_completed: boolean;
//     created_at: string;
//     updated_at: string;
// } 

export interface CreateTaskForm {
    name: string;
}

